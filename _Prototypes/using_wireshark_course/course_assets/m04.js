window.COURSE_MODULE = {
  "title": "Capturing and Opening Traffic",
  "graphicAlt": "Conceptual visual of opening an approved capture file or capturing from an authorized interface.",
  "narration": "There are two common ways to begin analysis in Wireshark. You can open an approved capture file, or you can capture live traffic from an authorized interface. For training, opening a known sample or lab capture is often best. It gives you repeatable traffic, avoids unnecessary collection, and lets you focus on analysis skills without creating privacy risk.\n\nWhen you do capture live traffic, choose the interface deliberately. A laptop may have wired, wireless, virtual, VPN, and loopback interfaces. Pick only the interface that matches the authorized question. If the goal is to observe a lab application from one test machine, you do not need every interface on the system. If the interface is busy, the capture can fill with unrelated noise and make the real question harder to answer.\n\nKeep captures short and focused. Start with a clear question, start the capture, perform the approved action, stop the capture, and save the file using the naming and storage rules your team expects. Capturing forever is rarely useful. It creates larger files, more sensitive data, and more work. If you need a longer capture for a real operational reason, document why and make sure the scope supports it.\n\nNotes are part of the capture process. Record the date and time, system or device, interface, purpose, capture point, and the action performed while the capture was running. If you changed a setting, restarted a service, opened a test page, or reproduced an error, write that down. Later, when you are looking at timestamps and packet sequences, those notes give the packets context.\n\nA capture is only useful when you can explain where it came from and why it was collected. The technical file and the analyst notes belong together.",
  "narrationPoints": [
    "Open approved capture files when learning.",
    "Capture only on authorized interfaces.",
    "Start with a clear analysis question.",
    "Keep captures short and focused.",
    "Record context while capturing."
  ]
};
