window.COURSE_MODULE = {
  "title": "Ownership and Lifetime Contracts",
  "graphicAlt": "Owned references carry release responsibility, borrowed references are limited by a contract, and transfers move the responsibility with the object.",
  "narration": "Every heap allocation needs a clear owner. The owner is the code responsible for eventually releasing the object or transferring that responsibility. Without an owner, cleanup becomes guesswork. With multiple informal owners, release can happen too early, too late, or more than once.\n\nC APIs often pass pointers in several roles. A caller-owned pointer may be read or modified without changing ownership. A callee-owned result may need to be freed by the caller. A borrowed pointer may be valid only during a call. An output parameter may receive newly allocated memory. Each role needs a clear contract.\n\nOwnership transfer should be explicit at API boundaries. Function names, comments, documentation, and parameter conventions should make it obvious whether the caller must free the result, whether the callee consumes an input pointer, or whether a pointer remains borrowed. Hidden ownership rules are difficult to review.\n\nReturned heap objects and output parameters are common sources of confusion. A function that fills an output pointer should define what happens on success, failure, and partial initialization. It should also define whether the output is unchanged on failure or whether cleanup is required.\n\nReviewers should be able to trace each allocated object from allocation to release. If that trace requires remembering private conventions across many files, the API needs a clearer ownership design.",
  "narrationPoints": [
    "With multiple informal owners, release can happen too early, too late.",
    "A caller-owned pointer may be read or modified without changing ownership.",
    "Function names, comments, documentation, and parameter conventions should make it obvious whether the caller must free the result.",
    "A function that fills an output pointer should define what happens on success, failure, and partial initialization.",
    "If that trace requires remembering private conventions across many files, the API needs a clearer ownership design."
  ]
};
