# Generated by Django 3.0.7 on 2022-08-02 15:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='keyimage',
            field=models.ImageField(upload_to='shop-images'),
        ),
        migrations.AlterField(
            model_name='item',
            name='subimage1',
            field=models.ImageField(upload_to='shop-images'),
        ),
        migrations.AlterField(
            model_name='item',
            name='subimage2',
            field=models.ImageField(blank=True, upload_to='shop-images'),
        ),
    ]
