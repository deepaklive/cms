from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Content, MediaFile
from django.conf import settings

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']




class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(min_length=8, required=True)
    



class ContentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Content
        fields = '__all__'
        #field = ['id', 'title', 'image', 'is_published']
        read_only_fields = ['author', 'created_at', 'updated_at']

    def create(self, validated_data):
        # Handle image during content creation
        return Content.objects.create(**validated_data)
    
    def get_image_url(self, obj):
        # Return the full URL to the image
        if obj.image:
            return settings.MEDIA_URL + str(obj.image)
        return None



class MediaFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaFile
        fields = '__all__'
        read_only_fields = ['uploader', 'uploaded_at']




class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', ''),
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('lastname', '')
        )
        return user

