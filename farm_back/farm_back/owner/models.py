from django.db import models

class Owner(models.Model):
    name = models.CharField(max_length=100, default='')
    document = models.CharField(max_length=20, default='')
    document_type = models.CharField(max_length=100, default='')
