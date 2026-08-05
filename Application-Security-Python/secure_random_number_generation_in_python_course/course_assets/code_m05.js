window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Keys, Salts, Nonces, and Initialization Values through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Generate a unique password-hashing salt",
      "language": "python",
      "blurb": "Each password record receives a fresh 128-bit salt from the operating system; the salt is stored openly beside the derived value rather than reused as a secret key.",
      "code": "import hashlib\nimport os\n\nSCRYPT_MAX_MEMORY = 64 * 1024 * 1024\n\ndef derive_password_record(password: str) -> tuple[bytes, bytes]:\n    if not isinstance(password, str) or not 12 <= len(password) <= 1024:\n        raise ValueError(\"password length rejected\")\n    salt = os.urandom(16)\n    derived = hashlib.scrypt(\n        password.encode(\"utf-8\"),\n        salt=salt,\n        n=2**15,\n        r=8,\n        p=1,\n        dklen=32,\n        maxmem=SCRYPT_MAX_MEMORY,\n    )\n    return salt, derived\n"
    },
    {
      "title": "Generate an algorithm-sized AES-GCM nonce",
      "language": "python",
      "blurb": "The nonce is a fresh twelve-byte value for each encryption under a key, and the function returns it with the ciphertext so uniqueness can be enforced by the caller.",
      "code": "import os\nfrom cryptography.hazmat.primitives.ciphers.aead import AESGCM\n\nAES_GCM_NONCE_BYTES = 12\nMAX_RECORD_ID_BYTES = 128\nMAX_PLAINTEXT_BYTES = 1_048_576\n\ndef encrypt_record(key: bytes, plaintext: bytes, record_id: bytes) -> tuple[bytes, bytes]:\n    if not isinstance(key, bytes) or len(key) not in {16, 24, 32}:\n        raise ValueError(\"AES-GCM input rejected\")\n    if not isinstance(plaintext, bytes) or len(plaintext) > MAX_PLAINTEXT_BYTES:\n        raise ValueError(\"AES-GCM input rejected\")\n    if not isinstance(record_id, bytes) or not 1 <= len(record_id) <= MAX_RECORD_ID_BYTES:\n        raise ValueError(\"AES-GCM input rejected\")\n    nonce = os.urandom(AES_GCM_NONCE_BYTES)\n    ciphertext = AESGCM(key).encrypt(nonce, plaintext, record_id)\n    return nonce, ciphertext\n"
    }
  ]
};
