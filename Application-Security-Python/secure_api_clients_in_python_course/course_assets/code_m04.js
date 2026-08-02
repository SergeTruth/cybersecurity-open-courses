window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Safe Request Construction and Data Minimization with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Construct a request from fixed URL components",
      "language": "python",
      "blurb": "The endpoint path is application-owned and user data becomes an encoded query parameter rather than URL structure.",
      "code": "from urllib.parse import urlencode\n\nAPI_ORIGIN = \"https://inventory.example\"\n\ndef product_lookup_url(product_id: str) -> str:\n    if not 1 <= len(product_id) <= 64:\n        raise ValueError(\"product identifier length rejected\")\n    return f\"{API_ORIGIN}/v2/products?{urlencode({'id': product_id})}\"\n"
    },
    {
      "title": "Minimize an outbound customer payload",
      "language": "python",
      "blurb": "An explicit projection sends only contract fields and excludes internal notes, credentials, and unrelated profile data.",
      "code": "def shipping_payload(order) -> dict[str, object]:\n    return {\n        \"order_id\": str(order.public_id),\n        \"destination\": {\n            \"country\": order.shipping_address.country_code,\n            \"postal_code\": order.shipping_address.postal_code,\n        },\n        \"parcel_count\": order.parcel_count,\n    }\n"
    }
  ]
};
