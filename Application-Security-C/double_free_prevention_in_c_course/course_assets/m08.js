window.COURSE_MODULE = {
  "title": "Defensive Deallocation Patterns",
  "graphicAlt": "Bullet summary graphic for Defensive Deallocation Patterns.",
  "narration": "Defensive deallocation patterns make cleanup behavior boring and reviewable. Start by initializing ownership fields before use. A null pointer, count value, state flag, or ownership marker should have a defined meaning before any cleanup path can observe it. That helps failure paths release only what was actually acquired.\n\nSeparate owned data from borrowed data. If a structure stores both, naming and comments should make the difference visible. For example, an owned copy has different cleanup behavior from a borrowed view. A destroy function should not have to guess which case applies for a field.\n\nDestroy behavior should be consistent. A destroy function should document what it frees, what it leaves alone, what state it expects, and whether the caller may pass a null pointer. If repeated calls are valid for a particular cleanup helper, say so and implement that behavior deliberately. If repeated calls are not valid, document that too.\n\nAvoid hidden frees and surprising side effects. A function that sounds like it only removes an item from a container should document whether it also destroys the item. A setter that replaces a field should document whether it frees the previous value, borrows the new value, or takes ownership of the new value.\n\nThe strongest pattern is explicitness. Cleanup helpers, state transitions, and ownership names should make it hard for one allocation to be released from two authorities. Defensive deallocation is less about clever code and more about code whose cleanup story is easy to verify.",
  "narrationPoints": [
    "A null pointer, count value, state flag, or ownership marker should have a defined meaning before any cleanup path can observe it.",
    "If a structure stores both, naming and comments should make the difference visible.",
    "A destroy function should document what it frees, what it leaves alone, what state it expects.",
    "A setter that replaces a field should document whether it frees the previous value, borrows the new value.",
    "Cleanup helpers, state transitions, and ownership names should make it hard for one allocation to be released from two authorities."
  ]
};
