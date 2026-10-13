window.COURSE_MODULE = {
  "title": "Why Integer Overflow Matters",
  "graphicAlt": "An integer result influences allocation, indexing, loops and limits, making range validation necessary before its use.",
  "narration": "Integer overflow happens when an arithmetic result cannot be represented in the intended type or range. In C, that concern is not isolated to math-heavy code. Numeric values influence how much memory is allocated, which element is accessed, how far a parser advances, how many records are accepted, and whether a resource limit has been reached.\n\nInteger mistakes are not only calculation bugs. A wrong result can change a buffer length, an array index, a loop count, a quota, a counter, a timestamp comparison, an authorization-related threshold, or a resource limit. When later code trusts that result, the original arithmetic mistake can become a reliability or security problem.\n\nC makes integer safety especially important because behavior depends on type, signedness, width, conversion rules, promotions, and the operation being performed. A value that appears reasonable before arithmetic may become unsafe after addition, subtraction, multiplication, parsing, shifting, or conversion into a different type.\n\nDefensive C code treats numeric values as part of the program's trust boundary. Values from files, messages, APIs, environment settings, user input, metadata, and even internal counters should be checked before they control memory, indexing, loops, access decisions, or resource use.\n\nThis course focuses on prevention, review, testing, and responsible engineering. We will look at the rules that matter, the failure patterns that reviewers should recognize, and the practical habits that make integer arithmetic safer before results are trusted by memory management or control flow.",
  "narrationPoints": [
    "Integer overflow happens when an arithmetic result cannot be represented in the intended type or range.",
    "A wrong result can change a buffer length, an array index, a loop count, a quota, a counter.",
    "C makes integer safety especially important because behavior depends on type, signedness, width, conversion rules, promotions.",
    "Defensive C code treats numeric values as part of the program's trust boundary.",
    "We will look at the rules that matter, the failure patterns that reviewers should recognize."
  ]
};
