window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Safe Request Construction through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Construct one approved API URL",
      "language": "python",
      "blurb": "The builder owns the authority and path, validates the identifier, and encodes one query mapping without accepting credentials, ports, fragments, or caller-supplied URL structure.",
      "code": "import re\nfrom urllib.parse import urlencode, urlunsplit\n\nRESOURCE_ID = re.compile(r\"[A-Za-z0-9_-]{1,40}\")\n\ndef account_lookup_url(resource_id: str) -> str:\n    if RESOURCE_ID.fullmatch(resource_id) is None:\n        raise ValueError(\"resource identifier rejected\")\n    query = urlencode({\"id\": resource_id}, doseq=False)\n    return urlunsplit((\"https\", \"api.example.com\", \"/v1/accounts/lookup\", query, \"\"))\n"
    },
    {
      "title": "Stream and strictly validate a bounded account response",
      "language": "python",
      "blurb": "The request buffers at most 32 KiB of streamed bytes, rejects duplicate JSON members and non-standard numbers, then enforces the exact account schema and values.",
      "code": "import json\nimport re\nfrom urllib.parse import urlencode, urlunsplit\n\nACCOUNT_ID = re.compile(r\"[A-Za-z0-9_-]{1,40}\")\nMAX_ACCOUNT_RESPONSE = 32_768\n\ndef account_lookup_url(resource_id: str) -> str:\n    if ACCOUNT_ID.fullmatch(resource_id) is None:\n        raise ValueError(\"account identifier rejected\")\n    return urlunsplit((\"https\", \"api.example.com\", \"/v1/accounts/lookup\", urlencode({\"id\": resource_id}), \"\"))\n\ndef unique_json_object(pairs: list[tuple[str, object]]) -> dict[str, object]:\n    result: dict[str, object] = {}\n    for key, value in pairs:\n        if key in result:\n            raise ValueError(\"duplicate account response member\")\n        result[key] = value\n    return result\n\ndef fetch_account(session, resource_id: str) -> dict[str, object]:\n    response = session.get(\n        account_lookup_url(resource_id),\n        allow_redirects=False,\n        timeout=(3.0, 8.0),\n        headers={\"Accept\": \"application/json\"},\n        stream=True,\n    )\n    try:\n        response.raise_for_status()\n        media_type = response.headers.get(\"Content-Type\", \"\").partition(\";\")[0].lower()\n        if media_type != \"application/json\":\n            raise ValueError(\"account response media type rejected\")\n        body = bytearray()\n        for chunk in response.iter_content(8192):\n            body.extend(chunk)\n            if len(body) > MAX_ACCOUNT_RESPONSE:\n                raise ValueError(\"account response exceeded its byte limit\")\n        document = json.loads(\n            body.decode(\"utf-8\"),\n            object_pairs_hook=unique_json_object,\n            parse_constant=lambda value: (_ for _ in ()).throw(ValueError(f\"invalid number {value}\")),\n        )\n        if not isinstance(document, dict) or set(document) != {\"id\", \"status\"}:\n            raise ValueError(\"account response schema rejected\")\n        if document[\"id\"] != resource_id or document[\"status\"] not in {\"active\", \"disabled\"}:\n            raise ValueError(\"account response value rejected\")\n        return document\n    finally:\n        response.close()\n"
    }
  ]
};
