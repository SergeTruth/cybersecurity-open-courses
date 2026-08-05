window.COURSE_MODULE = {
  "title": "Prefer Safer C++ Abstractions",
  "graphicAlt": "Standard string, vector, array, and span abstractions replace manual allocation while retaining explicit limits and ownership at API boundaries.",
  "narration": "Modern C++ provides abstractions that reduce exposure to manual buffer mistakes. These abstractions do not make every defect impossible, but they carry more information than raw pointers alone. They also make code easier to review because ownership, size, and lifetime are often visible in the type.\n\n`std::array` is useful for fixed-size storage where the size is part of the type. It works well when capacity is known at compile time and should not change. Reviewers can see that the object owns its storage and that the number of elements is stable.\n\n`std::vector` is useful for dynamic contiguous storage. It manages allocation and deallocation through RAII, carries its size and capacity, and supports operations that keep storage ownership inside the container. Code still needs range checks and invalidation awareness, but manual allocation pressure is lower.\n\n`std::string` should generally be used for owned text data. It keeps length with the characters and manages storage. It is not a binary buffer, and it does not remove the need to understand encoding or output limits, but it is clearer than a raw character pointer for ordinary text.\n\n`std::span` is useful for bounded non-owning views. It lets an API accept a view of contiguous data without taking ownership. Because it carries a pointer and length together, it is usually easier to review than separate pointer and count parameters. The owner still has to outlive the span.\n\nRAII keeps ownership and lifetime clear. Containers, smart pointers, and small wrapper types release resources when objects leave scope. Buffer safety improves when the code does not rely on every branch manually releasing or resizing storage correctly.",
  "narrationPoints": [
    "Modern C++ provides abstractions that reduce exposure to manual buffer mistakes.",
    "Reviewers can see that the object owns its storage and that the number of elements is stable.",
    "Code still needs range checks and invalidation awareness, but manual allocation pressure is lower.",
    "Because it carries a pointer and length together, it is usually easier to review than separate pointer and count parameters.",
    "The owner still has to outlive the span.",
    "Buffer safety improves when the code does not rely on every branch manually releasing or resizing storage correctly."
  ]
};
