window.COURSE_CODE_MODULE = {
  "title": "Code Example: Validate Binary Length Fields",
  "codeExamples": [
    {
      "title": "Validate Binary Length Fields",
      "language": "c",
      "code": "#include <stdint.h>\n#include <stddef.h>\n#include <string.h>\n\n#define MAX_PAYLOAD 4096\n\nstatic uint32_t read_u32_le(const unsigned char bytes[4]) {\n    return ((uint32_t)bytes[0]) |\n           ((uint32_t)bytes[1] << 8) |\n           ((uint32_t)bytes[2] << 16) |\n           ((uint32_t)bytes[3] << 24);\n}\n\nint parse_packet(const unsigned char *input, size_t input_len,\n                 const unsigned char **payload, size_t *payload_len) {\n    uint32_t declared_len;\n\n    if (input == NULL || payload == NULL || payload_len == NULL) {\n        return -1;\n    }\n    if (input_len < 8) {\n        return -1;\n    }\n    if (memcmp(input, \"PKT1\", 4) != 0) {\n        return -1;\n    }\n\n    declared_len = read_u32_le(input + 4);\n    if (declared_len > MAX_PAYLOAD) {\n        return -1;\n    }\n    if ((size_t)declared_len > input_len - 8) {\n        return -1;\n    }\n\n    *payload = input + 8;\n    *payload_len = (size_t)declared_len;\n    return 0;\n}"
    }
  ]
};
