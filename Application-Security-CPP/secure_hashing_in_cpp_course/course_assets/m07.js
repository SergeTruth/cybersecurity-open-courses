window.COURSE_MODULE = {
  "title": "Streaming, Files, and Large Data",
  "graphicAlt": "Hashing workflow for Streaming, Files, and Large Data, tracing canonical input through an approved cryptographic provider to versioned digest metadata, bounded verification, and a documented acceptance or migration decision.",
  "narration": "Secure hashing often involves large files, network streams, backups, update packages, or logs. Loading all data into memory may be unnecessary, inefficient, or unsafe. Incremental hashing lets a program process data in chunks while updating a hash context. This is a good fit for C++ when resource ownership and error handling are explicit.\n\nEvery read matters. A partial read, truncated file, stream error, file change, or failed close can invalidate the result. Verification code should not silently accept a digest from incomplete data. File metadata is also not the same as file content. If size, name, permissions, timestamp, or other metadata is part of the security decision, the design must say so and include it in a documented representation.\n\nRAII should manage file handles, buffers, and hashing context cleanup. The code should define what happens when input changes during hashing, when the expected digest has the wrong format, when the algorithm is unsupported, or when a read fails. Hash verification should fail safely and report enough diagnostic context to fix the problem without exposing sensitive data. Large-data hashing is not just a loop; it is an integrity workflow with error paths. Teams should test interruption, short reads, renamed files, and storage failures because those are the cases most likely to separate a robust verifier from a fragile one.",
  "narrationPoints": [
    "Secure hashing often involves large files, network streams, backups, update packages, or logs.",
    "A partial read, truncated file, stream error, file change, or failed close can invalidate the result.",
    "If size, name, permissions, timestamp, or other metadata is part of the security decision, the design must say so and include it in a documented representation.",
    "The code should define what happens when input changes during hashing, when the expected digest has the wrong format, when the algorithm is unsupported, or when a read fails.",
    "RAII should manage file handles, buffers, and hashing context cleanup.",
    "Teams should test interruption, short reads, renamed files, and storage failures because those are the cases most likely to separate a robust verifier from a fragile one."
  ]
};
