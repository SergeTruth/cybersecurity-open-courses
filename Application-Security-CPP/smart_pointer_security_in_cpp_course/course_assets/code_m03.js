window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "A validated factory returns one move-only owner and never exposes an unmanaged allocation.",
  "codeExamples": [
    {
      "title": "Create exclusive ownership with std::unique_ptr",
      "language": "cpp",
      "blurb": "A validated factory returns one move-only owner and never exposes an unmanaged allocation.",
      "code": "#include <memory>\n#include <string>\n#include <string_view>\n#include <utility>\n\nclass Session {\npublic:\n    static std::unique_ptr<Session> create(std::string_view id) {\n        if (id.empty() || id.size() > 20) return {};\n        return std::unique_ptr<Session>{new Session{std::string{id}}};\n    }\n    std::string id() const { return id_; }\nprivate:\n    explicit Session(std::string id) : id_(std::move(id)) {}\n    std::string id_;\n};\n\nint main() {\n    if (Session::create(\"\")) return 1;\n    const std::string temporary_id = Session::create(\"temporary-owner\")->id();\n    if (temporary_id != \"temporary-owner\") return 2;\n    auto session = Session::create(\"reader-1\");\n    if (!session || session->id() != \"reader-1\") return 3;\n    auto moved = std::move(session);\n    return !session && moved ? 0 : 4;\n}\n"
    }
  ]
};
