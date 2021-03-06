# Generated by Django 3.2.7 on 2021-09-27 16:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_auto_20210927_1046'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attribute',
            name='default',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
        migrations.AlterField(
            model_name='attribute',
            name='size',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='attribute',
            name='type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='backend.type'),
        ),
    ]
