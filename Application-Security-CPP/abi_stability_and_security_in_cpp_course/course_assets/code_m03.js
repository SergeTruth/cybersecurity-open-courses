window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply C++ ABI Fragility and Interface Design to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Expose an opaque C handle instead of C++ object layout",
      "language": "cpp",
      "blurb": "Only the handle and stable C functions cross the binary boundary; the private C++ type remains inside the library.",
      "code": "#include <cstdint>\n#include <memory>\n\nstruct orders_session;\n\nextern \"C\" {\nstd::uint32_t orders_abi_version() noexcept { return 1; }\norders_session* orders_open() noexcept;\nvoid orders_close(orders_session*) noexcept;\n}\n\nstruct orders_session {\n    std::unique_ptr<int> implementation = std::make_unique<int>(42);\n};\n\norders_session* orders_open() noexcept {\n    try { return new orders_session; }\n    catch (...) { return nullptr; }\n}\n\nvoid orders_close(orders_session* session) noexcept {\n    delete session;\n}\n"
    },
    {
      "title": "Keep public class layout stable with PIMPL",
      "language": "cpp",
      "blurb": "The public object contains one implementation pointer, so private fields can change without changing the caller-visible object layout.",
      "code": "#include <memory>\n#include <string>\n\nclass Client final {\npublic:\n    Client();\n    ~Client();\n    Client(Client&&) noexcept;\n    Client& operator=(Client&&) noexcept;\n    std::string endpoint() const;\nprivate:\n    struct Impl;\n    std::unique_ptr<Impl> impl_;\n};\n\nstruct Client::Impl { std::string endpoint = \"https://api.example\"; };\nClient::Client() : impl_(std::make_unique<Impl>()) {}\nClient::~Client() = default;\nClient::Client(Client&&) noexcept = default;\nClient& Client::operator=(Client&&) noexcept = default;\nstd::string Client::endpoint() const { return impl_->endpoint; }\n"
    }
  ]
};
