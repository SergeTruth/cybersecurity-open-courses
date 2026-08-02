window.COURSE_MODULE = {
  "title": "Course Summary and Key Takeaways",
  "graphicAlt": "Summary diagram for Course Summary and Key Takeaways, showing upload stream, quarantine directory, content validator, private storage, authorization gate, and download response; labeled arrows identify file lifecycle and isolation controls and the point where unsafe input or behavior is rejected.",
  "narration": "Safe file handling in Python requires treating paths, filenames, file contents, metadata, permissions, and storage locations as security-relevant. Files cross trust boundaries in web applications, APIs, scripts, data pipelines, automation, and background workers. A file is not safe because it has a familiar name, a common extension, or came from an internal workflow.\n\nStrong designs constrain file access to intended locations, generate safe server-side names, validate content for its intended use, protect uploads, manage permissions, separate storage areas, and avoid unsafe parsing. They also handle temporary files carefully, stream or limit large files, avoid accidental overwrite, and protect what happens when files are served back to users.\n\nFrameworks and libraries can help, but they do not replace ownership and design. Developers still need to decide what files are allowed, where they live, who can access them, how they are parsed, how long they remain, and what evidence is logged. Security reviewers need to understand the workflow, the trust boundary, and the downstream processing.\n\nThe goal is not to fear files. The goal is to make file operations explicit, bounded, authorized, validated, logged, tested, and maintainable. When file handling is designed as part of the application rather than added as an afterthought, Python systems become safer, easier to operate, and easier to review.",
  "narrationPoints": [
    "Safe file handling in Python requires treating paths, filenames, file contents, metadata, permissions, and storage locations as security-relevant.",
    "Files cross trust boundaries in web applications, APIs, scripts, data pipelines, automation, and background workers.",
    "A file is not safe because it has a familiar name, a common extension, or came from an internal workflow.",
    "Security reviewers need to understand the workflow, the trust boundary, and the downstream processing.",
    "The goal is to make file operations explicit, bounded, authorized, validated, logged, tested, and maintainable.",
    "The goal is not to fear files."
  ]
};
