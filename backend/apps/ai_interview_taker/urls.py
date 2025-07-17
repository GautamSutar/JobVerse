from django.urls import path
from .views import stt_api, tts_api, dialogflow_api, nlp_analysis_api

urlpatterns = [
    path("stt/", stt_api, name="stt"),
    path("tts/", tts_api, name="tts"),
    path("dialogflow/", dialogflow_api, name="dialogflow"),
    path("nlp/", nlp_analysis_api, name="nlp"),
]
