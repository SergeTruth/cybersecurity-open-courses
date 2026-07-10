window.COURSE_MODULE = {
  "title": "Threat Modeling the Container Environment",
  "graphicAlt": "Blank course graphic placeholder",
  "narration": "Begin the threat model with assets. These include application workloads, data, secrets, container images, nodes, registries, clusters, build systems, deployment pipelines, and the identities used to operate them. Rank assets by confidentiality, integrity, availability, and business impact.\n\nNext, map trust boundaries. Important boundaries exist between the container and host, workload and runtime, node and orchestrator, application and network, identity and service account, workload and storage, registry and deployment, and CI/CD system and cluster.\n\nTrace data and control flows across those boundaries. Record which components can create workloads, select images, mount storage, request secrets, schedule pods, administer nodes, or change policy. The model should show both intended reachability and explicitly prohibited reachability.\n\nAttacker goals can be described without exploitation detail. A compromised workload may seek greater host influence, access to secrets, persistence, interference with neighboring workloads, or broader platform control. Defenders should state which assumptions are supposed to prevent each outcome.\n\nBuild scenarios around control failure. Ask what happens if a workload identity is misused, a privileged deployment is approved, a node is compromised, or a registry serves an untrusted image. Estimate blast radius based on permissions, tenancy, network access, and recovery dependencies.\n\nFinish with evidence and ownership. Identify admission records, runtime events, Kubernetes audit data, node telemetry, image metadata, and configuration sources that validate assumptions. Assign owners to reduce risk, accept exceptions, monitor controls, and revisit the model after architectural change.",
  "narrationPoints": [
    "Begin the threat model with assets.",
    "Next, map trust boundaries.",
    "Trace data and control flows across those boundaries.",
    "Attacker goals can be described without exploitation detail.",
    "Build scenarios around control failure.",
    "Finish with evidence and ownership."
  ]
};
