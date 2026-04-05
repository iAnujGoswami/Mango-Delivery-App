from django.test import TestCase

from rest_framework import status
from rest_framework.test import APITestCase

from products.models import Product

from .models import Address, Order
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


class AddressAPITests(APITestCase):
    def test_create_address_marks_first_address_as_default(self):
        payload = {
            "profile_email": "anuj@example.com",
            "label": "Home",
            "receiver_name": "Anuj",
            "phone": "9876543210",
            "line1": "12 Mango Street",
            "line2": "",
            "city": "Pune",
            "state": "Maharashtra",
            "pincode": "411001",
            "is_default": False,
        }

        response = self.client.post("/api/addresses/", payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Address.objects.count(), 1)
        self.assertTrue(Address.objects.first().is_default)

    def test_setting_new_default_unsets_previous_default(self):
        first = Address.objects.create(
            profile_email="anuj@example.com",
            label="Home",
            receiver_name="Anuj",
            phone="9876543210",
            line1="12 Mango Street",
            city="Pune",
            state="Maharashtra",
            pincode="411001",
            is_default=True,
        )

        payload = {
            "profile_email": "anuj@example.com",
            "label": "Work",
            "receiver_name": "Anuj",
            "phone": "9876543210",
            "line1": "3 Office Road",
            "line2": "Floor 2",
            "city": "Pune",
            "state": "Maharashtra",
            "pincode": "411002",
            "is_default": True,
        }

        response = self.client.post("/api/addresses/", payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        first.refresh_from_db()
        self.assertFalse(first.is_default)
        self.assertEqual(Address.objects.filter(profile_email="anuj@example.com", is_default=True).count(), 1)

    def test_list_addresses_requires_email(self):
        response = self.client.get("/api/addresses/")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("profile_email", response.data)
