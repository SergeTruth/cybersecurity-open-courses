window.COURSE_MODULE = {
  "title": "Lifetime, Pointer Validity, and Ownership",
  "graphicAlt": "Bullet summary graphic for Lifetime, Pointer Validity, and Ownership.",
  "narration": "Object lifetime is the portion of execution during which an object exists and can be used according to its type and storage rules. Lifetime is not the same as the continued existence of a numeric address. A pointer value can be copied, stored, logged, or passed around after the object it once designated no longer exists.\n\nPointer validity is therefore a live condition. A pointer is safe to use only while it designates a valid object for the intended access. Dangling pointers occur when code keeps or uses a pointer after the referenced object's lifetime has ended. Returning a pointer to an automatic local object is unsafe because that object's lifetime ends when the function returns.\n\nOwnership is the practical engineering rule that says which code is responsible for preserving or releasing a resource or object. Borrowed pointers should not outlive the object they refer to. Ownership transfer should be explicit in function contracts so callers know whether they must free, retain, or stop using a pointer.\n\nCleanup paths are part of lifetime design. Error handling, early returns, partial initialization, and shutdown code should make it clear when an object's lifetime ends and which pointers must no longer be used. If multiple pointers designate related storage, cleanup should also make the aliasing relationship clear to reviewers.\n\nThe safest C interfaces communicate lifetime expectations directly. They document whether a pointer is borrowed, owned, retained, optional, mutable, read-only, or valid only until the next call. That documentation keeps memory safety from depending on hidden conventions.",
  "narrationPoints": [
    "Object lifetime is the portion of execution during which an object exists and can be used according to its type and storage rules.",
    "Returning a pointer to an automatic local object is unsafe because that object's lifetime ends.",
    "Ownership transfer should be explicit in function contracts so callers know whether they must free, retain.",
    "Error handling, early returns, partial initialization, and shutdown code should make it clear.",
    "The safest C interfaces communicate lifetime expectations directly."
  ]
};
