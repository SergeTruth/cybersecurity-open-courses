window.COURSE_MODULE = {
  "title": "Course Summary: A Safe RAM-Boot Design Routine",
  "graphicAlt": "Conceptual visual of a repeatable RAM-boot design routine from goal to rollback.",
  "narration": "A safe RAM-boot design routine starts with the goal. Do you want a live system that can run after boot media is removed? A resettable lab machine? A kiosk that returns to a clean state? A low-wear system that reduces writes? A recovery environment? Name the goal first, because the goal determines the pattern and the persistence design.\n\nNext, choose the pattern. Live-to-RAM designs copy a base image into memory. Overlay designs combine a read-only lower layer with a writable upper layer. Selected volatile paths move only certain directories into tmpfs. Hybrid designs keep chosen data persistent while allowing other changes to reset. Avoid copying commands without understanding which pattern they implement.\n\nUnderstand the boot path. Firmware starts the machine, the bootloader loads the kernel and initramfs, early user space prepares devices and filesystems, and the system eventually switches to the root filesystem. RAM-backed designs often affect that early path, so distribution details matter.\n\nEstimate RAM and volatility. The base image, overlay, cache, desktop, applications, containers, browser activity, and updates all compete for memory. Decide what disappears at reboot and what survives. Plan /home, logs, package state, configuration, updates, SSH keys, and application data deliberately.\n\nBuild in a lab first. Test boot, workload, memory pressure, shutdown, reboot, update behavior, persistence, and recovery. Keep recovery media. Keep a known-good boot entry. Back up important configuration. Document exactly what changed and how to roll it back.\n\nOnly then consider using the design on a daily or production-like system. RAM booting is not magic and not one feature. It is a design choice. When the design matches the workload and includes a recovery plan, it can be useful, clean, and reversible. When it is improvised on a primary machine, it can be fragile.",
  "narrationPoints": [
    "Define the RAM-boot goal first.",
    "Choose a pattern that matches the workload.",
    "Plan persistence and updates deliberately.",
    "Test boot, memory, shutdown, and recovery.",
    "Document rollback before daily use."
  ]
};
