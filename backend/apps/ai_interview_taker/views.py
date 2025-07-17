from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .stt import transcribe_audio
from .tts import synthesize_speech
from .dialogflow_ai import detect_intent_text
from .nlp_analysis import analyze_text

@csrf_exempt
def stt_api(request):
    if request.method == "POST":
        audio_file = request.FILES["audio"]
        transcript = transcribe_audio(audio_file)
        return JsonResponse({"transcript": transcript})

@csrf_exempt
def tts_api(request):
    if request.method == "POST":
        data = json.loads(request.body)
        text = data.get("text", "")
        audio_content = synthesize_speech(text)
        return JsonResponse({"audio": audio_content.decode("ISO-8859-1")})

@csrf_exempt
def dialogflow_api(request):
    if request.method == "POST":
        data = json.loads(request.body)
        session_id = data.get("session_id", "test_session")
        text = data.get("text", "")
        response = detect_intent_text(session_id, text)
        return JsonResponse({"response": response})

@csrf_exempt
def nlp_analysis_api(request):
    if request.method == "POST":
        data = json.loads(request.body)
        text = data.get("text", "")
        analysis = analyze_text(text)
        return JsonResponse(analysis)
