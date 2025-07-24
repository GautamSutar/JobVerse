import whisper
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .models import AudioFile

class AudioTranscribeView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        if not file:
            return JsonResponse({"error": "No file provided"}, status=400)

        audio_obj = AudioFile.objects.create(file=file)

        model = whisper.load_model("base")
        result = model.transcribe(audio_obj.file.path)

        audio_obj.transcribed_text = result["text"]
        audio_obj.save()
        return JsonResponse({
            "file_name": audio_obj.file.name,
            "transcribed_text": audio_obj.transcribed_text
        })