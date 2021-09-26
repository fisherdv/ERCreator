from django.db import models
from django.db.models import fields
from rest_framework import serializers

from .models import ERModel, Entity, Type


class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = "__all__"
        view_name = "types"


class ERModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ERModel
        fields = "id", "name", "comment"
        view_name = "er_models"


class EntitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entity
        fields = "id", "name", "comment", "attributes", "positionX", "positionY"
        view_name = "entity"
        depth = 1


class ERModelDetailSerializer(serializers.ModelSerializer):
    entities = EntitySerializer(many=True, read_only=True)

    class Meta:
        model = ERModel
        fields = "id", "name", "comment", "entities"
        view_name = "er_models_detail"
