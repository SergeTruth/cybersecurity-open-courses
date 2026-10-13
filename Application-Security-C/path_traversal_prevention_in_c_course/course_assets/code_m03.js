window.COURSE_CODE_MODULE = {
  "title": "Defining Approved File Roots",
  "codeIntro": "Approved roots come from trusted workflow policy; a request may choose a resource but cannot supply or redefine its filesystem boundary.",
  "codeExamples": [
    {
      "title": "Select roots from trusted workflow policy",
      "language": "c",
      "blurb": "Report reads and upload staging map to separate application-controlled roots with operation-specific write policy.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <string.h>\n\nenum file_workflow {\n    WORKFLOW_REPORT_READ,\n    WORKFLOW_UPLOAD_STAGE\n};\n\nstruct root_policy {\n    const char *root;\n    bool writable;\n};\n\nstatic bool policy_for_workflow(enum file_workflow workflow,\n                                struct root_policy *result)\n{\n    if (result == NULL) {\n        return false;\n    }\n\n    /* IMPORTANT FIX: roots are trusted policy, never request parameters. */\n    if (workflow == WORKFLOW_REPORT_READ) {\n        result->root = \"/srv/app/reports\";\n        result->writable = false;\n        return true;\n    }\n    if (workflow == WORKFLOW_UPLOAD_STAGE) {\n        result->root = \"/srv/app/upload-stage\";\n        result->writable = true;\n        return true;\n    }\n    return false;\n}\n\nint main(void)\n{\n    struct root_policy reports = {NULL, false};\n    struct root_policy uploads = {NULL, false};\n\n    assert(policy_for_workflow(WORKFLOW_REPORT_READ, &reports));\n    assert(!reports.writable);\n    assert(policy_for_workflow(WORKFLOW_UPLOAD_STAGE, &uploads));\n    assert(uploads.writable);\n\n    /* TEST: workflows have distinct, application-controlled boundaries. */\n    assert(strcmp(reports.root, uploads.root) != 0);\n    assert(!policy_for_workflow((enum file_workflow)99, &reports));\n    return 0;\n}\n"
    }
  ]
};
