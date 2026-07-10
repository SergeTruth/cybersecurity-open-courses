window.COURSE_CODE_MODULE = {
  "title": "Code Example: Enforcing a Data Contract",
  "codeExamples": [
    {
      "title": "Code Example: Enforcing a Data Contract",
      "language": "python",
      "code": "from dataclasses import dataclass\nfrom decimal import Decimal, InvalidOperation\n\n\nclass ValidationError(ValueError):\n    pass\n\n\n@dataclass(frozen=True)\nclass OrderItem:\n    sku: str\n    quantity: int\n    price: Decimal\n\n\ndef parse_order_item(raw: dict) -> OrderItem:\n    sku = raw.get(\"sku\")\n    quantity = raw.get(\"quantity\")\n    price = raw.get(\"price\")\n\n    if not isinstance(sku, str) or not sku.isalnum() or len(sku) > 20:\n        raise ValidationError(\"sku must be alphanumeric and 20 characters or fewer\")\n\n    if not isinstance(quantity, int) or not 1 <= quantity <= 100:\n        raise ValidationError(\"quantity must be between 1 and 100\")\n\n    try:\n        parsed_price = Decimal(str(price))\n    except (InvalidOperation, ValueError):\n        raise ValidationError(\"price must be a decimal number\") from None\n\n    if parsed_price <= Decimal(\"0\") or parsed_price > Decimal(\"9999.99\"):\n        raise ValidationError(\"price is outside the allowed range\")\n\n    return OrderItem(sku=sku, quantity=quantity, price=parsed_price)\n\n\nitem = parse_order_item({\"sku\": \"ABC123\", \"quantity\": 2, \"price\": \"19.95\"})\nprint(item)"
    }
  ]
};
