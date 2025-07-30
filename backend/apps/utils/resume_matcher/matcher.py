import re
import fitz
import os
from dotenv import load_dotenv
from fuzzywuzzy import fuzz
import openai
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
def extract_text_from_pdf(file):
    with fitz.open(stream=file.read(), filetype='pdf') as doc:
        return " ".join(page.get_text() for page in doc)
def get_groq_match_score(job_data, resume_text):
    try:
        client = openai.OpenAI(
            api_key=GROQ_API_KEY,
            base_url="https://api.groq.com/openai/v1"
        )

        prompt = f"""
        You are an expert resume evaluator.

        Task:
        Compare the candidate's resume with the job description provided below.
        - Provide a match score (0-100)
        - List matched and missing skills
        - Justify the score in 1-2 sentences

        JOB DETAILS:
        Title: {job_data.get("title", "")}
        Category: {job_data.get("category", "")}
        Type: {job_data.get("job_type", "")}
        Time Commitment: {job_data.get("time_commitment", "")}
        Description: {job_data.get("description", "")}
        Responsibilities: {job_data.get("responsibilities", "")}
        Skills Required: {job_data.get("skills_required", "")}
        Who Can Apply: {job_data.get("who_can_apply", "")}
        Graduation Years: {job_data.get("graduation_years", "")}
        Degrees/Streams: {job_data.get("degrees_or_streams", "")}
        Experience Level: {job_data.get("experience_level", "")}
        Company: {job_data.get("company_name", "")}
        About Company: {job_data.get("about_company", "")}

        RESUME TEXT:
        {resume_text}

        Respond strictly in JSON format like:
        {{
          "score": <number between 0-100>,
          "matched_skills": ["skill1", "skill2"],
          "missing_skills": ["skillA", "skillB"],
          "reason": "..."
        }}
        """

        response = client.chat.completions.create(
            model="llama3-70b-8192",
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.3
        )

        text = response.choices[0].message.content.strip()
        match = re.search(r"\{.*\}", text, re.DOTALL)
        return eval(match.group()) if match else {"score": 0, "reason": "Invalid response"}

    except Exception as e:
        print("Groq API Error:", str(e))
        return {"score": 0, "reason": "Groq API error"}
def calculate_resume_skill_score(resume_file, job_data: dict, use_groq=False):
    resume_text = extract_text_from_pdf(resume_file)

    if use_groq and GROQ_API_KEY:
        return get_groq_match_score(job_data, resume_text)

    return {
        "score": 0,
        "reason": "Groq not used. Set use_groq=True to enable smart matching."
    }
