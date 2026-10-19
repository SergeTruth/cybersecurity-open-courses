window.COURSE_MODULE = {
  "title": "Safe Model Intake Workflow",
  "graphicAlt": "Restricted intake moves through evidence review, workflow evaluation and recorded scoped approval before shared use.",
  "narration": "Model intake should be a repeatable workflow, not a one-off download by whoever needs a model fastest. The purpose of intake is to move a checkpoint from unknown or partially known status into a controlled decision path where evidence can be reviewed before shared use.\n\nNew checkpoints should start in a controlled location. That location may be an intake bucket, restricted registry, review workspace, or staging environment. The key is that the artifact is not immediately available to production services, broad user groups, or automated deployment jobs before review is complete.\n\nA practical intake workflow reviews source, documentation, license terms, intended use, file format, companion files, integrity evidence, dependency expectations, conversion needs, and storage location. If signatures, attestations, or registry metadata are available, they should be captured in the model record.\n\nEvaluation is part of intake. The team should confirm that the model is suitable for the intended workflow and does not break known requirements. That includes task quality, output format, latency, resource needs, policy fit, and documented limitations. Not every model needs the same depth of review, but the depth should match the risk.\n\nApproval should record who accepted the model, what evidence was reviewed, what limitations apply, and where the model is allowed to run. A simple checklist can prevent confusion without slowing teams more than necessary, especially when it separates experimental use from shared and production use.",
  "narrationPoints": [
    "Model intake should be a repeatable workflow, not a one-off download by whoever needs a model fastest.",
    "New checkpoints should start in a controlled location.",
    "A practical intake workflow reviews source, documentation, license terms, intended use, file format, companion files, integrity evidence...",
    "Evaluation is part of intake.",
    "Approval should record who accepted the model, what evidence was reviewed, what limitations apply, and where the model is allowed to run."
  ]
};
