window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Container mutation invalidates some iterators and references, so compute results without retaining positions across erasure.",
  "codeExamples": [
    {
      "title": "Erase rejected values without reusing stale iterators",
      "language": "cpp",
      "blurb": "The standard erase algorithm performs the mutation as one operation and returns the number of removed elements.",
      "code": "#include <cstddef>\n#include <string>\n#include <vector>\n\nstd::size_t remove_empty_values(\n    std::vector<std::string>& values\n) {\n    return std::erase(values, std::string{});\n}"
    },
    {
      "title": "Verify content after mutation",
      "language": "cpp",
      "blurb": "The regression inspects the container's new state rather than retaining any iterator from before the erase.",
      "code": "int test_iterator_safe_erasure() {\n    std::vector<std::string> values{\n        \"first\", \"\", \"second\", \"\"\n    };\n    if (remove_empty_values(values) != 2) return 1;\n    if (values.size() != 2) return 2;\n    if (values[0] != \"first\" || values[1] != \"second\") {\n        return 3;\n    }\n    return 0;\n}"
    }
  ]
};
