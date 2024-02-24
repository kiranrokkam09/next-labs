from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .models import App, UserApp

User = get_user_model()

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)
    class Meta:
        model = User
        fields = ['email','password','username','first_name','last_name']
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # Ensure password is not None before hashing
        if password is not None:
            validated_data['password'] = make_password(password)
        return super(SignupSerializer, self).create(validated_data)
    

class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only = True)

    class Meta:
        model = User
        fields = ['username', 'password'] 
    
    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        user = authenticate(username=username, password=password)
        if user:
            attrs.pop('password', None)
            token, _ = Token.objects.get_or_create(user=user)
            attrs['id'] = user.id
            attrs['token'] = token.key
            attrs['first_name'] = user.first_name
            attrs['last_name'] = user.last_name
            attrs['email'] = user.email
            attrs['isadmin'] = user.is_superuser
            
        else:
            raise serializers.ValidationError('Invalid username or password')

        return attrs


class AppSerializer(serializers.ModelSerializer):
    class Meta:
        model = App
        fields = '__all__'

class AssignAppSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserApp
        fields = '__all__'

        