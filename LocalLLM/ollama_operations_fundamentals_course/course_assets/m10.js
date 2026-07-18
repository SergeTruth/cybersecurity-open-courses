window.COURSE_MODULE = {
  "title": "Course Summary: Sustainable Ollama Operations",
  "graphicAlt": "Preview bullet summary visual for sustainable Ollama operations.",
  "narration": "Sustainable Ollama operations begin with clear ownership and visible runtime assumptions. Teams should know how the service starts, where state lives, which user account runs it, how logs are reviewed, and who supports it when something breaks. Local AI is easier to trust when the environment is understandable under pressure.\n\nManage models as assets. Names, tags, storage planning, approval status, cleanup practices, and retirement notes help prevent confusion across workstations and shared servers. Use Modelfiles and documented configuration to reduce drift. A repeatable model variant is easier to support than a manual setup that only one person remembers.\n\nTreat the API as a service boundary. Applications need timeouts, error handling, predictable model selection, capacity assumptions, and documented behavior for streaming and failures. Monitor resources, especially memory, disk, CPU, GPU, and temperature. Protect access, avoid unnecessary sensitive logging, and keep network exposure intentional.\n\nFinally, document operational changes. Runtime updates, model changes, configuration edits, and integration changes should have enough context that teams know what changed and why. The practical goal is a local AI environment that is useful, reliable, private where intended, and supportable over time.\n\nThe most durable habit is to make operations boring in the best sense. When ownership, storage, models, access, resource limits, logs, and changes are visible, teams can move faster with less confusion. Sustainable Ollama operations let experimentation continue while giving shared workflows the structure they need.",
  "narrationPoints": [
    "Sustainable Ollama operations begin with clear ownership and visible runtime assumptions.",
    "Manage models as assets.",
    "Treat the API as a service boundary.",
    "Finally, document operational changes.",
    "The most durable habit is to make operations boring in the best sense."
  ]
};
