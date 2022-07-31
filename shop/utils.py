import string
from django.utils.text import slugify
import random


def random_string_generator(size=10, char=string.ascii_lowercase + string.digits):
    return ''.join(random.choice(char) for _ in range(size))


def unique_slug_generator(instance, new_slug=None):
    if new_slug is not None:
        slug = new_slug
    else:
        slug = slugify(instance.title)
    instance_class = instance.__class__
    qs_exists = instance_class.objects.filter(slug=slug).exists()

    if qs_exists:
        rnd_str = random_string_generator(size=5)
        new_slug = f'{slug}-{rnd_str}'
        return unique_slug_generator(instance, new_slug=new_slug)
    return slug
