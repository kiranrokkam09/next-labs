from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class AppManager(models.Manager):
    def getapps(self, data):
        from .serializers import AppSerializer
        id = data.get('id')
        apps = self.get_queryset().all()
        if id:
            apps = apps.filter(id = id)
        
        serializer = AppSerializer(apps, many=True)
        serialized_apps = serializer.data

        return serialized_apps
    
    def get_assignedapps(self,user):
        from .serializers import AppSerializer
        apps = self.filter(users__user = user)
        serializer = AppSerializer(apps, many=True)
        serialized_apps = serializer.data

        return serialized_apps
    
    def get_points(self,user):
        apps = self.get_assignedapps(user)
        points = 0
        count = 0
        for app in apps:
            points += app.get('points')
            count += 1
        return [points, count]
    
class App(models.Model):
    # Define choices for categories
    CATEGORY_CHOICES = [
        ("entertainment", "Entertainment"),
        ("sports", "Sports"),
        ("health", "Health"),
        ("education", "Education"),
    ]

    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='app_images/')
    link = models.CharField(max_length=200)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    subcategory = models.CharField(max_length=20)
    points = models.IntegerField()
    objects = AppManager()

    def __str__(self) -> str:
        return f"{self.name} - {self.points} Points"

class UserAppManager(models.Manager):
    def assignapp(self,request):
        data = request.data
        user = request.user
        app = App.objects.filter(id = data['app']).last()
        image = request.FILES.get('screenshot')
        res = self.create(user = user, app = app,screenshot = image )
        return res
    
class UserApp(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'apps')
    app = models.ForeignKey(App, on_delete = models.CASCADE, related_name = 'users')
    screenshot = models.ImageField(upload_to='userapp_screenshots/')
    objects = UserAppManager()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "app"],
                name="unique_user_app",
            )
        ]

    def __str__(self) -> str:
        return f"{self.user.email} - {self.app.name}"
