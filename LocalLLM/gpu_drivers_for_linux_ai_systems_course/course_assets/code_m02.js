window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Inspect Linux GPU Stack Layers",
  "codeExamples": [
    {
      "title": "Review Kernel Modules, Headers, and DKMS Status",
      "language": "bash",
      "code": "KERNEL=$(uname -r)\n\nprintf '[running kernel]\\n%s\\n\\n' \"$KERNEL\"\nprintf '[kernel headers]\\n'\ntest -e \"/lib/modules/$KERNEL/build\" && echo \"headers present\" || echo \"headers missing\"\n\nprintf '\\n[dkms status]\\n'\ndkms status 2>/dev/null || echo \"dkms not installed or no dkms modules\"\n\nprintf '\\n[gpu module details]\\n'\nfor module in nvidia amdgpu i915; do\n  modinfo \"$module\" 2>/dev/null | sed -n '1,12p' || true\ndone"
    },
    {
      "title": "Check Device Nodes and Access Groups",
      "language": "bash",
      "code": "printf '[current user]\\n'\nid\n\nprintf '\\n[gpu device nodes]\\n'\nls -l /dev/nvidia* /dev/dri/renderD* /dev/kfd 2>/dev/null || true\n\nprintf '\\n[relevant groups]\\n'\ngetent group video render 2>/dev/null || true\n\nprintf '\\n[user-space gpu libraries]\\n'\nldconfig -p 2>/dev/null | grep -Ei 'cuda|nvidia|rocm|hip|vulkan|opencl' | head -80 || true"
    },
    {
      "title": "Summarize Stack Layers as JSON",
      "language": "python",
      "code": "import json\nimport subprocess\nfrom pathlib import Path\n\ndef run(command):\n    result = subprocess.run(command, text=True, capture_output=True, check=False)\n    return result.stdout.strip()\n\nreport = {\n    \"kernel\": run([\"uname\", \"-r\"]),\n    \"gpu_pci\": run([\"sh\", \"-c\", \"lspci -nn | grep -Ei 'vga|3d|display|nvidia|amd|ati|intel' || true\"]).splitlines(),\n    \"device_nodes\": [str(path) for path in Path(\"/dev\").glob(\"nvidia*\")] + [str(path) for path in Path(\"/dev/dri\").glob(\"renderD*\")],\n    \"loaded_modules\": run([\"sh\", \"-c\", \"lsmod | grep -Ei 'nvidia|amdgpu|i915|drm' || true\"]).splitlines(),\n}\n\nprint(json.dumps(report, indent=2))"
    }
  ],
  "codeIntro": "Linux GPU Code Examples"
};
