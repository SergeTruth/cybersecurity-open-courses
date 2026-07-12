window.COURSE_CODE_MODULE = {
  "title": "Code Example: Validation with Safe APIs",
  "codeExamples": [
    {
      "title": "Code Example: Validation with Safe APIs",
      "language": "python",
      "code": String.raw`import sqlite3
import subprocess
import sys
from pathlib import Path
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError


ALLOWED_PROFILE_FIELDS = {"display_name", "timezone"}
ALLOWED_REPORTS = {"daily", "weekly", "monthly"}
# Deployment contract: these paths and their parents are administrator-owned.
REPORT_PROGRAM = Path("/srv/app/bin/reports.py")
REPORT_WORKING_DIR = Path("/srv/app")


class ValidationError(ValueError):
    pass


def update_profile(
    conn: sqlite3.Connection, user_id: object, changes: object
) -> None:
    # The caller owns the database transaction's commit or rollback boundary.
    if type(user_id) is not int or user_id <= 0:
        raise ValidationError("user_id must be a positive integer")
    if type(changes) is not dict or set(changes) != ALLOWED_PROFILE_FIELDS:
        raise ValidationError("profile changes must contain the exact fields")

    display_name = changes["display_name"]
    timezone = changes["timezone"]
    if type(display_name) is not str:
        raise ValidationError("display_name must be text")
    if type(timezone) is not str:
        raise ValidationError("timezone must be text")

    display_name = display_name.strip()
    timezone = timezone.strip()
    if not 1 <= len(display_name) <= 60:
        raise ValidationError("display_name is invalid")
    try:
        ZoneInfo(timezone)
    except (ValueError, ZoneInfoNotFoundError):
        raise ValidationError("timezone must be an IANA timezone") from None

    conn.execute(
        "UPDATE profiles SET display_name = ?, timezone = ? WHERE user_id = ?",
        (display_name, timezone, user_id),
    )


def run_report(report_name: object) -> None:
    if type(report_name) is not str or report_name not in ALLOWED_REPORTS:
        raise ValidationError("report is not allowed")

    subprocess.run(
        [sys.executable, "-I", str(REPORT_PROGRAM), report_name],
        check=True,
        timeout=10,
        cwd=REPORT_WORKING_DIR,
        env={"PATH": "/usr/bin:/bin", "LANG": "C.UTF-8"},
    )
`
    }
  ]
};
