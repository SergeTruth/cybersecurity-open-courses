window.COURSE_MODULE = {
  "title": "Model Lifecycle and Trust Boundaries",
  "graphicAlt": "Model transformations and promotions retain evidence and clear experimental, approved and retirement status.",
  "narration": "Model artifacts often move through many stages before they reach production or shared use. A checkpoint may start in research, then be fine-tuned, converted, quantized, merged, renamed, packaged with tokenizer files, stored in a registry, cached in a deployment environment, and copied into automation workflows.\n\nEach movement creates a trust boundary. Metadata can be lost, files can be mixed with the wrong companion artifacts, assumptions can become stale, and a model that was acceptable for experimentation can quietly become part of a business workflow. The risk is not only external artifacts. Internal does not automatically mean understood, current, or approved.\n\nA reliable lifecycle records source, version, transformation steps, evaluation status, approval status, storage location, deployment context, and retirement state. Those records should be visible where engineers actually make decisions: repositories, model registries, storage paths, deployment pipelines, release notes, and operational documentation.\n\nTrust boundaries should also reflect who is responsible. Research teams may validate exploration results. Platform teams may control packaging and registry promotion. Security and governance teams may review license, provenance, and intake evidence. Operations teams may own rollout, monitoring, rollback, and retirement.\n\nThe goal is traceability without slowing every experiment. Experimental artifacts can move quickly inside controlled spaces, but shared and production artifacts need clear status. A model lifecycle is dependable when people can tell whether a checkpoint is experimental, approved, superseded, revoked, or retired.",
  "narrationPoints": [
    "Model artifacts often move through many stages before they reach production or shared use.",
    "Each movement creates a trust boundary.",
    "A reliable lifecycle records source, version, transformation steps, evaluation status, approval status, storage location, deployment context, and...",
    "Trust boundaries should also reflect who is responsible.",
    "The goal is traceability without slowing every experiment."
  ]
};
