from django.urls import path
from . import views

urlpatterns = [
    path("signup", views.SignupView.as_view(), name="signup"),
    path("login", views.LoginView.as_view(), name="login"),
    path("createapp", views.CreateApp.as_view(), name="createapp"),
    path("getapps", views.GetApp.as_view(), name="getapps"),
    path("assignapp",views.AssignApp.as_view(), name="assignapp"),
    path("tasks", views.Tasks.as_view(), name ="tasks"),
    path("points", views.Points.as_view(), name = "points")
]