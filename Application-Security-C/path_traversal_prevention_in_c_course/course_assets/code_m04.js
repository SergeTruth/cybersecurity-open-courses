window.COURSE_CODE_MODULE = {
  "title": "Validating File Names Instead of Trusting Paths",
  "codeIntro": "Compare a short denylist with an allowlist for the exact export-name grammar the workflow supports.",
  "codeExamples": [
    {
      "title": "Vulnerable: block a few traversal spellings",
      "language": "c",
      "blurb": "Rejecting separators and two dots still accepts ambiguous names that are outside the report-export contract.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <string.h>\n\nstatic bool acceptable_report_name(const char *name)\n{\n    if (name == NULL || name[0] == '\\0') {\n        return false;\n    }\n\n    /* IMPORTANT DEFECT: a denylist does not define the supported grammar. */\n    return strstr(name, \"..\") == NULL &&\n           strchr(name, '/') == NULL && strchr(name, '\\\\') == NULL;\n}\n\nint main(void)\n{\n    assert(acceptable_report_name(\"report-2026.csv\"));\n    assert(!acceptable_report_name(\"../secret\"));\n\n    /* TEST: whitespace and the wrong extension still pass the denylist. */\n    assert(acceptable_report_name(\"report 2026.txt\"));\n    return 0;\n}\n"
    },
    {
      "title": "Safer: allow only the report-name grammar",
      "language": "c",
      "blurb": "The accepted name is exactly report-, four ASCII digits, and .csv; everything else is rejected before path construction.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <string.h>\n\nstatic bool acceptable_report_name(const char *name)\n{\n    size_t index = 0;\n\n    if (name == NULL || strlen(name) != 15 ||\n        memcmp(name, \"report-\", 7) != 0 ||\n        memcmp(name + 11, \".csv\", 4) != 0) {\n        return false;\n    }\n\n    /* IMPORTANT FIX: only the documented variable field may vary. */\n    for (index = 7; index < 11; ++index) {\n        if (name[index] < '0' || name[index] > '9') {\n            return false;\n        }\n    }\n    return true;\n}\n\nint main(void)\n{\n    assert(acceptable_report_name(\"report-2026.csv\"));\n\n    /* TEST: paths, ambiguous text, and wrong extensions are rejected. */\n    assert(!acceptable_report_name(\"../report.csv\"));\n    assert(!acceptable_report_name(\"report 2026.txt\"));\n    assert(!acceptable_report_name(\"report-20x6.csv\"));\n    assert(!acceptable_report_name(\"report-2026.csv.bak\"));\n    return 0;\n}\n"
    }
  ]
};
