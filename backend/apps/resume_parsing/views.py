# import os
# import pdfplumber
# import re
# from django.conf import settings
# from rest_framework.views import APIView
# from rest_framework.parsers import MultiPartParser, FormParser
# from rest_framework.response import Response
# from .models import Resume
# from .serializers import ResumeSerializer
# from .utils import parse_resume
# import requests




# class ResumeUploadView(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def post(self, request):
#         print("FILES:", request.FILES)  # Logs the files to your console
#         file = request.FILES.get('resume')
#         if file is None:
#             return Response({"message": "No file uploaded. Please attach a file with key 'resume'."}, status=400)
        
#         # Construct the absolute path for the uploads directory
#         upload_dir = os.path.join(settings.BASE_DIR, 'uploads')
#         if not os.path.exists(upload_dir):
#             os.makedirs(upload_dir)
        
#         file_path = os.path.join(upload_dir, file.name)
        
#         with open(file_path, 'wb+') as destination:
#             for chunk in file.chunks():
#                 destination.write(chunk)
        
#         parsed_data = parse_resume(file_path)
        
#         with pdfplumber.open(file_path) as pdf:
#             text = "\n".join(page.extract_text() for page in pdf.pages if page.extract_text())


#         if not text:
#             return None # return none if not text found

        
#         # Cleaning unwanted characters (fixing text formatting)
#         text = re.sub(r'\(cid:\d+\)','',text) # remove ( cid: xxx ) artificates
#         text = re.sub(r'[\n•]',' ',text) # replaces newline and bullets with spaces 
#         text = re.sub(r'\s+',' ',text).strip() #remove extra spaces 

#         # Extract email 
#         email_match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', text)
#         email = email_match.group() if email_match else None

#         # Extract phone number
#         phone_match = re.search(r'\+?\d{10,15}', text)  # Matches international and local phone numbers
#         phone = phone_match.group() if phone_match else None

#         # Extract skills (Assuming skills are comma-separated)
#         skills_match = re.search(r'SKILLS[:\s]*(.*)', text, re.IGNORECASE)
#         skills = skills_match.group(1).strip() if skills_match else None


#         # Extract Education Section
#         education_match = re.search(r'EDUCATION[:\s]*(.*?)(?=EXPERIENCE|INTERNSHIP|PROJECTS|HOBBIES|$)', text, re.IGNORECASE | re.DOTALL)
#         education = education_match.group(1).strip() if education_match else None
    
#         # Extract Experience Section
#         experience_match = re.search(r'EXPERIENCE[:\s]*(.*?)(?=PROJECTS|EDUCATION|CERTIFICATIONS|HOBBIES|$)', text, re.IGNORECASE | re.DOTALL)
#         experience = experience_match.group(1).strip() if experience_match else None




#         print("Parsed_data", parsed_data)

#         # Define the url of the question generation 
#         question_api_url = "http://127.0.0.1:8000/api/generate_question_api/"


#         # send a post request to with resume text
#         try:
#             response = requests.post(question_api_url, json={"resume_text": parsed_data["text"]})
#             response_data = response.json()  #convert response to json 
#         except requests.exceptions.RequestException as error:
#             return Response({"message": "Failed to send request  to question generation API", "Error": str(error)}, status=500)        


#         if parsed_data:
#             resume = Resume.objects.create(
#                 # name="Unknown",
#                 # email=parsed_data.get("email") or "N/A",
#                 # phone=parsed_data.get("phone") or "N/A",
#                 # skills=parsed_data.get("skills"),
#                 # education="Extracted Education Text",
#                 # experience="Extracted Experience Text"
#             )
#             return Response({"message": "Resume parsed successfully!", "data": parsed_data})
#         return Response({"message": "Could not parse the resume"}, status=400)


# # python manage.py runserver



# from rest_framework.parsers import MultiPartParser, FormParser
# from rest_framework.response import Response
# from .serializers import ResumeSerializer
# from rest_framework.views import APIView
# from django.core.cache import cache  # Import Django cache
# from django.conf import settings
# from .utils import parse_resume
# from .models import Resume
# import pdfplumber
# import requests
# import os
# import re

# class ResumeUploadView(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def post(self, request):
#         print("FILES RECEIVED:", request.FILES)  # Logs received files
#         file = request.FILES.get('resume')
        
#         if file is None:
#             return Response({"message": "No file uploaded. Please attach a file with key 'resume'."}, status=400)
        
#         # Save the uploaded resume to the 'uploads' directory
#         upload_dir = os.path.join(settings.BASE_DIR, 'uploads')
#         os.makedirs(upload_dir, exist_ok=True)  # Ensure directory exists
        
#         file_path = os.path.join(upload_dir, file.name)
#         with open(file_path, 'wb+') as destination:
#             for chunk in file.chunks():
#                 destination.write(chunk)
        
#         # Parse the resume
#         parsed_data = parse_resume(file_path)

#         # Extract text from PDF
#         with pdfplumber.open(file_path) as pdf:
#             text = "\n".join(page.extract_text() for page in pdf.pages if page.extract_text())

#         if not text:
#             return Response({"message": "No text found in resume. Please upload a valid document."}, status=400)

#         # Clean the extracted text
#         text = re.sub(r'\(cid:\d+\)', '', text)  # Remove (cid:xxx) artifacts
#         text = re.sub(r'[\n•]', ' ', text)  # Replace newlines and bullets with spaces
#         text = re.sub(r'\s+', ' ', text).strip()  # Remove extra spaces

#         # Extract email
#         email_match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', text)
#         email = email_match.group() if email_match else None

#         # Extract phone number
#         phone_match = re.search(r'\+?\d{10,15}', text)  # Matches international and local phone numbers
#         phone = phone_match.group() if phone_match else None

#         # Extract skills
#         skills_match = re.search(r'SKILLS[:\s]*(.*)', text, re.IGNORECASE)
#         skills = skills_match.group(1).strip() if skills_match else None

#         # Extract Education
#         education_match = re.search(r'EDUCATION[:\s]*(.*?)(?=EXPERIENCE|INTERNSHIP|PROJECTS|HOBBIES|$)', text, re.IGNORECASE | re.DOTALL)
#         education = education_match.group(1).strip() if education_match else None
    
#         # Extract Experience
#         experience_match = re.search(r'EXPERIENCE[:\s]*(.*?)(?=PROJECTS|EDUCATION|CERTIFICATIONS|HOBBIES|$)', text, re.IGNORECASE | re.DOTALL)
#         experience = experience_match.group(1).strip() if experience_match else None

#         print("Extracted Resume Text:", text[:500])  # Print first 500 characters for debugging

#         # Store parsed text in cache (valid for 10 minutes)
#         cache.set("resume_text", text, timeout=600)

#         # Define the URL of the question generation API
#         question_api_url = "http://127.0.0.1:8000/api/generate_question_api/"

#         # Send a POST request with resume text
#         try:
#             response = requests.post(question_api_url, json={"resume_text": text}, timeout=10)
#             print("Response Status Code:", response.status_code)
#             print("Response Content:", response.text)  # Log the full API response
            
#             if response.status_code == 200:
#                 response_data = response.json()
#             else:
#                 return Response({
#                     "message": "Question generation API returned an error.",
#                     "status_code": response.status_code,
#                     "error_details": response.text
#                 }, status=500)
        
#         except requests.exceptions.RequestException as error:
#             return Response({
#                 "message": "Failed to connect to question generation API",
#                 "error": str(error)
#             }, status=500)

#         # Save resume details in the database
#         if parsed_data:
#             resume = Resume.objects.create(
#                 email=email,
#                 phone=phone,
#                 skills=skills,
#                 education=education,
#                 experience=experience,
#                 text=text  # Cleaned full text
#             )
#             return Response({
#                 "message": "Resume parsed successfully!",
#                 "data": {
#                     "email": email,
#                     "phone": phone,
#                     "skills": skills,
#                     "education": education,
#                     "experience": experience
#                 }
#             })
        
#         return Response({"message": "Could not parse the resume"}, status=400)



from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.cache import cache  # Import Django cache
from django.conf import settings
from .models import Resume
import pdfplumber
import os
import re

class ResumeUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        print("FILES:", request.FILES)  # Logs the files to your console
        file = request.FILES.get('resume')
        
        if not file:
            return Response({"message": "No file uploaded. Please attach a file with key 'resume'."}, status=400)
        
        # Save file to a directory
        upload_dir = os.path.join(settings.BASE_DIR, 'uploads')
        os.makedirs(upload_dir, exist_ok=True)  # Create directory if not exists
        file_path = os.path.join(upload_dir, file.name)

        with open(file_path, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)
        
        # Parse resume using pdfplumber
        with pdfplumber.open(file_path) as pdf:
            text = "\n".join(page.extract_text() for page in pdf.pages if page.extract_text())

        if not text:
            return Response({"message": "No text found in resume. Please upload a valid document."}, status=400)

        # Clean text formatting
        text = re.sub(r'\(cid:\d+\)', '', text)  # Remove (cid:xxx) artifacts
        text = re.sub(r'[\n•]', ' ', text)  # Replace newlines and bullets with spaces
        text = re.sub(r'\s+', ' ', text).strip()  # Remove extra spaces

        # Extract relevant details
        email_match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', text)
        phone_match = re.search(r'\+?\d{10,15}', text)
        skills_match = re.search(r'SKILLS[:\s]*(.*)', text, re.IGNORECASE)
        education_match = re.search(r'EDUCATION[:\s]*(.*?)(?=EXPERIENCE|INTERNSHIP|PROJECTS|HOBBIES|$)', text, re.IGNORECASE | re.DOTALL)
        experience_match = re.search(r'EXPERIENCE[:\s]*(.*?)(?=PROJECTS|EDUCATION|CERTIFICATIONS|HOBBIES|$)', text, re.IGNORECASE | re.DOTALL)

        email = email_match.group() if email_match else None
        phone = phone_match.group() if phone_match else None
        skills = skills_match.group(1).strip() if skills_match else None
        education = education_match.group(1).strip() if education_match else None
        experience = experience_match.group(1).strip() if experience_match else None


        print("Blockchain resume content:  ", text)

        # Store parsed text in cache for 10 minutes
        cache.set("resume_text", text, timeout=600)

        # Save resume details in the database
        resume = Resume.objects.create(
            email=email,
            phone=phone,
            skills=skills,
            education=education,
            experience=experience,
            text=text  # Cleaned full text
        )

        return Response({
            "message": "Resume parsed successfully! Questions will be generated automatically.",
            "data": {
                "email": email,
                "phone": phone,
                "skills": skills,
                "education": education,
                "experience": experience
            }
        })
