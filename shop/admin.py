from django.contrib import admin
from .models import Item, OrderItem, Order, Payment, Coupon, Category


class ItemAdmin(admin.ModelAdmin):
    fields = [
        'title',
        'keyimage',
        'subimage1',
        'subimage2',
        'price',
        'discount_price',
        'designed_by',
        'file_type',
        'category',
        'slug',
        'description',
        'date_uploaded',
        'date_modified',
    ]

    list_display = ('title', 'price', 'date_uploaded', 'date_modified')

    readonly_fields = ['date_uploaded', 'date_modified']

    prepopulated_fields = {'slug': ('title',)}

    class Meta:
        model = Item


class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('item', 'user', 'ordered')


class OrderAdmin(admin.ModelAdmin):
    current_user_for_formfield = None

    def get_form(self, request, obj=None, **kwargs):
        if obj:
            self.current_user_for_formfield = obj.user
        return super(OrderAdmin, self).get_form(request, obj, **kwargs)

    def formfield_for_manytomany(self, db_field, request, **kwargs):
        if db_field.name == 'items':
            kwargs['queryset'] = OrderItem.objects.filter(
                user=self.current_user_for_formfield)
        return super(OrderAdmin, self).formfield_for_manytomany(db_field, request, **kwargs)


class CouponAdmin(admin.ModelAdmin):
    fields = [
        'code',
        'discount_percent',
        'valid_from',
        'valid_to'
    ]

    readonly_fields = ['valid_from']

    list_display = ('code', 'discount_percent', 'valid_to')


admin.site.register(Item, ItemAdmin)
admin.site.register(Category)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(Payment)
admin.site.register(Coupon, CouponAdmin)
