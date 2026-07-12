#!/bin/bash

set -Eeuo pipefail
umask 077
export LC_ALL=C
export TZ=UTC

DFIR_ASSET_DIR="$(
  cd -P -- "$(dirname -- "${BASH_SOURCE[0]}")" >/dev/null && pwd -P
)"
DFIR_PYTHON="${DFIR_PYTHON:-python3}"

dfir_load_context() {
  local assignments
  assignments="$($DFIR_PYTHON "$DFIR_ASSET_DIR/dfir_context.py" --shell)"
  eval "$assignments"
  export DFIR_RUN_RESOLVED DFIR_ROOT
  RUN="$DFIR_RUN_RESOLVED"
  ROOT="$DFIR_ROOT"
  export RUN ROOT
}

dfir_append_record() {
  local destination="$1"
  local stage="$2"
  local kind="$3"
  local message="$4"
  "$DFIR_PYTHON" - "$destination" "$stage" "$kind" "$message" <<'PY'
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

path, stage, kind, message = sys.argv[1:]
record = {
    "stage": stage,
    "kind": kind,
    "message": message,
    "time_utc": datetime.now(timezone.utc).isoformat(),
}
with Path(path).open("a", encoding="utf-8", newline="\n") as handle:
    handle.write(json.dumps(record, ensure_ascii=False, sort_keys=True) + "\n")
PY
}

dfir_record_limitation() {
  dfir_append_record "$RUN/limitations.jsonl" "$1" "limitation" "$2"
}

dfir_enable_error_trap() {
  DFIR_STAGE="$1"
  export DFIR_STAGE
  trap '
    status=$?
    trap - ERR
    dfir_append_record "$RUN/errors.jsonl" "$DFIR_STAGE" "error" \
      "line=$LINENO status=$status command=$BASH_COMMAND" || true
    exit "$status"
  ' ERR
}
