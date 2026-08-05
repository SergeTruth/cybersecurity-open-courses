window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Safe Request Construction and Data Minimization with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Construct a request from fixed URL components",
      "language": "python",
      "blurb": "The endpoint path is application-owned and user data becomes an encoded query parameter rather than URL structure.",
      "code": "import re\nfrom urllib.parse import urlencode\n\nAPI_ORIGIN = \"https://inventory.example\"\nPRODUCT_ID = re.compile(r\"SKU_[A-Za-z0-9_-]{1,60}\\Z\")\n\ndef product_lookup_url(product_id: str) -> str:\n    if not isinstance(product_id, str) or not PRODUCT_ID.fullmatch(product_id):\n        raise ValueError(\"product identifier rejected\")\n    return f\"{API_ORIGIN}/v2/products?{urlencode({'id': product_id})}\"\n"
    },
    {
      "title": "Minimize an outbound customer payload",
      "language": "python",
      "blurb": "An explicit projection sends only contract fields and excludes internal notes, credentials, and unrelated profile data.",
      "code": "import re\n\nORDER_ID = re.compile(r\"ord_[A-Za-z0-9_-]{1,60}\\Z\")\nCOUNTRY_CODE = re.compile(r\"[A-Z]{2}\\Z\")\nPOSTAL_CODE = re.compile(r\"[A-Za-z0-9][A-Za-z0-9 -]{0,19}\\Z\")\n\ndef read_shipping_fields(order):\n    try:\n        address = getattr(order, \"shipping_address\", None)\n        order_id = getattr(order, \"public_id\", None)\n        country = getattr(address, \"country_code\", None)\n        postal_code = getattr(address, \"postal_code\", None)\n        parcel_count = getattr(order, \"parcel_count\", None)\n    except Exception:\n        raise ValueError(\"shipping payload source rejected\") from None\n    return order_id, country, postal_code, parcel_count\n\ndef shipping_payload(order) -> dict[str, object]:\n    order_id, country, postal_code, parcel_count = read_shipping_fields(order)\n\n    if not isinstance(order_id, str) or not ORDER_ID.fullmatch(order_id):\n        raise ValueError(\"order identifier rejected\")\n    if not isinstance(country, str) or not COUNTRY_CODE.fullmatch(country):\n        raise ValueError(\"country code rejected\")\n    if not isinstance(postal_code, str) or not POSTAL_CODE.fullmatch(postal_code):\n        raise ValueError(\"postal code rejected\")\n    if type(parcel_count) is not int or not 1 <= parcel_count <= 100:\n        raise ValueError(\"parcel count rejected\")\n\n    return {\n        \"order_id\": order_id,\n        \"destination\": {\n            \"country\": country,\n            \"postal_code\": postal_code,\n        },\n        \"parcel_count\": parcel_count,\n    }\n"
    }
  ]
};
