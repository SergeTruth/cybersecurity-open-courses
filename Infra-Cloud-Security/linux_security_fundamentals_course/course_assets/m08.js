window.COURSE_MODULE = {
  "title": "Backups, Recovery, and Change Control",
  "graphicAlt": "Conceptual visual of backups, restore testing, change windows, rollback plans, and recovery readiness.",
  "narration": "Security includes the ability to recover. A Linux system can be well configured and still suffer from hardware failure, accidental deletion, bad updates, ransomware, operator mistakes, failed deployments, or damaged configuration. Backups reduce the impact of those events. They protect data, configuration, and sometimes whole system states, depending on the recovery needs of the environment.\n\nA backup is only useful if it can be restored. Restore testing proves that the backup contains the right data, that procedures are understood, that permissions and ownership can be recovered correctly, and that recovery time is realistic. Teams should know what is backed up, where it is stored, how long it is retained, who can access it, and what would happen if the primary system were unavailable.\n\nChange control protects availability. It is not paperwork for its own sake. It gives administrators a way to plan risky work, communicate timing, check dependencies, confirm backups, document expected impact, and define rollback steps. Hardening changes can be valuable, but they can also break applications when assumptions are wrong. A change window and rollback plan make security work safer.\n\nExceptions should also be tracked. A system might miss a patch because an application vendor has not certified it, or a firewall rule might remain open for a temporary migration. Those decisions should have owners, expiration dates, and validation. Recovery readiness ties the course together: least privilege, patching, monitoring, and hardening all matter more when the team can reverse mistakes and restore service.",
  "narrationPoints": [
    "Security includes the ability to recover.",
    "Backups protect against mistakes and failures.",
    "Restore testing proves backups are usable.",
    "Change control protects availability.",
    "Rollback plans make hardening safer."
  ]
};
