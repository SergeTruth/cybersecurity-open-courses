window.COURSE_MODULE = {
  "title": "Updates, Backups, and Change Control",
  "graphicAlt": "Preview bullet summary visual for updates, backups, and change control.",
  "narration": "Updating a runtime or changing a model can affect behavior, performance, compatibility, and support expectations. A new runtime version may change service behavior. A new model tag may change response style, memory needs, latency, or application assumptions. A configuration change may alter storage paths, network exposure, or how a model is kept loaded.\n\nTeams should document known-good combinations of runtime version, model version, hardware, configuration, and integration behavior. This does not need to be a heavy process. It can be a short operational note that records what was tested, who approved shared use, what workflows depend on it, and what rollback option exists if users see a problem.\n\nBackups should focus on the assets that matter for recovery. Model files can often be re-pulled, but undocumented configuration decisions are harder to recover. Modelfiles, service configuration notes, approved model inventories, integration settings, routing assumptions, and support documentation may be more important than a copy of every model file.\n\nRollback planning matters when shared tools depend on the environment. If a runtime update causes errors or a model change alters behavior, operators should know how to restore the previous known-good state or route users to an alternative. Change control is not about slowing down experimentation. It is about making operational changes clear enough that teams know what changed, why it changed, and how to respond if it does not work.",
  "narrationPoints": [
    "Updating a runtime or changing a model can affect behavior, performance, compatibility, and support expectations.",
    "Teams should document known-good combinations of runtime version, model version, hardware, configuration, and integration behavior.",
    "Backups should focus on the assets that matter for recovery.",
    "Rollback planning matters when shared tools depend on the environment."
  ]
};
