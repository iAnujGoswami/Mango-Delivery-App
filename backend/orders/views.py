from rest_framework import generics, status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from .models import Address, Order
from .serializers import AddressSerializer, OrderCreateSerializer, OrderSerializer


class OrderCreateAPIView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        order = Order.objects.prefetch_related("items", "items__product").get(pk=order.pk)
        response_data = {
            "message": "Order placed successfully.",
            "order": OrderSerializer(order).data,
            "order_id": order.id,
        }
        headers = self.get_success_headers({"id": order.id})
        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)


class AddressListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = AddressSerializer

    def get_profile_email(self):
        if self.request.method == "GET":
            email = self.request.query_params.get("email", "")
        else:
            email = self.request.data.get("profile_email", "")

        normalized = str(email).strip().lower()
        if not normalized:
            raise ValidationError({"profile_email": ["Profile email is required."]})
        return normalized

    def get_queryset(self):
        return Address.objects.filter(profile_email=self.get_profile_email())

    def perform_create(self, serializer):
        serializer.save(profile_email=self.get_profile_email())


class AddressDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AddressSerializer
    queryset = Address.objects.all()

    def get_profile_email(self):
        email = self.request.query_params.get("email", "")
        if self.request.method in {"PUT", "PATCH"} and not email:
            email = self.request.data.get("profile_email", "")

        normalized = str(email).strip().lower()
        if not normalized:
            raise ValidationError({"profile_email": ["Profile email is required."]})
        return normalized

    def get_queryset(self):
        return Address.objects.filter(profile_email=self.get_profile_email())

    def perform_update(self, serializer):
        serializer.save(profile_email=self.get_profile_email())

    def perform_destroy(self, instance):
        profile_email = instance.profile_email
        was_default = instance.is_default
        instance.delete()

        if was_default:
            replacement = Address.objects.filter(profile_email=profile_email).order_by("-updated_at").first()
            if replacement:
                replacement.is_default = True
                replacement.save(update_fields=["is_default", "updated_at"])
