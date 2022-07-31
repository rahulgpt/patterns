# Generated by Django 3.0.7 on 2020-09-07 11:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AboutDetail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='about_images')),
                ('heading1', models.CharField(max_length=30)),
                ('heading2', models.CharField(max_length=30)),
                ('paragraph', models.TextField()),
                ('date_modified', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
