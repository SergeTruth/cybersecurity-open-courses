window.COURSE_MODULE = {
  "title": "Course Summary: An Integer Safety Baseline",
  "graphicAlt": "Known ranges, checked conversions, checked allocation arithmetic and bounded steps form an integer-safety baseline supported by edge testing and full-path review.",
  "narration": "A practical integer safety baseline for C starts with knowing the type, range, and signedness of each security-relevant value. Numeric values should have a clear meaning: length, count, index, offset, quota, limit, identifier, or status. Once the meaning is clear, the allowed range can be checked before the value controls program behavior.\n\nValidate numeric input before use. Avoid signed overflow by checking operands before signed arithmetic. Detect unsigned wraparound when wraparound is not intended. Check conversions before storing into narrower or differently signed types, and remember that a cast does not prove the value is valid for the destination or the business rule.\n\nCheck multiplication and addition before allocation. Bound indexes, offsets, loop counters, and parser lengths. Validate shift counts, divisors, remainder assumptions, and special arithmetic edge cases. When arithmetic controls memory, access, quotas, or resources, choose clear failure behavior and avoid trusting a result whose representability was never established.\n\nFinally, use tooling, boundary tests, and systematic review as a normal engineering routine. Compiler warnings, static analysis, sanitizers, defensive fuzzing, and code review all catch different defects. The mature habit is to trace numeric data from input to final use and make every range, conversion, and arithmetic decision visible enough for the next maintainer to trust.",
  "narrationPoints": [
    "A practical integer safety baseline for C starts with knowing the type, range, and signedness of each security-relevant value.",
    "Avoid signed overflow by checking operands before signed arithmetic.",
    "Validate shift counts, divisors, remainder assumptions, and special arithmetic edge cases.",
    "The mature habit is to trace numeric data from input to final use and make every range, conversion.",
    "Finally, use tooling, boundary tests, and systematic review as a normal engineering routine."
  ]
};
