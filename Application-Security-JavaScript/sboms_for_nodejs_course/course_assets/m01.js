window.COURSE_MODULE = {
  "title": "Why SBOMs Matter for Node.js",
  "graphicAlt": "An SBOM connects a direct and transitive component inventory to a specific release for investigation.",
  "narration": "An SBOM is a machine-readable inventory of software components associated with an application, package, container, service, or release. For Node.js teams, that inventory matters because a small package.json can resolve into a much larger dependency tree. A few direct npm packages may bring in hundreds of transitive components, each with its own version, license, maintainer history, and vulnerability exposure. Without structured evidence, teams often guess what is inside a release when pressure is highest.\n\nConsider a new vulnerability announced in a popular npm package. The team needs to know which services, builds, containers, and customer deployments include the affected component. Searching repositories by hand may miss generated artifacts, old releases, container images, bundled code, or transitive paths. An accurate SBOM gives responders a faster starting point: what was built, what was shipped, where it came from, and which release or artifact it belongs to.\n\nSBOMs support security work, but they do not prove that code is safe. They are not vulnerability scans, guarantees, or paperwork that has value by existing. They become useful when they are accurate, current, tied to a specific release, retained where teams can find them, and connected to vulnerability management, license review, procurement, customer assurance, and incident response. The goal is practical visibility, not a decorative file in the build output.",
  "narrationPoints": [
    "For Node.js teams, that inventory matters because a small package.json can resolve into a much larger dependency tree.",
    "The team needs to know which services, builds, containers, and customer deployments include the affected component.",
    "SBOMs support security work, but they do not prove that code is safe.",
    "An SBOM is a machine-readable inventory of software components associated with an application, package, container, service, or release.",
    "Searching repositories by hand may miss generated artifacts, old releases, container images, bundled code, or transitive paths.",
    "The goal is practical visibility, not a decorative file in the build output."
  ]
};
