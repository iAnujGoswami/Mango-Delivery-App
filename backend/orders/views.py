from rest_framework import generics, status
from rest_framework.response import Response

from .models import Order
from .serializers import OrderCreateSerializer, OrderSerializer


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
