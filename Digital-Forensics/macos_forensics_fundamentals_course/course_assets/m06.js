window.COURSE_MODULE = {
  "title": "Persistence and Startup Locations",
  "graphicAlt": "Blank placeholder graphic for macOS persistence and startup locations",
  "narration": "Persistence analysis on macOS focuses on programs, scripts, agents, daemons, profiles, and settings that cause software to run automatically or maintain a foothold. LaunchAgents and LaunchDaemons are key locations. LaunchAgents typically run in a user context, while LaunchDaemons usually run at a system level. Their plist files can describe labels, program paths, arguments, run conditions, and timing.\n\nLogin items are another startup-related source. They may represent applications or helpers configured to launch when a user signs in. Cron, scheduled tasks, application-specific updaters, and shell startup files can also matter at a high level. In managed environments, configuration profiles and management tools may enforce settings, install agents, or configure security controls.\n\nSuspicious scripts or binaries should be interpreted defensively. A launch item pointing to an unusual path, a recently modified script, a binary outside expected application locations, or an unexpected helper tool may be a lead. It may also be legitimate software, an admin tool, or a vendor component. The analyst should compare the item with installation history, signatures, file metadata, logs, user context, and endpoint telemetry.\n\nThe course focus is defensive persistence analysis only. Do not create or test persistence mechanisms outside authorized lab procedures. In real investigations, the goal is to identify what is configured to run, determine whether it fits the system role, preserve supporting evidence, and communicate confidence and limitations. Startup artifacts are most useful when placed in a timeline with user activity and system events.",
  "narrationPoints": [
    "Persistence analysis on macOS focuses on programs, scripts, agents, daemons, profiles, and settings that cause software to run automatically...",
    "Login items are another startup-related source.",
    "Suspicious scripts or binaries should be interpreted defensively.",
    "The course focus is defensive persistence analysis only.",
    "System LaunchAgents, system LaunchDaemons, and user LaunchAgents are collected into one verified parser workflow.",
    "Cron tabs and shell profiles are explicitly labeled as a limited startup-adjacent lead inventory rather than complete persistence coverage.",
    "Launchd review includes scheduling, keep-alive, watch-path, environment, identity, working-directory, and standard-stream directives."
  ]
};
