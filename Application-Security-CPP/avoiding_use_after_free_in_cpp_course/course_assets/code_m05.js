window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply RAII and Smart Pointer Patterns to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Tie a file descriptor to one RAII owner",
      "language": "cpp",
      "blurb": "Move-only ownership ensures the descriptor is closed once on every normal and exceptional exit.",
      "code": "#include <unistd.h>\n#include <utility>\n\nclass UniqueFd {\n    int fd_ = -1;\npublic:\n    explicit UniqueFd(int fd = -1) noexcept : fd_(fd) {}\n    ~UniqueFd() { if (fd_ >= 0) ::close(fd_); }\n    UniqueFd(const UniqueFd&) = delete;\n    UniqueFd& operator=(const UniqueFd&) = delete;\n    UniqueFd(UniqueFd&& other) noexcept : fd_(std::exchange(other.fd_, -1)) {}\n    int get() const noexcept { return fd_; }\n};\n"
    },
    {
      "title": "Break ownership cycles with weak observers",
      "language": "cpp",
      "blurb": "The child owns no parent reference; locking the weak pointer creates temporary ownership only when the parent is still alive.",
      "code": "#include <memory>\n#include <vector>\n\nstruct Node {\n    std::weak_ptr<Node> parent;\n    std::vector<std::shared_ptr<Node>> children;\n};\n\nstd::shared_ptr<Node> add_child(const std::shared_ptr<Node>& parent) {\n    auto child = std::make_shared<Node>();\n    child->parent = parent;\n    parent->children.push_back(child);\n    return child;\n}\n"
    }
  ]
};
