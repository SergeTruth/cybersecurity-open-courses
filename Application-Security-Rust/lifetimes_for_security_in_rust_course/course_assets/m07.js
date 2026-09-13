window.COURSE_MODULE = {
  "title": "Lifetimes in Collections, Iterators, Async, and Concurrency",
  "graphicAlt": "Collection borrows use clear read and mutation phases; longer-lived tasks receive owned data or deliberate shared ownership.",
  "narration": "Many real lifetime questions appear around collections. Iterators often yield references that are valid only while the collection is borrowed. Slices are borrowed views into arrays, vectors, or strings. A reference into a collection cannot outlive the collection that owns the data.\n\nMutation can also conflict with active references. If code holds a reference into a collection, mutating the collection may be unsafe or unclear because the mutation could change storage or invalidate assumptions. Rust pushes developers to separate read and write phases or use APIs that preserve safe access.\n\nAsync code adds another layer. An async task may outlive the stack frame that created it. A future may hold values across suspension points. A reference that is fine for a local synchronous helper may not be valid for work that continues later. When a task boundary is involved, owned data is often clearer.\n\nThread boundaries also make lifetime requirements visible. Data moved into a thread must live long enough for that thread. Data shared across threads usually needs owned or shared ownership patterns and appropriate synchronization. A borrowed stack reference is rarely the right shape for long-lived concurrent work.\n\nWhen references cannot live long enough, the answer may be ownership transfer, intentional cloning, shared ownership, or a different task boundary. These choices should be deliberate. The goal is not to avoid all owned data, but to match the ownership model to the real lifecycle of the work.",
  "narrationPoints": [
    "Many real lifetime questions appear around collections.",
    "Mutation can also conflict with active references.",
    "Async code adds another layer.",
    "Thread boundaries also make lifetime requirements visible.",
    "When references cannot live long enough.",
    "Rust pushes developers to separate read and write phases."
  ]
};
