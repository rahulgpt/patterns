from django.urls import path
from .views import (
    ItemListView,
    ItemDetailView,
    AddToCartView,
    OrderDetailView,
    PaymentView,
    AddCouponView,
    OrderItemDeleteView,
    PaymentListView,
    PaymentIntentView,
)

app_name = 'shop'

urlpatterns = [
    path('payment-intents/', PaymentIntentView.as_view(), name='payment-intent'),
    path('add-to-cart/', AddToCartView.as_view(), name='add-to-cart'),
    path('', ItemListView.as_view(), name='items-list'),
    path('<slug>/', ItemDetailView.as_view(), name='item-detail'),
    path('cart/order-summary/', OrderDetailView.as_view(), name='order-summary'),
    path('checkout/', PaymentView.as_view(), name='checkout'),
    path('add-coupon/', AddCouponView.as_view(), name='add-coupon'),
    path('order-items/<id>/delete/',
         OrderItemDeleteView.as_view(), name='order-item-delete'),
    path('payments/', PaymentListView.as_view(), name='payment-list'),
]
