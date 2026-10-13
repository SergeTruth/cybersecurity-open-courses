window.COURSE_CODE_MODULE = {
  "title": "Safe Error Handling and Rejection",
  "codeIntro": "Configuration changes should be validated as a unit so rejection cannot leave partially updated live state.",
  "codeExamples": [
    {
      "title": "Vulnerable: update live state while validating",
      "language": "c",
      "blurb": "An invalid destination is rejected, but the earlier audit setting remains changed.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <string.h>\n\nstruct preferences {\n    bool audit;\n    char destination[7];\n};\n\nstatic bool apply_preferences(struct preferences *current,\n                              const char *audit_text,\n                              const char *destination_text)\n{\n    if (current == NULL || audit_text == NULL || destination_text == NULL) {\n        return false;\n    }\n\n    if (strcmp(audit_text, \"on\") == 0) {\n        current->audit = true;\n    } else if (strcmp(audit_text, \"off\") == 0) {\n        current->audit = false;\n    } else {\n        return false;\n    }\n\n    /* IMPORTANT DEFECT: live state changed before all fields passed. */\n    if (strcmp(destination_text, \"local\") != 0 &&\n        strcmp(destination_text, \"remote\") != 0) {\n        return false;\n    }\n    (void)strcpy(current->destination, destination_text);\n    return true;\n}\n\nint main(void)\n{\n    struct preferences live = {false, \"local\"};\n\n    assert(!apply_preferences(&live, \"on\", \"network\"));\n\n    /* TEST: rejection still changed the live audit policy. */\n    assert(live.audit);\n    assert(strcmp(live.destination, \"local\") == 0);\n    return 0;\n}\n"
    },
    {
      "title": "Safer: validate temporary state and commit once",
      "language": "c",
      "blurb": "Both fields are validated into a temporary object; live preferences change only after the complete request succeeds.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <string.h>\n\nstruct preferences {\n    bool audit;\n    char destination[7];\n};\n\nstatic bool apply_preferences(struct preferences *current,\n                              const char *audit_text,\n                              const char *destination_text)\n{\n    struct preferences candidate = {false, {0}};\n\n    if (current == NULL || audit_text == NULL || destination_text == NULL) {\n        return false;\n    }\n    if (strcmp(audit_text, \"on\") == 0) {\n        candidate.audit = true;\n    } else if (strcmp(audit_text, \"off\") == 0) {\n        candidate.audit = false;\n    } else {\n        return false;\n    }\n    if (strcmp(destination_text, \"local\") != 0 &&\n        strcmp(destination_text, \"remote\") != 0) {\n        return false;\n    }\n    (void)strcpy(candidate.destination, destination_text);\n\n    /* IMPORTANT FIX: publish only fully validated temporary state. */\n    *current = candidate;\n    return true;\n}\n\nint main(void)\n{\n    struct preferences live = {false, \"local\"};\n\n    assert(!apply_preferences(&live, \"on\", \"network\"));\n    /* TEST: failed validation leaves every live field unchanged. */\n    assert(!live.audit);\n    assert(strcmp(live.destination, \"local\") == 0);\n\n    assert(apply_preferences(&live, \"on\", \"remote\"));\n    assert(live.audit);\n    assert(strcmp(live.destination, \"remote\") == 0);\n    return 0;\n}\n"
    }
  ]
};
