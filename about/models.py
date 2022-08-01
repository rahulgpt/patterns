from django.db import models


class AboutDetail(models.Model):
    image = models.ImageField(upload_to='about-images')
    heading1 = models.CharField(max_length=30)
    heading2 = models.CharField(max_length=30)
    paragraph = models.TextField()
    date_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.heading2

    def get_image_width(self):
        return self.image.width

    def get_image_height(self):
        return self.image.height
