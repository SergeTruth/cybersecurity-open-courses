window.COURSE_MODULE = {
  "title": "Hardware Requirements",
  "graphicAlt": "Blank course graphic placeholder",
  "narration": "Motherboards must provide physical slots and electrical PCI Express lanes suitable for the chosen GPUs. A full-length connector may operate with fewer lanes than its shape suggests. Consult platform documentation rather than assuming every slot is equivalent.\n\nPhysical spacing is often the first constraint. Large coolers can block neighboring slots, cables, or airflow. Chassis dimensions, card length, thickness, support brackets, and connector clearance must be checked together.\n\nPower-supply planning includes total capacity, transient demand, efficiency, connector type, cable limits, CPU and storage load, and margin. Do not improvise unsafe adapters or overload household circuits. Follow hardware-vendor and electrical guidance.\n\nCooling must remove sustained heat from every card, the CPU, memory, storage, and power components. One GPU can feed hot exhaust into another. Airflow path, fan behavior, ambient temperature, dust filters, and noise targets matter.\n\nRisers and external-GPU arrangements can solve spacing or experimentation needs but add bandwidth, enclosure, cable, power, compatibility, and support considerations. They should be treated as distinct architectures, not invisible extensions.\n\nMixed GPUs complicate memory balance, speed, features, driver support, precision, and scheduling. Workstation platforms may offer more lanes, spacing, memory, and management than consumer systems, but they add cost. Choose around the measured workload.\n\nPlatform topology includes how slots connect to the CPU, chipset, and memory. Shared links or indirect paths can affect transfer and peer communication. Read the motherboard and processor lane diagrams before purchase.",
  "narrationPoints": [
    "Motherboards must provide physical slots and electrical PCI Express lanes suitable for the chosen GPUs.",
    "Physical spacing is often the first constraint.",
    "Power-supply planning includes total capacity, transient demand, efficiency, connector type, cable limits, CPU and storage load, and margin.",
    "Cooling must remove sustained heat from every card, the CPU, memory, storage, and power components.",
    "Risers and external-GPU arrangements can solve spacing or experimentation needs but add bandwidth, enclosure, cable, power, compatibility, and...",
    "Mixed GPUs complicate memory balance, speed, features, driver support, precision, and scheduling."
  ]
};
