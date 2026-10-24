window.COURSE_MODULE = {
  "title": "The argc and argv Mental Model",
  "graphicAlt": "Argument-list object with count marker and string-pointer cards enters parser, resulting in validated internal configuration.",
  "narration": "C programs commonly receive command-line data through argc and argv. argc tells the program how many argument entries are available. argv provides pointers to argument strings. That model is simple, but it should not be confused with validation. Delivery by the operating environment does not prove that an argument has the expected meaning.\n\nEach argv entry is presented as a C string for the program to interpret. The program still needs to consider length, null termination expectations, encoding assumptions, and how the value will be copied, compared, parsed, or passed into internal logic. Treat the argument as input, not as a trusted internal object.\n\nThe first argument is often treated as the program name, but assumptions can vary by environment and launcher. Code should avoid depending on the program-name value for security-sensitive decisions or precise behavior unless the surrounding platform contract is understood and reviewed.\n\nPlatform and command processor behavior can affect how arguments are split, quoted, encoded, and delivered. A defensive parser should focus on the values it actually receives and should document its own accepted forms instead of assuming every launcher will represent input the same way.\n\nPointer validity also has a scope. argv entries are valid during program execution under the normal startup contract, but copying those pointers into longer-lived or asynchronous contexts still needs lifetime review. A parser should produce a validated internal configuration rather than spreading raw argument pointers throughout the program.",
  "narrationPoints": [
    "Delivery by the operating environment does not prove that an argument has the expected meaning.",
    "Treat the argument as input, not as a trusted internal object.",
    "The first argument is often treated as the program name, but assumptions can vary by environment and launcher.",
    "Platform and command processor behavior can affect how arguments are split, quoted, encoded, and delivered.",
    "A parser should produce a validated internal configuration rather than spreading raw argument pointers throughout the program."
  ]
};
