window.COURSE_MODULE = {
  "title": "What Model Provenance Means",
  "graphicAlt": "A checkpoint is linked to origin, package identity, review evidence and intended-use limitations.",
  "narration": "Model provenance is the history and evidence attached to a model artifact. It explains where the model came from, who produced or changed it, what files belong with it, what assumptions are known, and why the team should or should not trust it for a particular workflow.\n\nA checkpoint is not just a file with weights. It represents training choices, fine-tuning context, data assumptions, conversion steps, dependencies, licensing constraints, evaluation results, and operational risk. When those details are missing, teams may mistake convenience for confidence.\n\nProvenance helps answer practical questions. Where did this model originate? What changed between versions? Who approved it? Which environments may use it? What license or policy constraints apply? Is it still current, or has it been replaced by a better controlled artifact?\n\nTrust should be evidence-based. Popularity, a familiar filename, or a convenient download path may be useful signals, but they are not enough for shared or production use. A reliable model record connects the checkpoint to source information, review decisions, integrity evidence, and intended use.\n\nGood provenance supports security, reliability, compliance, reproducibility, and incident response. When a model behaves unexpectedly or must be retired quickly, the team needs more than memory and chat messages. It needs an evidence trail that shows what was used, where it came from, and how it entered the workflow.",
  "narrationPoints": [
    "Model provenance is the history and evidence attached to a model artifact.",
    "A checkpoint is not just a file with weights.",
    "Provenance helps answer practical questions.",
    "Trust should be evidence-based.",
    "Good provenance supports security, reliability, compliance, reproducibility, and incident response."
  ]
};
