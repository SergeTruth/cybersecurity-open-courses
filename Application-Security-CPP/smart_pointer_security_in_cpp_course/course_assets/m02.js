window.COURSE_MODULE = {
  "title": "Ownership Models in Modern C++",
  "graphicAlt": "Value, exclusive and shared ownership are separated from non-owning observation and short borrowed access.",
  "narration": "Before choosing a smart pointer, choose the ownership model. Exclusive ownership means one object or component is responsible for an object's lifetime. That model is simple to reason about because cleanup has a clear owner. Shared ownership means more than one owner participates in keeping the object alive. It is useful in some object graphs and asynchronous designs, but it also makes lifetime harder to see.\n\nWeak observation is different from ownership. A weak observer can check whether a shared object still exists without keeping it alive. This is valuable when callbacks, caches, parent-child relationships, or registries need a reference that should not control destruction. Borrowed access is also non-owning, but it is usually shorter lived: a function temporarily uses an object owned somewhere else and must not store that access beyond the contract.\n\nValue ownership is often the safest and simplest option. If an object can be a direct member, local variable, or element in a standard container, no dynamic smart pointer may be needed at all. Value ownership gives construction, destruction, and copying behavior that is often easier to inspect than a heap allocation hidden behind a pointer.\n\nSecurity review should resist pointer selection by habit. Do not use std::shared_ptr because passing it around feels convenient. Do not use std::unique_ptr when the real design requires stable shared lifetime. Do not use raw pointers to hide ownership. The type should follow the actual lifetime relationship, and ambiguous ownership should be treated as a maintainability and safety risk.",
  "narrationPoints": [
    "Shared ownership means more than one owner participates in keeping the object alive.",
    "Before choosing a smart pointer, choose the ownership model.",
    "Borrowed access is also non-owning, but it is usually shorter lived: a function temporarily uses an object owned somewhere else and must not store that access beyond the contract.",
    "Value ownership gives construction, destruction, and copying behavior that is often easier to inspect than a heap allocation hidden behind a pointer.",
    "The type should follow the actual lifetime relationship, and ambiguous ownership should be treated as a maintainability and safety risk.",
    "Security review should resist pointer selection by habit."
  ]
};
