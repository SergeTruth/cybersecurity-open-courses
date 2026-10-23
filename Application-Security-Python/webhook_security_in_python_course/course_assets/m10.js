window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-0fcec2dd6a",
  "questions": {
    "q01": {
      "options": {
        "A": "Webhooks notify another system of events using HTTP requests.",
        "B": "Webhooks are system notifications rather than necessarily synchronous browser workflows.",
        "C": "HTTP metadata and external payloads are common webhook inputs.",
        "D": "Polling asks for changes rather than receiving event driven notifications."
      }
    },
    "q02": {
      "options": {
        "A": "Incoming events may automatically trigger sensitive business state changes.",
        "B": "Ordinary HTTPS does not authenticate arbitrary senders to the receiving application.",
        "C": "Private endpoints can still receive replayed or compromised producer events.",
        "D": "Signed integrity does not grant every object-level business permission."
      }
    },
    "q03": {
      "options": {
        "A": "Recognized JSON syntax does not establish the sender's authenticity.",
        "B": "Verify origin, integrity, freshness, payload contract, and intended business context.",
        "C": "IP addresses and User-Agent strings do not replace cryptographic verification.",
        "D": "TLS and length declarations do not establish event freshness or tenant mapping."
      }
    },
    "q04": {
      "options": {
        "A": "Shared signing key disclosure may let attackers forge provider-looking events.",
        "B": "URLs can expose secrets through logs despite protected HTTPS transport.",
        "C": "Signing secrets can allow creation of apparently legitimate webhook events.",
        "D": "Redacting header names does not protect logged secret values."
      }
    },
    "q05": {
      "options": {
        "A": "Signatures do not inherently prove freshness or current object authorization.",
        "B": "Payload schema requires validation separately from cryptographic signature checks.",
        "C": "Verify the payload under the expected provider's approved signing scheme.",
        "D": "Plausible digests are meaningless without approved keys and correct verification."
      }
    },
    "q06": {
      "options": {
        "A": "The same signed payload can verify again during repeated delivery.",
        "B": "Replay controls prevent valid older events being reused inappropriately.",
        "C": "Timestamps alone may not prevent duplicates within the accepted window.",
        "D": "Equal status responses do not prevent repeated business side effects."
      }
    },
    "q07": {
      "options": {
        "A": "Idempotent handling prevents duplicate deliveries repeating one business effect.",
        "B": "Blind retries may duplicate side effects already committed remotely.",
        "C": "Per-worker memory checks do not provide atomic cross-worker duplicate protection.",
        "D": "Duplicate handling still needs transaction and relevant business-state controls."
      }
    },
    "q08": {
      "options": {
        "A": "Authenticate and validate receipt before trusting or acknowledging queued events.",
        "B": "Queues alone do not guarantee exactly-once effects in business systems.",
        "C": "Acknowledge only after the required durable acceptance has succeeded.",
        "D": "Durable queues separate quick authenticated receipt from slower background processing."
      }
    },
    "q09": {
      "options": {
        "A": "Signatures do not automatically authorize referenced tenant resources or event types.",
        "B": "Signed data still needs controlled mapping and validated field types.",
        "C": "Authenticated producers can still emit malformed or inappropriate event data.",
        "D": "Verify structure and permissions even when signature verification succeeds."
      }
    },
    "q10": {
      "options": {
        "A": "Signed tenant text still needs trusted mapping to local ownership.",
        "B": "Resolve events to the correct authorized local account and resource.",
        "C": "Shared providers do not grant integration keys access across all tenants.",
        "D": "Idempotency cannot prevent a correctly deduplicated cross-tenant action."
      }
    },
    "q11": {
      "options": {
        "A": "Exclude secrets and unnecessary sensitive payload material from webhook logs.",
        "B": "Prefixes and rejected bodies can retain sensitive verification or customer data.",
        "C": "Full payload retention expands disclosure beyond necessary incident evidence.",
        "D": "Tokens, personal fields, and signatures can also require log protection."
      }
    },
    "q12": {
      "options": {
        "A": "Immediate rejection of in-flight old-key deliveries can disrupt legitimate processing.",
        "B": "Historical keys need bounded retirement rather than indefinite acceptance.",
        "C": "Verification should not require logging or exposing every stored secret.",
        "D": "Plan bounded transitions so provider and consumer rotation remain compatible."
      }
    },
    "q13": {
      "options": {
        "A": "One resolution and HTTPS do not establish safe destination access.",
        "B": "Use controlled destinations with verified ownership and explicit outbound policies.",
        "C": "Event bodies should not freely redirect callbacks to arbitrary URLs.",
        "D": "Suffix checks alone omit ports, redirects, resolved addresses, and ownership."
      }
    },
    "q14": {
      "options": {
        "A": "Identical request bytes can still repeat non-idempotent business effects.",
        "B": "Response status alone does not universally establish transaction completion state.",
        "C": "High retry counts without bounds and deduplication can amplify failures.",
        "D": "Transaction-aware idempotency prevents repeated deliveries causing duplicate side effects."
      }
    },
    "q15": {
      "options": {
        "A": "Replay and tenant boundaries need direct tests beyond signature success.",
        "B": "Always bypassing verification leaves the authentication integration untested locally.",
        "C": "Exercise signatures, replay, schema, authorization, duplicates, retries, and safe diagnostics.",
        "D": "Tests should not expose secret keys in ordinary failure logs."
      }
    },
    "q16": {
      "options": {
        "A": "Body authentication alone does not enforce freshness, schema, or object permissions.",
        "B": "Hidden URLs and HTTPS alone do not establish trusted sender identity.",
        "C": "Authenticate and validate events before bounded, idempotent, authorized processing.",
        "D": "Durable storage does not replace authentication or transactional business controls."
      }
    }
  }
};
