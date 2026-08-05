window.COURSE_CODE_MODULE = {
  "title": "Code Example: Validating File Input",
  "codeExamples": [
    {
      "title": "Code Example: Validating File Input",
      "language": "python",
      "code": String.raw`# Requires Python 3.10+ on a POSIX platform with O_DIRECTORY and O_NOFOLLOW.
import json
import os
import re
import stat
import unicodedata
from dataclasses import dataclass
from pathlib import Path
from typing import Protocol
from uuid import UUID


class ValidationError(ValueError):
    pass


# POSIX deployment contract: a dedicated service account owns BASE_DIR and its
# parents. No untrusted process shares that UID or has ACL or mode-based write
# access, and upload code creates new files rather than links supplied by users.
BASE_DIR = Path("/srv/app/uploads")
MAX_BYTES = 1_000_000
MAX_CUSTOMERS = 1_000
MIN_JSON_INTEGER = -(2**63)
MAX_CUSTOMER_ID = 2**63 - 1
MAX_CUSTOMER_NAME_LENGTH = 80
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
CUSTOMER_FIELDS = frozenset({"id", "name", "email"})
FILENAME_PATTERN = re.compile(
    r"[A-Za-z0-9][A-Za-z0-9_.-]*\.json", flags=re.ASCII
)


class UploadNotFound(LookupError):
    pass


@dataclass(frozen=True)
class AuthorizedUpload:
    storage_name: str


class UploadRepository(Protocol):
    def resolve_for_import(
        self, *, principal: object, upload_id: UUID
    ) -> AuthorizedUpload | None:
        """Authorize the actor and resolve the server-owned storage name."""
        ...


def has_disallowed_single_line_character(value: str) -> bool:
    return any(
        unicodedata.category(character) in {"Cc", "Cs", "Zl", "Zp"}
        or ord(character) in BIDI_CONTROL_CODE_POINTS
        for character in value
    )


def unique_json_object(pairs: list[tuple[str, object]]) -> dict:
    result = {}
    for name, value in pairs:
        if name in result:
            raise ValidationError("JSON member names must be unique")
        result[name] = value
    return result


def reject_nonstandard_number(_value: str) -> None:
    raise ValidationError("JSON numbers must use standard JSON syntax")


def bounded_json_integer(value: str) -> int:
    # Bound conversion independently of the interpreter's global digit limit.
    if len(value) > 20:
        raise ValidationError("JSON integer is outside the allowed range")
    try:
        number = int(value, 10)
    except ValueError:
        raise ValidationError("JSON integer is invalid") from None
    if not MIN_JSON_INTEGER <= number <= MAX_CUSTOMER_ID:
        raise ValidationError("JSON integer is outside the allowed range")
    return number


def parse_upload_id(value: object) -> UUID:
    if type(value) is not str or len(value) != 36:
        raise ValidationError("upload_id must be a canonical UUID")
    try:
        upload_id = UUID(value)
    except (ValueError, AttributeError):
        raise ValidationError("upload_id must be a canonical UUID") from None
    if upload_id.version != 4 or str(upload_id) != value:
        raise ValidationError("upload_id must be a canonical UUID")
    return upload_id


def validate_storage_name(filename: object) -> str:
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
    if len(value) > 254 or not value.isascii():
        raise ValidationError("email failed a basic address sanity check")

    email = value.strip()
    if (
        len(email) > 254
        or email.count("@") != 1
        or any(
            character.isspace()
            or unicodedata.category(character) in {"Cc", "Cs", "Zl", "Zp"}
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

    # This lightweight example is intentionally ASCII-only. Use a dedicated
    # SMTPUTF8 and IDNA-aware validator when internationalized mail is allowed.
    normalized_domain = domain.lower()
    normalized_email = f"{local_part}@{normalized_domain}"
    if len(normalized_domain) > 253 or len(normalized_email) > 254:
        raise ValidationError("email failed a basic address sanity check")
    return normalized_email


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


def verify_private_upload_directory(file_descriptor: int) -> None:
    try:
        directory_info = os.fstat(file_descriptor)
    except OSError:
        raise ValidationError("upload directory is unavailable") from None

    unsafe_write_bits = stat.S_IWGRP | stat.S_IWOTH
    if (
        not stat.S_ISDIR(directory_info.st_mode)
        or directory_info.st_uid != os.geteuid()
        or directory_info.st_mode & unsafe_write_bits
    ):
        raise ValidationError("upload directory is not privately owned")


def read_authorized_upload(storage_name: object) -> bytes:
    # storage_name comes only from the trusted repository, never from a client.
    safe_name = validate_storage_name(storage_name)
    directory_flags = os.O_RDONLY | os.O_DIRECTORY | os.O_CLOEXEC | os.O_NOFOLLOW
    file_flags = os.O_RDONLY | os.O_CLOEXEC | os.O_NOFOLLOW | os.O_NONBLOCK

    try:
        directory_fd = os.open(BASE_DIR, directory_flags)
    except OSError:
        raise ValidationError("upload directory is unavailable") from None

    try:
        verify_private_upload_directory(directory_fd)
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
    if type(name) is not str or not 1 <= len(name) <= MAX_CUSTOMER_NAME_LENGTH:
        raise ValidationError("customer name is invalid")
    normalized_name = name.strip()
    email = normalize_email(raw["email"])
    if (
        type(customer_id) is not int
        or not 1 <= customer_id <= MAX_CUSTOMER_ID
    ):
        raise ValidationError("customer id is outside the allowed range")
    if customer_id in seen_ids:
        raise ValidationError("customer ids must be unique")
    if (
        not 1 <= len(normalized_name) <= MAX_CUSTOMER_NAME_LENGTH
        or has_disallowed_single_line_character(name)
    ):
        raise ValidationError("customer name is invalid")

    seen_ids.add(customer_id)
    return {
        "id": customer_id,
        "name": normalized_name,
        "email": email,
    }


def load_customer_import(
    repository: UploadRepository,
    principal: object,
    upload_id: object,
) -> list[dict]:
    # The composition root supplies the repository and authenticated principal.
    canonical_upload_id = parse_upload_id(upload_id)
    upload = repository.resolve_for_import(
        principal=principal, upload_id=canonical_upload_id
    )
    if upload is None:
        # Use one result for missing and unauthorized objects.
        raise UploadNotFound("upload was not found")
    if (
        type(upload) is not AuthorizedUpload
        or type(upload.storage_name) is not str
    ):
        raise RuntimeError("upload repository returned invalid state")

    raw_bytes = read_authorized_upload(upload.storage_name)
    try:
        data = json.loads(
            raw_bytes.decode("utf-8"),
            object_pairs_hook=unique_json_object,
            parse_int=bounded_json_integer,
            parse_constant=reject_nonstandard_number,
        )
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
