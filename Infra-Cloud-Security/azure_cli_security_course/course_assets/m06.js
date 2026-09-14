window.COURSE_MODULE = {
  "title": "Output Handling, JSON, Files, and Logs",
  "graphicAlt": "The script selects expected JSON fields and confirms the returned target before continuing, pausing on missing or multiple matches and controlling files and logs.",
  "narration": "Azure CLI output is often consumed by later automation. A script may query JSON, extract a resource ID, inspect a role assignment, select a deployment target, compare configuration, write a file, or decide whether a later step should run. That output can include identifiers, subscription details, endpoints, policy results, role assignments, configuration values, and sensitive context.\n\nStructured parsing is safer than fragile text assumptions. Scripts should parse expected JSON fields deliberately and handle missing fields, empty responses, multiple matches, and unexpected values. JMESPath-style query concepts can be useful defensively when they make field selection explicit, but the script still needs to confirm that the returned value matches the intended target.\n\nOutput files should go to approved destinations with appropriate permissions and retention expectations. Generated JSON, deployment details, policy results, role listings, and support bundles can reveal sensitive operational context even when they do not contain raw tokens. A script should avoid writing sensitive output into shared workspaces, broad CI/CD artifacts, or long-lived logs without a clear reason.\n\nLogs should provide minimal useful evidence. Good logs show high-level identity, tenant, subscription, resource group, action, target category, time, and result. They avoid tokens, secrets, service principal credentials, sensitive role details, private data, and excessive raw responses. Secure output handling lets automation remain useful without turning logs and files into another exposure path.",
  "narrationPoints": [
    "Azure CLI output is often consumed by later automation.",
    "Structured parsing is safer than fragile text assumptions.",
    "Output files should go to approved destinations with appropriate permissions and retention expectations.",
    "Logs should provide minimal useful evidence."
  ]
};
