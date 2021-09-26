from django.contrib import admin
from .models import ERModel, Entity, Attribute, Type
# Register your models here.


@admin.register(ERModel)
class ERModelAdmin(admin.ModelAdmin):
    pass


@admin.register(Entity)
class EntityAdmin(admin.ModelAdmin):
    pass


@admin.register(Attribute)
class AttributeAdmin(admin.ModelAdmin):
    pass


@admin.register(Type)
class TypeAdmin(admin.ModelAdmin):
    pass
