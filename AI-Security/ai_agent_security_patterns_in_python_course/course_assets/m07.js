window.COURSE_MODULE = {
  "title": "Sandboxing, Execution, and Boundary Controls",
  "graphicAlt": "Illustration for a lesson on sandboxing, execution, and boundary controls for agents.",
  "narration": "Agents that can execute code, write files, browse, query databases, call APIs, or run subprocesses need stronger boundaries than agents that only draft text. Sandboxing concepts help limit what agent-controlled operations can affect. The exact technology depends on the environment, but the stable principle is to reduce available authority: constrain files, network destinations, credentials, execution time, output size, storage, and side effects.\n\nFile and workspace boundaries should be explicit. A tool that reads a project directory should not automatically read every file on the host. A tool that writes reports should not overwrite unrelated paths. Temporary workspaces, read-only modes, allowed directories, file type limits, and cleanup rules reduce accidental or unsafe effects. The agent should not receive broad filesystem access merely because one task needs a narrow file operation.\n\nNetwork and execution boundaries matter just as much. Destination allowlists, service-specific clients, request timeouts, response size limits, and rate controls help prevent uncontrolled outbound behavior. Subprocess, shell, code execution, browser automation, and database query tools should be treated as high-risk capabilities at a conceptual level. They need strong argument validation, isolation, observability, and review, especially when the input comes from natural language or retrieved content.\n\nSecret exposure is a common boundary failure. Environment variables, API keys, tokens, local credentials, and service metadata should not be casually available to agent-controlled tools. If a tool needs a credential, provide the narrow credential for that tool and operation, not a general runtime secret bundle. Good boundary controls make the safe path easy: least privilege, short timeouts, limited outputs, explicit destinations, and clear logs for what the agent attempted.",
  "narrationPoints": [
    "Agents that can execute code.",
    "File and workspace boundaries should be explicit.",
    "Network and execution boundaries matter just as much.",
    "Secret exposure is a common boundary failure.",
    "Sandboxing concepts help limit what agent-controlled.",
    "A tool that reads a project directory should not."
  ]
};
