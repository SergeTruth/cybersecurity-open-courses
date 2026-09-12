window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These excerpts illustrate upload-boundary responsibilities. The first is deliberately unsafe; the second names conceptual application adapters, not a complete framework implementation.",
  "codeExamples": [
    {
      "title": "Unsafe: client metadata chooses the write target",
      "language": "typescript",
      "blurb": "Neither path.join nor a TrustedUpload assertion validates filenames, destinations, bytes, overwrite policy, or future delivery.",
      "code": "// Deliberately unsafe boundary.\nconst upload = req.file as TrustedUpload;\nawait fs.writeFile(\n  path.join(uploadDir, upload.originalname),\n  upload.buffer\n);"
    },
    {
      "title": "Keep publication behind required checks",
      "language": "typescript",
      "blurb": "Conceptual flow: the receive helper enforces actual-byte and multipart limits while writing to restricted staging. The validator operates on that exact staged object. Promotion rechecks permissions and copies or retains only approved content; the helpers must implement cleanup on failure.",
      "code": "const target = await requireUploadPermission(auth, resourceId);\nconst staged = await receiveBoundedIntoQuarantine(request, policy);\nconst checked = await validateExpectedFile(staged, policy);\nawait performRequiredChecks(checked, policy);\nawait promoteExactCheckedObject(auth, target, checked);\n// Receiving or storing bytes does not imply publication."
    }
  ]
};
