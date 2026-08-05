window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Use the iterator returned by erase and never increment an iterator that the mutation invalidated.",
  "codeExamples": [
    {
      "title": "Erase expired sessions with the returned successor",
      "language": "cpp",
      "blurb": "Each branch advances exactly once and no stale iterator survives erase.",
      "code": "#include <string>\n#include <vector>\n\nstruct SessionRecord {\n    std::string id;\n    bool expired;\n};\n\nvoid erase_expired(std::vector<SessionRecord>& sessions) {\n    for (auto current = sessions.begin(); current != sessions.end();) {\n        if (current->expired) {\n            current = sessions.erase(current);\n        } else {\n            ++current;\n        }\n    }\n}"
    },
    {
      "title": "Regression: adjacent removals do not skip an element",
      "language": "cpp",
      "blurb": "The case catches the common erase-then-increment defect.",
      "code": "int test_erase_successor() {\n    std::vector<SessionRecord> sessions{\n        {\"a\", true}, {\"b\", true}, {\"c\", false}, {\"d\", true}\n    };\n    erase_expired(sessions);\n    if (sessions.size() != 1) return 1;\n    if (sessions.front().id != \"c\") return 2;\n    return 0;\n}"
    }
  ]
};
