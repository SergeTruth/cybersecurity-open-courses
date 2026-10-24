window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-d2cae2ce56",
  "questions": {
    "q01": {
      "options": {
        "A": "Selecting an approved algorithm does not establish safe key storage, access control, or lifecycle behavior.",
        "B": "Private keys and other asymmetric credentials also need protected generation, storage, authorization, and retirement.",
        "C": "Algorithm strength does not decide which callers may use a key or how compromise is contained.",
        "D": "Exposed or poorly governed keys can defeat strong cryptography, so their lifecycle requires its own design."
      }
    },
    "q02": {
      "options": {
        "A": "Classification should guide authority and lifecycle controls rather than serve only as an inventory label.",
        "B": "Purpose, permitted callers, assets, and deployment scope determine the controls needed before and after compromise.",
        "C": "Keys using one algorithm can protect unrelated assets and grant different authority.",
        "D": "Inventory should identify keys without copying their secret bytes into another retained record."
      }
    },
    "q03": {
      "options": {
        "A": "Text length does not establish suitable key entropy or an appropriate cryptographic key-generation method.",
        "B": "Key generation needs the unpredictability and properties required by the cryptographic operation, not merely a convenient identifier.",
        "C": "A timestamp and application name remain predictable inputs rather than a cryptographic random source.",
        "D": "Password complexity alone does not make a phrase suitable as raw key material; approved derivation and strength requirements still matter."
      }
    },
    "q04": {
      "options": {
        "A": "Repository encryption does not by itself establish who may decrypt, distribute, rotate, or retain production keys.",
        "B": "A private registry and image digest do not prevent key recovery by people or processes able to read the image.",
        "C": "Keeping raw keys out of copied development and operational records reduces uncontrolled exposure and retention.",
        "D": "A startup log exposes the key while usable and can create copies beyond the nominal retention policy."
      }
    },
    "q05": {
      "options": {
        "A": "An environment variable is a delivery mechanism; ownership, audit, rotation, recovery, and exposure controls remain separate requirements.",
        "B": "Children can inherit environment variables unless launch policy explicitly restricts them.",
        "C": "Restarting a process does not automatically replace or revoke the underlying key material.",
        "D": "Ordinary application reads of environment variables do not inherently create a complete key-use audit trail."
      }
    },
    "q06": {
      "options": {
        "A": "Separate purposes need distinct authority and lifecycle controls; reuse couples their exposure and compromise response.",
        "B": "Matching algorithm selection does not establish independent security boundaries for unrelated uses.",
        "C": "Sharing a cloud account does not make unrelated workloads, data, and key grants equivalent.",
        "D": "A long key does not supply independent purpose-bound keys merely because callers label its uses differently."
      }
    },
    "q07": {
      "options": {
        "A": "Version information can be necessary to locate the correct key for historical ciphertext during transition.",
        "B": "Readers, writers, stored data, and delayed workers may need coordinated access to different key versions while rotation proceeds.",
        "C": "Premature destruction can make existing ciphertext unreadable before migration and recovery have been verified.",
        "D": "A new successful write does not prove that older data and every deployed reader have transitioned."
      }
    },
    "q08": {
      "options": {
        "A": "A plaintext data key beside ciphertext exposes the material needed to decrypt the protected content.",
        "B": "The roles are reversed: data keys protect content, while the wrapping key protects those data keys.",
        "C": "Historical records still need enough key and version metadata to select the correct unwrap operation.",
        "D": "Separating content encryption from key wrapping permits scoped data keys and controlled changes to their wrapping protection."
      }
    },
    "q09": {
      "options": {
        "A": "A public verification key does not enable creation of signatures without the corresponding private signing authority.",
        "B": "An algorithm identifier describes a key's type, not its authentic owner or issuer.",
        "C": "An attacker-substituted public key can redirect encryption or make the application trust signatures from the wrong authority.",
        "D": "A matching kid is a lookup claim; the endpoint and returned key still require a trusted distribution policy."
      }
    },
    "q10": {
      "options": {
        "A": "A full review follows keys from inventory and generation through permitted use, deployment, lifecycle, monitoring, and response.",
        "B": "Algorithm and backend availability checks omit the ownership and response decisions needed during compromise.",
        "C": "Older, public, decrypt-only, and recovery keys can still affect access, authenticity, and retained data.",
        "D": "Application key selection, logging, deployment grants, and tests directly influence whether backend protections are used safely."
      }
    }
  }
};
