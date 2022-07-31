from django.db import models
from django.conf import settings
from django.shortcuts import reverse
from django.core.validators import MinValueValidator, MaxValueValidator
import datetime


class Category(models.Model):
    category_title = models.CharField(max_length=30)

    def __str__(self):
        return self.category_title


class Item(models.Model):
    title = models.CharField(max_length=30)
    keyimage = models.ImageField(upload_to='shop_images')
    subimage1 = models.ImageField(upload_to='shop_images')
    subimage2 = models.ImageField(upload_to='shop_images', blank=True)
    price = models.FloatField()
    discount_price = models.FloatField(blank=True, null=True)
    designed_by = models.CharField(max_length=30)
    slug = models.SlugField(max_length=100, unique=True, db_index=True)
    file_type = models.CharField(max_length=20, default='Digital(1 Jpeg)')
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True, blank=True)
    description = models.TextField()
    available = models.BooleanField(default=True)
    date_uploaded = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("model_detail", kwargs={
            "slug": self.slug
        })

    def get_image_width(self):
        return self.keyimage.width

    def get_image_height(self):
        return self.keyimage.height


class OrderItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    ordered = models.BooleanField(default=False)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)

    def __str__(self):
        return self.item.title

    def get_discount_price(self):
        return self.item.discount_price

    def get_final_price(self):
        if self.item.discount_price:
            return self.item.discount_price
        return self.item.price


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    items = models.ManyToManyField(OrderItem)
    start_date = models.DateTimeField(auto_now_add=True)
    ordered_date = models.DateTimeField()
    ordered = models.BooleanField(default=False)
    payment = models.ForeignKey(
        'Payment', on_delete=models.SET_NULL, blank=True, null=True
    )
    coupon = models.ForeignKey(
        'Coupon', on_delete=models.SET_NULL, blank=True, null=True
    )

    def __str__(self):
        return self.user.username

    def get_total(self):
        total = 0
        for order_item in self.items.all():
            total += order_item.get_final_price()
        if self.coupon:
            if Item.discount_price:
                total -= (self.coupon.discount_percent / 100) * \
                    Item.discount_price
            else:
                total -= (self.coupon.discount_percent / 100) * Item.price
        return total


class UserProfile(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    stripe_customer_id = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.user.username


class Payment(models.Model):
    stripe_charge_id = models.CharField(max_length=50)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.SET_NULL, blank=True, null=True)
    amount = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username

# Function to calc default expiry date of


def compute_default_valid_to():
    return datetime.datetime.now() + datetime.timedelta(days=5)


class Coupon(models.Model):
    code = models.CharField(max_length=15)
    discount_percent = models.IntegerField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
    valid_from = models.DateTimeField(auto_now_add=True, blank=True)
    valid_to = models.DateTimeField(default=compute_default_valid_to)

    def __str__(self):
        return self.code


# item = Item.objects.get(slug='hello-world')
# temp = User.objects.get(username='rahulgpt')
# order = Cart.objects.filter(user=temp)
# <QuerySet [<Cart: rahulgpt>, <Cart: rahulgpt>]
# order.items.add(item)
