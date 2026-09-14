window.COURSE_MODULE = {
  "title": "Course Summary and Key Takeaways",
  "graphicAlt": "A complete container review connects authorized scope, image and build evidence, runtime settings, orchestration controls, and remediation with human verification.",
  "narration": "AI can accelerate container security reviews by organizing evidence, explaining findings, summarizing scanner output, generating checklists, and drafting remediation language. It is most useful when it helps the reviewer handle complexity and communicate clearly. It is least useful when it is treated as an authority that can approve containers, ignore scope, or replace evidence.\n\nStrong reviews begin with scope and context. The reviewer should know which repositories, images, registries, Dockerfiles, manifests, pipelines, and runtime environments are authorized. Data handling rules matter because container artifacts can contain secrets, internal architecture, vulnerability information, and client boundaries. AI-assisted work should reinforce those limits.\n\nImage and build review should connect to runtime and orchestration context. Base images, layers, packages, dependencies, digests, SBOMs, Dockerfile patterns, build secrets, scanner findings, user permissions, capabilities, mounts, network exposure, service accounts, RBAC, and security contexts all contribute to risk. No single scanner report tells the whole story.\n\nThe goal is safer containerized applications. AI can improve review speed and clarity, but human verification remains central. Reviewers should validate evidence, triage findings in context, avoid blind trust in scanner or model output, and produce remediation guidance that development and platform teams can actually use.",
  "narrationPoints": [
    "AI can accelerate container security reviews by organizing evidence, explaining findings, summarizing scanner output, generating checklists, and drafting remediation language.",
    "Strong reviews begin with scope and context.",
    "Image and build review should connect to runtime and orchestration context.",
    "The goal is safer containerized applications."
  ]
};
