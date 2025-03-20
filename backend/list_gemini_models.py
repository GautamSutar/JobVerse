import google.generativeai as genai
import os 
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# set the gemeni api key 
genai.configure(api_key=os.getenv('GEMENI_API_KEY'))

# Fetch the available models 
models = genai.list_models()

#print the available models

for model in models:
    print(model)
