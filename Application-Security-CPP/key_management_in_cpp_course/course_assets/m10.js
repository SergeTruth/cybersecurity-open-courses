window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-62f445c18c",
  "questions": {
    "q1": {
      "options": {
        "A": "Exposure of the key can defeat the protection of a strong algorithm because the attacker obtains the secret used for decryption.",
        "B": "Cryptographic security depends on how keys are created, authorized, protected, changed, and retired throughout their lifetime.",
        "C": "Keys remain security-sensitive during storage, use, rotation, incident response, and eventual retirement.",
        "D": "Correct key length does not establish randomness, confidentiality, authorized use, or safe lifecycle handling."
      }
    },
    "q2": {
      "options": {
        "A": "Different names for the same exported material do not create independent compromise boundaries.",
        "B": "Compatible byte lengths do not establish that reusing one key across algorithms and purposes is safe.",
        "C": "Separate material or enforced purpose restrictions prevent a grant or compromise for one operation from automatically extending to others.",
        "D": "Universal key reuse expands compromise impact and couples rotation across otherwise independent uses."
      }
    },
    "q3": {
      "options": {
        "A": "Predictable identifiers do not supply the secret unpredictability needed for production cryptographic keys.",
        "B": "A timestamp-seeded general-purpose generator does not provide cryptographically secure unpredictability.",
        "C": "The source's guarantees and failure behavior must be established rather than assumed from its API name.",
        "D": "A reviewed cryptographic random source supplies appropriate unpredictability, and explicit failure handling prevents fallback to weak material."
      }
    },
    "q4": {
      "options": {
        "A": "Embedding production secrets distributes recoverable key material through source history, images, and configuration copies.",
        "B": "Approved non-exportable backend storage can reduce raw key exposure when its access and lifecycle controls are appropriate.",
        "C": "Opaque identifiers let applications request authorized operations without routinely handling the underlying key bytes.",
        "D": "Restricting backend operations to the required workload and purpose reduces unnecessary access to key authority."
      }
    },
    "q5": {
      "options": {
        "A": "Encrypt, decrypt, export, and rotate are distinct capabilities whose risks do not justify automatic bundling.",
        "B": "Changing an identifier's appearance does not reduce the authority granted to a workload.",
        "C": "An identifier names a key; separate authorization must decide which operations the caller may request.",
        "D": "Narrow operation, purpose, tenant, and workload grants limit the authority exposed by an application or credential compromise."
      }
    },
    "q6": {
      "options": {
        "A": "A reviewed provider can enforce key access and cryptographic behavior while opaque references reduce unnecessary secret copying.",
        "B": "Untrusted metadata must not choose arbitrary cryptographic behavior outside the application's approved policy.",
        "C": "General-purpose copies create additional secret lifetimes and exposure paths that are difficult to track and erase.",
        "D": "An early-exit comparison can reveal timing information; authentication checks should use the reviewed provider's appropriate primitives."
      }
    },
    "q7": {
      "options": {
        "A": "Generating replacement bytes does not migrate writers, preserve necessary reads, or establish retirement and recovery behavior.",
        "B": "Retiring the old key before coordinating replacement can break writes and access to existing protected data.",
        "C": "Rotation must coordinate versions, readers, writers, migration, and limited retention of older material so access changes safely.",
        "D": "Version tracking does not itself revoke compromised authority or migrate data protected by an older key."
      }
    },
    "q8": {
      "options": {
        "A": "Nonsecret success and failure metadata can support audit without recording the protected content.",
        "B": "Secret-bearing values and exception details can create durable disclosure when copied into logs and telemetry.",
        "C": "Standard algorithm identifiers are not inherently secret and can be useful nonsecret operational metadata.",
        "D": "Approved opaque identifiers can support attribution when permitted by policy, without exposing the key material itself."
      }
    },
    "q9": {
      "options": {
        "A": "Scrubbing a known buffer cannot establish that copies, caches, diagnostics, or other residual representations have also disappeared.",
        "B": "Constant-time comparison addresses timing behavior, not the later lifetime or erasure of its inputs.",
        "C": "A write through one pointer does not guarantee removal of every copy or remnant across the system.",
        "D": "Ordinary vector destruction releases storage without a general guarantee that its capacity is securely scrubbed first."
      }
    },
    "q10": {
      "options": {
        "A": "Broad export increases raw material exposure and should not be granted merely for incident-response convenience.",
        "B": "One successful encryption does not exercise replacement, revocation, backend failure, or recovery procedures.",
        "C": "A lifecycle review checks purpose-bound authority, approved material, failure handling, and audit evidence beyond cryptographic success.",
        "D": "Provider failures should be diagnosable without disclosing the secret bytes that the backend is protecting."
      }
    }
  }
};
