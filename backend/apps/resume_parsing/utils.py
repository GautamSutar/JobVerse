import pdfplumber
import docx
import re

print("utils.py loaded successfully")

def extract_text_from_pdf(file_path):
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text.strip()

def extract_text_from_docx(file_path):
    doc = docx.Document(file_path)
    text = "\n".join([para.text for para in doc.paragraphs])
    return text.strip()

def extract_email(text):
    match = re.search(r'[\w\.-]+@[\w\.-]+', text)
    return match.group(0) if match else None

def extract_phone(text):
    match = re.search(r'\+?\d[\d -]{8,15}\d', text)
    return match.group(0) if match else None

def extract_skills(text):
    skills_list = ["Python", "Java", "Django", "React", "Machine Learning", "AI", "NLP", "SQL"]
    found_skills = [skill for skill in skills_list if skill.lower() in text.lower()]
    return ", ".join(found_skills)

def parse_resume(file_path):
    text = extract_text_from_pdf(file_path) if file_path.endswith('.pdf') else extract_text_from_docx(file_path)
    return {
        "email": extract_email(text),
        "phone": extract_phone(text),
        "skills": extract_skills(text),
        "text": text
    }
