window.COURSE_MODULE = {
  "title": "Secure Workload Manifests for .NET Apps",
  "graphicAlt": "A reviewed manifest makes image identity, service account, ports, probes, resources and configuration sources visible.",
  "narration": "Kubernetes manifests are part of the application security surface because they define how the workload runs. They describe the image, labels, selectors, ports, probes, environment variables, volumes, mounts, service account, and security settings that shape production behavior.\n\nImage references should be deliberate. Teams should know whether they deploy by tag, digest, or a promotion process, and how imagePullPolicy interacts with those choices. Ambiguous image references can make it harder to know exactly what code and base layers are running in production.\n\nLabels and annotations should help operations, ownership, routing, cost tracking, and policy enforcement. They should not reveal sensitive internal details that do not need to travel with the workload metadata. Names should be readable enough to support incident response without turning manifests into a data exposure channel.\n\nEnvironment variables, ConfigMaps, Secrets, and mounts should be separated by environment and reviewed for exposure. A manifest should not carry real secrets, hardcoded credentials, local development leftovers, broad permissions, or volume mounts that the .NET application does not actually need.\n\nA reviewable manifest is predictable. It makes runtime identity, ports, probes, resource settings, configuration sources, volumes, and platform policy visible enough for application and platform teams to reason about before release.",
  "narrationPoints": [
    "Kubernetes manifests are part of the application security surface because they define how the workload runs.",
    "Teams should know whether they deploy by tag, digest, or a promotion process, and how imagePullPolicy interacts with those choices.",
    "Names should be readable enough to support incident response without turning manifests into a data exposure channel.",
    "Labels and annotations should help operations, ownership, routing, cost tracking, and policy enforcement.",
    "Environment variables, ConfigMaps, Secrets, and mounts should be separated by environment and reviewed for exposure."
  ]
};
