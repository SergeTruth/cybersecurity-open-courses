window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Failure Handling, Logging, Testing, and Monitoring with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Fail closed on certificate errors",
      "language": "python",
      "blurb": "The boundary handles standard-library and Requests TLS failures with fixed categories and never retries with verification disabled; other clients require their own adapter.",
      "code": "import logging\nimport ssl\nfrom requests.exceptions import SSLError as RequestsSSLError\n\nlog = logging.getLogger(\"outbound_tls\")\n\ndef call_partner(operation):\n    try:\n        return operation()\n    except ssl.SSLCertVerificationError:\n        reason_category = \"stdlib_certificate_verification\"\n    except RequestsSSLError:\n        reason_category = \"requests_tls\"\n    log.warning(\"partner_tls_rejected\", extra={\"reason_category\": reason_category})\n    raise RuntimeError(\"partner connection could not be verified\") from None\n"
    },
    {
      "title": "Monitor certificate expiry safely",
      "language": "python",
      "blurb": "The probe accepts only an application-owned service identifier, connects to its pinned address, validates its expected hostname, and returns a structured expiry result.",
      "code": "from collections.abc import Callable\nfrom datetime import datetime, timezone\nimport socket\nimport ssl\nfrom types import MappingProxyType\n\ndef _expiry_probe_factory(\n    services: dict[str, tuple[str, str, int]],\n) -> Callable[[str], dict[str, str | int]]:\n    approved = MappingProxyType(dict(services))\n\n    def probe(service_id: str) -> dict[str, str | int]:\n        if not isinstance(service_id, str):\n            raise ValueError(\"approved service identifier required\")\n        try:\n            service_host, service_address, port = approved[service_id]\n        except KeyError as error:\n            raise ValueError(\"approved service identifier required\") from error\n        context = ssl.create_default_context()\n        with socket.create_connection((service_address, port), timeout=4) as raw:\n            with context.wrap_socket(raw, server_hostname=service_host) as tls:\n                expires = tls.getpeercert()[\"notAfter\"]\n        deadline = datetime.fromtimestamp(\n            ssl.cert_time_to_seconds(expires), timezone.utc\n        )\n        return {\"service\": service_id, \"host\": service_host, \"port\": port,\n                \"days_remaining\": (deadline - datetime.now(timezone.utc)).days}\n\n    return probe\n\ncertificate_expiry = _expiry_probe_factory({\n    \"partner-api\": (\"api.example.test\", \"192.0.2.20\", 443),\n})\ndel _expiry_probe_factory\n"
    }
  ]
};
