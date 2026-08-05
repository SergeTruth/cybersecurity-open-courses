window.COURSE_CODE_MODULE = {
  "title": "Code Example: Enforcing a Data Contract",
  "codeExamples": [
    {
      "title": "Code Example: Enforcing a Data Contract",
      "language": "python",
      "code": String.raw`import re
from dataclasses import dataclass
from decimal import Decimal
from types import MappingProxyType


class ValidationError(ValueError):
    pass


@dataclass(frozen=True)
class OrderItem:
    sku: str
    quantity: int
    unit_price: Decimal


SKU_PATTERN = re.compile(r"[A-Za-z0-9]{1,20}", flags=re.ASCII)
CATALOG_PRICES = MappingProxyType(
    {
        "ABC123": Decimal("19.95"),
        "EXPENSIVE": Decimal("4999.00"),
    }
)


def parse_order_item(raw: object) -> OrderItem:
    # The client selects a SKU and quantity; it never supplies the price.
    required_fields = {"sku", "quantity"}
    if type(raw) is not dict or set(raw) != required_fields:
        raise ValidationError("order item fields are invalid")

    sku = raw["sku"]
    quantity = raw["quantity"]

    if type(sku) is not str or SKU_PATTERN.fullmatch(sku) is None:
        raise ValidationError("sku must be 1 to 20 ASCII letters or digits")
    if type(quantity) is not int:
        raise ValidationError("quantity must be an integer")
    if not 1 <= quantity <= 100:
        raise ValidationError("quantity must be between 1 and 100")
    try:
        unit_price = CATALOG_PRICES[sku]
    except KeyError:
        raise ValidationError("sku is not in the product catalog") from None

    # Production code obtains this value from an application-owned catalog service.
    if not unit_price.is_finite() or unit_price <= Decimal("0"):
        raise RuntimeError("trusted catalog contains an invalid price")
    return OrderItem(sku=sku, quantity=quantity, unit_price=unit_price)


item = parse_order_item({"sku": "ABC123", "quantity": 2})
print(item)
`
    }
  ]
};
