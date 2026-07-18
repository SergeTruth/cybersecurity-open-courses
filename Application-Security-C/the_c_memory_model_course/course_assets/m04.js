window.COURSE_MODULE = {
  "title": "Effective Type, Aliasing, and Alignment",
  "graphicAlt": "Bullet summary graphic for Effective Type, Aliasing, and Alignment.",
  "narration": "The effective type rules help define which lvalue types may be used to access an object. These rules matter because C compilers use type and aliasing assumptions when optimizing code. If code accesses storage through an incompatible type, the program may no longer mean what the developer intended in portable C.\n\nAliasing mistakes are often subtle. Two pointers can appear to refer to the same bytes, but the language may not allow access through the chosen types. Character types have special access rules for inspecting object representation, yet that does not mean arbitrary type punning is safe or that every byte sequence is a valid object of another type.\n\nAlignment requirements are another part of valid access. Some object types must be accessed at suitably aligned addresses. Casting a pointer changes the pointer type in the source code, but it does not guarantee that the pointed-to storage is correctly aligned or valid for the target type.\n\nSafer designs avoid casual pointer reinterpretation. Use explicit serialization when data crosses a file, wire, or storage boundary. Use byte movement where appropriate and then create real objects through well-defined APIs. Keep object ownership and representation decisions separate so reviewers can see what is raw data and what is a typed object.\n\nA good review asks which object is being accessed, what its effective type is, whether the access type is permitted, whether the address is suitably aligned, and whether any compiler aliasing assumption could be invalidated by the code. That discipline keeps low-level code portable and reviewable.",
  "narrationPoints": [
    "The effective type rules help define which lvalue types may be used to access an object.",
    "Two pointers can appear to refer to the same bytes, but the language may not allow access through the chosen types.",
    "Alignment requirements are another part of valid access.",
    "Keep object ownership and representation decisions separate so reviewers can see what is raw data and what is a typed object.",
    "A good review asks which object is being accessed, what its effective type is, whether the access type is permitted."
  ]
};
