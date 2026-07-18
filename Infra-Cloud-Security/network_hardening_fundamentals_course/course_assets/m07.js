window.COURSE_MODULE = {
  "title": "Patching, Baselines, and Change Control",
  "graphicAlt": "Conceptual visual of patching, firmware management, configuration baselines, change windows, and rollback.",
  "narration": "Network hardening depends on maintaining software, firmware, and configuration baselines. Routers, switches, firewalls, VPN gateways, wireless controllers, and appliances all have defects that vendors correct over time. Updates can reduce known risk, improve stability, and close operational gaps. At the same time, network updates can affect availability, so patching and firmware management must be planned rather than improvised.\n\nA baseline defines the expected secure configuration for a type of device or service. It can include management access rules, logging destinations, authentication requirements, allowed protocols, naming conventions, backup expectations, time synchronization, and monitoring settings. Baselines make review easier because teams can compare current configuration against an agreed standard instead of debating every setting from scratch.\n\nChange control is not paperwork for its own sake. It protects availability and makes recovery possible. A good change record explains the purpose, affected assets, owner, test plan, maintenance window, communication plan, backup status, validation steps, and rollback approach. When a change fails, the team should not be searching chat history to figure out what happened. The recovery path should already be known.\n\nNot every update can be applied instantly. Some devices support critical services, some vendors require staged upgrades, and some environments have limited maintenance windows. Exceptions are sometimes necessary, but they should be documented, risk-assessed, assigned to an owner, and reviewed. A tracked exception is an operational decision. An forgotten exception is drift.",
  "narrationPoints": [
    "Firmware and software updates reduce known risk.",
    "Baselines define expected secure configuration.",
    "Changes need testing, backups, and rollback plans.",
    "Exceptions should be tracked and reviewed.",
    "Change control protects availability and recovery."
  ]
};
