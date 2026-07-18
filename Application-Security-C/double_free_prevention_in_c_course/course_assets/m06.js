window.COURSE_MODULE = {
  "title": "Aliases, Stale Pointers, and NULL Assignment",
  "graphicAlt": "Bullet summary graphic for Aliases, Stale Pointers, and NULL Assignment.",
  "narration": "Aliasing means multiple pointers can refer to the same allocation. One pointer may be the owner, another may be borrowed by a helper, another may be stored in a structure, and another may point to an element or member. When cleanup happens, the allocation's lifetime ends for all of them, not just for the variable used in the free call.\n\nSetting one pointer to NULL after cleanup can be useful locally. It can prevent accidental reuse of that specific variable and make a simple cleanup section safer to call after partial progress. However, it does not update other aliases. Any copied pointer values still exist and must be governed by the lifetime contract.\n\nThis distinction matters in real code. A structure may keep a child pointer while a temporary variable also refers to it. A callback may borrow a pointer while the owner is being torn down. A container may store an object and the caller may still have the original variable. Nulling one variable does not resolve those relationships.\n\nPointer-to-pointer cleanup can sometimes clarify caller-visible state. A destroy helper that accepts an address of the owning pointer can release the object and set the caller's owning pointer to NULL. That can be a good local convention, but it should be documented and should not be treated as a substitute for alias control.\n\nThe reliable control is lifetime discipline. Know which pointer owns the allocation, which pointers merely borrow it, when the lifetime ends, and which aliases must stop being used. NULL assignment can support that discipline, but it cannot replace it.",
  "narrationPoints": [
    "When cleanup happens, the allocation's lifetime ends for all of them, not just for the variable used in the free call.",
    "Setting one pointer to NULL after cleanup can be useful locally.",
    "A structure may keep a child pointer while a temporary variable also refers to it.",
    "A destroy helper that accepts an address of the owning pointer can release the object and set the caller's owning pointer to NULL.",
    "Know which pointer owns the allocation, which pointers merely borrow it, when the lifetime ends, and which aliases must stop being used."
  ]
};
