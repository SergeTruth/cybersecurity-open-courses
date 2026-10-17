window.COURSE_MODULE = {
  "title": "C Strings, std::string, and std::string_view",
  "graphicAlt": "A C string's terminator, an owning string's size and a borrowed string view's owner lifetime are distinct contracts.",
  "narration": "C++ code often contains several string representations at once. C strings are character sequences that end with a null terminator. Many older C libraries and operating system APIs depend on that convention. The convention is simple, but it relies on the terminator being present at the right place and on the receiving API understanding the buffer correctly.\n\nstd::string owns its data and tracks its size. That ownership usually makes application code easier to reason about because the string object is responsible for storage, copying, moving, and lifetime. It can contain embedded null characters, so code should not assume that the first null byte is necessarily the logical end when using modern C++ string objects.\n\nstd::string_view is different. It observes existing character data without owning it. That makes it efficient for function parameters and parsing windows, but it does not keep the referenced data alive. A view into a temporary, a local variable that has gone out of scope, or a buffer that has been modified can become misleading or unsafe.\n\nAPI signatures should communicate intent. Use owning strings when a function must keep data. Use references or views for short borrowed access when lifetime is clear. Avoid storing string views unless the owner is obvious and stable. Avoid converting short-lived data into long-lived views because the type does not enforce the lifetime for you.\n\nGood string design is less about choosing one type everywhere and more about matching the representation to ownership, lifetime, mutability, and API boundaries.",
  "narrationPoints": [
    "Many older C libraries and operating system APIs depend on that convention.",
    "std::string owns its data and tracks its size.",
    "A view into a temporary, a local variable that has gone out of scope, or a buffer that has been modified can become misleading or unsafe.",
    "Avoid converting short-lived data into long-lived views because the type does not enforce the lifetime for you.",
    "Use references or views for short borrowed access when lifetime is clear.",
    "Good string design is less about choosing one type everywhere and more about matching the representation to ownership, lifetime, mutability, and API boundaries."
  ]
};
