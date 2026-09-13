window.COURSE_MODULE = {
  "title": "Length, Capacity, Allocation, and Resource Safety",
  "graphicAlt": "Vector length counts initialized elements, capacity covers reserved storage, and allocation sizes need checked limits.",
  "narration": "Rust's safe abstractions help prevent buffer overflows, but safe programs still need resource discipline. A program can avoid memory corruption and still fail because it accepts too much input, allocates too much memory, performs too much parsing work, or waits too long on a malformed request.\n\nLength and capacity are different concepts. Length describes how much data is currently present. Capacity describes how much storage has been allocated or can be used before growth. Confusing those ideas can lead to flawed assumptions about what data exists, what can be written, or what a downstream API expects.\n\nUntrusted size values deserve review. Network lengths, file sizes, protocol fields, database values, and platform API results may need validation before they influence allocation or parsing. Defensive code sets maximums, rejects unsupported sizes, and avoids assuming that every conversion between integer types is safe or meaningful.\n\nInteger sizing and conversions are common boundary issues. A value may be signed in one place and unsigned in another. A platform type may be wider or narrower than an application type. A length may represent bytes, characters, elements, or records. Reviewers should ask what the unit is and whether the value has been checked before use.\n\nExplicit limits are part of secure design. Set maximum request sizes, maximum field sizes, maximum record counts, and timeout expectations where appropriate. When a limit is exceeded, fail safely with a clear error. Resource safety complements memory safety by protecting availability and operational stability.",
  "narrationPoints": [
    "Rust's safe abstractions help prevent buffer overflows.",
    "Length and capacity are different concepts.",
    "Untrusted size values deserve review.",
    "Integer sizing and conversions are common boundary issues.",
    "Explicit limits are part of secure design.",
    "Reviewers should ask what the unit is and whether the value."
  ]
};
