window.COURSE_CODE_MODULE = {
  "title": "Code Example: Validation with Safe APIs",
  "codeExamples": [
    {
      "title": "Code Example: Validation with Safe APIs",
      "language": "python",
      "code": "import sqlite3\nimport subprocess\n\n\nALLOWED_PROFILE_FIELDS = {\"display_name\", \"timezone\"}\nALLOWED_REPORTS = {\"daily\", \"weekly\", \"monthly\"}\n\n\nclass ValidationError(ValueError):\n    pass\n\n\ndef update_profile(conn: sqlite3.Connection, user_id: int, changes: dict) -> None:\n    unexpected = set(changes) - ALLOWED_PROFILE_FIELDS\n    if unexpected:\n        raise ValidationError(f\"fields are not allowed: {sorted(unexpected)}\")\n\n    display_name = str(changes.get(\"display_name\", \"\")).strip()\n    timezone = str(changes.get(\"timezone\", \"\")).strip()\n    if not display_name or len(display_name) > 60:\n        raise ValidationError(\"display_name is invalid\")\n    if \"/\" not in timezone or len(timezone) > 64:\n        raise ValidationError(\"timezone is invalid\")\n\n    conn.execute(\n        \"UPDATE profiles SET display_name = ?, timezone = ? WHERE user_id = ?\",\n        (display_name, timezone, user_id),\n    )\n\n\ndef run_report(report_name: str) -> None:\n    if report_name not in ALLOWED_REPORTS:\n        raise ValidationError(\"report is not allowed\")\n\n    subprocess.run([\"python\", \"-m\", \"reports\", report_name], check=True)"
    }
  ]
};
