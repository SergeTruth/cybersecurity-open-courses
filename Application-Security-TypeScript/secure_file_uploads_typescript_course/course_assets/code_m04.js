window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "This conceptual image adapter describes required behavior without inventing APIs for a particular decoder. Each helper must enforce the stated limits and reject unsupported or ambiguous formats.",
  "codeExamples": [
    {
      "title": "Publish a controlled representation",
      "language": "typescript",
      "blurb": "Recognition is only an identification signal. The decoder must enforce input, dimension, pixel, frame, and resource budgets during processing. The encoder retains only allowed metadata, bounds output size, and creates the bytes whose classification will be stored.",
      "code": "const candidate = await identifyContent(stagedObject);\nrequireSupportedImage(candidate, policy);\n\nconst decoded = await decodeWithinImageBudget(stagedObject, {\n  maxWidth: policy.maxWidth,\n  maxHeight: policy.maxHeight,\n  maxPixels: policy.maxPixels,\n  maxFrames: 1\n});\n\nconst output = await encodeControlledPng(decoded, {\n  keepMetadata: false,\n  maxOutputBytes: policy.maxOutputBytes\n});\nawait validateDerivedOutput(output);\n// Persist the exact output with server-selected image/png metadata.\n// Dispose decoded resources and staging on success or failure.\n// Re-encoding selected images is not a sanitizer for arbitrary files."
    }
  ]
};
