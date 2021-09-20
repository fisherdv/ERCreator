from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth import get_user_model


class ERModel(models.Model):
    name = models.CharField(max_length=256)
    comment = models.CharField(max_length=256, null=True, blank=True)
    entities = models.ManyToManyField('Entity', blank=True)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)


class Entity(models.Model):
    name = models.CharField(max_length=256)
    comment = models.CharField(max_length=256, null=True, blank=True)


class Attribute(models.Model):    
    name = models.CharField(max_length=256)
    size = models.IntegerField(null=True)
    default = models.CharField(max_length=256)
    comment = models.CharField(max_length=256, null=True, blank=True)
    
    is_primary_key = models.BooleanField(default=False)
    is_unique = models.BooleanField(default=False)
    is_nullable = models.BooleanField(default=False)
    is_index = models.BooleanField(default=False)
    
    foreign_key = models.ForeignKey('Attribute', on_delete=models.SET_NULL, null=True, blank=True)
    entity = models.ForeignKey('Entity', on_delete=models.CASCADE)
    type = models.ForeignKey('Type', on_delete=models.PROTECT)


class Type(models.Model):
    name = models.CharField(max_length=256)