window.COURSE_CODE_MODULE = {
  "title": "Random Ranges and Bias Avoidance",
  "codeIntro": "Enumerating every possible source byte makes modulo bias—and the correction from rejection sampling—directly testable.",
  "codeExamples": [
    {
      "title": "Vulnerable: map every byte with modulo",
      "language": "c",
      "blurb": "Mapping 256 equally likely byte values into ten buckets gives six buckets an extra source value.",
      "code": "#include <assert.h>\n#include <stddef.h>\n\nint main(void)\n{\n    size_t counts[10] = {0};\n    size_t source_value = 0;\n\n    /* IMPORTANT DEFECT: 256 is not evenly divisible by ten. */\n    for (source_value = 0; source_value < 256; ++source_value) {\n        counts[source_value % 10] += 1;\n    }\n\n    /* TEST: low buckets are measurably more likely than high buckets. */\n    assert(counts[0] == 26);\n    assert(counts[5] == 26);\n    assert(counts[6] == 25);\n    assert(counts[9] == 25);\n    return 0;\n}\n"
    },
    {
      "title": "Safer: reject the uneven source tail",
      "language": "c",
      "blurb": "Only the first 250 byte values are accepted, so each of ten outputs has exactly twenty-five source values.",
      "code": "#include <assert.h>\n#include <stddef.h>\n\nint main(void)\n{\n    const size_t target_range = 10;\n    const size_t source_cardinality = 256;\n    const size_t cutoff = source_cardinality -\n                          source_cardinality % target_range;\n    size_t counts[10] = {0};\n    size_t source_value = 0;\n    size_t accepted = 0;\n    size_t bucket = 0;\n\n    /* IMPORTANT FIX: reject values that cannot map evenly. */\n    for (source_value = 0; source_value < source_cardinality; ++source_value) {\n        if (source_value >= cutoff) {\n            continue;\n        }\n        counts[source_value % target_range] += 1;\n        accepted += 1;\n    }\n\n    /* TEST: every bucket has equal weight after rejection sampling. */\n    assert(accepted == 250);\n    for (bucket = 0; bucket < target_range; ++bucket) {\n        assert(counts[bucket] == 25);\n    }\n    assert(cutoff == 250);\n    return 0;\n}\n"
    }
  ]
};
