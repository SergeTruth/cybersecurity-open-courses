window.COURSE_MODULE = {
  "title": "Environment Inheritance and Child Processes",
  "graphicAlt": "A child-contract gate passes required settings to a child process and stops unneeded inherited values.",
  "narration": "When a C program launches another process, the child may inherit environment variables from the parent unless the launch is designed otherwise. This is convenient for ordinary tools, but it can be unsafe for sensitive workflows because the child may receive values that were meant only for the parent.\n\nInherited environment state can include configuration, secrets, search paths, locale settings, debugging flags, runtime options, temporary directories, and feature modes. Some of those values may change how the child behaves. Others may simply expose information that the child does not need. Both outcomes deserve attention.\n\nProcess launch code should define the child environment explicitly when the workflow is sensitive. Instead of passing everything by default, build a small environment containing the variables that are part of the child process contract. That contract should be documented so operators and reviewers understand what the child needs and why.\n\nUnsafe inherited values should be cleared or replaced before launching tools or helpers. The specific list depends on the platform and application, but the principle is consistent: do not let unrelated parent state influence a child operation that is supposed to be controlled.\n\nThis discipline also improves reliability. A child process that receives only expected variables is easier to reproduce, test, and troubleshoot. It behaves less like a product of the operator's shell or service wrapper and more like a defined component in the application design.",
  "narrationPoints": [
    "When a C program launches another process, the child may inherit environment variables from the parent unless the launch is designed otherwise.",
    "Inherited environment state can include configuration, secrets, search paths, locale settings, debugging flags.",
    "Process launch code should define the child environment explicitly when the workflow is sensitive.",
    "Unsafe inherited values should be cleared or replaced before launching tools or helpers.",
    "A child process that receives only expected variables is easier to reproduce, test, and troubleshoot."
  ]
};
