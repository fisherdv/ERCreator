from django.db import models
from django.db.models import fields
from rest_framework import serializers

from .models import ERModel


class ERModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = ERModel
        fields = "name", "comment", "entities"
        view_name = "er_models"

