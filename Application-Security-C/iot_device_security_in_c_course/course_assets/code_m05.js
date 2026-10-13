window.COURSE_CODE_MODULE = {
  "title": "Device Identity, Credentials, and Provisioning",
  "codeIntro": "Compare a fleet-wide bootstrap secret with a device-bound, one-time enrollment record.",
  "codeExamples": [
    {
      "title": "Vulnerable: provision every device with one shared secret",
      "language": "c",
      "blurb": "The enrollment decision checks the token but never binds it to the device identity, so one disclosure authorizes multiple units.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <string.h>\n\nstatic bool authorize_enrollment(const char *device_id,\n                                 const char *presented_token)\n{\n    const char fleet_token[] = \"fleet-bootstrap\";\n\n    if (device_id == NULL || presented_token == NULL) {\n        return false;\n    }\n\n    /* IMPORTANT DEFECT: the device identity is not part of the decision. */\n    return strcmp(presented_token, fleet_token) == 0;\n}\n\nint main(void)\n{\n    assert(authorize_enrollment(\"sensor-a17\", \"fleet-bootstrap\"));\n\n    /* TEST: the same exposed value also provisions a different device. */\n    assert(authorize_enrollment(\"sensor-b42\", \"fleet-bootstrap\"));\n    assert(!authorize_enrollment(\"sensor-a17\", \"wrong-token\"));\n    return 0;\n}\n"
    },
    {
      "title": "Safer: consume a device-bound enrollment record",
      "language": "c",
      "blurb": "Provisioning requires both the assigned device identity and its unique token, and a successful record cannot be replayed.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <string.h>\n\nstruct enrollment_record {\n    const char *device_id;\n    const char *token;\n    bool consumed;\n};\n\nstatic bool authorize_enrollment(struct enrollment_record *record,\n                                 const char *presented_device_id,\n                                 const char *presented_token)\n{\n    if (record == NULL || record->device_id == NULL || record->token == NULL ||\n        presented_device_id == NULL || presented_token == NULL ||\n        record->consumed) {\n        return false;\n    }\n\n    /* IMPORTANT FIX: identity, unique credential, and lifecycle must agree. */\n    if (strcmp(presented_device_id, record->device_id) != 0 ||\n        strcmp(presented_token, record->token) != 0) {\n        return false;\n    }\n    record->consumed = true;\n    return true;\n}\n\nint main(void)\n{\n    struct enrollment_record assigned = {\n        \"sensor-a17\", \"token-a17-only\", false\n    };\n\n    assert(!authorize_enrollment(&assigned, \"sensor-b42\",\n                                 \"token-a17-only\"));\n    assert(!assigned.consumed);\n    assert(authorize_enrollment(&assigned, \"sensor-a17\",\n                                \"token-a17-only\"));\n\n    /* TEST: successful enrollment consumes the record and blocks replay. */\n    assert(assigned.consumed);\n    assert(!authorize_enrollment(&assigned, \"sensor-a17\",\n                                 \"token-a17-only\"));\n    return 0;\n}\n"
    }
  ]
};
