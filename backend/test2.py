from decouple import config
SCERET_KEY = config('DATABASE_URL')
print(SCERET_KEY)