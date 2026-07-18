window.COURSE_MODULE = {
  "title": "Detecting Double-Free Risks",
  "graphicAlt": "Bullet summary graphic for Detecting Double-Free Risks.",
  "narration": "Tools help detect double-free risks, but they do not replace ownership design. Compiler warnings can draw attention to suspicious control flow, ignored return values, inconsistent types, and cleanup paths that deserve review. They are signals that the contract may be unclear or incomplete.\n\nStatic analysis can flag suspicious ownership paths, repeated release patterns, missing null checks, leaks, and failure paths that do not match the success path. Analysis works best when code expresses ownership and state clearly enough for a tool and a reviewer to follow.\n\nRuntime diagnostics such as AddressSanitizer-style checks, debug allocators, and leak detection can reveal memory-management defects during tests that exercise the relevant path. A diagnostic finding should lead back to the ownership contract: who believed they owned the allocation, and why did the code permit a second release?\n\nTests should cover success, validation failure, allocation failure, partial construction failure, container insertion failure, ownership transfer, repeated cleanup attempts where the API permits them, and destroy behavior for optional members. Regression tests should be added when cleanup bugs are fixed so the corrected contract remains visible.\n\nCode review is the place where design and evidence meet. Reviewers should trace each allocation from creation to transfer to cleanup, ask whether aliases remain valid, and verify that each branch releases owned memory exactly once. Tools reveal symptoms; review confirms the intended lifetime model.",
  "narrationPoints": [
    "Tools help detect double-free risks, but they do not replace ownership design.",
    "Static analysis can flag suspicious ownership paths, repeated release patterns, missing null checks, leaks.",
    "A diagnostic finding should lead back to the ownership contract: who believed they owned the allocation.",
    "Tests should cover success, validation failure, allocation failure, partial construction failure, container insertion failure.",
    "Reviewers should trace each allocation from creation to transfer to cleanup, ask whether aliases remain valid."
  ]
};
