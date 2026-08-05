window.COURSE_CODE_MODULE = {
  "title": "Code Example: Validation with Safe APIs",
  "codeExamples": [
    {
      "title": "Code Example: Validation with Safe APIs",
      "language": "python",
      "code": String.raw`import sqlite3
import subprocess
import sys
import unicodedata
from dataclasses import dataclass
from pathlib import Path
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError


ALLOWED_PROFILE_FIELDS = frozenset({"display_name", "timezone"})
ALLOWED_REPORTS = frozenset({"daily", "weekly", "monthly"})
MAX_DISPLAY_NAME_LENGTH = 60
MAX_TIMEZONE_INPUT_LENGTH = 64
SQLITE_MAX_INTEGER = 2**63 - 1
BIDI_CONTROL_CODE_POINTS = frozenset(
    {
        0x061C,
        0x200E,
        0x200F,
        0x202A,
        0x202B,
        0x202C,
        0x202D,
        0x202E,
        0x2066,
        0x2067,
        0x2068,
        0x2069,
    }
)
SUPPORTED_TIMEZONES = frozenset(
    {"UTC", "America/New_York", "Europe/London"}
)
# Deployment contract: these paths and their parents are administrator-owned.
PROFILE_DATABASE = Path("/srv/app/data/profiles.sqlite3")
REPORT_PROGRAM = Path("/srv/app/bin/reports.py")
REPORT_WORKING_DIR = Path("/srv/app")


class ValidationError(ValueError):
    pass


class ProfileNotFound(LookupError):
    pass


class ProfileDataIntegrityError(RuntimeError):
    pass


@dataclass(frozen=True)
class AuthenticatedPrincipal:
    """Created by application authentication middleware, never from request data."""

    user_id: int


def open_profile_database() -> sqlite3.Connection:
    # This application-owned factory returns a connection with no implicit
    # transactions, so the trusted update boundary can own BEGIN and COMMIT.
    return sqlite3.connect(PROFILE_DATABASE, isolation_level=None)


def update_own_profile(
    principal: AuthenticatedPrincipal,
    changes: object,
) -> None:
    # The request has no target ID; authorization derives it from the principal.
    # Migration invariant: profiles.user_id is INTEGER PRIMARY KEY or UNIQUE.
    # This boundary opens a dedicated connection and owns its transaction.
    if (
        type(principal) is not AuthenticatedPrincipal
        or type(principal.user_id) is not int
        or not 1 <= principal.user_id <= SQLITE_MAX_INTEGER
    ):
        raise ValidationError("authenticated user_id is outside the allowed range")
    if type(changes) is not dict or set(changes) != ALLOWED_PROFILE_FIELDS:
        raise ValidationError("profile changes must contain the exact fields")

    display_name = changes["display_name"]
    timezone = changes["timezone"]
    if type(display_name) is not str:
        raise ValidationError("display_name must be text")
    if type(timezone) is not str:
        raise ValidationError("timezone must be text")
    if not 1 <= len(display_name) <= MAX_DISPLAY_NAME_LENGTH:
        raise ValidationError("display_name is invalid")
    if not 1 <= len(timezone) <= MAX_TIMEZONE_INPUT_LENGTH:
        raise ValidationError("timezone is invalid")

    display_name = display_name.strip()
    timezone = timezone.strip()
    if (
        not 1 <= len(display_name) <= MAX_DISPLAY_NAME_LENGTH
        or any(
            unicodedata.category(character) in {"Cc", "Cs", "Zl", "Zp"}
            or ord(character) in BIDI_CONTROL_CODE_POINTS
            for character in display_name
        )
    ):
        raise ValidationError("display_name is invalid")
    if timezone not in SUPPORTED_TIMEZONES:
        raise ValidationError("timezone is not supported")
    try:
        ZoneInfo(timezone)
    except ZoneInfoNotFoundError:
        raise RuntimeError("configured timezone data is unavailable") from None

    conn = open_profile_database()
    try:
        conn.execute("BEGIN IMMEDIATE")
        cursor = conn.execute(
            "UPDATE profiles SET display_name = ?, timezone = ? WHERE user_id = ?",
            (display_name, timezone, principal.user_id),
        )
        if cursor.rowcount == 0:
            raise ProfileNotFound("authenticated profile was not found")
        if cursor.rowcount != 1:
            raise ProfileDataIntegrityError(
                "profile uniqueness invariant was violated"
            )
        conn.execute("COMMIT")
    except BaseException:
        if conn.in_transaction:
            conn.execute("ROLLBACK")
        raise
    finally:
        conn.close()


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
