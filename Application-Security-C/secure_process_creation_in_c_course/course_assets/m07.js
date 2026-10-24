window.COURSE_MODULE = {
  "title": "Privileges, Identity, and Resource Limits",
  "graphicAlt": "Reviewed setup assigns child identity and resource limits before work begins.",
  "narration": "Child processes should run with the least privilege that fits their task. If a helper only needs read access to a specific input file and write access to a specific output location, it should not inherit broader access just because the parent has it.\n\nIdentity and group context matter. Services, scheduled jobs, build agents, and containers often run under accounts that have different filesystem, network, and resource permissions from a developer shell. The launch design should specify which identity the child uses and what that identity can access.\n\nPrivilege changes, where used, require careful ordering. The parent may need to open resources, set up pipes, prepare directories, or drop access before the child begins work. Those steps should be documented and reviewed at a high level so the child does not run with more authority than needed.\n\nResource limits can protect the parent workflow and the host. Limits on time, memory, file size, process count, output size, or other resources can keep a child process from consuming more than the task requires. The exact mechanisms are platform-specific, but the design question is portable: what resources should this child be allowed to use?\n\nHigher-privilege launchers need stricter validation of lower-trust inputs. A path, option, environment variable, or working directory supplied by a less trusted source should not quietly control behavior performed with broader access. The launcher should validate before crossing that boundary.",
  "narrationPoints": [
    "Child processes should run with the least privilege that fits their task.",
    "The launch design should specify which identity the child uses and what that identity can access.",
    "The parent may need to open resources, set up pipes, prepare directories, or drop access before the child begins work.",
    "Limits on time, memory, file size, process count, output size, or other resources can keep a child process from consuming more than the task requires.",
    "The launcher should validate before crossing that boundary."
  ]
};
