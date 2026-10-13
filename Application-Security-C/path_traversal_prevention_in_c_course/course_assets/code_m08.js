window.COURSE_CODE_MODULE = {
  "title": "Uploads, Downloads, Archives, and Generated Paths",
  "codeIntro": "Uploaded filenames are external labels; the application should generate the storage destination from trusted identifiers.",
  "codeExamples": [
    {
      "title": "Vulnerable: use the upload label as its destination",
      "language": "c",
      "blurb": "The staging prefix does not constrain a metadata-derived filename that still contains parent-directory components.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <stdio.h>\n#include <string.h>\n\nstatic bool choose_upload_destination(const char *uploaded_label,\n                                      char *output, size_t capacity)\n{\n    int written = 0;\n\n    if (uploaded_label == NULL || output == NULL || capacity == 0) {\n        return false;\n    }\n\n    /* IMPORTANT DEFECT: external metadata selects the storage path. */\n    written = snprintf(output, capacity, \"staging/%s\", uploaded_label);\n    return written >= 0 && (size_t)written < capacity;\n}\n\nint main(void)\n{\n    char destination[64] = {0};\n\n    assert(choose_upload_destination(\"../config/app.conf\", destination,\n                                     sizeof destination));\n\n    /* TEST: the constructed destination still escapes the staging area. */\n    assert(strcmp(destination, \"staging/../config/app.conf\") == 0);\n    return 0;\n}\n"
    },
    {
      "title": "Safer: generate a controlled upload storage name",
      "language": "c",
      "blurb": "The external filename remains a display label while a bounded application identifier determines the staging destination.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <stdio.h>\n#include <string.h>\n\nstatic bool choose_upload_destination(unsigned int upload_id,\n                                      const char *display_label,\n                                      char *output, size_t capacity)\n{\n    int written = 0;\n\n    if (display_label == NULL || output == NULL || capacity == 0 ||\n        upload_id > 9999u) {\n        return false;\n    }\n    (void)display_label;\n\n    /* IMPORTANT FIX: only trusted application state selects storage. */\n    written = snprintf(output, capacity, \"staging/upload-%04u.bin\", upload_id);\n    return written >= 0 && (size_t)written < capacity;\n}\n\nint main(void)\n{\n    char destination[32] = {0};\n    const char external_label[] = \"../config/app.conf\";\n\n    assert(choose_upload_destination(42u, external_label, destination,\n                                     sizeof destination));\n    assert(strcmp(destination, \"staging/upload-0042.bin\") == 0);\n\n    /* TEST: external metadata never appears in the storage path. */\n    assert(strstr(destination, \"config\") == NULL);\n    assert(!choose_upload_destination(10000u, external_label, destination,\n                                      sizeof destination));\n    return 0;\n}\n"
    }
  ]
};
