window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Response Validation and Safe Parsing with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Bound and strictly parse a JSON response",
      "language": "python",
      "blurb": "The client streams a size-limited body, requires JSON, and rejects non-finite numbers before schema validation.",
      "code": "import json\n\ndef unique_object(pairs):\n    value = {}\n    for key, item in pairs:\n        if key in value:\n            raise ValueError(f\"duplicate JSON field rejected: {key}\")\n        value[key] = item\n    return value\n\ndef read_json_response(response, maximum: int = 1_000_000):\n    response.raise_for_status()\n    media_type = response.headers.get(\"Content-Type\", \"\").split(\";\", 1)[0].lower()\n    if media_type != \"application/json\":\n        raise ValueError(\"unexpected response media type\")\n    chunks = bytearray()\n    for chunk in response.iter_content(64 * 1024):\n        chunks.extend(chunk)\n        if len(chunks) > maximum:\n            raise ValueError(\"response body is too large\")\n    return json.loads(\n        chunks.decode(\"utf-8\"),\n        object_pairs_hook=unique_object,\n        parse_constant=lambda token: (_ for _ in ()).throw(\n            ValueError(f\"non-finite JSON number rejected: {token}\")\n        ),\n    )\n"
    },
    {
      "title": "Validate an API response schema and value ranges",
      "language": "python",
      "blurb": "Exact fields, identifier syntax, amount bounds, and a tightly constrained HTTPS receipt URL are checked before use.",
      "code": "import re\nfrom urllib.parse import urlsplit\n\nINVOICE_ID = re.compile(r\"inv_[A-Za-z0-9]{1,60}\\Z\")\nRECEIPT_PATH = re.compile(r\"/receipts/[A-Za-z0-9_-]{1,80}\\Z\")\n\ndef validate_invoice(value: object) -> dict[str, object]:\n    if not isinstance(value, dict) or set(value) != {\"id\", \"amount_cents\", \"receipt_url\"}:\n        raise ValueError(\"invoice response schema mismatch\")\n    identifier = value[\"id\"]\n    amount = value[\"amount_cents\"]\n    receipt_url = value[\"receipt_url\"]\n    if not isinstance(identifier, str) or not INVOICE_ID.fullmatch(identifier):\n        raise ValueError(\"invoice identifier rejected\")\n    if type(amount) is not int or not 0 <= amount <= 100_000_000:\n        raise ValueError(\"invoice amount rejected\")\n    if not isinstance(receipt_url, str):\n        raise TypeError(\"receipt URL must be a string\")\n    receipt = urlsplit(receipt_url)\n    try:\n        port = receipt.port\n    except ValueError:\n        raise ValueError(\"receipt URL port rejected\") from None\n    if (\n        receipt.scheme != \"https\"\n        or receipt.hostname != \"receipts.example\"\n        or port not in {None, 443}\n        or receipt.username is not None\n        or receipt.password is not None\n        or not RECEIPT_PATH.fullmatch(receipt.path)\n        or receipt.query\n        or receipt.fragment\n    ):\n        raise ValueError(\"receipt URL destination rejected\")\n    return value\n"
    }
  ]
};
