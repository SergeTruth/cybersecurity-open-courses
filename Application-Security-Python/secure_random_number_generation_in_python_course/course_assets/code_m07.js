window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Deployment, Testing, and Operational Concerns through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Inject deterministic randomness only into a unit under test",
      "language": "python",
      "blurb": "Production defaults to secrets.randbelow, while tests can supply a bounded fake without globally seeding or replacing the operating-system generator.",
      "code": "from collections.abc import Callable\nimport secrets\n\ndef select_backoff_slot(slot_count: int, draw: Callable[[int], int] = secrets.randbelow) -> int:\n    if type(slot_count) is not int or not 2 <= slot_count <= 1024:\n        raise ValueError(\"backoff slot count rejected\")\n    selected = draw(slot_count)\n    if type(selected) is not int or not 0 <= selected < slot_count:\n        raise ValueError(\"random source violated its contract\")\n    return selected\n\ndef test_backoff_boundary() -> None:\n    assert select_backoff_slot(8, lambda upper: upper - 1) == 7\n"
    },
    {
      "title": "Estimate a token collision budget",
      "language": "python",
      "blurb": "The calculation makes alphabet size, token length, and issuance volume explicit so a design review can reject values with an excessive birthday-bound probability.",
      "code": "from decimal import Decimal, getcontext\n\ngetcontext().prec = 50\n\ndef approximate_collision_probability(alphabet_size: int, length: int, issued: int) -> Decimal:\n    if alphabet_size < 2 or length < 1 or issued < 0:\n        raise ValueError(\"collision model input rejected\")\n    space = Decimal(alphabet_size) ** length\n    pairs = Decimal(issued) * Decimal(max(issued - 1, 0)) / 2\n    return min(Decimal(1), pairs / space)\n\ndef approve_identifier_design(alphabet_size: int, length: int, issued: int) -> None:\n    if approximate_collision_probability(alphabet_size, length, issued) > Decimal(\"1e-12\"):\n        raise ValueError(\"identifier collision budget exceeded\")\n"
    }
  ]
};
