import os
from pathlib import Path
# import firebase_admin
# from firebase_admin import credentials
from decouple import config
from dotenv import load_dotenv
from datetime import timedelta



EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'  # or your provider
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'exoic.jobverse.in@gmail.com'
EMAIL_HOST_PASSWORD = 'mxxz tkga hwhs baiy'
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

  

load_dotenv()  # Load environment variables from .env file
# Base directory of the project
BASE_DIR = Path(__file__).resolve().parent.parent

#  Load Firebase credentials
# cred_path = BASE_DIR / "firebase-adminsdk.json"
# if not cred_path.exists():
#     raise FileNotFoundError(f"Firebase credentials file not found: {cred_path}")
# cred = credentials.Certificate(str(cred_path))
# firebase_admin.initialize_app(cred)

SECRET_KEY = config('SECRET_KEY') #  Secret Key (Load from environment variable)
DEBUG = config('DEBUG', default=False, cast=bool) # Debug Configuration 

#  Allowed Hosts
ALLOWED_HOSTS = ['*']

#  Installed Apps
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'apps.resume_parsing',
    'rest_framework',
    'rest_framework_simplejwt.token_blacklist',  
    'rest_framework_simplejwt',
    'apps.users.apps.UsersConfig',
    'apps.students.apps.StudentsConfig',
    'apps.hr.apps.HrConfig',
    'apps.job_applications.apps.JobApplicationsConfig',
    'apps.jobs.apps.JobsConfig',
    "apps.audioapp.apps.AudioappConfig",
    "apps.interviewSchedule.apps.InterviewscheduleConfig",
    'channels',
]

#  Middleware
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Add at the top
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


#  CORS Settings (Allow frontend React app)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Your React frontend (Vite)
    "http://127.0.0.1:8000",
]
CORS_ALLOW_CREDENTIALS = True  # Allow cookies if needed

#  CSRF Trusted Origins (Important for API authentication)
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5173"
]

#  Security Headers
SECURE_CROSS_ORIGIN_OPENER_POLICY = "same-origin-allow-popups"  

#  Root URL Configuration
ROOT_URLCONF = 'Django.urls'

#  Templates
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / "templates"],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Use a Rate Limiter to Control API Calls
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
      'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
     'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/day',  # For anonymous users
        'user': '1000/day'  # For authenticated users
    }

}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=120),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=90),
    'BLACKLIST_AFTER_ROTATION': True,
    'ROTATE_REFRESH_TOKENS': True,
    'AUTH_HEADER_TYPES': ('Bearer',),
}

#  WSGI Application
WSGI_APPLICATION = 'Django.wsgi.application'
ASGI_APPLICATION = 'Django.asgi.application'
DATABASE_URL = config("DATABASE_URL", default=None) # Try to load NEON/PostgreSQL URL

#  Database Configuration Using Neon and Fall Back to SQLite if not set
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DATABASE'),
        'USER': os.getenv('USER'),
        'PASSWORD': os.getenv('PASSWORD'),
        'HOST': os.getenv('HOST'),
        'PORT': '5432', # Default PostgreSQL port
    }
}

REDIS_URL = os.getenv("REDIS_URL", "redis://127.0.0.1:6379")

CAHCHES = {
    'default':{
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': REDIS_URL,
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "SOCKET_CONNECT_TIMEOUT": 5,  
            "SOCKET_TIMEOUT": 5,        
        },
    }
}
SESSION_ENGINE = "django.contrib.sessions.backends.cache"
SESSION_CACHE_ALIAS = "default"
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [REDIS_URL],
        },
    },
}

#  Authentication & Custom User Model
AUTH_USER_MODEL = 'users.CustomUser'

#  Password Validators
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

#  Language & Timezone
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

#  Static Files
STATIC_URL = '/static/'

#  Default Primary Key Field Type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'




