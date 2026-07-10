window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Validate Runtime and Performance",
  "codeExamples": [
    {
      "title": "Record GPU Utilization and Memory Snapshot",
      "language": "bash",
      "code": "nvidia-smi --query-gpu=timestamp,index,name,utilization.gpu,memory.used,memory.total,temperature.gpu,power.draw \\\n  --format=csv |\n  tee gpu-telemetry-snapshot.csv\n\nrocm-smi --showuse --showmemuse --showtemp --showpower 2>/dev/null |\n  tee rocm-telemetry-snapshot.txt || true"
    },
    {
      "title": "Run a Small Matrix Performance Smoke Test",
      "language": "python",
      "code": "import time\nimport torch\n\nif not torch.cuda.is_available():\n    raise SystemExit(\"GPU runtime is not visible; refusing to report a CPU fallback as success\")\n\ndevice = torch.device(\"cuda:0\")\ntorch.cuda.reset_peak_memory_stats(device)\n\nstart = time.perf_counter()\nx = torch.randn((4096, 4096), device=device)\nfor _ in range(10):\n    x = x @ x.T\ntorch.cuda.synchronize()\nelapsed = time.perf_counter() - start\n\nprint({\n    \"device\": torch.cuda.get_device_name(device),\n    \"elapsed_seconds\": round(elapsed, 3),\n    \"peak_memory_mb\": round(torch.cuda.max_memory_allocated(device) / 1024 / 1024, 1),\n})"
    },
    {
      "title": "Validate an Inference Server Uses GPU",
      "language": "bash",
      "code": "SERVER=http://127.0.0.1:8000\n\ncurl -s \"$SERVER/health\" | tee inference-health.json\ncurl -s \"$SERVER/v1/models\" | tee inference-models.json\n\nbefore=$(nvidia-smi --query-gpu=utilization.gpu,memory.used --format=csv,noheader,nounits 2>/dev/null || true)\ncurl -s \"$SERVER/v1/completions\" \\\n  -H 'content-type: application/json' \\\n  -d '{\"model\":\"local-model\",\"prompt\":\"Say ready.\",\"max_tokens\":8}' | tee inference-smoke.json\nafter=$(nvidia-smi --query-gpu=utilization.gpu,memory.used --format=csv,noheader,nounits 2>/dev/null || true)\n\nprintf 'before=%s\\nafter=%s\\n' \"$before\" \"$after\" | tee inference-gpu-delta.txt"
    }
  ],
  "codeIntro": "Linux GPU Code Examples"
};
