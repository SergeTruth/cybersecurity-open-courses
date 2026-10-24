window.COURSE_CODE_MODULE = {
  "title": "Security-Sensitive Random Values",
  "codeIntro": "Name the value's role before choosing its size, unpredictability, uniqueness, secrecy, storage, and logging policy.",
  "codeExamples": [
    {
      "title": "Assign requirements by random-value role",
      "language": "c",
      "blurb": "Salts, access tokens, protocol nonces, and encryption keys receive different explicit policies instead of sharing one convenient byte length.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n\nenum random_value_role {\n    ROLE_SALT,\n    ROLE_ACCESS_TOKEN,\n    ROLE_PROTOCOL_NONCE,\n    ROLE_ENCRYPTION_KEY\n};\n\nstruct random_requirements {\n    size_t bytes;\n    bool unpredictable;\n    bool unique;\n    bool secret;\n    bool may_log;\n};\n\nstatic bool requirements_for_role(enum random_value_role role,\n                                  struct random_requirements *result)\n{\n    if (result == NULL) {\n        return false;\n    }\n\n    /* IMPORTANT FIX: security purpose determines generation and lifecycle. */\n    if (role == ROLE_SALT) {\n        *result = (struct random_requirements){16, false, true, false, false};\n        return true;\n    }\n    if (role == ROLE_ACCESS_TOKEN) {\n        *result = (struct random_requirements){32, true, true, true, false};\n        return true;\n    }\n    if (role == ROLE_PROTOCOL_NONCE) {\n        *result = (struct random_requirements){12, false, true, false, false};\n        return true;\n    }\n    if (role == ROLE_ENCRYPTION_KEY) {\n        *result = (struct random_requirements){32, true, false, true, false};\n        return true;\n    }\n    return false;\n}\n\nint main(void)\n{\n    struct random_requirements requirements = {0};\n\n    assert(requirements_for_role(ROLE_ACCESS_TOKEN, &requirements));\n    assert(requirements.bytes == 32 && requirements.unpredictable);\n    assert(requirements.unique && requirements.secret && !requirements.may_log);\n\n    /* TEST: salts and keys receive different lifecycle properties. */\n    assert(requirements_for_role(ROLE_SALT, &requirements));\n    assert(requirements.unique && !requirements.secret);\n    assert(requirements_for_role(ROLE_ENCRYPTION_KEY, &requirements));\n    assert(requirements.secret && !requirements.may_log);\n    return 0;\n}\n"
    }
  ]
};
