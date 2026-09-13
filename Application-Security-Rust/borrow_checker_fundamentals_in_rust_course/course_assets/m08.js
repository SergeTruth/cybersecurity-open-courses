window.COURSE_MODULE = {
  "title": "Common Borrow Checker Errors and Refactoring Patterns",
  "graphicAlt": "Common borrow errors map to suitable refactoring options: borrowing, returning owned data, or separating access phases.",
  "narration": "Borrow checker errors are not random. They usually point to a specific relationship problem. The compiler may not describe the business intent, but it can identify that ownership moved, a borrow is still active, a reference might outlive its owner, or two parts of the code want incompatible access at the same time.\n\nA moved value error means ownership went somewhere else. The fix may be to borrow instead of move, return the value, change the API to accept a reference, or create a real independent value with a deliberate clone. The best answer depends on what responsibility the receiving code actually needs.\n\nA borrowed value does not live long enough error means a reference would remain valid longer than the owner can support. The design may need to return owned data, store the owner in a longer-lived place, avoid returning references to temporary values, or restructure the data so the lifetime relationship is true.\n\nA cannot borrow as mutable error often means shared access is still active. Multiple mutable borrow errors mean more than one part of the code wants exclusive access at the same time. These are not just syntax problems. They show where read and write phases, scopes, or responsibilities need clearer separation.\n\nUseful refactoring patterns include narrowing scopes, splitting functions, introducing domain types, returning owned values, moving mutation later, borrowing instead of taking ownership, and cloning only when ownership separation is actually the clearer design. The borrow checker is most helpful when its errors lead to simpler data flow, not just local workarounds.",
  "narrationPoints": [
    "Borrow checker errors are not random.",
    "A moved value error means ownership went somewhere else.",
    "A borrowed value does not live long enough error means.",
    "A cannot borrow as mutable error often means shared access.",
    "Useful refactoring patterns include narrowing scopes.",
    "The design may need to return owned data."
  ]
};
