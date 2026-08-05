window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Callbacks, Async Work, and Concurrency to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Capture an immutable owner in asynchronous work",
      "language": "cpp",
      "blurb": "The future owns the request snapshot until the task finishes, even if the caller's local value is destroyed.",
      "code": "#include <future>\n#include <memory>\n#include <string>\n#include <utility>\n\nstd::future<bool> validate_async(std::string request) {\n    auto owned = std::make_shared<const std::string>(std::move(request));\n    return std::async(std::launch::async, [owned] {\n        return !owned->empty() && owned->size() <= 1024;\n    });\n}\n"
    },
    {
      "title": "Unregister callbacks before destroying callback state",
      "language": "cpp",
      "blurb": "The blocking unregister-and-wait contract removes the callback and confirms all in-flight invocations have completed before callback state is destroyed.",
      "code": "#include <functional>\n#include <utility>\n\nusing Token = unsigned long;\nToken register_callback(std::function<void()>);\nvoid unregister_callback_and_wait(Token) noexcept;\n\nclass Subscription {\n    Token token_;\npublic:\n    explicit Subscription(std::function<void()> callback)\n        : token_(register_callback(std::move(callback))) {}\n    ~Subscription() { unregister_callback_and_wait(token_); }\n    Subscription(const Subscription&) = delete;\n    Subscription& operator=(const Subscription&) = delete;\n};\n"
    }
  ]
};
