window.COURSE_MODULE = {
  "title": "Validation and Performance Checks",
  "graphicAlt": "Blank placeholder image for module 7: Validation and Performance Checks",
  "narration": "Validation starts with basic GPU detection. Confirm that the system sees the device, the driver is loaded, and the expected management tools report useful status. Check VRAM, utilization, temperature, power, and running processes. These checks tell you whether the system recognizes the hardware and whether anything is already consuming resources.\n\nThe next step is an AI runtime smoke test. Run a simple inference task through the same path the real workload will use: host Python environment, container, notebook, inference server, or API endpoint. Confirm that acceleration is active, not just that the model responds. CPU fallback can make a test appear successful while hiding the fact that the GPU is unused.\n\nPerformance checks should look at prompt processing speed, generation speed, memory use, temperature, power, and throttling. For vision or embedding workflows, use task-appropriate metrics such as processing time or throughput. Compare results against expected behavior for the model and hardware. A sudden performance drop may indicate driver issues, thermal limits, wrong runtime settings, or an unintended fallback path.\n\nDistinguish driver problems from model, runtime, or configuration problems. Out-of-memory errors may come from model size or context length. Slow generation may come from CPU execution rather than driver failure. Container visibility issues may be permissions or runtime configuration. A structured validation checklist helps narrow the fault domain before reinstalling drivers unnecessarily.",
  "narrationPoints": [
    "Validation starts with basic GPU detection.",
    "The next step is an AI runtime smoke test.",
    "Performance checks should look at prompt processing speed, generation speed, memory use, temperature, power, and throttling.",
    "Distinguish driver problems from model, runtime, or configuration problems."
  ]
};
