window.COURSE_MODULE = {
  "title": "Packages, Updates, and Trusted Software",
  "graphicAlt": "Conceptual visual of trusted repositories, packages, updates, software inventory, and patch planning.",
  "narration": "Linux systems depend on packages, repositories, and updates. A package manager makes it easier to install, upgrade, verify, and remove software, but it does not remove the need for judgment. The sources configured on a system shape what software can be installed and trusted. Official repositories, approved internal mirrors, and reviewed third-party sources are very different from random downloads, copied binaries, or scripts from an unknown location.\n\nUpdates reduce risk from known vulnerabilities and defects. They also change systems, which means patching needs planning. A production database server, a cloud image, a container host, and a personal lab machine may all need different rollout schedules. The common principles are inventory, testing, maintenance windows, backups, rollback options, and documentation of exceptions. An exception should have an owner and a review date, not become permanent because it was inconvenient once.\n\nUnused packages deserve attention. Software that is installed but not needed still takes storage, receives updates, may create services, and may increase exposure. Removing unused packages can simplify the system, but it should be done with the same care as any other change. Administrators should understand dependencies and validate that business functions still work.\n\nTrusted software is also about visibility. Teams need to know what is installed, which repository or source provided it, when it was last updated, and whether unsupported or abandoned components remain. Linux security is not achieved by updating blindly. It is achieved by maintaining software through a controlled process that reduces known risk while protecting availability.",
  "narrationPoints": [
    "Packages and repositories shape system trust.",
    "Updates reduce known software risk.",
    "Untrusted sources can introduce serious exposure.",
    "Unused packages should be reviewed and removed.",
    "Patch rollout needs testing and rollback planning."
  ]
};
