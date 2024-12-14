from django.db import models
from django.contrib.auth.models import User
import os
from datetime import datetime

def rename_image(instance, filename):
    # Get the author's first and last name
    author_name = f"{instance.author.first_name}_{instance.author.last_name}"
    
    # Get the current timestamp to make the filename unique
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # Create a new file name: "{author_name}_{timestamp}_{original_filename}"
    new_filename = f"{author_name}_{timestamp}_{filename}"
    
    # Define the path where the file will be saved
    return os.path.join('content_images/', new_filename)


class Content(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    image = models.ImageField(upload_to=rename_image, null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=True)

    def __str__(self):
        return self.title

class MediaFile(models.Model):
    file = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    uploader = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.file.name
