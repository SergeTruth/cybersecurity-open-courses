window.COURSE_CODE_MODULE = {
  "title": "Links, Races, and File Identity",
  "codeIntro": "Once a sensitive file object is opened through platform policy, validation and use should operate on that same handle instead of resolving path text again.",
  "codeExamples": [
    {
      "title": "Validate and use one open file object",
      "language": "c",
      "blurb": "The example uses one already-open handle and a length-framed record, so replacing a longer record cannot make stale trailing bytes part of the new logical record.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <stdio.h>\n#include <string.h>\n\nstatic bool store_record(FILE *opened_file, const unsigned char *data,\n                         size_t length)\n{\n    unsigned char stored_length;\n\n    if (opened_file == NULL || data == NULL || length == 0 || length > 8) {\n        return false;\n    }\n    if (fseek(opened_file, 0L, SEEK_SET) != 0) {\n        return false;\n    }\n    stored_length = (unsigned char)length;\n\n    /* IMPORTANT FIX: one-byte framing defines the complete logical record. */\n    if (fwrite(&stored_length, 1, 1, opened_file) != 1 ||\n        fwrite(data, 1, length, opened_file) != length ||\n        fflush(opened_file) != 0) {\n        return false;\n    }\n    return true;\n}\n\nint main(void)\n{\n    FILE *file = tmpfile();\n    const unsigned char old_record[8] = {\n        'o', 'l', 'd', '-', 'd', 'a', 't', 'a'\n    };\n    const unsigned char accepted[] = {'r', 'e', 'c', 'o', 'r', 'd'};\n    const unsigned char oversized[9] = {0};\n    unsigned char stored_length = 0;\n    unsigned char readback[sizeof accepted] = {0};\n\n    assert(file != NULL);\n    assert(!store_record(file, oversized, sizeof oversized));\n    assert(store_record(file, old_record, sizeof old_record));\n    assert(store_record(file, accepted, sizeof accepted));\n    assert(fseek(file, 0L, SEEK_SET) == 0);\n    assert(fread(&stored_length, 1, 1, file) == 1);\n    assert(stored_length == sizeof accepted);\n    assert(fread(readback, 1, stored_length, file) == stored_length);\n\n    /* TEST: the logical record excludes stale bytes from the old record. */\n    assert(memcmp(readback, accepted, sizeof accepted) == 0);\n    assert(fclose(file) == 0);\n    return 0;\n}\n"
    }
  ]
};
