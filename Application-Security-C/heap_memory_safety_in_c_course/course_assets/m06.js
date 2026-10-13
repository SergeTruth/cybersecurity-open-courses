window.COURSE_MODULE = {
  "title": "Freeing, Cleanup Paths, and Double-Free Prevention",
  "graphicAlt": "An owned allocation is released through one cleanup path; its ended lifetime blocks later access, and nulling one local pointer does not repair other aliases.",
  "narration": "Disciplined deallocation starts with a simple rule: free only memory the current code owns. A pointer parameter is not automatically owned. A borrowed reference, interior pointer, string literal, stack object, static object, or object owned by another component should not be released by the current function.\n\nCentralized cleanup can reduce duplicate logic. When a function acquires several heap objects, one cleanup section can make release order visible and keep error paths consistent. That pattern is useful only when the ownership state of each object is clear.\n\nPartial initialization needs safe teardown. If an object has several allocated fields and construction fails partway through, cleanup should release exactly the fields that were successfully acquired. Helper functions can make this easier when they accept well-defined partial states.\n\nDouble-free problems often come from unclear ownership or duplicate cleanup paths. The code may release a field in both a helper and its caller, or release the same object on two different error branches. Use-after-free problems come from continuing to use aliases after the object's lifetime ends.\n\nSetting a pointer to NULL after free can help some local cleanup patterns by making repeated local cleanup safer. It is not a complete solution. Other aliases may still point to the freed object, and the real control is lifetime discipline: make release points obvious and prevent later access by design.",
  "narrationPoints": [
    "A borrowed reference, interior pointer, string literal, stack object, static object.",
    "When a function acquires several heap objects, one cleanup section can make release order visible and keep error paths consistent.",
    "Helper functions can make this easier when they accept well-defined partial states.",
    "Use-after-free problems come from continuing to use aliases after the object's lifetime ends.",
    "Setting a pointer to NULL after free can help some local cleanup patterns by making repeated local cleanup safer."
  ]
};
