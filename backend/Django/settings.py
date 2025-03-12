# import os
# from pathlib import Path
# import firebase_admin
# from firebase_admin import credentials

# BASE_DIR = Path(__file__).resolve().parent.parent

# # Initialize Firebase
# cred = credentials.Certificate(os.path.join(BASE_DIR, "firebase-adminsdk.json"))
# firebase_admin.initialize_app(cred)

# SECRET_KEY = '(r-rj927u#0(d+00db-!_r290fg0409t0ndgn^=%-z-!ooftnu'
# DEBUG = True
# ALLOWED_HOSTS = ['*']

# INSTALLED_APPS = [
#     'django.contrib.admin',
#     'django.contrib.auth',
#     'django.contrib.contenttypes',
#     'django.contrib.sessions',
#     'django.contrib.messages',
#     'django.contrib.staticfiles',
#     'rest_framework',
#     'apps.users',
#     'corsheaders',
# ]

# MIDDLEWARE = [
#     'corsheaders.middleware.CorsMiddleware',  # Add at the top
#     'django.middleware.security.SecurityMiddleware',
#     'django.contrib.sessions.middleware.SessionMiddleware',
#     'django.middleware.common.CommonMiddleware',
#     'django.middleware.csrf.CsrfViewMiddleware',
#     'django.contrib.auth.middleware.AuthenticationMiddleware',
#     'django.contrib.messages.middleware.MessageMiddleware',
#     'django.middleware.clickjacking.XFrameOptionsMiddleware',
# ]


# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:5174",  # Your React frontend (Vite)
#     "http://127.0.0.1:8000",
# ]

# CORS_ALLOW_CREDENTIALS = True  # Allow cookies if needed

# ROOT_URLCONF = 'Django.urls'

# TEMPLATES = [
#     {
#         'BACKEND': 'django.template.backends.django.DjangoTemplates',
#         'DIRS': [],
#         'APP_DIRS': True,
#         'OPTIONS': {
#             'context_processors': [
#                 'django.template.context_processors.debug',
#                 'django.template.context_processors.request',
#                 'django.contrib.auth.context_processors.auth',
#                 'django.contrib.messages.context_processors.messages',
#             ],
#         },
#     },
# ]

# WSGI_APPLICATION = 'Django.wsgi.application'

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

# AUTH_PASSWORD_VALIDATORS = [
#     {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
#     {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
#     {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
#     {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
# ]

# # Add AUTH_USER_MODEL here, near authentication settings
# AUTH_USER_MODEL = 'users.CustomUser'

# LANGUAGE_CODE = 'en-us'
# TIME_ZONE = 'UTC'
# USE_I18N = True
# USE_TZ = True

# STATIC_URL = '/static/'
# DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'



import os
from pathlib import Path
import firebase_admin
from firebase_admin import credentials

# Base directory of the project
BASE_DIR = Path(__file__).resolve().parent.parent

# 🔹 Load Firebase credentials
cred_path = BASE_DIR / "firebase-adminsdk.json"
if not cred_path.exists():
    raise FileNotFoundError(f"Firebase credentials file not found: {cred_path}")
cred = credentials.Certificate(str(cred_path))
firebase_admin.initialize_app(cred)

# 🔹 Secret Key (Load from environment variable)
SECRET_KEY = os.getenv("SECRET_KEY", "(r-rj927u#0(d+00db-!_r290fg0409t0ndgn^=%-z-!ooftnu")

# 🔹 Debug mode (Set False in production)
DEBUG = os.getenv("DEBUG", "True") == "True"

# 🔹 Allowed Hosts
ALLOWED_HOSTS = ['*']

# 🔹 Installed Apps
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'apps.users',  # Custom User Model
    'corsheaders',
]

# 🔹 Middleware
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

# 🔹 CORS Settings (Allow frontend React app)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5175",  # Your React frontend (Vite)
    "http://127.0.0.1:8000",
]
CORS_ALLOW_CREDENTIALS = True  # Allow cookies if needed

# 🔹 CSRF Trusted Origins (Important for API authentication)
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5175"
]

# 🔹 Security Headers
SECURE_CROSS_ORIGIN_OPENER_POLICY = "same-origin-allow-popups"  # 👈 Added here

# 🔹 Root URL Configuration
ROOT_URLCONF = 'Django.urls'

# 🔹 Templates
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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

# 🔹 WSGI Application
WSGI_APPLICATION = 'Django.wsgi.application'

# 🔹 Database Configuration (Using SQLite)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# 🔹 Authentication & Custom User Model
AUTH_USER_MODEL = 'users.CustomUser'

# 🔹 Password Validators
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# 🔹 Language & Timezone
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# 🔹 Static Files
STATIC_URL = '/static/'

# 🔹 Default Primary Key Field Type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
