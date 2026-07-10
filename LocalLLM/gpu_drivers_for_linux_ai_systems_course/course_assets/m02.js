window.COURSE_MODULE = {
  "title": "Linux Graphics and Compute Stack Basics",
  "graphicAlt": "Blank placeholder image for module 2: Linux Graphics and Compute Stack Basics",
  "narration": "The Linux GPU stack includes several layers that have to line up. Kernel modules provide low-level driver functionality inside the running kernel. Firmware may be required by the hardware. User-space driver libraries provide interfaces that applications and runtimes call. Display drivers may support monitors and desktops, while compute runtimes support GPU-accelerated workloads.\n\nPackage managers install and update many of these pieces, but AI workloads often depend on more than one package. Kernel headers may be needed to build a driver module. DKMS, at a high level, helps rebuild kernel modules when kernels change. Device nodes expose GPU hardware to user-space processes. Permissions determine which users, services, and containers can access those devices.\n\nA working desktop display does not automatically mean compute workloads are ready. Likewise, a headless inference server may not need a full desktop stack, but it still needs the right kernel support, firmware, user-space libraries, and runtime interfaces. The exact package names vary by distribution and vendor, but the architectural responsibilities are similar.\n\nUnderstanding these layers makes troubleshooting less mysterious. If the GPU is not visible, look at hardware detection and kernel modules. If the driver is loaded but an AI library fails, look at user-space libraries and runtime compatibility. If containers cannot see the GPU, look at device exposure, container runtime configuration, and permissions. AI acceleration depends on the complete stack.",
  "narrationPoints": [
    "The Linux GPU stack includes several layers that have to line up.",
    "Package managers install and update many of these pieces, but AI workloads often depend on more than one package.",
    "A working desktop display does not automatically mean compute workloads are ready.",
    "Understanding these layers makes troubleshooting less mysterious."
  ]
};
