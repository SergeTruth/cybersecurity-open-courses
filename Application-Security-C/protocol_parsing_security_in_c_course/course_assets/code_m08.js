window.COURSE_CODE_MODULE = {
  "title": "Resource Limits and Availability",
  "codeIntro": "A session budget rejects oversized or excessive work before buffering, allocation, or dispatch consumes shared resources.",
  "codeExamples": [
    {
      "title": "Reserve bounded parser work before accepting a message",
      "language": "c",
      "blurb": "Per-message size and field limits combine with session-wide byte, message, and work budgets using overflow-safe subtraction checks.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n\nstruct session_budget {\n    size_t buffered_bytes;\n    size_t accepted_messages;\n    size_t work_units;\n};\n\nstatic bool reserve_message(struct session_budget *budget,\n                            size_t message_size, size_t field_count)\n{\n    size_t new_work = 0;\n\n    if (budget == NULL || message_size == 0 || message_size > 256 ||\n        field_count == 0 || field_count > 16 ||\n        budget->buffered_bytes > 1024 || budget->accepted_messages >= 4 ||\n        budget->work_units > 1000) {\n        return false;\n    }\n    new_work = field_count * 10;\n    if (message_size > 1024 - budget->buffered_bytes ||\n        new_work > 1000 - budget->work_units) {\n        return false;\n    }\n\n    /* IMPORTANT FIX: reserve every bounded resource before expensive work. */\n    budget->buffered_bytes += message_size;\n    budget->accepted_messages += 1;\n    budget->work_units += new_work;\n    return true;\n}\n\nint main(void)\n{\n    struct session_budget budget = {0, 0, 0};\n\n    assert(reserve_message(&budget, 200, 5));\n    assert(budget.buffered_bytes == 200 && budget.work_units == 50);\n\n    /* TEST: per-message and session limits reject without partial charges. */\n    assert(!reserve_message(&budget, 257, 5));\n    assert(!reserve_message(&budget, 100, 17));\n    assert(budget.accepted_messages == 1 && budget.buffered_bytes == 200);\n    budget.buffered_bytes = 1000;\n    assert(!reserve_message(&budget, 25, 1));\n    assert(budget.accepted_messages == 1 && budget.buffered_bytes == 1000);\n    return 0;\n}\n"
    }
  ]
};
