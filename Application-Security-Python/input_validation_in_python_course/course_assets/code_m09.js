window.COURSE_CODE_MODULE = {
  "title": "Code Example: A Complete Validation Pattern",
  "codeExamples": [
    {
      "title": "Code Example: A Complete Validation Pattern",
      "language": "python",
      "code": String.raw`# Requires Python 3.10+.
import unicodedata
from dataclasses import dataclass
from enum import Enum
from types import MappingProxyType
from typing import Protocol


ALLOWED_TRANSITIONS = MappingProxyType(
    {
        "draft": frozenset({"submitted"}),
        "submitted": frozenset({"approved", "rejected"}),
        "approved": frozenset(),
        "rejected": frozenset(),
    }
)
TICKET_FIELDS = frozenset({"title", "status"})
MAX_TITLE_LENGTH = 120
MAX_STATUS_INPUT_LENGTH = 16
MAX_TICKET_ID = 2**63 - 1
MAX_TICKET_VERSION = 2**63 - 1
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


class ValidationError(ValueError):
    pass


class AuthorizationError(Exception):
    pass


class ConcurrentUpdateError(Exception):
    pass


class TicketNotFound(Exception):
    pass


class TransitionOutcome(Enum):
    UPDATED = "updated"
    DENIED = "denied"
    CONFLICT = "conflict"


@dataclass(frozen=True)
class StoredTicket:
    ticket_id: int
    status: str
    version: int


class TicketRepository(Protocol):
    def load_for_actor(
        self, principal: object, ticket_id: int
    ) -> StoredTicket | None: ...

    def transition_if_authorized(
        self,
        *,
        principal: object,
        ticket_id: int,
        expected_status: str,
        expected_version: int,
        title: str,
        new_status: str,
    ) -> TransitionOutcome:
        """Recheck permission, state, and version in the update transaction."""
        ...


def _validate_payload(current_status: str, payload: object) -> dict:
    if type(payload) is not dict:
        raise ValidationError("payload must be an object")
    if set(payload) != TICKET_FIELDS:
        raise ValidationError("payload must contain exactly title and status")

    title = payload["title"]
    status = payload["status"]
    if type(title) is not str:
        raise ValidationError("title must be text")
    if type(status) is not str:
        raise ValidationError("status must be text")
    if not 1 <= len(title) <= MAX_TITLE_LENGTH:
        raise ValidationError("title must be 1 to 120 characters")
    if not 1 <= len(status) <= MAX_STATUS_INPUT_LENGTH:
        raise ValidationError("status is not allowed")

    normalized_title = title.strip()
    if (
        not 1 <= len(normalized_title) <= MAX_TITLE_LENGTH
        or any(
            unicodedata.category(character) in {"Cc", "Cs", "Zl", "Zp"}
            or ord(character) in BIDI_CONTROL_CODE_POINTS
            for character in normalized_title
        )
    ):
        raise ValidationError("title must be 1 to 120 characters")
    if status not in ALLOWED_TRANSITIONS:
        raise ValidationError("status is not allowed")
    if status not in ALLOWED_TRANSITIONS[current_status]:
        raise ValidationError("status transition is not allowed")

    return {"title": normalized_title, "status": status}


def update_ticket(
    repository: TicketRepository,
    principal: object,
    ticket_id: object,
    payload: object,
) -> dict:
    # The composition root supplies the repository and authenticated principal.
    if type(ticket_id) is not int or not 1 <= ticket_id <= MAX_TICKET_ID:
        raise ValidationError("ticket_id is outside the allowed range")

    ticket = repository.load_for_actor(principal, ticket_id)
    if ticket is None:
        raise TicketNotFound("ticket was not found")
    if (
        type(ticket) is not StoredTicket
        or type(ticket.ticket_id) is not int
        or not 1 <= ticket.ticket_id <= MAX_TICKET_ID
        or ticket.ticket_id != ticket_id
        or type(ticket.status) is not str
        or ticket.status not in ALLOWED_TRANSITIONS
        or type(ticket.version) is not int
        or not 0 <= ticket.version <= MAX_TICKET_VERSION
    ):
        raise RuntimeError("ticket repository returned invalid state")

    update = _validate_payload(ticket.status, payload)
    outcome = repository.transition_if_authorized(
        principal=principal,
        ticket_id=ticket.ticket_id,
        expected_status=ticket.status,
        expected_version=ticket.version,
        title=update["title"],
        new_status=update["status"],
    )
    if outcome is TransitionOutcome.DENIED:
        raise AuthorizationError("actor may not perform this transition")
    if outcome is TransitionOutcome.CONFLICT:
        raise ConcurrentUpdateError("ticket changed; reload before retrying")
    if outcome is not TransitionOutcome.UPDATED:
        raise RuntimeError("ticket repository returned an invalid outcome")
    return update
`
    }
  ]
};
