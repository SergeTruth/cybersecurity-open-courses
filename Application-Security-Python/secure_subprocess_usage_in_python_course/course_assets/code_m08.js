window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Least Privilege, Logging, Testing, and Monitoring through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Launch an application worker under a dedicated account",
      "language": "python",
      "blurb": "An application-owned worker receives a fixed path, POSIX user, group, umask, working directory, environment, and closed descriptor set instead of the web service identity.",
      "code": "from pathlib import Path\nimport os\nimport re\nimport subprocess\n\nJOB_ID_RE = re.compile(r\"job-[A-Za-z0-9]{12}\\Z\")\n\nclass ReportWorkerLaunchError(RuntimeError):\n    pass\n\ndef start_report_worker(job_id: str) -> subprocess.Popen[bytes]:\n    if os.name != \"posix\":\n        raise ValueError(\"POSIX worker identity required\")\n    if not isinstance(job_id, str) or not JOB_ID_RE.fullmatch(job_id):\n        raise ValueError(\"report job identifier rejected\")\n    workspace = Path(\"/var/empty/report-worker\")\n    try:\n        return subprocess.Popen(\n            [\"/opt/orders/bin/report-worker\", \"--job\", job_id],\n            stdin=subprocess.DEVNULL,\n            stdout=subprocess.PIPE,\n            stderr=subprocess.DEVNULL,\n            cwd=workspace,\n            env={\"PATH\": \"/usr/bin:/bin\", \"LANG\": \"C\"},\n            user=\"report-worker\",\n            group=\"report-worker\",\n            umask=0o077,\n            close_fds=True,\n            start_new_session=True,\n        )\n    except (OSError, subprocess.SubprocessError, ValueError):\n        raise ReportWorkerLaunchError(\"report worker launch failed\") from None\n"
    },
    {
      "title": "Audit subprocess decisions without command data",
      "language": "python",
      "blurb": "Events record a finite operation, outcome, and bounded duration while excluding arguments, environment values, standard streams, filenames, and raw exceptions.",
      "code": "PROCESS_OPERATIONS = {\"image_dimensions\", \"document_scan\", \"report_render\"}\nPROCESS_OUTCOMES = {\"completed\", \"timeout\", \"output_limit\", \"nonzero_exit\", \"launch_failure\"}\nMAX_PROCESS_EVENT_DURATION_MS = 60_000\n\ndef record_process_event(logger, metrics, operation: str, outcome: str, elapsed_ms: int) -> None:\n    if type(operation) is not str or type(outcome) is not str:\n        raise TypeError(\"process event categories must be text\")\n    if type(elapsed_ms) is not int or not 0 <= elapsed_ms <= MAX_PROCESS_EVENT_DURATION_MS:\n        raise ValueError(\"process event duration rejected\")\n    safe_operation = operation if operation in PROCESS_OPERATIONS else \"other\"\n    safe_outcome = outcome if outcome in PROCESS_OUTCOMES else \"other\"\n    logger.info(\n        \"subprocess_security_event\",\n        extra={\"operation\": safe_operation, \"outcome\": safe_outcome, \"elapsed_ms\": elapsed_ms},\n    )\n    metrics.increment(\"subprocess_events\", tags={\"operation\": safe_operation, \"outcome\": safe_outcome})\n"
    }
  ]
};
