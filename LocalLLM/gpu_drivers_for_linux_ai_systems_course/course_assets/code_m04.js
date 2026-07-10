window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Validate AMD, ROCm, and Vulkan Paths",
  "codeExamples": [
    {
      "title": "Inspect AMDGPU and ROCm Signals",
      "language": "bash",
      "code": "printf '[amd pci devices]\\n'\nlspci -nn | grep -Ei 'amd|ati|radeon|vga|3d' || true\n\nprintf '\\n[amdgpu module]\\n'\nlsmod | grep amdgpu || true\nmodinfo amdgpu 2>/dev/null | sed -n '1,16p' || true\n\nprintf '\\n[rocm tools]\\n'\nrocminfo 2>/dev/null | sed -n '1,80p' || echo \"rocminfo not available\"\nrocm-smi 2>/dev/null || echo \"rocm-smi not available\""
    },
    {
      "title": "Check OpenCL and Vulkan Visibility",
      "language": "bash",
      "code": "printf '[opencl]\\n'\nclinfo 2>/dev/null | grep -E 'Platform Name|Device Name|Device Version' || echo \"clinfo not available\"\n\nprintf '\\n[vulkan]\\n'\nvulkaninfo --summary 2>/dev/null || echo \"vulkaninfo not available\"\n\nprintf '\\n[render nodes]\\n'\nls -l /dev/dri/renderD* 2>/dev/null || true"
    },
    {
      "title": "Check PyTorch ROCm Availability",
      "language": "python",
      "code": "import torch\n\nreport = {\n    \"torch\": torch.__version__,\n    \"hip_build\": getattr(torch.version, \"hip\", None),\n    \"cuda_api_available\": torch.cuda.is_available(),\n    \"device_count\": torch.cuda.device_count(),\n}\n\nif torch.cuda.is_available():\n    report[\"device_names\"] = [torch.cuda.get_device_name(i) for i in range(torch.cuda.device_count())]\n\nprint(report)"
    }
  ],
  "codeIntro": "Linux GPU Code Examples"
};
