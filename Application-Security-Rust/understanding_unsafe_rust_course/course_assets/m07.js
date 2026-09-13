window.COURSE_MODULE = {
  "title": "Building Safe Abstractions Around Unsafe Internals",
  "graphicAlt": "A validated constructor and a restricted safe public API protect unsafe internals; a typestate example permits use only in the ready state.",
  "narration": "One of the best uses of unsafe Rust is to implement an abstraction that callers can use safely. The unsafe code may be necessary internally, but the public API should make invalid use difficult or impossible. That is the difference between unsafe as a controlled implementation detail and unsafe as a burden pushed onto every caller.\n\nEncapsulation protects invariants. If a type depends on a buffer being initialized, a pointer remaining valid, or a state transition happening in a certain order, the public interface should preserve those rules. Limited visibility, constructor validation, ownership-aware methods, and explicit lifetime relationships can help keep the contract intact.\n\nType-state patterns can be useful when a value moves through phases. Instead of storing a flag that callers must interpret correctly, the API can represent the phase in the type. That can prevent operations from being called before initialization or after closure. The goal is to let the compiler enforce more of the safety story.\n\nA safe wrapper is only valid if it prevents safe callers from violating the assumptions required by the unsafe internals. Review should ask whether ordinary safe code can accidentally produce an invalid state, create aliasing that the internals cannot handle, misuse a lifetime, or bypass validation through a public method.\n\nThe review question is not only whether the unsafe block is correct today. It is also whether tomorrow's maintainer can change nearby code without breaking the contract. Good abstractions make the unsafe assumption local, documented, tested, and hard to violate accidentally.",
  "narrationPoints": [
    "One of the best uses of unsafe Rust is to implement.",
    "Encapsulation protects invariants.",
    "Type-state patterns can be useful.",
    "A safe wrapper is only valid if it prevents safe callers.",
    "The review question is not only whether the unsafe block is.",
    "The unsafe code may be necessary internally."
  ]
};
