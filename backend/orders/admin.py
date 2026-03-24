from django.contrib import admin

from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ("product", "quantity", "price")
    can_delete = False

    def has_add_permission(self, request, obj=None):
        return False


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "customer_name",
        "customer_email",
        "phone",
        "total_amount",
        "status",
        "created_at",
    )
    list_editable = ("status",)
    list_filter = ("status", "created_at", "state", "city")
    search_fields = ("customer_name", "customer_email", "phone", "pincode")
    readonly_fields = ("total_amount", "created_at")
    fieldsets = (
        (
            "Customer Details",
            {
                "fields": (
                    "customer_name",
                    "customer_email",
                    "phone",
                )
            },
        ),
        (
            "Delivery Address",
            {
                "fields": (
                    "address",
                    "city",
                    "state",
                    "pincode",
                )
            },
        ),
        (
            "Order Details",
            {
                "fields": (
                    "total_amount",
                    "status",
                    "created_at",
                )
            },
        ),
    )
    inlines = [OrderItemInline]


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("id", "order", "product", "quantity", "price")
    list_filter = ("product",)
    search_fields = ("order__id", "product__name")
    readonly_fields = ("order", "product", "quantity", "price")
