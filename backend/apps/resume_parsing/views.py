import os
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from .models import Resume
from .serializers import ResumeSerializer
from .utils import parse_resume





class ResumeUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        print("FILES:", request.FILES)  # Logs the files to your console
        file = request.FILES.get('resume')
        if file is None:
            return Response({"message": "No file uploaded. Please attach a file with key 'resume'."}, status=400)
        
        # Construct the absolute path for the uploads directory
        upload_dir = os.path.join(settings.BASE_DIR, 'uploads')
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)
        
        file_path = os.path.join(upload_dir, file.name)
        
        with open(file_path, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)
        
        parsed_data = parse_resume(file_path)
        
        if parsed_data:
            resume = Resume.objects.create(
                name="Unknown",
                email=parsed_data.get("email") or "N/A",
                phone=parsed_data.get("phone") or "N/A",
                skills=parsed_data.get("skills"),
                education="Extracted Education Text",
                experience="Extracted Experience Text"
            )
            return Response({"message": "Resume parsed successfully!", "data": parsed_data})
        return Response({"message": "Could not parse the resume"}, status=400)


# python manage.py runserver