window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Validate NVIDIA and CUDA",
  "codeExamples": [
    {
      "title": "Query NVIDIA Driver, GPU, and Process State",
      "language": "bash",
      "code": "nvidia-smi\n\nnvidia-smi --query-gpu=index,name,driver_version,cuda_version,memory.total,memory.used,utilization.gpu,temperature.gpu,power.draw \\\n  --format=csv,noheader,nounits |\n  tee nvidia-gpu-status.csv\n\nnvidia-smi pmon -c 1 2>/dev/null | tee nvidia-process-snapshot.txt || true"
    },
    {
      "title": "Compare Driver, Toolkit, and Library Signals",
      "language": "bash",
      "code": "printf '[driver module]\\n'\nmodinfo nvidia 2>/dev/null | grep -E '^(version|filename|signer):' || true\n\nprintf '\\n[nvidia-smi cuda runtime signal]\\n'\nnvidia-smi --query-gpu=driver_version,cuda_version --format=csv,noheader 2>/dev/null || true\n\nprintf '\\n[nvcc toolkit signal]\\n'\nnvcc --version 2>/dev/null || echo \"CUDA toolkit compiler not found in PATH\"\n\nprintf '\\n[user-space libraries]\\n'\nldconfig -p 2>/dev/null | grep -E 'libcuda|libcudart|libcudnn' || true"
    },
    {
      "title": "Run a Minimal PyTorch CUDA Smoke Test",
      "language": "python",
      "code": "import time\nimport torch\n\nif not torch.cuda.is_available():\n    raise SystemExit(\"CUDA is not available to this Python environment\")\n\ndevice = torch.device(\"cuda:0\")\nname = torch.cuda.get_device_name(device)\n\nstart = time.perf_counter()\nx = torch.randn((2048, 2048), device=device)\ny = x @ x.T\ntorch.cuda.synchronize()\nelapsed = time.perf_counter() - start\n\nprint({\n    \"device\": name,\n    \"torch\": torch.__version__,\n    \"cuda_build\": torch.version.cuda,\n    \"elapsed_seconds\": round(elapsed, 4),\n    \"allocated_mb\": round(torch.cuda.memory_allocated(device) / 1024 / 1024, 1),\n    \"result_shape\": tuple(y.shape),\n})"
    }
  ],
  "codeIntro": "Linux GPU Code Examples"
};
