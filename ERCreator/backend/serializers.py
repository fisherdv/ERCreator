from django.db import models
from django.db.models import fields
from rest_framework import serializers

from .models import ERModel, Entity, Type, Attribute


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


class AttributesSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Attribute
        exclude = "entity",
        view_name = "attributes"


class EntityPositionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Entity
        fields = "id", "positionX", "positionY", "er_model_id"
        view_name = "entity_position"
        

class EntitySerializer(serializers.ModelSerializer):
    attributes = AttributesSerializer(many=True)
    id = serializers.IntegerField(required=False)
    er_model_id = serializers.IntegerField()

    class Meta:
        model = Entity
        fields = "id", "name", "comment", "attributes", "positionX", "positionY", "er_model_id"
        view_name = "entity"
        depth = 1

    def create(self, validated_data):
        vd_attributes = validated_data.pop("attributes")
        instance = Entity.objects.create(**validated_data)
        for vd_attribute in vd_attributes:
            attribute = Attribute.objects.create(
                **vd_attribute, entity=instance)
        return instance

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.comment = validated_data.get('comment', instance.comment)
        instance.positionX = validated_data.get(
            'positionX', instance.positionX)
        instance.positionY = validated_data.get(
            'positionY', instance.positionY)

        # Delete any attributes not included in the request
        attributes_ids = [item['id']
                          for item in validated_data['attributes'] if item.get('id', None)]
        for attribute in list((instance.attributes).all()):
            if attribute.id not in attributes_ids:
                attribute.delete()

        # Create or update attribute instances that are in the request
        for item in validated_data['attributes']:
            item_id = item.pop('id', None)
            if item_id:
                Attribute.objects.filter(id=item_id).update(**item)
            else:
                Attribute.objects.create(**item, entity=instance)
        return instance


class ERModelDetailSerializer(serializers.ModelSerializer):
    entities = EntitySerializer(many=True, read_only=True)

    class Meta:
        model = ERModel
        fields = "id", "name", "comment", "entities"
        view_name = "er_models_detail"
