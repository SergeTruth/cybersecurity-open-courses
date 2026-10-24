window.COURSE_MODULE = {
  "title": "Why Secure curl Usage Matters",
  "graphicAlt": "A reviewable HTTP request connects a known destination, scoped identity, explicit intent and checked result.",
  "narration": "curl is widely used in Bash scripts because it connects automation to web services with very little ceremony. A short script can call an API, download a file, upload an artifact, check service health, fetch metadata, or trigger a deployment workflow. That makes curl useful, but it also makes curl security-relevant.\n\nAn HTTP request is an operational action. It has a destination, method, headers, body, identity, output, status, and failure mode. In a production script, those details may affect deployments, monitoring, release evidence, configuration, inventory, support bundles, or incident response workflows.\n\nThe risks are often ordinary engineering mistakes. A script may send data to the wrong URL, accept a response without checking status, leak a token in a log, follow a redirect to an unexpected destination, overwrite a file, or treat unvalidated response text as trusted input to the next step.\n\nSecure curl usage means making HTTP automation intentional. The script should define allowed endpoints, keep transport trust enabled, protect secrets, preserve argument boundaries, check results, and keep logs useful without exposing sensitive data.\n\nThe defensive goal is not to make curl hard to use. The goal is scoped, observable HTTP automation. When requests are explicit and reviewable, teams can use curl safely as Bash glue without turning small scripts into hidden trust decisions.",
  "narrationPoints": [
    "curl is widely used in Bash scripts because it connects automation to web services with very little ceremony.",
    "In a production script, those details may affect deployments, monitoring, release evidence, configuration, inventory, support bundles, or incident response workflows.",
    "Secure curl usage means making HTTP automation intentional.",
    "The defensive goal is not to make curl hard to use.",
    "A short script can call an API, download a file, upload an artifact, check service health, fetch metadata, or trigger a deployment workflow.",
    "The script should define allowed endpoints, keep transport trust enabled, protect secrets, preserve argument boundaries, check results, and keep logs useful without exposing sensitive data."
  ]
};
