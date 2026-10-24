window.COURSE_MODULE = {
  "title": "Generating SBOMs for Node.js Projects",
  "graphicAlt": "Repeatable SBOM generation records the inspected input, tool context, represented artifact and known omissions.",
  "narration": "SBOMs can be generated from package manifests, lockfiles, installed dependencies, source repositories, build outputs, packages, and container images. npm provides an sbom command for supported npm projects and formats. CycloneDX tooling, SPDX tooling, Syft-style tools, SCA platforms, CI/CD platforms, and container scanners may also generate SBOMs. The tool choice matters less than understanding what the tool inspected and what artifact the output claims to represent.\n\nTool output differs depending on whether it reads a lockfile, node_modules, a package manager workspace, a container image, or the final deployed artifact. A source-only SBOM may differ from an image SBOM that includes operating system packages. A lockfile-only SBOM may differ from installed dependencies if the environment drifted or optional dependencies resolved differently. A bundled application may include code that is no longer obvious from the source dependency tree.\n\nGeneration should be repeatable and documented. Record the tool name, tool version, input source, output format, build context, and represented artifact. Tie the SBOM to a specific commit, build, image digest, package version, service release, or customer-delivered artifact. Do not treat a generated SBOM as automatically accurate. Review scope, completeness, assumptions, and known omissions before relying on it for vulnerability response, license review, or customer sharing.",
  "narrationPoints": [
    "SBOMs can be generated from package manifests, lockfiles, installed dependencies, source repositories, build outputs, packages, and container images.",
    "Tool output differs depending on whether it reads a lockfile, node_modules, a package manager workspace, a container image, or the final deployed artifact.",
    "Do not treat a generated SBOM as automatically accurate.",
    "A source-only SBOM may differ from an image SBOM that includes operating system packages.",
    "A lockfile-only SBOM may differ from installed dependencies if the environment drifted or optional dependencies resolved differently.",
    "CycloneDX tooling, SPDX tooling, Syft-style tools, SCA platforms, CI/CD platforms, and container scanners may also generate SBOMs."
  ]
};
