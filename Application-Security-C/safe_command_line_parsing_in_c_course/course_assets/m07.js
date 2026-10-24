window.COURSE_MODULE = {
  "title": "String Length, Encoding, and Buffer Safety",
  "graphicAlt": "Input string has source-length ruler.",
  "narration": "Command-line arguments are commonly handled as C strings, and that means ordinary C string discipline still applies. The program should not assume a value will fit into an internal buffer, produce a safe formatted message, or compare correctly under unclear encoding rules.\n\nLength checks should happen before copying, formatting, or concatenation. The parser should distinguish source length from destination capacity and should preserve room for a terminating null character when an internal buffer is meant to hold a C string. A command-line value can be longer than the program author expected.\n\nFixed-size buffers need special care. If a tool copies arguments into fixed arrays, the code should define maximum accepted lengths, check them before the copy, and handle too-long values with a clear error. Silent truncation can change resource names, identifiers, paths, or mode values.\n\nEncoding and character assumptions should be documented. A tool may expect simple ASCII-like option names, UTF-8 text, path strings in the platform's usual representation, or opaque bytes carried as arguments. The parser should define what characters are allowed for each field and how whitespace or unusual bytes are handled.\n\nComparison rules also depend on the field. Some options are case-sensitive, some are not, and some should be matched only after a documented normalization step. Safe string handling keeps length, capacity, encoding, and comparison behavior aligned with the option contract.",
  "narrationPoints": [
    "The program should not assume a value will fit into an internal buffer, produce a safe formatted message.",
    "The parser should distinguish source length from destination capacity and should preserve room for a terminating null character.",
    "If a tool copies arguments into fixed arrays, the code should define maximum accepted lengths, check them before the copy.",
    "The parser should define what characters are allowed for each field and how whitespace or unusual bytes are handled.",
    "Safe string handling keeps length, capacity, encoding, and comparison behavior aligned with the option contract."
  ]
};
