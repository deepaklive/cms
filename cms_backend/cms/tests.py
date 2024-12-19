from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from .models import Content



class AuthTestCase(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.login_url = '/auth/'

    def test_login_success(self):
        data = {'username': 'testuser', 'password': 'testpassword'}
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)

    def test_login_failure(self):
        data = {'username': 'testuser', 'password': 'wrongpassword'}
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)



class ContentTestCase(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.content_data = {'title': 'Test Content', 'body': 'Test Body'}
        self.content = Content.objects.create(author=self.user, **self.content_data)

    def test_create_content(self):
        response = self.client.post('/content/', self.content_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], 'Test Content')

    def test_get_content(self):
        response = self.client.get(f'/content/{self.content.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.content.title)

    def test_update_content(self):
        update_data = {'title': 'Updated Title', 'body': 'Updated Body'}
        response = self.client.put(f'/content/{self.content.id}/', update_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Updated Title')

    def test_delete_content(self):
        response = self.client.delete(f'/content/{self.content.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Content.objects.filter(id=self.content.id).exists())
