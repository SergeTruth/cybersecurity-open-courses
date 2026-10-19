window.COURSE_MODULE = {
  "title": "Source Documentation, Model Cards, and Licenses",
  "graphicAlt": "The model record combines origin, dataset uncertainty, usage limits, license review and ownership.",
  "narration": "Documentation is part of the trust evidence for a model, not a courtesy added after the technical work is finished. A useful model record should help future users and reviewers understand origin, intended use, limitations, training or fine-tuning context, evaluation notes, license terms, ownership, and operational constraints.\n\nModel cards and similar records are valuable because they make assumptions explicit. They can explain what the model was built for, what it was not built for, what data sources shaped it, how it was evaluated, and what known limitations should influence deployment decisions. That context helps prevent overuse outside the intended workflow.\n\nDataset information matters. Training and fine-tuning sources can affect quality, policy fit, compliance expectations, bias concerns, confidentiality assumptions, and user communication. Even when dataset details are incomplete, the record should describe what is known, what is unknown, and how uncertainty affects approval.\n\nLicense review should happen before a checkpoint is approved for shared use or commercial workflows. A model may be technically useful while still having terms that restrict redistribution, hosted use, derived work, attribution, or particular operating contexts. License uncertainty should be visible instead of hidden in a download note.\n\nOwnership should also be clear. Someone should know who approved the model, who maintains it, who can change it, and who can retire it. Missing documentation should lower confidence and trigger a more cautious intake path, because undocumented trust is difficult to defend when something changes.",
  "narrationPoints": [
    "Documentation is part of the trust evidence for a model, not a courtesy added after the technical work is finished.",
    "Model cards and similar records are valuable because they make assumptions explicit.",
    "Dataset information matters.",
    "License review should happen before a checkpoint is approved for shared use or commercial workflows.",
    "Ownership should also be clear."
  ]
};
