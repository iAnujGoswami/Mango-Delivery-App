from decimal import Decimal

from rest_framework import serializers

from products.models import Product

from .models import Order, OrderItem


class OrderItemInputSerializer(serializers.Serializer):
    product_id = serializers.IntegerField(min_value=1)
    quantity = serializers.IntegerField(min_value=1)


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)

    class Meta:
        model = OrderItem
        fields = ("id", "product", "product_name", "quantity", "price")


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = (
            "id",
            "customer_name",
            "customer_email",
            "phone",
            "address",
            "city",
            "state",
            "pincode",
            "total_amount",
            "status",
            "created_at",
            "items",
        )


class OrderCreateSerializer(serializers.Serializer):
    customer_name = serializers.CharField(max_length=200)
    customer_email = serializers.EmailField()
    phone = serializers.CharField(max_length=20)
    address = serializers.CharField()
    city = serializers.CharField(max_length=100)
    state = serializers.CharField(max_length=100)
    pincode = serializers.CharField(max_length=20)
    items = OrderItemInputSerializer(many=True)

    def validate_items(self, value):
        if not value:
            raise serializers.ValidationError("At least one item is required.")
        return value

    def create(self, validated_data):
        items_data = validated_data.pop("items")
        product_ids = [item["product_id"] for item in items_data]
        products = Product.objects.filter(id__in=product_ids, is_active=True)
        product_map = {product.id: product for product in products}

        missing_ids = [str(product_id) for product_id in product_ids if product_id not in product_map]
        if missing_ids:
            raise serializers.ValidationError(
                {"items": [f"Invalid or inactive product ids: {', '.join(missing_ids)}"]}
            )

        total_amount = Decimal("0.00")
        order_items = []

        for item_data in items_data:
            product = product_map[item_data["product_id"]]
            quantity = item_data["quantity"]
            item_price = product.price
            total_amount += item_price * quantity
            order_items.append(
                OrderItem(
                    product=product,
                    quantity=quantity,
                    price=item_price,
                )
            )

        order = Order.objects.create(total_amount=total_amount, **validated_data)

        for order_item in order_items:
            order_item.order = order

        OrderItem.objects.bulk_create(order_items)
        return order
