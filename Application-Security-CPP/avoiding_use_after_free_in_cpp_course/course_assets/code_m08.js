window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Detection, Testing, and Code Review to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Regression-test that an owned snapshot survives its source",
      "language": "cpp",
      "blurb": "The test destroys the source and returns a failure code unless the owned snapshot remains valid, including when compiled with NDEBUG.",
      "code": "#include <string>\n\nstd::string snapshot() {\n    std::string local = \"approved\";\n    return local;\n}\n\nint main() {\n    const std::string value = snapshot();\n    return value == \"approved\" ? 0 : 1;\n}\n"
    },
    {
      "title": "Keep a focused ASan lifetime regression",
      "language": "bash",
      "blurb": "The script generates one stale-access test, requires AddressSanitizer to report it, and treats a clean exit as a failed regression. The example assumes /usr/bin/clang++ is an application-owned, reviewed toolchain path.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nwork=$(mktemp -d)\ntrap 'rm -rf \"$work\"' EXIT\n\n/usr/bin/printf '%s\n'   '#include <memory>'   'int main(){ auto p=std::make_unique<int>(3); int* q=p.get(); p.reset(); return *q; }'   > \"$work/uaf.cpp\"\n/usr/bin/clang++ -std=c++20 -g -fsanitize=address   \"$work/uaf.cpp\" -o \"$work/uaf\"\n\nset +e\n\"$work/uaf\" 2>\"$work/report\"\nstatus=$?\nset -e\n(( status != 0 )) && /usr/bin/grep -Fq 'heap-use-after-free' \"$work/report\"\n"
    }
  ]
};
