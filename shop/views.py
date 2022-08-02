from django.http import Http404
from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from django.utils import timezone
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.generics import (
    ListAPIView, RetrieveAPIView, CreateAPIView,
    UpdateAPIView, DestroyAPIView
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from .models import (
    Item, OrderItem, Order,
    Payment, Coupon, UserProfile)
from .serializers import (
    ItemSerializer, ItemDetailSerializer, OrderItemSerializer,
    OrderSerializer, PaymentSerializer
)
import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY


class ItemListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ItemSerializer
    queryset = Item.objects.all().order_by('-date_uploaded')


class ItemDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = ItemDetailSerializer
    lookup_field = 'slug'
    queryset = Item.objects.all()


class OrderItemDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = OrderItem.objects.all()
    lookup_field = 'id'


class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        slug = request.data.get('slug', None)
        if slug is None:
            return Response({
                'errormessage': 'Invalid request',
                'message': 'Please provide a valid slug'
            }, status=HTTP_400_BAD_REQUEST)

        item = get_object_or_404(Item, slug=slug)

        order_item_qs = OrderItem.objects.filter(
            item=item,
            user=request.user,
            ordered=False
        )

        if order_item_qs.exists():
            order_item = order_item_qs[0]
        else:
            order_item = OrderItem.objects.create(
                item=item,
                user=request.user,
                ordered=False
            )
            order_item.save()

        order_qs = Order.objects.filter(user=request.user, ordered=False)

        if order_qs.exists():
            order = order_qs[0]
            if not order.items.filter(item__slug=order_item.item.slug).exists():
                order.items.add(order_item)
                return Response({'message': f'Successfully added {item.title} to your cart'}, status=HTTP_200_OK)
            else:
                return Response(
                    {'errormessage': f'Item is already in your cart'},
                    status=HTTP_400_BAD_REQUEST
                )
        else:
            ordered_date = timezone.now()
            order = Order.objects.create(
                user=request.user,
                ordered_date=ordered_date,
            )
            order.items.add(order_item)
            return Response({'message': 'Added to Cart', 'slug': slug}, status=HTTP_200_OK)


class OrderDetailView(RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        try:
            order = Order.objects.get(user=self.request.user, ordered=False)
            return order
        except ObjectDoesNotExist:
            raise Http404('Your Cart is Empty')


class AddCouponView(APIView):
    def post(self, request, *args, **kwargs):
        code = request.data.get('code', None)
        if code is None:
            return Response({'message': 'Invalid data received'}, status=HTTP_400_BAD_REQUEST)
        order = Order.objects.get(user=self.request.user, ordered=False)
        coupon = get_object_or_404(Coupon, code=code)
        order.coupon = coupon
        order.save()
        return Response(status=HTTP_200_OK)


class PaymentListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PaymentSerializer

    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)


class PaymentIntentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            amount = request.data.get('amount')

            if not amount:
                Response({'message': 'amount is not there!'},
                         status=HTTP_400_BAD_REQUEST)

            payment_intent = stripe.PaymentIntent.create(
                amount=amount * 100,
                currency='usd',
                description='Some Product',
                shipping={
                    'name': 'Jenny Rosen',
                    'address': {
                        'line1': '510 Townsend St',
                        'postal_code': '98140',
                        'city': 'San Francisco',
                        'state': 'CA',
                        'country': 'US',
                    },
                },
            )

            return Response({'clientSecret': payment_intent.client_secret})

        except Exception as e:
            print(e)
            return Response({'message': 'hello World'}, status=HTTP_400_BAD_REQUEST)


class PaymentView(APIView):
    def post(self, request, *args, **kwargs):
        order = Order.objects.get(user=self.request.user, ordered=False)
        userprofile = UserProfile.objects.get(user=self.request.user)
        token = request.data.get('stripeToken')

        if userprofile.stripe_customer_id != '' and userprofile.stripe_customer_id is not None:
            customer = stripe.Customer.retrieve(
                userprofile.stripe_customer_id
            )
            customer.sources.create(source=token)
        else:
            customer = stripe.Customer.create(
                email=self.request.user.email
            )
            customer.sources.create(source=token)
            userprofile.stripe_customer_id = customer['id']
            userprofile.save()

        amount = int(order.get_total() * 100)

        try:
            # charge the customer becoz we cannot charge the token more than once
            charge = stripe.Charge.create(
                amount=amount,  # cents
                currency='usd',
                customer=userprofile.stripe_customer_id
            )

            payment = Payment()
            payment.stripe_charge_id = charge['id']
            payment.user = self.request.user
            payment.amount = order.get_total()
            payment.save()

            # assign the payment to the order

            order_items = order.items.all()
            order.items.update(ordered=True)
            for item in order_items:
                item.save()

            order.ordered = True
            order.payment = payment
            # order.ref_code = create_ref_code()
            order.save()

            return Response(status=HTTP_200_OK)

        except stripe.error.CardError as e:
            body = e.json_body
            err = body.get('error', {})
            return Response({"message": f"{err.get('message')}"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.RateLimitError as e:
            # Too many requests made to the API too quickly
            # messages.warning(self.request, "Rate limit error")
            return Response({"message": "Rate limit error"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.InvalidRequestError as e:
            print(e)
            # Invalid parameters were supplied to Stripe's API
            return Response({"message": "Invalid parameters"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.AuthenticationError as e:
            # Authentication with Stripe's API failed
            # (maybe you changed API keys recently)
            return Response({"message": "Not authenticated"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.APIConnectionError as e:
            # Network communication with Stripe failed
            return Response({"message": "Network error"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.StripeError as e:
            # Display a very generic error to the user, and maybe send
            # yourself an email
            return Response({"message": "Something went wrong. You were not charged. Please try again."}, status=HTTP_400_BAD_REQUEST)

        except Exception as e:
            # send an email to ourselves
            return Response({"message": "A serious error occurred. We have been notifed."}, status=HTTP_400_BAD_REQUEST)

        return Response({"message": "Invalid data received"}, status=HTTP_400_BAD_REQUEST)

