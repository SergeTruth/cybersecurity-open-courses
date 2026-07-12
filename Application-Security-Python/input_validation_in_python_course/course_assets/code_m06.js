window.COURSE_CODE_MODULE = {
  "title": "Code Example: Validating File Input",
  "codeExamples": [
    {
      "title": "Code Example: Validating File Input",
      "language": "python",
      "code": String.raw`import json
import os
import re
import stat
from pathlib import Path


class ValidationError(ValueError):
    pass


# POSIX deployment contract: BASE_DIR and its parents are administrator-owned.
BASE_DIR = Path("/srv/app/uploads")
MAX_BYTES = 1_000_000
MAX_CUSTOMERS = 1_000
CUSTOMER_FIELDS = {"id", "name", "email"}
FILENAME_PATTERN = re.compile(
    r"[A-Za-z0-9][A-Za-z0-9_.-]*\.json", flags=re.ASCII
)


def validate_filename(filename: object) -> str:
    if (
        type(filename) is not str
        or len(filename) > 64
        or FILENAME_PATTERN.fullmatch(filename) is None
    ):
        raise ValidationError("filename must be one approved JSON file name")
    return filename


def normalize_email(value: object) -> str:
    if type(value) is not str:
        raise ValidationError("email is required")

    email = value.strip()
    if (
        len(email) > 254
        or email.count("@") != 1
        or any(
            character.isspace()
            or ord(character) < 32
            or ord(character) == 127
            for character in email
        )
    ):
        raise ValidationError("email failed a basic address sanity check")

    local_part, domain = email.split("@")
    if (
        not local_part
        or not domain
        or len(local_part) > 64
        or domain.startswith(".")
        or domain.endswith(".")
    ):
        raise ValidationError("email failed a basic address sanity check")

    return f"{local_part}@{domain.lower()}"


def read_limited(file_descriptor: int) -> bytes:
    chunks: list[bytes] = []
    total = 0
    while total <= MAX_BYTES:
        chunk = os.read(file_descriptor, min(65_536, MAX_BYTES + 1 - total))
        if not chunk:
            return b"".join(chunks)
        chunks.append(chunk)
        total += len(chunk)
    raise ValidationError("file is too large")


def read_upload(filename: object) -> bytes:
    safe_name = validate_filename(filename)
    directory_flags = os.O_RDONLY | os.O_DIRECTORY | os.O_CLOEXEC | os.O_NOFOLLOW
    file_flags = os.O_RDONLY | os.O_CLOEXEC | os.O_NOFOLLOW | os.O_NONBLOCK

    try:
        directory_fd = os.open(BASE_DIR, directory_flags)
    except OSError:
        raise ValidationError("upload directory is unavailable") from None

    try:
        try:
            file_fd = os.open(safe_name, file_flags, dir_fd=directory_fd)
        except OSError:
            raise ValidationError("upload file could not be opened safely") from None
    finally:
        os.close(directory_fd)

    try:
        try:
            file_info = os.fstat(file_fd)
            if not stat.S_ISREG(file_info.st_mode):
                raise ValidationError("upload must be a regular file")
            if file_info.st_size < 0 or file_info.st_size > MAX_BYTES:
                raise ValidationError("file is too large")
            return read_limited(file_fd)
        except OSError:
            raise ValidationError("upload file could not be read safely") from None
    finally:
        os.close(file_fd)


def validate_customer(raw: object, seen_ids: set[int]) -> dict:
    if type(raw) is not dict or set(raw) != CUSTOMER_FIELDS:
        raise ValidationError("each customer must contain id, name, and email")

    customer_id = raw["id"]
    name = raw["name"]
    email = normalize_email(raw["email"])
    if type(customer_id) is not int or customer_id <= 0:
        raise ValidationError("customer id must be a positive integer")
    if customer_id in seen_ids:
        raise ValidationError("customer ids must be unique")
    if (
        type(name) is not str
        or not 1 <= len(name.strip()) <= 80
        or any(ord(character) < 32 or ord(character) == 127 for character in name)
    ):
        raise ValidationError("customer name is invalid")

    seen_ids.add(customer_id)
    return {
        "id": customer_id,
        "name": name.strip(),
        "email": email,
    }


def load_customer_import(filename: object) -> list[dict]:
    raw_bytes = read_upload(filename)
    try:
        data = json.loads(raw_bytes.decode("utf-8"))
    except (UnicodeDecodeError, ValueError, RecursionError):
        raise ValidationError("file must contain valid UTF-8 JSON") from None

    if type(data) is not dict or set(data) != {"customers"}:
        raise ValidationError("file must contain exactly a customers field")
    customers = data["customers"]
    if type(customers) is not list or len(customers) > MAX_CUSTOMERS:
        raise ValidationError("customers must be a bounded list")

    seen_ids: set[int] = set()
    return [validate_customer(customer, seen_ids) for customer in customers]
`
    }
  ]
};
