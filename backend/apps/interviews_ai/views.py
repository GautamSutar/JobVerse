from rest_framework.response import Response
from django.shortcuts import get_list_or_404
from rest_framework.views import APIView
from django.core.cache import cache
import google.generativeai as genai
from .models import InterviewQuestion
from rest_framework import status
from dotenv import load_dotenv
from pathlib import Path
import environ
import hashlib
import json 
import os
import re

# Load environment variables
BASE_DIR = Path(__file__).resolve().parent.parent.parent
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

# Read API key for Google Gemini
GEMINI_API_KEY = env('GEMINI_API_KEY')

# Debugging API key (Remove in production)
print("Loaded Gemini API Key:", GEMINI_API_KEY)

# Configure Gemini API
genai.configure(api_key=GEMINI_API_KEY)

# Define question categories
CATEGORIES = [
    "Technical",
    #  "Behavioral", "Scenario-Based", "HR", "Project-Related",
    # "Leadership & Management", "Problem-Solving & Critical Thinking",
    # "Industry-Specific", "AI/ML & Data Science", "Company-Specific"
]

# **Dynamic Question Count Logic**
def determine_question_distribution(resume_text):
    """
    Dynamically determines the number of questions per category based on resume length.
    """
    word_count = len(re.findall(r'\w+', resume_text))  # Count words in resume
    total_questions = min(max(word_count // 50, 5), 30)  # Scale within range (5 to 30)

    # Define weight distribution per category (normalized to total questions)
    category_weights = {
        "Technical": 0.3, "Behavioral": 0.15, "Scenario-Based": 0.15, 
        "HR": 0.05, "Project-Related": 0.1, "Leadership & Management": 0.05, 
        "Problem-Solving & Critical Thinking": 0.1, "Industry-Specific": 0.05, 
        "AI/ML & Data Science": 0.1, "Company-Specific": 0.05
    }

    question_distribution = {category: max(1, int(total_questions * weight)) for category, weight in category_weights.items()}
    return question_distribution


class GenerateQuestionAPIView(APIView):
    """
    Generates interview questions based on the parsed resume.
    """
    
    def post(self, request):
        # Retrieve resume text from cache
        resume_text = cache.get("resume_text")  
        if not resume_text:
            return Response({"message": "Parsed resume text is missing. Please upload a resume first."}, 
                            status=status.HTTP_400_BAD_REQUEST)
        
        # Create a unique cache key using SHA-256 hash of the resume
        resume_hash = hashlib.sha256(resume_text.encode()).hexdigest()
        cache_key = f"questions_{resume_hash}"
        
        # Check if cached questions already exist
        cached_questions = cache.get(cache_key)
        if cached_questions:
            return Response({"questions": cached_questions, "source": "cache"}, status=status.HTTP_200_OK)

        # **Determine question distribution dynamically**
        question_distribution = determine_question_distribution(resume_text)

        # **Build prompt dynamically based on resume**
        combined_prompt = f"""
        Based on the following resume, generate interview questions as per the defined category distribution:

        Resume Content:
        {resume_text}

        Generate the following number of questions per category:
        {json.dumps(question_distribution)}

        Return the response in **valid JSON format** with this structure:

        {json.dumps({category: ["Question 1", "Question 2"] for category in CATEGORIES}, indent=4)}

        **Do not include any explanations, only return JSON format.**
        """

        try:
            # Use Gemini API
            model = genai.GenerativeModel("gemini-1.5-pro-latest")
            response = model.generate_content(combined_prompt)
            # Debugging: Print Gemini API response
            print("Raw Response from Gemini API:", response.text)
            if not response.text:
                return Response({"message": "Failed to generate questions. Empty response from Gemini API."}, 
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            cleaned_response = re.sub(r"```json\n|\n```", "", response.text).strip()
            # Convert Gemini response to dictionary
            try:
                generated_questions = json.loads(cleaned_response)
            except json.JSONDecodeError:
                return Response({"message": "Gemini returned an invalid response.", "raw_response": response.text},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # **Ensure all categories have the expected number of questions**
            for category, count in question_distribution.items():
                if category not in generated_questions or len(generated_questions[category]) < count:
                    generated_questions[category] = generated_questions.get(category, []) + ["No question generated"] * (count - len(generated_questions.get(category, [])))

            # Cache the generated questions for 24 hours
            cache.set(cache_key, generated_questions, timeout=86400) 

            return Response({"questions": generated_questions, "source": "gemini"}, status=status.HTTP_200_OK)

        except Exception as error:
            return Response({"message": "Gemini API request failed", "error": str(error)}, 
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
