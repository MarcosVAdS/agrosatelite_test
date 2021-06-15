from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from farm import views

urlpatterns = [
    path('farm/', views.farm_list),
    path('farm/<int:pk>', views.farm_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)