window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Symbol Visibility, Versioning, and Dependency Control to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Export only the versioned library facade",
      "language": "cpp",
      "blurb": "The public function is explicitly exported, the called helper is explicitly hidden, and neither relies on an unused private definition.",
      "code": "#define ORDERS_BUILD 1\n\n#if defined(_WIN32)\n#  if defined(ORDERS_BUILD)\n#    define ORDERS_API __declspec(dllexport)\n#  else\n#    define ORDERS_API __declspec(dllimport)\n#  endif\n#  define ORDERS_LOCAL\n#else\n#  define ORDERS_API __attribute__((visibility(\"default\")))\n#  define ORDERS_LOCAL __attribute__((visibility(\"hidden\")))\n#endif\n\nORDERS_LOCAL int internal_normalize(int value) noexcept {\n    return value < 0 ? 0 : value;\n}\n\nextern \"C\" ORDERS_API int orders_api_version() noexcept {\n    return internal_normalize(1);\n}\n"
    },
    {
      "title": "Bind ELF exports to an explicit symbol version",
      "language": "text",
      "blurb": "The linker version script publishes only the approved facade and keeps every other global symbol local.",
      "code": "ORDERS_1.0 {\n    global:\n        orders_api_version;\n        orders_open;\n        orders_close;\n        orders_submit;\n    local:\n        *;\n};\n"
    }
  ]
};
