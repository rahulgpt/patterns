from .models import Item
from django.db.models.signals import pre_save
from .utils import unique_slug_generator, random_string_generator
from django.dispatch import receiver


@receiver(pre_save, sender=Item)
def pre_save_receiver(sender, instance, *args, **kwargs):
    instance.slug = unique_slug_generator(instance)


#pre_save.connect(pre_save_receiver, sender=Item)
