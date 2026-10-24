window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Prerequisite: C++20 or later (for example, compile with -std=c++20). Authorize key purpose, tenant, and operation before asking the backend to use a key.",
  "codeExamples": [
    {
      "title": "Evaluate a closed key-use request",
      "language": "cpp",
      "blurb": "A service identity may encrypt for its own tenant but cannot decrypt or select another purpose.",
      "code": "#include <string>\n\nenum class KeyOperation { encrypt, decrypt, rotate };\n\nstruct KeyUseRequest {\n    std::string workload;\n    std::string tenant;\n    std::string key_purpose;\n    KeyOperation operation;\n};\n\nbool authorize_key_use(const KeyUseRequest& request) {\n    return request.workload == \"orders-writer\" &&\n        request.tenant == \"tenant-a\" &&\n        request.key_purpose == \"orders-data\" &&\n        request.operation == KeyOperation::encrypt;\n}"
    },
    {
      "title": "Regression: tenant and operation are separate authorization dimensions",
      "language": "cpp",
      "blurb": "Possession of a valid workload name does not grant decryption or cross-tenant use.",
      "code": "int test_key_authorization() {\n    if (!authorize_key_use({\n        \"orders-writer\", \"tenant-a\", \"orders-data\", KeyOperation::encrypt\n    })) return 1;\n    if (authorize_key_use({\n        \"orders-writer\", \"tenant-b\", \"orders-data\", KeyOperation::encrypt\n    })) return 2;\n    if (authorize_key_use({\n        \"orders-writer\", \"tenant-a\", \"orders-data\", KeyOperation::decrypt\n    })) return 3;\n    return 0;\n}"
    }
  ]
};
