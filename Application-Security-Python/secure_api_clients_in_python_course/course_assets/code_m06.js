window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Pagination, Rate Limits, Retries, and Idempotency with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Bound cursor pagination",
      "language": "python",
      "blurb": "The iterator limits pages and records, rejects repeated cursors, and validates every page before yielding items.",
      "code": "def iter_accounts(fetch_page, maximum_pages: int = 20, maximum_records: int = 2_000):\n    cursor = None\n    seen = set()\n    emitted = 0\n    for _ in range(maximum_pages):\n        page = fetch_page(cursor=cursor, limit=100)\n        for account in page.items:\n            emitted += 1\n            if emitted > maximum_records:\n                raise ValueError(\"pagination record budget exceeded\")\n            yield account\n        cursor = page.next_cursor\n        if cursor is None:\n            return\n        if cursor in seen:\n            raise ValueError(\"pagination cursor repeated\")\n        seen.add(cursor)\n    raise ValueError(\"pagination page budget exceeded\")\n"
    },
    {
      "title": "Retry only bounded transient failures",
      "language": "python",
      "blurb": "Each abandoned transient response is closed before a bounded delay; only the final non-retried response remains caller-owned.",
      "code": "from time import sleep\n\ndef get_with_retry(session, url: str):\n    transient = {429, 502, 503, 504}\n    for attempt in range(3):\n        response = session.get(url, timeout=(3, 8), allow_redirects=False)\n        if response.status_code not in transient:\n            return response\n        header = response.headers.get(\"Retry-After\", \"\")\n        delay = min(int(header), 5) if header.isdecimal() else 2 ** attempt\n        response.close()\n        if attempt < 2:\n            sleep(delay)\n    raise RuntimeError(\"API retry budget exhausted\")\n"
    }
  ]
};
