window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Python Randomness APIs and Safe Selection through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Choose a cryptographic API for an unpredictable challenge",
      "language": "python",
      "blurb": "The security value comes from secrets rather than the reproducible random module, and the finite challenge range is sampled without modulo reduction.",
      "code": "import secrets\n\ndef authentication_challenge() -> str:\n    value = secrets.randbelow(1_000_000)\n    return f\"{value:06d}\"\n\ndef select_recovery_word(words: tuple[str, ...]) -> str:\n    if len(words) < 2048 or len(set(words)) != len(words):\n        raise ValueError(\"recovery dictionary rejected\")\n    return secrets.choice(words)\n"
    },
    {
      "title": "Use SystemRandom for a security-sensitive shuffle",
      "language": "python",
      "blurb": "SystemRandom delegates to operating-system randomness and avoids a caller-controlled seed when random ordering itself must resist prediction.",
      "code": "from random import SystemRandom\n\nSYSTEM_RANDOM = SystemRandom()\n\ndef shuffled_authentication_prompts(prompts: tuple[str, ...]) -> tuple[str, ...]:\n    if not 3 <= len(prompts) <= 20 or len(set(prompts)) != len(prompts):\n        raise ValueError(\"authentication prompt set rejected\")\n    mutable = list(prompts)\n    SYSTEM_RANDOM.shuffle(mutable)\n    return tuple(mutable)\n"
    }
  ]
};
