from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from cms.views import ContentListCreateView, ContentDetailView, MediaFileUploadView, ObtainAuthTokenView, RegisterView, ChangePasswordView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('auth/', ObtainAuthTokenView.as_view(), name='obtain-token'),
    path('change_password/', ChangePasswordView.as_view(), name='change_password'),
    path('content/', ContentListCreateView.as_view(), name='content-list-create'),
    path('content/<int:id>/', ContentDetailView.as_view(), name='content-detail'),
    path('media/', MediaFileUploadView.as_view(), name='media-file-upload'),
]

