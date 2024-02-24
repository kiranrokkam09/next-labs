from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from django.urls import reverse
from .models import App, UserApp
from django.core.files.uploadedfile import SimpleUploadedFile

User = get_user_model()

class SignupViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.signin_url = reverse("signup")

    def test_signup_view(self):
        # Defining Test Data
        data = {
            'firstname':'test',
            'lastname':'user',
            'username':'testuser',
            'email': 'testuser@example.com',
            'password': 'testpassword',
        }

        # Make a POST request to the signup view
        response = self.client.post(self.signin_url, data)
        # Assert that the response status code is 201 (created) if signup is successful
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Assert that the user was created in the database
        self.assertTrue(User.objects.filter(username='testuser').exists())

class LoginViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.login_url = reverse('login')
        self.user = User.objects.create_user(username='testuser', password='testpassword')

    def test_login_view_success(self):
        # Define test data
        data = {
            'username': 'testuser',
            'password': 'testpassword',
        }

        # Make a POST request to the login view
        response = self.client.post(self.login_url, data)

        # Assert that the response status code is 200 (OK) if login is successful
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_view_failure(self):
        # Define test data for a failed login attempt
        data = {
            'username': 'testuser',
            'password': 'wrongpassword',
        }

        # Make a POST request to the login view
        response = self.client.post(self.login_url, data)

        # Assert that the response status code is 400 (Bad Request) if login fails
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class GetAppViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.get_app_url = reverse('getapps')

        # Create some sample App instances for testing
        App.objects.create(name='App1', image=SimpleUploadedFile("sample.jpg", open('media/sample.jpg', 'rb').read(), content_type="image/jpg"), link='http://example.com/app1', category='entertainment', subcategory='sub1', points=10)
        App.objects.create(name='App2', image=SimpleUploadedFile("sample.jpg", open('media/sample.jpg', 'rb').read(), content_type="image/jpg"), link='http://example.com/app2', category='sports', subcategory='sub2', points=20)

    def test_get_app_view(self):
        # Make a GET request to the GetApp view
        response = self.client.get(self.get_app_url)

        # Assert that the response status code is 200 (OK)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertIn('App1', response.data[0]['name'])
        self.assertIn('App2', response.data[1]['name'])

    def test_get_app_view_with_id(self):
        # Get the ID of one of the created apps
        app_id = App.objects.filter(category='entertainment').first().id

        # Make a GET request to the GetApp view with the app ID
        response = self.client.get(f'{self.get_app_url}?id={app_id}')

        # Assert that the response status code is 200 (OK)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], app_id)

class CreateAppViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_superuser(username='admin', email='admin@example.com', password='adminpassword')
        self.client.force_authenticate(user=self.admin_user)
        self.create_app_url = reverse('createapp')

    def test_create_app_view_success(self):
        # Define your test data for creating an app
        data = {
            'name': 'TestApp',
            'image': SimpleUploadedFile("sample.jpg", open('media/sample.jpg', 'rb').read(), content_type="image/jpg"),
            'link': 'http://example.com/testapp',
            'category': 'entertainment',
            'subcategory': 'testsub',
            'points': 30,
        }

        # Make a POST request to the CreateApp view
        response = self.client.post(self.create_app_url, data)
        # Assert that the response status code is 201 (Created) if app creation is successful
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Assert that the app was created in the database
        self.assertTrue(App.objects.filter(name='TestApp').exists())

        # Optionally, you can also assert other aspects of the response or app data as needed
        # Example: Assert that the response contains specific data
        self.assertIn('TestApp', response.data['name'])
        self.assertEqual(response.data['points'], 30)

    def test_create_app_view_failure(self):
        # Define your test data for a failed app creation attempt (e.g., missing required fields)
        data = {
            'name': 'IncompleteApp',
            'category': 'entertainment',
            'points': 40,
        }

        # Make a POST request to the CreateApp view
        response = self.client.post(self.create_app_url, data)

        # Assert that the response status code is 400 (Bad Request) if app creation fails
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # Assert that the response contains specific error messages
        self.assertIn('image', response.data)
        self.assertIn('link', response.data)

class AssignAppViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.app = App.objects.create(name='TestApp', image=SimpleUploadedFile("sample.jpg", open('media/sample.jpg', 'rb').read(), content_type="image/jpg"), link='http://example.com/testapp', category='entertainment', subcategory='testsub', points=30)
        self.assign_app_url = reverse('assignapp')

    def test_assign_app_view_success(self):
        # Define your test data for assigning an app
        data = {
            'app': self.app.id,
            'screenshot': SimpleUploadedFile("sample.jpg", open('media/sample.jpg', 'rb').read(), content_type="image/jpg"),
        }

        # Make a POST request to the AssignApp view
        response = self.client.post(self.assign_app_url, data, format='multipart')

        # Assert that the response status code is 200 (OK) if app assignment is successful
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Assert that the UserApp instance was created in the database
        self.assertTrue(UserApp.objects.filter(user=self.user, app=self.app).exists())

class TasksViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.tasks_url = reverse('tasks')

    def test_tasks_view_success(self):
        # Assign an app to the user before making the GET request
        app = App.objects.create(name='TestApp', image=SimpleUploadedFile("sample.jpg", open('media/sample.jpg', 'rb').read(), content_type="image/jpg"), link='http://example.com/testapp', category='entertainment', subcategory='testsub', points=30)
        UserApp.objects.create(user=self.user, app=app, screenshot=SimpleUploadedFile("sample.jpg", open('media/sample.jpg', 'rb').read(), content_type="image/jpg"))

        # Make a GET request to the Tasks view
        response = self.client.get(self.tasks_url)

        # Assert that the response status code is 200 (OK)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertIn('TestApp', response.data[0]['name'])
        self.assertEqual(response.data[0]['points'], 30)

    def test_tasks_view_empty_result(self):
        # Make a GET request to the Tasks view without assigning any apps to the user
        response = self.client.get(self.tasks_url)

        # Assert that the response status code is 200 (OK) even if there are no assigned apps
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(response.data, [])

class PointsViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.points_url = reverse('points')

    def test_points_view_success(self):
        # Assign two apps to the user before making the GET request
        app1 = App.objects.create(name='TestApp1', image=SimpleUploadedFile("sample.jpg", open('media/sample.jpg', 'rb').read(), content_type="image/jpg"), link='http://example.com/testapp1', category='entertainment', subcategory='testsub', points=30)
        app2 = App.objects.create(name='TestApp2', image=SimpleUploadedFile("sample.jpg", open('media/sample.jpg', 'rb').read(), content_type="image/jpg"), link='http://example.com/testapp2', category='sports', subcategory='testsub', points=20)
        UserApp.objects.create(user=self.user, app=app1, screenshot=SimpleUploadedFile("sample.jpg", open('media/sample.jpg', 'rb').read(), content_type="image/jpg"))
        UserApp.objects.create(user=self.user, app=app2, screenshot=SimpleUploadedFile("sample.jpg", open('media/sample.jpg', 'rb').read(), content_type="image/jpg"))

        # Make a GET request to the Points view
        response = self.client.get(self.points_url)

        # Assert that the response status code is 200 (OK)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Assert that the response contains the correct points and count
        self.assertEqual(response.data['points'], 50)  # 30 + 20
        self.assertEqual(response.data['count'], 2)

    def test_points_view_no_assigned_apps(self):
        # Make a GET request to the Points view without assigning any apps to the user
        response = self.client.get(self.points_url)

        # Assert that the response status code is 200 (OK) and points and count are zero
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['points'], 0)
        self.assertEqual(response.data['count'], 0)