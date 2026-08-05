window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply TLS, Certificates, and Transport Validation through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Use a verified TLS context in an HTTPS connection",
      "language": "python",
      "blurb": "The configured context is passed to the actual transport, which connects only to the expected hostname and enforces a minimum TLS version.",
      "code": "import http.client\nimport ssl\n\ndef open_api_connection(ca_file: str) -> http.client.HTTPSConnection:\n    context = ssl.create_default_context(cafile=ca_file)\n    context.minimum_version = ssl.TLSVersion.TLSv1_2\n    context.check_hostname = True\n    context.verify_mode = ssl.CERT_REQUIRED\n    return http.client.HTTPSConnection(\n        \"api.example.com\",\n        port=443,\n        timeout=5,\n        context=context,\n    )\n"
    },
    {
      "title": "Apply deliberate TLS policy to direct and proxy connections",
      "language": "python",
      "blurb": "The adapter supplies the verified context to destination and HTTPS-proxy TLS, disables inherited proxy discovery, and the returned session refuses non-HTTPS requests.",
      "code": "import ssl\nimport requests\nfrom requests.adapters import HTTPAdapter\n\nclass HTTPSOnlySession(requests.Session):\n    def request(self, method, url, **kwargs):\n        if not isinstance(url, str) or not url.startswith(\"https://\"):\n            raise ValueError(\"HTTPS URL required\")\n        return super().request(method, url, **kwargs)\n\nclass TLSContextAdapter(HTTPAdapter):\n    def __init__(self, destination_context: ssl.SSLContext, proxy_context: ssl.SSLContext):\n        self.destination_context = destination_context\n        self.proxy_context = proxy_context\n        super().__init__()\n\n    def init_poolmanager(self, connections, maxsize, block=False, **kwargs):\n        kwargs[\"ssl_context\"] = self.destination_context\n        return super().init_poolmanager(connections, maxsize, block=block, **kwargs)\n\n    def proxy_manager_for(self, proxy, **proxy_kwargs):\n        proxy_kwargs[\"ssl_context\"] = self.destination_context\n        proxy_kwargs[\"proxy_ssl_context\"] = self.proxy_context\n        return super().proxy_manager_for(proxy, **proxy_kwargs)\n\ndef verified_session(destination_ca: str, proxy_ca: str) -> requests.Session:\n    destination_context = ssl.create_default_context(cafile=destination_ca)\n    destination_context.minimum_version = ssl.TLSVersion.TLSv1_2\n    proxy_context = ssl.create_default_context(cafile=proxy_ca)\n    proxy_context.minimum_version = ssl.TLSVersion.TLSv1_2\n    session = HTTPSOnlySession()\n    session.trust_env = False\n    session.adapters.pop(\"http://\", None)\n    session.mount(\"https://\", TLSContextAdapter(destination_context, proxy_context))\n    return session\n"
    }
  ]
};
