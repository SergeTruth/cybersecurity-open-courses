window.COURSE_CODE_MODULE = {
  "title": "Code Example: Enforcing a Data Contract",
  "codeExamples": [
    {
      "title": "Code Example: Enforcing a Data Contract",
      "language": "python",
      "code": String.raw`import re
from dataclasses import dataclass
from decimal import Decimal, InvalidOperation


class ValidationError(ValueError):
    pass


@dataclass(frozen=True)
class OrderItem:
    sku: str
    quantity: int
    price: Decimal


SKU_PATTERN = re.compile(r"[A-Za-z0-9]{1,20}", flags=re.ASCII)
PRICE_PATTERN = re.compile(
    r"(?:0|[1-9][0-9]{0,3})(?:\.[0-9]{1,2})?", flags=re.ASCII
)


def parse_order_item(raw: object) -> OrderItem:
    required_fields = {"sku", "quantity", "price"}
    if type(raw) is not dict or set(raw) != required_fields:
        raise ValidationError("order item fields are invalid")

    sku = raw["sku"]
    quantity = raw["quantity"]
    price = raw["price"]

    if type(sku) is not str or SKU_PATTERN.fullmatch(sku) is None:
        raise ValidationError("sku must be 1 to 20 ASCII letters or digits")
    if type(quantity) is not int:
        raise ValidationError("quantity must be an integer")
    if not 1 <= quantity <= 100:
        raise ValidationError("quantity must be between 1 and 100")
    if type(price) is not str or PRICE_PATTERN.fullmatch(price) is None:
        raise ValidationError("price must have at most two decimal places")

    try:
        parsed_price = Decimal(price)
    except InvalidOperation:
        raise ValidationError("price must be a decimal number") from None
    if not parsed_price.is_finite():
        raise ValidationError("price must be finite")
    if parsed_price <= Decimal("0") or parsed_price > Decimal("9999.99"):
        raise ValidationError("price is outside the allowed range")

    return OrderItem(sku=sku, quantity=quantity, price=parsed_price)


item = parse_order_item({"sku": "ABC123", "quantity": 2, "price": "19.95"})
print(item)
`
    }
  ]
};
