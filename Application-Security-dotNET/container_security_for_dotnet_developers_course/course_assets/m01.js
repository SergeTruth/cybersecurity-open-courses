window.COURSE_MODULE = {
  "title": "Containers as a .NET Security Boundary",
  "graphicAlt": "Bullet summary graphic for Containers as a .NET Security Boundary.",
  "narration": "Containers package a .NET application together with the runtime files and operating system pieces it needs to run. That packaging is valuable because it makes deployments repeatable, but a container is not a complete security boundary by itself. The application, the image, the host, the runtime, the registry, the network, the orchestrator, and the operational process all remain part of the security picture.\n\nA vulnerable ASP.NET Core application remains vulnerable when it is placed in a container. The same input validation, authentication, authorization, session, logging, and dependency rules still apply. Containerization can improve consistency, but it does not convert weak application logic into safe behavior.\n\nInternal container networks should not be treated as automatic trust zones. A service reachable only from another service may still need identity, authorization, TLS decisions, request limits, and logging. Location inside the platform can reduce exposure, but it does not prove that a caller should be allowed to read data or perform an action.\n\nDevelopers should know which controls belong in application code, which belong in the Dockerfile, which belong in platform configuration, and which belong to operations. A secure baseline starts by asking what runs in the image, who it runs as, what it can access, what secrets it receives, how it communicates, and how it is rebuilt when dependencies need updates.",
  "narrationPoints": [
    "Containers package a .NET application together with the runtime files and operating system pieces it needs to run.",
    "The same input validation, authentication, authorization, session, logging, and dependency rules still apply.",
    "A service reachable only from another service may still need identity, authorization, TLS decisions, request limits, and logging.",
    "Internal container networks should not be treated as automatic trust zones.",
    "A secure baseline starts by asking what runs in the image, who it runs as, what it can access, what secrets it receives, how it communicates, and how it is rebuilt when dependencies need updates."
  ]
};
