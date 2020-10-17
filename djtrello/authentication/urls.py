from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

urlpatterns = [
    path('auth/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/register', views.UserCreate.as_view(), name='create_user'),
    path('auth/login', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair')
]
