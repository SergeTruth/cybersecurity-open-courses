window.COURSE_MODULE = {
  "title": "Why Randomness Matters in C",
  "graphicAlt": "Three parallel use-case objects: repeatable test trace, statistically varied simulation, and unguessable access token.",
  "narration": "Randomness appears in many different parts of C programs. It can drive simulations, randomized tests, sampling, identifiers, randomized algorithms, salts, nonces, tokens, keys, and correlation values. These uses may look similar at the call site, but they do not all require the same kind of randomness.\n\nThe required quality depends on the consequence of getting the value wrong. A deterministic generator can be useful when a test needs repeatable behavior. A simulation may need statistically reasonable distribution. A security-sensitive token needs unpredictability. A nonce may need uniqueness under a specific protocol rule. A salt may need to avoid repetition without being secret.\n\nOne of the common mistakes is treating all random-looking output as equivalent. A generator that is acceptable for a local simulation may be completely inappropriate for a session identifier or key. A value that is unique enough for logging may not be unpredictable enough for authorization.\n\nC gives developers access to low-level APIs, platform calls, libraries, buffers, and integer conversions. It does not automatically choose the right randomness source. That choice belongs to the developer and should be visible in the design, documentation, and review.\n\nRandomness mistakes can cause predictable behavior, collisions, weak identifiers, unreliable tests, operational surprises, or security defects. A defensive approach begins by naming the purpose of the random value, choosing a source that matches that purpose, checking failures, and keeping test behavior separate from production behavior.",
  "narrationPoints": [
    "Randomness appears in many different parts of C programs.",
    "The required quality depends on the consequence of getting the value wrong.",
    "One of the common mistakes is treating all random-looking output as equivalent.",
    "C gives developers access to low-level APIs, platform calls, libraries, buffers, and integer conversions.",
    "Randomness mistakes can cause predictable behavior, collisions, weak identifiers, unreliable tests, operational surprises."
  ]
};
