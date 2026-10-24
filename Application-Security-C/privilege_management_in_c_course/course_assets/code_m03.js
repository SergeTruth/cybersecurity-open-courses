window.COURSE_CODE_MODULE = {
  "title": "Designing for Least Privilege",
  "codeIntro": "Make authority phase-specific so protected access is absent from ordinary request processing rather than merely unused by convention.",
  "codeExamples": [
    {
      "title": "Assign only the authority each phase needs",
      "language": "c",
      "blurb": "Privileged configuration reads and controlled state writes are isolated from the general parsing phase, which receives neither capability.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n\nenum program_phase {\n    PHASE_LOAD_CONFIGURATION,\n    PHASE_PROCESS_REQUEST,\n    PHASE_COMMIT_STATE\n};\n\nstruct authority {\n    bool read_protected_configuration;\n    bool write_protected_state;\n};\n\nstatic bool authority_for_phase(enum program_phase phase,\n                                struct authority *result)\n{\n    if (result == NULL) {\n        return false;\n    }\n    *result = (struct authority){false, false};\n\n    /* IMPORTANT FIX: authority is explicit and limited to one phase. */\n    if (phase == PHASE_LOAD_CONFIGURATION) {\n        result->read_protected_configuration = true;\n        return true;\n    }\n    if (phase == PHASE_PROCESS_REQUEST) {\n        return true;\n    }\n    if (phase == PHASE_COMMIT_STATE) {\n        result->write_protected_state = true;\n        return true;\n    }\n    return false;\n}\n\nint main(void)\n{\n    struct authority rights = {true, true};\n\n    assert(authority_for_phase(PHASE_PROCESS_REQUEST, &rights));\n    assert(!rights.read_protected_configuration &&\n           !rights.write_protected_state);\n    assert(authority_for_phase(PHASE_LOAD_CONFIGURATION, &rights));\n    assert(rights.read_protected_configuration &&\n           !rights.write_protected_state);\n\n    /* TEST: no supported phase receives both protected capabilities. */\n    assert(authority_for_phase(PHASE_COMMIT_STATE, &rights));\n    assert(!rights.read_protected_configuration &&\n           rights.write_protected_state);\n    return 0;\n}\n"
    }
  ]
};
