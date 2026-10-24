window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Reading Sanitizer Reports to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Give a heap-overflow report a meaningful application frame",
      "language": "cpp",
      "blurb": "A deliberately failing function name and exact boundary write make the first application-owned fault frame easy to recognize.",
      "code": "#include <memory>\n\nvoid write_sentinel(int* values, int count) {\n    values[count] = 0; // Expected ASan heap-buffer-overflow.\n}\n\nint main() {\n    auto values = std::make_unique<int[]>(4);\n    write_sentinel(values.get(), 4);\n}\n"
    },
    {
      "title": "Interpret a use-after-free report from cause to symptom",
      "language": "text",
      "blurb": "The annotated report separates the invalid read from the earlier lifetime-ending free and the original allocation site.",
      "code": "ERROR: AddressSanitizer: heap-use-after-free on address 0x502000000010\nREAD of size 4 at 0x502000000010 thread T0\n    #0 read_after_owner_reset(int*) uaf.cpp:4   <-- invalid access\n    #1 main uaf.cpp:11\n\nfreed by thread T0 here:\n    #0 operator delete(void*)\n    #1 std::default_delete<int>::operator()(int*) const\n    #2 main uaf.cpp:10                          <-- owner lifetime ended\n\npreviously allocated by thread T0 here:\n    #0 operator new(unsigned long)\n    #1 std::make_unique<int, int>(int&&)\n    #2 main uaf.cpp:7                           <-- allocation origin\n\nFirst fix the ownership error at line 10; do not merely guard the later read.\n"
    }
  ]
};
