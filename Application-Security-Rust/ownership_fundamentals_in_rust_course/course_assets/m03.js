window.COURSE_MODULE = {
  "title": "Borrowing and References",
  "graphicAlt": "Shared and mutable references grant temporary access while an owned value transfers responsibility to the function.",
  "narration": "Borrowing lets code access a value without becoming responsible for owning and cleaning it up. This is what makes Rust practical for normal programming. Not every function should take ownership of its inputs. Many functions only need to inspect data, format it, validate it, compare it, or temporarily use it while the original owner keeps responsibility.\n\nA shared reference gives read-only access to borrowed data. A function that receives a shared reference is communicating that it does not need ownership and does not intend to modify the value. That makes the function easier to call and easier to review because the caller knows the value remains available after the function returns.\n\nA mutable reference gives controlled modification. A function that receives a mutable reference is saying it needs to change the value in place, but it still does not need to own the value permanently. This is useful for updating buffers, appending to collections, adjusting state, or performing transformations that should remain attached to the original owner.\n\nBorrowing is therefore part of API design. A formatting function may take a shared reference. A validation function may inspect data without changing it. A parser may return owned data when it creates a new value. A transformation function may take a mutable reference when it should modify existing state. The signature communicates the responsibility.\n\nGood Rust APIs usually take the least powerful access that fits the task. If a function only needs to read, it should not take ownership. If it only needs temporary mutation, it should not require the caller to give up the value. These choices reduce unnecessary copies, make data flow clearer, and help reviewers understand what each function is allowed to do.",
  "narrationPoints": [
    "Borrowing lets code access a value without becoming.",
    "A shared reference gives read-only access to borrowed data.",
    "A mutable reference gives controlled modification.",
    "Borrowing is therefore part of API design.",
    "Good Rust APIs usually take the least powerful access.",
    "Not every function should take ownership of its inputs."
  ]
};
