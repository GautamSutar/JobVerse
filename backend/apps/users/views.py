# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from firebase_admin import auth
# from django.contrib.auth import login, logout
# from .models import CustomUser
# from .serializers import UserSerializer
# # Removed: from django.http import HttpResponseRedirect
# from django.urls import reverse  # Keep if needed for other purposes

# class FirebaseLoginView(APIView):
#     def post(self, request):

#         email = request.data.get('email')
#         password = request.data.get('password')
#         gautam = request.data.get('name')
        
#         if email and password:
#             try:
#                 # Note: Firebase Admin SDK cannot sign in users directly.
#                 # You need to use the client-side SDK to get an id_token.
#                 # For demonstration, we'll assume you have a way to get an id_token.
#                 # This is NOT secure and should be done client-side.
#                 return Response(
#                     {'error': 'Use client-side Firebase SDK to sign in and get an id_token'},
#                     status=status.HTTP_400_BAD_REQUEST
#                 )
#             except Exception as e:
#                 return Response(
#                     {'error': str(e)},
#                     status=status.HTTP_401_UNAUTHORIZED
#                 )

#         # Existing id_token logic
#         id_token = request.data.get('id_token')
#         if not id_token:
#             return Response(
#                 {'error': 'ID token is required'},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         try:
#             decoded_token = auth.verify_id_token(id_token)
#             uid = decoded_token['uid']
#             email = decoded_token.get('email', '')
#             name = decoded_token.get('name', '')

#             user, created = CustomUser.objects.get_or_create(
#                 username=uid,
#                 defaults={'email': email, 'name': name, 'firebase_uid': uid}
#             )
#             login(request, user)
#             serializer = UserSerializer(user)
#             return Response(
#                 {'message': 'Login successful', 'user': serializer.data},
#                 status=status.HTTP_200_OK
#             )
#         except auth.InvalidIdTokenError:
#             return Response(
#                 {'error': 'Invalid ID token'},
#                 status=status.HTTP_401_UNAUTHORIZED
#             )
#         except Exception as e:
#             return Response(
#                 {'error': str(e)},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )

# class SignupView(APIView):
#     def post(self, request):
#         name = request.data.get('name')
#         email = request.data.get('email')
#         password = request.data.get('password')
#         id_token = request.data.get('id_token')
#         print(f"id_Token: {id_token}")  # Log the id_token for debugging
#         print(f"Received request: {request.data}")  # Log the incoming request

#         if id_token:  # Google Sign-In flow
#             try:
#                 decoded_token = auth.verify_id_token(id_token)
#                 print(f"Decoded token: {decoded_token}")  # Log the decoded token
#                 uid = decoded_token['uid']
#                 email = decoded_token.get('email', email)
#                 name = decoded_token.get('name', name)

#                 user, created = CustomUser.objects.get_or_create(
#                     username=uid,
#                     defaults={'email': email, 'name': name, 'firebase_uid': uid}
#                 )
#                 login(request, user)
#                 serializer = UserSerializer(user)
#                 return Response(
#                     {'message': 'Signup successful, please log in', 'user': serializer.data},
#                     status=status.HTTP_201_CREATED
#                 )
#             except auth.InvalidIdTokenError as e:
#                 print(f"Invalid ID token error: {str(e)}")  # Log the error
#                 return Response(
#                     {'error': 'Invalid ID token'},
#                     status=status.HTTP_400_BAD_REQUEST
#                 )
#             except Exception as e:
#                 print(f"Unexpected error: {str(e)}")  # Log the error
#                 return Response(
#                     {'error': str(e)},
#                     status=status.HTTP_400_BAD_REQUEST
#                 )
#         else:  # Email/Password flow
#             if not (name and email and password):
#                 return Response(
#                     {'error': 'Name, email, and password are required'},
#                     status=status.HTTP_400_BAD_REQUEST
#                 )
#             try:
#                 firebase_user = auth.create_user(email=email, password=password)
#                 user, created = CustomUser.objects.get_or_create(
#                     username=firebase_user.uid,
#                     defaults={'email': email, 'name': name, 'firebase_uid': firebase_user.uid}
#                 )
#                 login(request, user)
#                 serializer = UserSerializer(user)
#                 return Response(
#                     {'message': 'Signup successful, please log in', 'user': serializer.data},
#                     status=status.HTTP_201_CREATED
#                 )
#             except auth.EmailAlreadyExistsError:
#                 return Response(
#                     {'error': 'Email already exists'},
#                     status=status.HTTP_400_BAD_REQUEST
#                 )
#             except Exception as e:
#                 print(f"Unexpected error: {str(e)}")  # Log the error
#                 return Response(
#                     {'error': str(e)},
#                     status=status.HTTP_400_BAD_REQUEST )
# class LogoutView(APIView):
#     def post(self, request):
#         logout(request)
#         return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)








from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.users.models import CustomUser
from apps.students.models import StudentProfile
from apps.hr.models import HRProfile
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken 
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import SignupSerializer
from rest_framework import generics,permissions
from django.contrib.auth import authenticate


class SignupView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset = CustomUser.objects.all()
    serializer_class = SignupSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {
                "message": "USER CREATED SUCCESSFULLY"
                },
                status=status.HTTP_201_CREATED
            )           
        return Response(
            {
            "message":f"ERROR IN USER CREATION: {serializer.errors}"
            },
            status=status.HTTP_400_BAD_REQUEST
            )
    


class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refreshToken': str(refresh),
                'accessToken': str(refresh.access_token),
                'role': user.role,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name
            })
        else:
            return Response(
                {
                    "detail": "INVALID CREDENTIALS"
                },
                status=status.HTTP_401_UNAUTHORIZED
            )


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            refresh_token = request.data['refreshToken']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(
                {
                    "message": 'USER LOGGED OUT SUCCESSFULLY'
                },
                status=status.HTTP_205_RESET_CONTENT
                )
        except:
            return Response(
                {
                    "error": "INVALID REFRESH TOKEN"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

User = get_user_model
class DeleteAccountView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    def delete(self, request, *args, **kwargs):
        user = self.request.user
        user.delete()
        return Response({"message": "Account deleted"}, status=status.HTTP_204_NO_CONTENT)




                                 


