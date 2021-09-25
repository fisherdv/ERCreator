from django.contrib import admin
from .models import ERModel
# Register your models here.


@admin.register(ERModel)
class ERModelAdmin(admin.ModelAdmin):
    pass
