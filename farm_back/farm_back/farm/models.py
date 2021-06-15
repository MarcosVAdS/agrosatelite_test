from django.db import models
from owner.models import Owner

class Farm(models.Model):
    create_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100, default='')
    geometry = models.CharField(max_length=100, default='polygon')
    area = models.CharField(max_length=100, default='0')
    centroid = models.FloatField()
    municipality = models.CharField(max_length=100)
    state = models.CharField(max_length=60)
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)

    class Meta:
        ordering = ['created_at']

