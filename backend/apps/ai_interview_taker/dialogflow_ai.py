from google.cloud import dialogflowcx_v3

PROJECT_ID = "your-gcp-project-id"
AGENT_ID = "your-dialogflow-agent-id"
LOCATION = "global"  # or your specific region

def detect_intent_text(session_id, text):
    client = dialogflowcx_v3.SessionsClient()
    session_path = f"projects/{PROJECT_ID}/locations/{LOCATION}/agents/{AGENT_ID}/sessions/{session_id}"

    text_input = dialogflowcx_v3.TextInput(text=text)
    query_input = dialogflowcx_v3.QueryInput(text=text_input, language_code="en-US")

    response = client.detect_intent(session=session_path, query_input=query_input)

    return response.query_result.response_messages[0].text.text[0]
