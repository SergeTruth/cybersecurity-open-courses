window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-5f910744e6",
  "questions": {
    "q01": {
      "options": {
        "A": "End-to-end review follows events through delivery, repeated processing, failure handling, and business effects.",
        "B": "Broker isolation does not establish that retries and replays preserve application invariants.",
        "C": "Internal producers and stored messages can still violate consumer trust assumptions.",
        "D": "Consumers depend on producer authority, event meaning, and later replay workflows beyond initial acceptance."
      }
    },
    "q02": {
      "options": {
        "A": "Producer authentication does not prove that every supplied field or requested action is permitted.",
        "B": "Persistence preserves bytes without guaranteeing truthful provenance or acceptable business meaning.",
        "C": "Topic location cannot authorize every message's referenced tenant or resource operation.",
        "D": "A transported event can still be invalid, stale, duplicated, or outside authorized context."
      }
    },
    "q03": {
      "options": {
        "A": "A version label does not prove the payload actually satisfies its declared contract.",
        "B": "Version changes can alter field meaning, permissions, validation, and expected consumer behavior.",
        "C": "Optional fields can still change security decisions and require explicit compatibility review.",
        "D": "Guessing versions from field presence can create ambiguous or conflicting event interpretation."
      }
    },
    "q04": {
      "options": {
        "A": "Publishing and replaying have different operational effects and need separate permission justification.",
        "B": "Scope publishing, reading, inspection, replay, deletion, and administration to their actual owners.",
        "C": "Shared environment membership does not establish equal event authority for every workload.",
        "D": "A producer-controlled source field is not authoritative proof of the consumer's permissions."
      }
    },
    "q05": {
      "options": {
        "A": "A valid signed message can be replayed unless freshness and duplicate rules also apply.",
        "B": "Reserialization changes signed bytes and can invalidate the signature verification contract.",
        "C": "Verify the provider-defined raw content and enforce freshness and replay policy before effects.",
        "D": "HTTPS and an unverified label do not independently authenticate the original webhook sender."
      }
    },
    "q06": {
      "options": {
        "A": "Recording an ID too early can suppress retries before the intended effect succeeds.",
        "B": "Local memory cannot reliably coordinate restarts, multiple consumers, and durable duplicate delivery.",
        "C": "Design repeated delivery so the same authorized business effect is not applied twice.",
        "D": "Deduplication depends on trusted identity and recorded outcomes rather than any nonempty identifier."
      }
    },
    "q07": {
      "options": {
        "A": "Failed event stores can retain private payload fields and need restricted access and retention.",
        "B": "Brokers may keep original message content in failure and dead-letter records.",
        "C": "A failed consumer check can make payload sensitivity and handling obligations more important.",
        "D": "Longer retention increases exposure and must be justified against recovery and evidence needs."
      }
    },
    "q08": {
      "options": {
        "A": "Queue encryption does not justify distributing workload credentials to every consumer.",
        "B": "Retry, failure, and diagnostic copies need the same sensitive-data minimization review.",
        "C": "Internal events cross process and identity boundaries rather than remain in one trusted process.",
        "D": "Minimize sensitive fields because repeated delivery and operational systems create additional copies."
      }
    },
    "q09": {
      "options": {
        "A": "Full payload and authorization-header capture can expose secrets and confidential business records.",
        "B": "Unbounded identifier labels can exhaust metric storage and reveal unnecessary user context.",
        "C": "Use approved bounded references and outcomes for attribution and correlation without raw sensitive payloads.",
        "D": "Rejections and authorization failures provide important abuse and diagnostic evidence too."
      }
    },
    "q10": {
      "options": {
        "A": "Producer, replay, and failure tooling can exercise important authority beyond ordinary consumer code.",
        "B": "Managed delivery does not automatically provide correct authorization or application idempotency.",
        "C": "Test malformed, repeated, stale, and hostile-source scenarios before incidents expose weaknesses.",
        "D": "Review event meaning, identities, permissions, repeated effects, failures, telemetry, and recovery together."
      }
    }
  }
};
