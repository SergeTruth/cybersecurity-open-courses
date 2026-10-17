window.COURSE_MODULE = {
  "title": "Smart Pointers and API Design",
  "graphicAlt": "API parameter relationships distinguish ownership transfer, retained shared lifetime and short borrowed access.",
  "narration": "API signatures should communicate ownership expectations. When a function takes ownership, accepting std::unique_ptr by value makes the handoff visible. When a function creates an owned object for the caller, returning std::unique_ptr makes the new owner clear. When a function must retain shared ownership beyond the call, accepting or storing std::shared_ptr can be appropriate.\n\nNot every function that uses an object should receive a smart pointer. If the callee only needs temporary access, a reference or raw pointer can be clearer because it says the function is borrowing, not owning. A reference is useful for required non-null access. A raw pointer can express optional borrowed access when null has meaning. The important point is that borrowed access should not be stored unless the API explicitly promises that the owner outlives the stored use.\n\nPassing smart pointers everywhere can blur responsibility. A function that takes shared_ptr may imply retention even when it only reads the object briefly. A function that takes unique_ptr by reference may make reviewers wonder whether ownership is being transferred. Good interfaces avoid that confusion by matching parameter type to lifetime intent.\n\nDesign APIs for the caller and the reviewer. Name ownership-taking functions clearly. Document whether access may be retained. Keep nullable values explicit. Prefer small boundaries where raw legacy conventions are converted into RAII or smart pointer ownership. A clear API makes misuse harder and reduces the amount of lifetime reasoning hidden in implementation details.",
  "narrationPoints": [
    "When a function must retain shared ownership beyond the call, accepting or storing std::shared_ptr can be appropriate.",
    "If the callee only needs temporary access, a reference or raw pointer can be clearer because it says the function is borrowing, not owning.",
    "A function that takes unique_ptr by reference may make reviewers wonder whether ownership is being transferred.",
    "Good interfaces avoid that confusion by matching parameter type to lifetime intent.",
    "A clear API makes misuse harder and reduces the amount of lifetime reasoning hidden in implementation details.",
    "Prefer small boundaries where raw legacy conventions are converted into RAII or smart pointer ownership."
  ]
};
