window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Exceptions, RTTI, and Error Translation to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Translate exceptions before returning through C ABI",
      "language": "cpp",
      "blurb": "Every exception is contained in the implementation and converted into a stable status value.",
      "code": "#include <stdexcept>\n#include <string_view>\n#include <cstddef>\n\nenum class OrdersStatus : int { ok = 0, invalid = 1, unavailable = 2, internal = 3 };\n\nvoid submit_impl(std::string_view value) {\n    if (value.empty()) throw std::invalid_argument(\"empty order\");\n}\n\nextern \"C\" OrdersStatus orders_submit(\n    const char* text, std::size_t length) noexcept {\n    try {\n        if (text == nullptr) return OrdersStatus::invalid;\n        submit_impl({text, length});\n        return OrdersStatus::ok;\n    } catch (const std::invalid_argument&) {\n        return OrdersStatus::invalid;\n    } catch (...) {\n        return OrdersStatus::internal;\n    }\n}\n"
    },
    {
      "title": "Contain exceptions raised by host callbacks",
      "language": "cpp",
      "blurb": "The callback type permits a C++ host callback to throw; the noexcept adapter catches it and returns a stable boundary result.",
      "code": "#include <cstddef>\n\nusing LogCallback = int (*)(void*, const char*, std::size_t);\n\nstruct LoggerV1 {\n    void* context;\n    LogCallback write;\n};\n\nint safe_log(const LoggerV1& logger,\n             const char* message,\n             std::size_t size) noexcept {\n    if (logger.write == nullptr || message == nullptr || size > 2048) return -1;\n    try {\n        return logger.write(logger.context, message, size);\n    } catch (...) {\n        return -2;\n    }\n}\n"
    }
  ]
};
