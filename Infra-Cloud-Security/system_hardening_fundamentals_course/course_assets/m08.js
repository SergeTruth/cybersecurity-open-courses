window.COURSE_MODULE = {
  "title": "Change Control, Validation, and Exceptions",
  "graphicAlt": "Conceptual visual of change windows, validation checks, rollback plans, and tracked exceptions.",
  "narration": "Hardening changes can affect production systems, so they need controlled rollout. A change may remove software, adjust local permissions, modify remote access, enable endpoint protection features, change logging, or apply a new baseline. Even defensive changes can break workflows if they are pushed without testing. Use maintenance windows, peer review, pilot groups, staged deployment, backups, and rollback plans when the risk warrants it.\n\nValidation confirms that controls are applied and still working. After a change, verify expected configuration, endpoint agent health, log delivery, application function, user experience, backup status, and any monitoring signals. Validation should be specific enough to catch failure, not just a quick statement that the change was completed. Evidence matters because configuration drift is common.\n\nExceptions are sometimes necessary. A legacy application may require an older package. A specialized device may not support the preferred endpoint agent. A production system may need a delayed patch because of vendor dependency. Exceptions should have owners, reasons, compensating controls, expiration dates, and review schedules. A documented exception is a managed risk. An forgotten exception becomes drift.\n\nChange control supports safe improvement. It gives teams a shared record of what changed, why it changed, who approved it, how it was tested, how it can be reversed, and what should be reviewed later. Hardening programs earn trust when they improve security while respecting availability and recovery.",
  "narrationPoints": [
    "Hardening changes need controlled rollout.",
    "Backups and rollback protect availability.",
    "Validation confirms controls are working.",
    "Exceptions need owners, reasons, and review dates.",
    "Change control supports safe improvement."
  ]
};
