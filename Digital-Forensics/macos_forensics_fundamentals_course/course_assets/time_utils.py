#!/usr/bin/env python3
"""Exact timestamp normalization helpers."""

from __future__ import annotations

import calendar
import re
from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo


ISO_PATTERN = re.compile(
    r"^(?P<date>[0-9]{4}-[0-9]{2}-[0-9]{2})[T ]"
    r"(?P<time>[0-9]{2}:[0-9]{2}:[0-9]{2})"
    r"(?P<fraction>\.[0-9]{1,9})?"
    r"(?P<offset>Z|[+-][0-9]{2}:?[0-9]{2})?$",
    flags=re.ASCII,
)


class NonexistentLocalTime(ValueError):
    """A local wall-clock value falls inside a forward clock change."""


class AmbiguousLocalTime(ValueError):
    """A local wall-clock value maps to multiple UTC instants."""

    def __init__(self, message: str, possible_timestamp_ns: tuple[int, ...]):
        super().__init__(message)
        self.possible_timestamp_ns = possible_timestamp_ns


def valid_local_candidate(
    naive: datetime,
    zone: ZoneInfo,
    fold: int,
) -> datetime | None:
    candidate = naive.replace(tzinfo=zone, fold=fold)
    round_trip = (
        candidate.astimezone(timezone.utc)
        .astimezone(zone)
        .replace(tzinfo=None)
    )
    return candidate if round_trip == naive else None


def epoch_nanoseconds(value: datetime, fraction_ns: int) -> int:
    utc_value = value.astimezone(timezone.utc)
    return calendar.timegm(utc_value.timetuple()) * 1_000_000_000 + fraction_ns


def normalize_timestamp(
    text: str,
    default_timezone: str | None = None,
) -> tuple[int, str]:
    match = ISO_PATTERN.fullmatch(text.strip())
    if match is None:
        raise ValueError("timestamp is not supported ISO 8601 text")
    basic = datetime.strptime(
        match.group("date") + "T" + match.group("time"),
        "%Y-%m-%dT%H:%M:%S",
    )
    fraction = (match.group("fraction") or ".0")[1:].ljust(9, "0")
    nanoseconds = int(fraction)
    offset_text = match.group("offset")
    if offset_text == "Z":
        aware = basic.replace(tzinfo=timezone.utc)
        assumption = "explicit UTC offset"
    elif offset_text:
        compact = offset_text.replace(":", "")
        sign = 1 if compact[0] == "+" else -1
        offset = sign * (int(compact[1:3]) * 60 + int(compact[3:5]))
        aware = basic.replace(tzinfo=timezone(timedelta(minutes=offset)))
        assumption = "explicit numeric offset"
    elif default_timezone:
        zone = ZoneInfo(default_timezone)
        candidates = [
            candidate
            for fold in (0, 1)
            if (candidate := valid_local_candidate(basic, zone, fold)) is not None
        ]
        unique: dict[int, datetime] = {}
        for candidate in candidates:
            value = epoch_nanoseconds(candidate, nanoseconds)
            unique[value] = candidate
        if not unique:
            raise NonexistentLocalTime(
                f"nonexistent local time in {default_timezone}: {text}"
            )
        if len(unique) > 1:
            possible = tuple(sorted(unique))
            raise AmbiguousLocalTime(
                f"ambiguous local time in {default_timezone}: {text}",
                possible,
            )
        aware = next(iter(unique.values()))
        assumption = f"evidence timezone {default_timezone}; unambiguous local time"
    else:
        raise ValueError("timestamp lacks an offset and no evidence timezone was supplied")
    return epoch_nanoseconds(aware, nanoseconds), assumption
