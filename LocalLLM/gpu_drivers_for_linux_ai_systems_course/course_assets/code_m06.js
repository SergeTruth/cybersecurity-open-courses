window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Validate Container GPU Access",
  "codeExamples": [
    {
      "title": "Check Host Container Runtime GPU Configuration",
      "language": "bash",
      "code": "printf '[container runtime]\\n'\ndocker info 2>/dev/null | grep -E 'Runtimes|Default Runtime|Cgroup Driver' || true\n\nprintf '\\n[nvidia container toolkit]\\n'\nnvidia-container-cli info 2>/dev/null | sed -n '1,80p' || echo \"nvidia-container-cli not available\"\n\nprintf '\\n[host device nodes]\\n'\nls -l /dev/nvidia* /dev/dri/renderD* /dev/kfd 2>/dev/null || true"
    },
    {
      "title": "Run an NVIDIA Container Visibility Check",
      "language": "bash",
      "code": "IMAGE=nvidia/cuda:12.4.1-base-ubuntu22.04\n\ndocker run --rm --gpus all \"$IMAGE\" nvidia-smi\n\ndocker run --rm --gpus all \"$IMAGE\" sh -lc '\n  echo \"[devices]\"\n  ls -l /dev/nvidia* 2>/dev/null || true\n  echo \"[libraries]\"\n  ldconfig -p 2>/dev/null | grep -E \"libcuda|libnvidia\" || true\n'"
    },
    {
      "title": "Run a ROCm Container Visibility Check",
      "language": "bash",
      "code": "IMAGE=rocm/rocm-terminal:latest\n\ndocker run --rm \\\n  --device=/dev/kfd \\\n  --device=/dev/dri \\\n  --group-add video \\\n  --group-add render \\\n  \"$IMAGE\" rocminfo"
    }
  ],
  "codeIntro": "Linux GPU Code Examples"
};
