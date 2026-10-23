window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-1eeb2a19ce",
  "questions": {
    "q01": {
      "options": {
        "A": "Permission-aware retrieval limits disclosure rather than make protected repositories public.",
        "B": "Identity and access-control decisions are central to determining which evidence is eligible.",
        "C": "Permission to ask a question does not imply permission to see every potentially relevant source.",
        "D": "Production systems particularly need correct enforcement across users, sources, tenants, and derived stores."
      }
    },
    "q02": {
      "options": {
        "A": "Trace source data through every derived and operational layer to identify possible authority and disclosure changes.",
        "B": "Prompt-only review misses ingestion, indexes, caches, diagnostics, backups, and final output paths.",
        "C": "Embeddings and cached results may retain protected source information and require appropriate isolation.",
        "D": "Service credentials should not silently grant users broader access than their own approved permissions."
      }
    },
    "q03": {
      "options": {
        "A": "Unverified client values can be forged and must not define authoritative retrieval permissions.",
        "B": "A tenant named in prompt text is untrusted data rather than validated membership evidence.",
        "C": "Selecting maximum privilege can expose records beyond the requester's legitimate authority.",
        "D": "Use verified identities and authoritative tenant, role, group, project, and service relationships for access checks."
      }
    },
    "q04": {
      "options": {
        "A": "Access labels help preserve ownership context rather than make source owners irrelevant.",
        "B": "Origin, tenant, ACLs, classification, ownership, and state let later stages preserve source-specific access rules.",
        "C": "Metadata should constrain distribution rather than automatically make all chunks visible to all users.",
        "D": "Stable source identifiers remain necessary for attribution, deletion, updates, and permission propagation."
      }
    },
    "q05": {
      "options": {
        "A": "Manual deletion convenience is not the confidentiality risk created by losing ACL context.",
        "B": "Losing permissions does not universally reduce semantic search accuracy; it can instead increase unauthorized exposure.",
        "C": "A fragment detached from its document or tenant ACL can lose the information needed to restrict retrieval.",
        "D": "A UI cannot automatically reconstruct and enforce every permission relationship removed during ingestion."
      }
    },
    "q06": {
      "options": {
        "A": "Exclude unauthorized retrieved text before it reaches the model context or can influence generated output.",
        "B": "Checking after showing an answer cannot reverse information already disclosed to the requester.",
        "C": "Permission enforcement must happen proactively rather than depend on users noticing an exposure.",
        "D": "Policy-excluded content should not be restored through ranking or passed into model context as eligible evidence."
      }
    },
    "q07": {
      "options": {
        "A": "Deny-by-default permits proven eligible sources rather than permanently banning every document.",
        "B": "Logging rejected sources in full can create a separate disclosure path.",
        "C": "Systems can answer using authorized evidence while excluding sources lacking trustworthy eligibility information.",
        "D": "Missing or ambiguous permission context should exclude content until sufficient trusted access evidence is available."
      }
    },
    "q08": {
      "options": {
        "A": "Source documents cannot redefine the application's access policy or acquire higher authority through retrieval.",
        "B": "Treat retrieved passages as evidence and context rather than instructions authorized to override trusted policy.",
        "C": "Permission depends on verified context and enforcement rather than a model's interpretation of document wording.",
        "D": "Citations can also disclose restricted titles, identifiers, or content and need permission-aware handling."
      }
    },
    "q09": {
      "options": {
        "A": "Intermediate stores and tools can leak protected material before any final answer is displayed.",
        "B": "Operational copies can retain sensitive information even when original repositories are correctly restricted.",
        "C": "Isolation must include indexes, caches, diagnostics, exports, transcripts, administration, analytics, and recovery copies.",
        "D": "A locally hosted model does not automatically secure every derived dataset or access path."
      }
    },
    "q10": {
      "options": {
        "A": "Audits should reconstruct identity, eligibility, policy decisions, and provenance using necessary bounded metadata.",
        "B": "Indefinite full-chunk retention can unnecessarily duplicate protected source text in diagnostic systems.",
        "C": "Hiding decisions makes policy failures and unauthorized retrieval harder to investigate.",
        "D": "Auditing documents behavior while negative tests verify expected denial and boundary enforcement."
      }
    },
    "q11": {
      "options": {
        "A": "Administrator-only success tests miss revocation, tenant isolation, missing labels, and source-lifecycle failures.",
        "B": "Ideal response-time checks do not establish correct eligibility under adverse permission conditions.",
        "C": "Interface appearance cannot verify whether unauthorized chunks entered context or derived caches.",
        "D": "Test revocation, stale data, deletion, missing metadata, mixed permissions, and cross-tenant denials end to end."
      }
    },
    "q12": {
      "options": {
        "A": "Prompt instructions cannot reliably replace access checks before protected evidence is retrieved or disclosed.",
        "B": "Permission-aware RAG aligns identity, source labels, stores, retrieval, output, isolation, audits, and tests across the full system.",
        "C": "Derived retrieval should preserve source restrictions instead of justify removing repository permissions.",
        "D": "Multiple users and production tenants make these boundaries more important rather than limiting them to prototypes."
      }
    }
  }
};
