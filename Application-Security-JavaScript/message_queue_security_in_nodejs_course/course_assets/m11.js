window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-a2159c56fa",
  "questions": {
    "q01": {
      "options": {
        "A": "Acknowledgment does not undo downstream effects or remove risks in replay, retained payloads, or business transactions.",
        "B": "Security follows the message through its full lifecycle, including every component that can publish, process, retain, or replay it.",
        "C": "A secure handler does not constrain broker administration, malicious producers, or privileged replay tools by itself.",
        "D": "Internal components can have different identities, privileges, and trust assumptions, so internal workflows also need review."
      }
    },
    "q02": {
      "options": {
        "A": "Persistence stores a payload; it does not prove the payload's structure, meaning, or authorization.",
        "B": "A producer credential identifies a service, not the trustworthiness or authorization of every field copied from a request.",
        "C": "Consumers must validate message content and authority because transport through a broker does not establish either.",
        "D": "Internal transport does not prevent malformed or oversized messages, so schema and resource checks remain necessary."
      }
    },
    "q03": {
      "options": {
        "A": "Publishers do not automatically need destructive purge capability; that grant increases their potential impact.",
        "B": "Separate grants constrain each identity to its operational purpose and reduce the damage from credential misuse.",
        "C": "Sharing a role can grant producers consumer capabilities and vice versa, widening compromise scope.",
        "D": "Audit logs record activity but do not justify sharing administrative authority with runtime workers."
      }
    },
    "q04": {
      "options": {
        "A": "Schema and size checks reject unsupported input before it reaches business logic, while authorization remains a separate check.",
        "B": "A message can fit its schema while requesting an action the producer or represented user is not permitted to perform.",
        "C": "Required top-level fields do not validate nested structure, types, allowed values, or limits.",
        "D": "Unknown fields need an intentional compatibility policy; hypothetical future support does not make present behavior safe."
      }
    },
    "q05": {
      "options": {
        "A": "Transport encryption does not protect secrets from broker storage, consumer access, dead letters, or support exports.",
        "B": "Redacting consumer logs addresses only one copy; sensitive data may still remain in queued and dead-letter payloads.",
        "C": "Minimizing data at publication reduces the sensitive material copied across retries, observability systems, retained failures, and replay workflows.",
        "D": "Short queue retention does not guarantee that traces, exports, or support tools avoid copying payload data."
      }
    },
    "q06": {
      "options": {
        "A": "Process-local memory does not survive restarts or provide coordinated duplicate protection across workers.",
        "B": "Recording success before the business effect can cause a failed operation to be skipped permanently on retry.",
        "C": "Treating every missing identifier as the same key can silently discard unrelated messages; identifier validity needs explicit handling.",
        "D": "Durable idempotency must coordinate with the actual business effect so redelivery does not repeat it or conceal unfinished work."
      }
    },
    "q07": {
      "options": {
        "A": "Unlimited attempts can multiply side effects, dependency load, and cost while preventing poison messages from reaching a controlled failure path.",
        "B": "Additional retries can amplify failure and repeat unsafe operations, so their benefit is not unlimited.",
        "C": "Backoff reduces retry frequency but still needs attempt or age limits and a poison-message policy.",
        "D": "Ordering does not prevent redelivery or duplicate effects; idempotency remains necessary."
      }
    },
    "q08": {
      "options": {
        "A": "Rejected messages can still contain secrets, sensitive data, or replayable instructions that require restricted access.",
        "B": "Deletion after replay does not reverse earlier disclosure or copies made by readers.",
        "C": "Retention should consider data sensitivity, response needs, and replay risk rather than availability alone.",
        "D": "Dead letters preserve payloads and workflow context, so access, retention, inspection, and replay need explicit controls."
      }
    },
    "q09": {
      "options": {
        "A": "Broker delivery does not guarantee that consumers respect downstream capacity or safe concurrency limits.",
        "B": "Broad database credentials expose unnecessary authority to a worker and increase compromise impact.",
        "C": "Least-privilege worker credentials limit authority, while bounded concurrency limits pressure on dependencies and retry systems.",
        "D": "Concurrency limits bound active work; they do not guarantee unique delivery or replace idempotency."
      }
    },
    "q10": {
      "options": {
        "A": "Encryption and uptime omit the content, permissions, retention, and replay boundaries that shape queue risk.",
        "B": "Failure paths can repeat effects or expose data, so they need validation before release as well as during response.",
        "C": "Resource consumption, secret copies, telemetry, and deployment behavior can all change queue security.",
        "D": "A complete review follows messages and authority through publishing, processing, failure handling, retained data, and incident response."
      }
    }
  }
};
