window.COURSE_MODULE = {
  "title": "Container Isolation Boundaries",
  "graphicAlt": "Blank course graphic placeholder",
  "narration": "Container isolation is assembled from several controls rather than provided by one wall. Linux namespaces give processes separate views of resources such as process identifiers, mounts, networking, host names, and users. The exact namespaces enabled and their configuration define part of the boundary.\n\nControl groups, or cgroups, account for and limit resources such as CPU, memory, and process counts. They support availability and workload governance, but resource limits alone do not authorize access or create complete security isolation.\n\nLinux capabilities divide powerful system privileges into smaller units. Removing capabilities reduces what a process can ask the kernel to do. Granting broad or unnecessary capabilities weakens the least-privilege assumption even when the workload still runs inside namespaces.\n\nFilesystem isolation normally presents a container-specific root filesystem. Image layers, writable layers, volumes, device access, and host mounts determine what data crosses that boundary. A mount can intentionally share information while also expanding the assets exposed to the workload.\n\nThe container runtime creates and manages these controls and communicates with the host kernel. Runtime configuration, interfaces, versions, and permissions are therefore part of the trust model. A container remains dependent on the security and correctness of the shared kernel.\n\nThreat modeling should record each isolation mechanism, the privileges and mounts granted, and the expected host interfaces. Defense in depth matters because no single control should carry the entire containment claim. Workload restrictions, runtime hardening, node security, orchestration policy, and monitoring reinforce one another.",
  "narrationPoints": [
    "Container isolation is assembled from several controls rather than provided by one wall.",
    "Control groups, or cgroups, account for and limit resources such as CPU, memory, and process counts.",
    "Linux capabilities divide powerful system privileges into smaller units.",
    "Filesystem isolation normally presents a container-specific root filesystem.",
    "The container runtime creates and manages these controls and communicates with the host kernel.",
    "Threat modeling should record each isolation mechanism, the privileges and mounts granted, and the expected host interfaces."
  ]
};
