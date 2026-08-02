window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Storage, Logging, Privacy, and Testing with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Serialize only public profile fields",
      "language": "python",
      "blurb": "An explicit response projection excludes credentials, recovery data, internal notes, and other fields carried by the domain object.",
      "code": "def public_profile(user) -> dict[str, object]:\n    return {\n        \"id\": str(user.public_id),\n        \"display_name\": user.display_name,\n        \"avatar_url\": user.avatar_url,\n        \"joined_at\": user.created_at.isoformat(),\n    }\n"
    },
    {
      "title": "Fuzz a self-contained order deserialization boundary",
      "language": "python",
      "blurb": "The listing defines the exact order schema before fuzzing it, so arbitrary bytes either produce that validated shape or one of the documented parse failures.",
      "code": "import json\nimport re\nfrom hypothesis import given, strategies as st\n\nORDER_ID = re.compile(r\"ord-[A-Za-z0-9]{8,32}\")\n\ndef validate_order(value: object) -> dict[str, object]:\n    if not isinstance(value, dict) or set(value) != {\"order_id\", \"quantity\"}:\n        raise ValueError(\"order shape rejected\")\n    order_id = value[\"order_id\"]\n    quantity = value[\"quantity\"]\n    if not isinstance(order_id, str) or ORDER_ID.fullmatch(order_id) is None:\n        raise ValueError(\"order identifier rejected\")\n    if type(quantity) is not int or not 1 <= quantity <= 100:\n        raise ValueError(\"order quantity rejected\")\n    return {\"order_id\": order_id, \"quantity\": quantity}\n\n@given(st.binary(max_size=4096))\ndef test_arbitrary_bytes_never_bypass_validation(raw: bytes):\n    try:\n        decoded = json.loads(raw.decode(\"utf-8\"))\n        result = validate_order(decoded)\n    except (UnicodeDecodeError, json.JSONDecodeError, TypeError, ValueError):\n        return\n    assert set(result) == {\"order_id\", \"quantity\"}\n"
    }
  ]
};
