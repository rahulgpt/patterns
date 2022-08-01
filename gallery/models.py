from django.db import models


class GalleryImage(models.Model):
    title = models.CharField(max_length=30)
    imagesrc = models.ImageField(upload_to='gallery-images')
    date_uploaded = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def get_image_width(self):
        return self.imagesrc.width

    def get_image_height(self):
        return self.imagesrc.height
