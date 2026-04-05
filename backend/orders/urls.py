from django.urls import path

from .views import AddressDetailAPIView, AddressListCreateAPIView, OrderCreateAPIView


urlpatterns = [
    path("addresses/", AddressListCreateAPIView.as_view(), name="address-list-create"),
    path("addresses/<int:pk>/", AddressDetailAPIView.as_view(), name="address-detail"),
    path("orders/", OrderCreateAPIView.as_view(), name="order-create"),
]
