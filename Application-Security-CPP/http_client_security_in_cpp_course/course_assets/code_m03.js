window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Configure a concrete libcurl handle with hostname and peer verification, an approved trust store, and a minimum TLS version of 1.3.",
  "codeExamples": [
    {
      "title": "Configure a libcurl easy handle with a closed TLS policy",
      "language": "cpp",
      "blurb": "The adapter sets an exact URL, peer and hostname checks, trust store, minimum TLS 1.3, proxy behavior, and redirect behavior on the client handle.",
      "code": "#include <curl/curl.h>\n#include <memory>\n\nclass CurlHandle {\npublic:\n    CurlHandle() : handle_(::curl_easy_init()) {}\n    ~CurlHandle() noexcept {\n        if (handle_) ::curl_easy_cleanup(handle_);\n    }\n    CurlHandle(const CurlHandle&) = delete;\n    CurlHandle& operator=(const CurlHandle&) = delete;\n    CURL* get() const noexcept { return handle_; }\nprivate:\n    CURL* handle_;\n};\n\nbool configure_orders_transport(CURL* handle) {\n    if (!handle) return false;\n    return ::curl_easy_setopt(\n               handle, CURLOPT_URL, \"https://api.example.com/v1/orders\"\n           ) == CURLE_OK &&\n           ::curl_easy_setopt(handle, CURLOPT_SSL_VERIFYPEER, 1L) == CURLE_OK &&\n           ::curl_easy_setopt(handle, CURLOPT_SSL_VERIFYHOST, 2L) == CURLE_OK &&\n           ::curl_easy_setopt(\n               handle, CURLOPT_SSLVERSION, CURL_SSLVERSION_TLSv1_3\n           ) == CURLE_OK &&\n           ::curl_easy_setopt(\n               handle, CURLOPT_CAINFO, \"/etc/orders/trust.pem\"\n           ) == CURLE_OK &&\n           ::curl_easy_setopt(handle, CURLOPT_PROXY, \"\") == CURLE_OK &&\n           ::curl_easy_setopt(handle, CURLOPT_FOLLOWLOCATION, 0L) == CURLE_OK;\n}"
    },
    {
      "title": "Regression: configuration reaches a real client handle",
      "language": "cpp",
      "blurb": "The regression constructs a libcurl handle and verifies that every mandatory setopt call succeeds without performing a network request.",
      "code": "int test_tls_configuration() {\n    if (::curl_global_init(CURL_GLOBAL_DEFAULT) != CURLE_OK) return 1;\n    int result = 0;\n    {\n        CurlHandle handle;\n        if (!handle.get()) result = 2;\n        else if (!configure_orders_transport(handle.get())) result = 3;\n    }\n    ::curl_global_cleanup();\n    if (configure_orders_transport(nullptr)) return 4;\n    if (result != 0) return result;\n    return 0;\n}"
    }
  ]
};
