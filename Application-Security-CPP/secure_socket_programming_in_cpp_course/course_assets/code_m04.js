window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "A move-only socket owner uses the platform close operation and declares its Windows link dependency.",
  "codeExamples": [
    {
      "title": "Own one native socket handle",
      "language": "cpp",
      "blurb": "Windows builds link Ws2_32 and require WSAStartup before a real socket is adopted; POSIX builds close descriptors directly.",
      "code": "#include <utility>\n#if defined(_WIN32)\n#define WIN32_LEAN_AND_MEAN\n#include <winsock2.h>\n#pragma comment(lib, \"Ws2_32.lib\")\nusing NativeSocket = SOCKET;\nconstexpr NativeSocket invalid_socket = INVALID_SOCKET;\nvoid close_native_socket(NativeSocket value) noexcept {\n    (void)::closesocket(value);\n}\n#else\n#include <unistd.h>\nusing NativeSocket = int;\nconstexpr NativeSocket invalid_socket = -1;\nvoid close_native_socket(NativeSocket value) noexcept {\n    (void)::close(value);\n}\n#endif\n\nclass SocketOwner {\npublic:\n    explicit SocketOwner(NativeSocket value = invalid_socket) noexcept\n        : value_(value) {}\n    SocketOwner(const SocketOwner&) = delete;\n    SocketOwner& operator=(const SocketOwner&) = delete;\n    SocketOwner(SocketOwner&& other) noexcept\n        : value_(std::exchange(other.value_, invalid_socket)) {}\n    SocketOwner& operator=(SocketOwner&& other) noexcept {\n        if (this != &other) {\n            reset();\n            value_ = std::exchange(other.value_, invalid_socket);\n        }\n        return *this;\n    }\n    ~SocketOwner() { reset(); }\n    bool owns_handle() const noexcept { return value_ != invalid_socket; }\n    NativeSocket release() noexcept {\n        return std::exchange(value_, invalid_socket);\n    }\n    void reset() noexcept {\n        if (owns_handle()) {\n            close_native_socket(std::exchange(value_, invalid_socket));\n        }\n    }\nprivate:\n    NativeSocket value_;\n};\n"
    },
    {
      "title": "Verify move-only ownership without closing a fabricated handle",
      "language": "cpp",
      "blurb": "The standalone regression exercises movement and release; platform integration tests adopt sockets only after networking initialization.",
      "code": "int main() {\n    SocketOwner first(static_cast<NativeSocket>(17));\n    SocketOwner second(std::move(first));\n    if (first.owns_handle() || !second.owns_handle()) return 1;\n    if (second.release() != static_cast<NativeSocket>(17)) return 2;\n    if (second.owns_handle()) return 3;\n    return 0;\n}\n"
    }
  ]
};
