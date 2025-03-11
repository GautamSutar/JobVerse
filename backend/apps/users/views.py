from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from firebase_admin import auth
from django.contrib.auth import login, logout
from .models import CustomUser
from .serializers import UserSerializer
# Removed: from django.http import HttpResponseRedirect
from django.urls import reverse  # Keep if needed for other purposes

class FirebaseLoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if email and password:
            try:
                # Note: Firebase Admin SDK cannot sign in users directly.
                # You need to use the client-side SDK to get an id_token.
                # For demonstration, we'll assume you have a way to get an id_token.
                # This is NOT secure and should be done client-side.
                return Response(
                    {'error': 'Use client-side Firebase SDK to sign in and get an id_token'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            except Exception as e:
                return Response(
                    {'error': str(e)},
                    status=status.HTTP_401_UNAUTHORIZED
                )

        # Existing id_token logic
        id_token = request.data.get('id_token')
        if not id_token:
            return Response(
                {'error': 'ID token is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            decoded_token = auth.verify_id_token(id_token)
            uid = decoded_token['uid']
            email = decoded_token.get('email', '')
            name = decoded_token.get('name', '')

            user, created = CustomUser.objects.get_or_create(
                username=uid,
                defaults={'email': email, 'name': name, 'firebase_uid': uid}
            )
            login(request, user)
            serializer = UserSerializer(user)
            return Response(
                {'message': 'Login successful', 'user': serializer.data},
                status=status.HTTP_200_OK
            )
        except auth.InvalidIdTokenError:
            return Response(
                {'error': 'Invalid ID token'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# # apps/users/views.py
# # apps/users/views.py
# from firebase_admin import auth
# from django.contrib.auth import login
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from .models import CustomUser
# from .serializers import UserSerializer

class SignupView(APIView):
    def post(self, request):
        name = request.data.get('name')
        email = request.data.get('email')
        password = request.data.get('password')
        id_token = request.data.get('id_token')

        print(f"Received request: {request.data}")  # Log the incoming request

        if id_token:  # Google Sign-In flow
            try:
                decoded_token = auth.verify_id_token(id_token)
                print(f"Decoded token: {decoded_token}")  # Log the decoded token
                uid = decoded_token['uid']
                email = decoded_token.get('email', email)
                name = decoded_token.get('name', name)

                user, created = CustomUser.objects.get_or_create(
                    username=uid,
                    defaults={'email': email, 'name': name, 'firebase_uid': uid}
                )
                login(request, user)
                serializer = UserSerializer(user)
                return Response(
                    {'message': 'Signup successful, please log in', 'user': serializer.data},
                    status=status.HTTP_201_CREATED
                )
            except auth.InvalidIdTokenError as e:
                print(f"Invalid ID token error: {str(e)}")  # Log the error
                return Response(
                    {'error': 'Invalid ID token'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            except Exception as e:
                print(f"Unexpected error: {str(e)}")  # Log the error
                return Response(
                    {'error': str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )
        else:  # Email/Password flow
            if not (name and email and password):
                return Response(
                    {'error': 'Name, email, and password are required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            try:
                firebase_user = auth.create_user(email=email, password=password)
                user, created = CustomUser.objects.get_or_create(
                    username=firebase_user.uid,
                    defaults={'email': email, 'name': name, 'firebase_uid': firebase_user.uid}
                )
                login(request, user)
                serializer = UserSerializer(user)
                return Response(
                    {'message': 'Signup successful, please log in', 'user': serializer.data},
                    status=status.HTTP_201_CREATED
                )
            except auth.EmailAlreadyExistsError:
                return Response(
                    {'error': 'Email already exists'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            except Exception as e:
                print(f"Unexpected error: {str(e)}")  # Log the error
                return Response(
                    {'error': str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )
class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)