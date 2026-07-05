window.COURSE_CODE_MODULE = {
  "title": "Evidence Handling Utilities",
  "codeIntro": "These examples perform practical evidence-handling tasks on approved local files. They do not capture live traffic.",
  "codeExamples": [
    {
      "title": "Redact Sensitive Values From an Exported Text Excerpt",
      "language": "python",
      "blurb": "Use this on an exported text excerpt before sharing a report. Review the output manually because automated redaction is only a helper.",
      "code": String.raw`from pathlib import Path
import argparse
import re


SENSITIVE_PATTERNS = [
    (
        re.compile(r"(?i)(password|passwd|pwd|token|api[_-]?key|session|cookie)=([^&\s;]+)"),
        r"\1=[REDACTED]"
    ),
    (
        re.compile(r"(?i)(authorization:\s*)(bearer\s+)?[A-Za-z0-9._~+/=-]+"),
        r"\1[REDACTED]"
    ),
    (
        re.compile(r"(?i)(set-cookie:\s*)[^\r\n;]+"),
        r"\1[REDACTED]"
    ),
    (
        re.compile(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b"),
        "[EMAIL_REDACTED]"
    )
]


def redact(text):
    for pattern, replacement in SENSITIVE_PATTERNS:
        text = pattern.sub(replacement, text)
    return text


parser = argparse.ArgumentParser(
    description="Redact common sensitive values from an approved packet text export."
)
parser.add_argument("input", help="Text exported from an approved packet review")
parser.add_argument("--out", default="redacted_packet_excerpt.txt")
args = parser.parse_args()

source = Path(args.input)
clean_text = redact(source.read_text(encoding="utf-8", errors="replace"))
Path(args.out).write_text(clean_text, encoding="utf-8")
print(f"Wrote {args.out}; review it manually before sharing.")`
    }
  ]
};
