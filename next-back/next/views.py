from rest_framework import status, generics
from rest_framework.views import APIView, Response
from .serializers import SignupSerializer, LoginSerializer, AppSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import App, UserApp
from django.db import IntegrityError

User = get_user_model()

class SignupView(generics.CreateAPIView):
    serializer_class = SignupSerializer
    queryset = User.objects.all()

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data = request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetApp(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        apps = App.objects.getapps(request.GET)
        return Response(apps, status= status.HTTP_200_OK)

class CreateApp(generics.CreateAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = AppSerializer
    queryset = App.objects.all()

class AssignApp(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        try:
            UserApp.objects.assignapp(request)
            return Response({"info":"user linked"}, status=status.HTTP_200_OK)
        except IntegrityError:
            return Response({'info':"user already linked"}, status=status.HTTP_400_BAD_REQUEST)

class Tasks(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        apps = App.objects.get_assignedapps(request.user)
        return Response(apps,status=status.HTTP_200_OK)

class Points(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        points, count = App.objects.get_points(request.user)
        return Response({"points":points,"count":count}, status= status.HTTP_200_OK)