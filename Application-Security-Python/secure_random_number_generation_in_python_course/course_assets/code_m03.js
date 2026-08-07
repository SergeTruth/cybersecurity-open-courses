window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Python Randomness APIs and Safe Selection through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Choose a cryptographic API for unpredictable credentials",
      "language": "python",
      "blurb": "The security value comes from secrets rather than the reproducible random module; short human codes require separate expiry and throttling, so this example emits higher-entropy credentials.",
      "code": "import re\nimport secrets\n\nAUTH_CHALLENGE_BYTES = 24\nRECOVERY_PHRASE_WORDS = 6\nMIN_RECOVERY_WORDS = 2048\nRECOVERY_WORD_RE = re.compile(r\"[a-z0-9]{1,32}\")\n\ndef authentication_challenge() -> str:\n    return secrets.token_urlsafe(AUTH_CHALLENGE_BYTES)\n\ndef recovery_phrase(words: tuple[str, ...]) -> str:\n    if (\n        not isinstance(words, tuple)\n        or len(words) < MIN_RECOVERY_WORDS\n        or any(not isinstance(word, str) or not RECOVERY_WORD_RE.fullmatch(word) for word in words)\n        or len(set(words)) != len(words)\n    ):\n        raise ValueError(\"recovery dictionary rejected\")\n    return \"-\".join(secrets.choice(words) for _ in range(RECOVERY_PHRASE_WORDS))\n"
    },
    {
      "title": "Use SystemRandom for a security-sensitive shuffle",
      "language": "python",
      "blurb": "SystemRandom delegates to operating-system randomness and avoids a caller-controlled seed when random ordering itself must resist prediction.",
      "code": "from random import SystemRandom\nimport unicodedata\n\nSYSTEM_RANDOM = SystemRandom()\nMAX_PROMPT_CHARS = 120\nBLOCKED_PROMPT_SEPARATORS = {\"Zl\", \"Zp\"}\n\ndef _blocked_prompt_character(ch: str) -> bool:\n    category = unicodedata.category(ch)\n    return category.startswith(\"C\") or category in BLOCKED_PROMPT_SEPARATORS\n\ndef _safe_prompt(prompt: str) -> bool:\n    return isinstance(prompt, str) and 1 <= len(prompt) <= MAX_PROMPT_CHARS and not any(_blocked_prompt_character(ch) for ch in prompt)\n\ndef shuffled_authentication_prompts(prompts: tuple[str, ...]) -> tuple[str, ...]:\n    if not isinstance(prompts, tuple) or not 3 <= len(prompts) <= 20:\n        raise ValueError(\"authentication prompt set rejected\")\n    if any(not _safe_prompt(prompt) for prompt in prompts) or len(set(prompts)) != len(prompts):\n        raise ValueError(\"authentication prompt set rejected\")\n    mutable = list(prompts)\n    SYSTEM_RANDOM.shuffle(mutable)\n    return tuple(mutable)\n"
    }
  ]
};
