window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Gather Troubleshooting Evidence",
  "codeExamples": [
    {
      "title": "Collect Kernel, DKMS, and Driver Logs",
      "language": "bash",
      "code": "CASE=gpu-troubleshooting-$(date -u +%Y%m%dT%H%M%SZ)\nmkdir -p \"$CASE\"\n\nuname -a | tee \"$CASE/kernel.txt\"\ndkms status 2>/dev/null | tee \"$CASE/dkms-status.txt\" || true\njournalctl -k -b --no-pager 2>/dev/null |\n  grep -Ei 'nvidia|amdgpu|drm|firmware|dkms|module|secure boot' |\n  tee \"$CASE/kernel-gpu-messages.txt\" || true\ndmesg 2>/dev/null |\n  grep -Ei 'nvidia|amdgpu|drm|firmware|dkms|module|secure boot' |\n  tee \"$CASE/dmesg-gpu-messages.txt\" || true"
    },
    {
      "title": "Check Secure Boot and Module Signing Clues",
      "language": "bash",
      "code": "printf '[secure boot]\\n'\nmokutil --sb-state 2>/dev/null || echo \"mokutil not available\"\n\nprintf '\\n[module signers]\\n'\nfor module in nvidia nvidia_uvm amdgpu; do\n  printf '\\n[%s]\\n' \"$module\"\n  modinfo \"$module\" 2>/dev/null | grep -E '^(filename|version|signer|sig_key|sig_hashalgo):' || true\ndone"
    },
    {
      "title": "Create a Layered Troubleshooting Report",
      "language": "python",
      "code": "from pathlib import Path\n\nchecks = [\n    (\"hardware_detected\", \"lspci output contains expected GPU\"),\n    (\"kernel_module_loaded\", \"lsmod contains nvidia, amdgpu, or expected driver\"),\n    (\"device_nodes_present\", \"/dev/nvidia* or /dev/dri/renderD* exists\"),\n    (\"user_permissions\", \"service user belongs to render/video or vendor-required group\"),\n    (\"runtime_visible\", \"nvidia-smi, rocminfo, or framework smoke test succeeds\"),\n    (\"container_visible\", \"container sees devices and runtime libraries\"),\n    (\"no_recent_kernel_breakage\", \"dkms and kernel logs show clean module load\"),\n]\n\nlines = [\"# GPU Driver Troubleshooting Checklist\", \"\"]\nfor key, description in checks:\n    lines.append(f\"- [ ] **{key}**: {description}\")\n\nPath(\"gpu-driver-troubleshooting-checklist.md\").write_text(\"\\n\".join(lines), encoding=\"utf-8\")"
    }
  ],
  "codeIntro": "Linux GPU Code Examples"
};
