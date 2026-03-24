from django.test import TestCase

from rest_framework import status
from rest_framework.test import APITestCase

from products.models import Product

from .models import Order
from .serializers import OrderCreateSerializer


class OrderCreateSerializerTests(TestCase):
    def setUp(self):
        self.product = Product.objects.create(
            name="Alphonso Mango",
            description="Premium mangoes",
            price="250.00",
            stock=10,
            category="Mango",
            is_active=True,
        )

    def test_serializer_creates_order_and_items_with_backend_total(self):
        serializer = OrderCreateSerializer(
            data={
                "customer_name": "Anuj",
                "customer_email": "anuj@example.com",
                "phone": "9876543210",
                "address": "12 Mango Street",
                "city": "Pune",
                "state": "Maharashtra",
                "pincode": "411001",
                "items": [
                    {"product_id": self.product.id, "quantity": 2},
                ],
            }
        )

        self.assertTrue(serializer.is_valid(), serializer.errors)
        order = serializer.save()

        self.assertEqual(Order.objects.count(), 1)
        self.assertEqual(order.items.count(), 1)
        self.assertEqual(str(order.total_amount), "500.00")
        self.assertEqual(str(order.items.first().price), "250.00")

    def test_serializer_rejects_inactive_products(self):
        self.product.is_active = False
        self.product.save(update_fields=["is_active"])

        serializer = OrderCreateSerializer(
            data={
                "customer_name": "Anuj",
                "customer_email": "anuj@example.com",
                "phone": "9876543210",
                "address": "12 Mango Street",
                "city": "Pune",
                "state": "Maharashtra",
                "pincode": "411001",
                "items": [
                    {"product_id": self.product.id, "quantity": 1},
                ],
            }
        )

        self.assertTrue(serializer.is_valid(), serializer.errors)

        with self.assertRaisesMessage(Exception, "Invalid or inactive product ids"):
            serializer.save()


class OrderCreateAPITests(APITestCase):
    def setUp(self):
        self.product = Product.objects.create(
            name="Kesar Mango",
            description="Sweet mangoes",
            price="300.00",
            stock=8,
            category="Mango",
            is_active=True,
        )

    def test_post_orders_creates_order_and_returns_order_id(self):
        payload = {
            "customer_name": "Anuj",
            "customer_email": "anuj@example.com",
            "phone": "9876543210",
            "address": "12 Mango Street",
            "city": "Pune",
            "state": "Maharashtra",
            "pincode": "411001",
            "items": [
                {"product_id": self.product.id, "quantity": 2},
            ],
        }

        response = self.client.post("/api/orders/", payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Order.objects.count(), 1)
        self.assertEqual(response.data["message"], "Order placed successfully.")
        self.assertEqual(response.data["order_id"], Order.objects.first().id)
        self.assertEqual(response.data["order"]["total_amount"], "600.00")
