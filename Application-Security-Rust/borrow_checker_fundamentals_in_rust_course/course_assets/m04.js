window.COURSE_MODULE = {
  "title": "Borrow Scope and Non-Lexical Lifetimes",
  "graphicAlt": "A borrow ends after its last use, allowing inspection and mutation to occur in separate phases.",
  "narration": "A borrow does not always last until the end of the visible block. Modern Rust can often end a borrow after the last actual use of the reference. This behavior is commonly discussed as non-lexical lifetimes. The practical result is that many natural code patterns compile because the compiler can see when the reference is no longer needed.\n\nEven with that help, developers should design code so borrows are clear and short. A long-lived reference can block later mutation or movement because the compiler must protect the borrowed value while the reference might still be used. The longer a borrow remains active, the more likely it is to collide with another operation.\n\nSmaller scopes are often the simplest fix. A temporary reference can be used inside a narrow block, then released before the code mutates the original value. A lookup can produce an owned result or a simple decision, and the mutation can happen afterward. This makes the sequence of access easier for both humans and the compiler to understand.\n\nSplitting read and write phases is another common pattern. First inspect the data and decide what should happen. Then, after the read borrows have ended, apply the modification. This is especially useful in services, parsers, state machines, and collection-heavy code where one operation needs information before it mutates state.\n\nThe goal is not to perform clever lifetime tricks. The goal is to make references last only as long as they serve a real purpose. If a borrow checker error says a value is still borrowed, ask whether the reference is being held longer than necessary. Often the cleanest answer is to restructure the code so access boundaries match the program's intent.",
  "narrationPoints": [
    "A borrow does not always last until the end of the visible.",
    "Even with that help, developers should design code.",
    "Smaller scopes are often the simplest fix.",
    "Splitting read and write phases is another common pattern.",
    "The goal is not to perform clever lifetime tricks.",
    "Modern Rust can often end a borrow."
  ]
};
