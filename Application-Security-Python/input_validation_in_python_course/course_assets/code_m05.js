window.COURSE_CODE_MODULE = {
  "title": "Code Example: Validating an API Request",
  "codeExamples": [
    {
      "title": "Code Example: Validating an API Request",
      "language": "python",
      "code": String.raw`# Requires Python 3.10+, FastAPI 0.132.0+, and Pydantic 2.x:
# python -m pip install "fastapi>=0.132,<1" "pydantic>=2,<3"
import json
import unicodedata
from typing import Annotated
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import (
    BaseModel,
    BeforeValidator,
    ConfigDict,
    Field,
    field_validator,
)
from starlette.types import ASGIApp, Message, Receive, Scope, Send


MAX_REQUEST_BYTES = 16_384
MIN_JSON_INTEGER = -(2**63)
MAX_JSON_INTEGER = 2**63 - 1
MAX_USER_ID = 2**63 - 1
MAX_DISPLAY_NAME_LENGTH = 60
MAX_TIMEZONE_INPUT_LENGTH = 64
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
# The middleware below also enforces this policy before framework parsing.
api = FastAPI(strict_content_type=True)


def parse_canonical_user_id(value: object) -> int:
    if (
        type(value) is not str
        or not value
        or len(value) > 19
        or not "1" <= value[0] <= "9"
        or any(not "0" <= character <= "9" for character in value[1:])
    ):
        raise ValueError("user_id must be canonical decimal text")

    user_id = int(value, 10)
    if user_id > MAX_USER_ID:
        raise ValueError("user_id is outside the allowed range")
    return user_id


CanonicalUserId = Annotated[
    int,
    BeforeValidator(parse_canonical_user_id),
    Field(ge=1, le=MAX_USER_ID),
]


class StrictJSONError(ValueError):
    pass


class UnsupportedMediaTypeError(ValueError):
    pass


def unique_json_object(pairs: list[tuple[str, object]]) -> dict:
    result = {}
    for name, value in pairs:
        if name in result:
            raise StrictJSONError("JSON member names must be unique")
        result[name] = value
    return result


def reject_nonstandard_number(_value: str) -> None:
    raise StrictJSONError("JSON numbers must use standard JSON syntax")


def bounded_json_integer(value: str) -> int:
    # Avoid the interpreter's configurable integer-digit failure and apply the
    # application's signed 64-bit JSON number contract explicitly.
    if len(value) > 20:
        raise StrictJSONError("JSON integer is outside the allowed range")
    try:
        number = int(value, 10)
    except ValueError:
        raise StrictJSONError("JSON integer is invalid") from None
    if not MIN_JSON_INTEGER <= number <= MAX_JSON_INTEGER:
        raise StrictJSONError("JSON integer is outside the allowed range")
    return number


def require_json_content_type(scope: Scope) -> None:
    content_types = [
        value
        for name, value in scope.get("headers", [])
        if name.lower() == b"content-type"
    ]
    if len(content_types) != 1:
        raise UnsupportedMediaTypeError(
            "request must contain one JSON Content-Type header"
        )

    media_type = content_types[0].decode("latin-1").split(";", 1)[0]
    media_type = media_type.strip().lower()
    is_json = media_type == "application/json" or (
        media_type.startswith("application/") and media_type.endswith("+json")
    )
    if not is_json:
        raise UnsupportedMediaTypeError(
            "request must use a JSON Content-Type"
        )


class RequestBodyLimitMiddleware:
    """Bound the body and reject ambiguous JSON before framework parsing."""

    def __init__(self, application: ASGIApp, *, max_bytes: int) -> None:
        self.application = application
        self.max_bytes = max_bytes

    async def __call__(
        self, scope: Scope, receive: Receive, send: Send
    ) -> None:
        if scope["type"] != "http":
            await self.application(scope, receive, send)
            return

        chunks: list[bytes] = []
        total = 0
        while True:
            message = await receive()
            if message["type"] == "http.disconnect":
                return
            if message["type"] != "http.request":
                continue

            chunk = message.get("body", b"")
            total += len(chunk)
            if total > self.max_bytes:
                response = JSONResponse(
                    status_code=413,
                    content={"errors": [{"field": "body", "code": "too_large"}]},
                )
                await response(scope, receive, send)
                return
            if chunk:
                chunks.append(chunk)
            if not message.get("more_body", False):
                break

        request_body = b"".join(chunks)
        try:
            if request_body:
                require_json_content_type(scope)
                request_text = request_body.decode("utf-8")
                json.loads(
                    request_text,
                    object_pairs_hook=unique_json_object,
                    parse_int=bounded_json_integer,
                    parse_constant=reject_nonstandard_number,
                )
        except UnsupportedMediaTypeError:
            response = JSONResponse(
                status_code=415,
                content={
                    "errors": [
                        {"field": "content_type", "code": "unsupported"}
                    ]
                },
            )
            await response(scope, receive, send)
            return
        except (ValueError, RecursionError):
            response = JSONResponse(
                status_code=400,
                content={"errors": [{"field": "body", "code": "invalid_json"}]},
            )
            await response(scope, receive, send)
            return

        delivered = False

        async def replay_body() -> Message:
            nonlocal delivered
            if delivered:
                # Only the ASGI server knows when the client disconnected.
                return await receive()
            delivered = True
            return {
                "type": "http.request",
                "body": request_body,
                "more_body": False,
            }

        await self.application(scope, replay_body, send)


class ProfileUpdate(BaseModel):
    # A validated boundary value must not become invalid through assignment.
    model_config = ConfigDict(extra="forbid", strict=True, frozen=True)

    display_name: str
    timezone: str

    @field_validator("display_name")
    @classmethod
    def validate_display_name(cls, value: str) -> str:
        if not 1 <= len(value) <= MAX_DISPLAY_NAME_LENGTH:
            raise ValueError("display_name must be 1 to 60 characters")
        normalized = value.strip()
        if (
            not 1 <= len(normalized) <= MAX_DISPLAY_NAME_LENGTH
            or any(
                unicodedata.category(character) in {"Cc", "Cs", "Zl", "Zp"}
                or ord(character) in BIDI_CONTROL_CODE_POINTS
                for character in normalized
            )
        ):
            raise ValueError("display_name must be 1 to 60 characters")
        return normalized

    @field_validator("timezone")
    @classmethod
    def validate_timezone(cls, value: str) -> str:
        if not 1 <= len(value) <= MAX_TIMEZONE_INPUT_LENGTH:
            raise ValueError("timezone is not supported")
        normalized = value.strip()
        if normalized not in SUPPORTED_TIMEZONES:
            raise ValueError("timezone is not supported")
        try:
            ZoneInfo(normalized)
        except ZoneInfoNotFoundError:
            raise RuntimeError("configured timezone data is unavailable") from None
        return normalized


@api.exception_handler(RequestValidationError)
async def safe_validation_error(
    _request: Request, error: RequestValidationError
) -> JSONResponse:
    known_locations = {
        ("path", "user_id"): "user_id",
        ("body",): "body",
        ("body", "display_name"): "display_name",
        ("body", "timezone"): "timezone",
    }
    public_errors = []
    seen = set()
    for detail in error.errors():
        location = known_locations.get(tuple(detail.get("loc", ())), "request")
        code = "required" if detail.get("type") == "missing" else "invalid"
        public_detail = (location, code)
        if public_detail not in seen:
            seen.add(public_detail)
            public_errors.append({"field": location, "code": code})
        if len(public_errors) == 8:
            break
    return JSONResponse(status_code=422, content={"errors": public_errors})


@api.patch("/users/{user_id}/profile")
def update_profile(user_id: CanonicalUserId, update: ProfileUpdate):
    return {
        "user_id": user_id,
        "display_name": update.display_name,
        "timezone": update.timezone,
    }


# The exported ASGI application enforces the real streamed-byte limit first.
app = RequestBodyLimitMiddleware(api, max_bytes=MAX_REQUEST_BYTES)
`
    }
  ]
};
