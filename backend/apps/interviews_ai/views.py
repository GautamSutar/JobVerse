from django.http import JsonResponse
import google.generativeai as genai
import os
from dotenv import load_dotenv

# set gemeni api key 
genai.configure()

# Load environment variables 
# load_dotenv()

# Debug API key 
# print(os.getenv('api key: ','GEMI_API_KEY'))

# Set Gemini API key from environment variables 
# genai.configure(api_key=os.getenv('AIzaSyBCeMuCaw72Md4vZADF9ITtvDM--73NVYE'))

# Manually passing the API key
genai.configure(api_key="AIzaSyBCeMuCaw72Md4vZADF9ITtvDM--73NVYE")

def generate_question_api(request):
    """
    Generating the interview question using the API key of Gemini 
    """
    # resume_text = request.GET.get('resume_text', 'Default resume content') # to be used later when the parsing is implemented 
    
    # Manually setting the resume text for now
    resume_text = 'Python Developer with expertise in Django and AI'
    category = request.GET.get('category', 'Technical')
    prompt = f"Generate a {category} question based on this resume :\n{resume_text}"
    try: 
        model = genai.GenerativeModel("gemini-1.5-pro-latest")  # Correct model name
        response = model.generate_content(prompt)
        question = response.text  # Extract the text from the response

        return JsonResponse({'question': question})
    
    except Exception as error:
        return JsonResponse({'error': str(error)}, status=500)
