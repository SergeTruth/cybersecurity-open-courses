window.COURSE_MODULE = {
  "title": "Temporaries, Views, and Lifetime Extension Traps",
  "graphicAlt": "Temporary-string timeline showing a short-lived source, immediate string_view consumption, and an owned ComponentName retained afterward.",
  "narration": "Many modern C++ lifetime defects involve non-owning views and temporary objects. std::string_view and std::span are excellent tools when the underlying storage outlives the view. They are dangerous when the view is stored or returned without a clear guarantee that the referenced data remains alive.\n\nA view should be understood as borrowed access. It does not own the characters, elements, or bytes it describes. If the source is a temporary string, a local vector, a transformed buffer, or data inside a container that may later reallocate, the view can outlive the data unless the design prevents it.\n\nReferences to temporaries and returned references require close review. Some C++ lifetime extension rules are helpful, but they do not make every reference safe to store. A function should not return a reference, pointer, span, or string view to data whose lifetime ends with the function call.\n\nCallbacks, lambdas, and asynchronous work make lifetime reasoning harder because execution may happen later. Capturing a local variable by reference is safe only while the referenced object remains alive and the callback cannot run afterward. Deferred execution should prefer owned captures or explicit lifetime coordination.\n\nWhen lifetime is uncertain, prefer owned data, shared ownership when truly required, weak observation with a check before use, or a design that makes coordination visible. Borrowed views are safest when used briefly and locally. The longer a borrowed view is stored, the stronger its contract needs to be.",
  "narrationPoints": [
    "Many modern C++ lifetime defects involve non-owning views and temporary objects. std::string_view and std::span are excellent tools when the underlying storage outlives the view.",
    "It does not own the characters, elements, or bytes it describes.",
    "References to temporaries and returned references require close review.",
    "Callbacks, lambdas, and asynchronous work make lifetime reasoning harder because execution may happen later.",
    "Deferred execution should prefer owned captures or explicit lifetime coordination.",
    "The longer a borrowed view is stored, the stronger its contract needs to be."
  ]
};
