window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Secure TLS for Python HTTP Clients through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Use a verified TLS context in an HTTPX client",
      "language": "python",
      "blurb": "The same context carrying the CA and protocol policy is passed to the HTTPX transport with bounded pools, timeouts, redirects, and ambient proxy inheritance.",
      "code": "import ssl\nimport httpx\n\ndef inventory_http_client(ca_file: str) -> httpx.Client:\n    context = ssl.create_default_context(cafile=ca_file)\n    context.minimum_version = ssl.TLSVersion.TLSv1_2\n    return httpx.Client(\n        base_url=\"https://inventory.internal.example\",\n        verify=context,\n        timeout=httpx.Timeout(8.0, connect=3.0),\n        limits=httpx.Limits(max_connections=8, max_keepalive_connections=4),\n        follow_redirects=False,\n        trust_env=False,\n    )\n"
    },
    {
      "title": "Map inventory requests to one canonical item route",
      "language": "python",
      "blurb": "The client validates the full HTTPS authority, decodes and validates exactly one item identifier segment, reconstructs the canonical route, and rejects queries, fragments, redirects, and dot-segment bypasses.",
      "code": "import re\nfrom urllib.parse import quote, unquote, urlsplit, urlunsplit\n\nITEM_ID = re.compile(r\"[A-Za-z0-9_-]{1,64}\")\n\ndef get_inventory_document(session, url: str):\n    target = urlsplit(url)\n    try:\n        port = target.port\n    except ValueError as error:\n        raise ValueError(\"inventory URL rejected\") from error\n    if (\n        target.scheme != \"https\" or target.hostname != \"inventory.internal.example\"\n        or port not in {None, 443} or target.username is not None or target.password is not None\n        or target.query or target.fragment\n    ):\n        raise ValueError(\"inventory authority rejected\")\n    parts = target.path.split(\"/\")\n    if len(parts) != 4 or parts[:3] != [\"\", \"v1\", \"items\"]:\n        raise ValueError(\"inventory route rejected\")\n    item_id = unquote(parts[3])\n    if ITEM_ID.fullmatch(item_id) is None:\n        raise ValueError(\"inventory item identifier rejected\")\n    canonical = urlunsplit((\"https\", \"inventory.internal.example\", \"/v1/items/\" + quote(item_id, safe=\"\"), \"\", \"\"))\n    return session.get(canonical, allow_redirects=False, timeout=(3, 8), headers={\"Accept\": \"application/json\"})\n"
    }
  ]
};
