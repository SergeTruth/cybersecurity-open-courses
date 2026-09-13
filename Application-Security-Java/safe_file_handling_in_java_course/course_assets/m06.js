window.COURSE_MODULE = {
  "title": "Safe Reads, Writes, Temporary Files, and Race Conditions",
  "graphicAlt": "An isolated temporary file moves from writing to complete publication, with failure cleanup, read-only code and a warning about check-then-use races.",
  "narration": "Many file bugs are timing and state bugs. The application checks one thing, then later uses a path or file that may no longer be the same. Read and write only within approved locations, and avoid read-modify-write logic that can be confused by concurrent requests unless the workflow is designed for it. If multiple users, workers, or jobs can touch the same record, the file operation should be coordinated with the application's state model.\n\nTemporary files deserve deliberate design. Use safe temporary directories and generated temporary names. Java temporary-file APIs or platform-provided mechanisms are usually better than predictable filenames. Temporary locations should be isolated, access-controlled, monitored, and cleaned up after success, failure, timeout, or cancellation. A temporary file that persists longer than expected can become a data exposure or storage exhaustion problem.\n\nBe careful with symlinks, hard links, rename operations, move operations, and assumptions that a path still points to the same file later. Avoid separate check-then-use patterns when a file could change between the check and the operation. Where appropriate, use atomic write or replace patterns so readers do not see partially written output. Generated reports, cache entries, and export files should avoid collisions and incomplete states.\n\nWritable locations should be narrow and intentional. Do not write user-controlled data into executable directories, source directories, deployment directories, dependency directories, classpath locations, or public web roots unless the design explicitly requires public static content and has compensating controls. The Java process should not need broad write access simply because one feature generates a file.",
  "narrationPoints": [
    "Many file bugs are timing and state bugs.",
    "Temporary files deserve deliberate design.",
    "Be careful with symlinks.",
    "Writable locations should be narrow and intentional.",
    "Use safe temporary directories and generated temporary.",
    "Temporary locations should be isolated."
  ]
};
