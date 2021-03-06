# Generated by Django 3.2.7 on 2021-09-26 19:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attribute',
            name='entity',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='attributes', to='backend.entity'),
        ),
        migrations.AlterField(
            model_name='ermodel',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='er_models', to=settings.AUTH_USER_MODEL),
        ),
    ]
