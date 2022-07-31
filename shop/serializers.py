from rest_framework import serializers
from .models import (
    Item, Coupon, Payment, Order,
    OrderItem,
)


class ItemSerializer(serializers.ModelSerializer):
    image_width = serializers.SerializerMethodField()
    image_height = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = (
            'id',
            'title',
            'keyimage',
            'price',
            'discount_price',
            'slug',
            'image_width',
            'image_height'
        )

    def get_image_width(self, obj):
        return obj.get_image_width()

    def get_image_height(self, obj):
        return obj.get_image_height()


class ItemDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = (
            'id',
            'title',
            'keyimage',
            'subimage1',
            'subimage2',
            'price',
            'discount_price',
            'designed_by',
            'slug',
            'file_type',
            'category',
            'description',
        )

        extra_field_kwargs = {'url': {'lookup_field': 'slug'}}


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = (
            'id',
            'code',
            'discount_percent'
        )


class OrderItemSerializer(serializers.ModelSerializer):
    final_price = serializers.SerializerMethodField()
    item = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = (
            'id',
            'item',
            'final_price'
        )

    def get_final_price(self, obj):
        return obj.get_final_price()

    def get_item(self, obj):
        return ItemSerializer(obj.item).data

    extra_field_kwargs = {'url': {'lookup_field': 'slug'}}


class OrderSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()
    coupon = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = (
            'id',
            'order_items',
            'total',
            'coupon'
        )

    extra_field_kwargs = {'url': {'lookup_field': 'slug'}}

    def get_order_items(self, obj):
        return OrderItemSerializer(obj.items.all(), many=True).data

    def get_total(self, obj):
        return obj.get_total()

    def get_coupon(self, obj):
        if obj.coupon is not None:
            return CouponSerializer(obj.coupon).data
        return None


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = (
            'id',
            'amount',
            'timestamp'
        )
