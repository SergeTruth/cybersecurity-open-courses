window.COURSE_CODE_MODULE = {
  "title": "Child Processes and Privilege Propagation",
  "codeIntro": "Compare ambiguous shell text with a structured launch plan that fixes the task, arguments, environment size, handle inheritance, and child authority.",
  "codeExamples": [
    {
      "title": "Vulnerable: assemble a privileged shell command",
      "language": "c",
      "blurb": "User-controlled target text becomes part of a shell command, so separators acquire meaning beyond the intended helper argument.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <stdio.h>\n#include <string.h>\n\nstatic bool build_helper_command(const char *target, char *command,\n                                 size_t capacity)\n{\n    int written = 0;\n\n    if (target == NULL || command == NULL || capacity == 0) {\n        return false;\n    }\n\n    /* IMPORTANT DEFECT: untrusted text is interpreted by a shell later. */\n    written = snprintf(command, capacity, \"helper --target %s\", target);\n    return written >= 0 && (size_t)written < capacity;\n}\n\nint main(void)\n{\n    char command[64] = {0};\n\n    assert(build_helper_command(\"report;shutdown\", command, sizeof command));\n\n    /* TEST: the generated command retains the control separator. */\n    assert(strstr(command, \";shutdown\") != NULL);\n    return 0;\n}\n"
    },
    {
      "title": "Safer: build a shell-free child launch plan",
      "language": "c",
      "blurb": "A validated resource identifier becomes one structured argument; the plan disables shell use, broad environment inheritance, and handle propagation.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <string.h>\n\nenum child_task {\n    CHILD_RENDER_REPORT\n};\n\nstruct child_launch {\n    enum child_task task;\n    char target[9];\n    size_t argument_count;\n    size_t environment_entries;\n    size_t inherited_handles;\n    bool use_shell;\n    bool reduced_identity;\n};\n\nstatic bool prepare_child_launch(const char *target, struct child_launch *result)\n{\n    struct child_launch candidate = {\n        CHILD_RENDER_REPORT, {0}, 2, 2, 0, false, true\n    };\n    size_t index = 0;\n\n    if (target == NULL || result == NULL || target[0] == '\\0') {\n        return false;\n    }\n    for (index = 0; target[index] != '\\0'; ++index) {\n        const char ch = target[index];\n        if (index >= sizeof candidate.target - 1 ||\n            !((ch >= 'a' && ch <= 'z') ||\n              (ch >= '0' && ch <= '9') || ch == '-')) {\n            return false;\n        }\n    }\n    memcpy(candidate.target, target, index + 1);\n\n    /* IMPORTANT FIX: publish one constrained, shell-free launch contract. */\n    *result = candidate;\n    return true;\n}\n\nint main(void)\n{\n    struct child_launch plan = {0};\n\n    assert(!prepare_child_launch(\"report;shutdown\", &plan));\n    assert(prepare_child_launch(\"report-7\", &plan));\n\n    /* TEST: the child gets fixed structure and no ambient authority. */\n    assert(strcmp(plan.target, \"report-7\") == 0);\n    assert(!plan.use_shell && plan.environment_entries == 2);\n    assert(plan.inherited_handles == 0 && plan.reduced_identity);\n    return 0;\n}\n"
    }
  ]
};
