window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-e6278bfca3",
  "questions": {
    "q01": {
      "options": {
        "A": "The intended protection and attacker model determine suitable primitives, key handling, protocol rules, and verification requirements.",
        "B": "Name length says nothing about a primitive's suitability or secure integration.",
        "C": "An isolated search result does not establish a reviewed design for the application's requirements.",
        "D": "Encryption without a defined purpose can miss integrity, authority, and lifecycle requirements."
      }
    },
    "q02": {
      "options": {
        "A": "Reviewed maintained implementations reduce risks from subtle primitive, protocol, and implementation mistakes that custom designs can introduce.",
        "B": "Performance alone does not establish resistance to cryptographic attacks or implementation errors.",
        "C": "Every keyed design still requires appropriate generation, storage, use, and retirement of keys.",
        "D": "A custom algorithm does not automatically satisfy standards or requirements for the intended use."
      }
    },
    "q03": {
      "options": {
        "A": "The selected operation's rules determine whether values need unpredictability, uniqueness, or both, and require an appropriate generation method.",
        "B": "Random bytes do not establish the caller's identity or permission to act.",
        "C": "Predictable timestamps do not supply general cryptographic unpredictability or guaranteed safe nonce handling.",
        "D": "Cryptographic keys, salts, nonces, and tokens have requirements beyond visual appearance."
      }
    },
    "q04": {
      "options": {
        "A": "Keys provide secret authority, while nonce confidentiality and generation rules depend on the primitive and protocol.",
        "B": "A nonce is not automatically the long-term key and must follow its own usage rules.",
        "C": "Secret key exposure can defeat the protection of an otherwise sound cryptographic design.",
        "D": "Nonces and keys serve different roles and do not universally share confidentiality or reuse requirements."
      }
    },
    "q05": {
      "options": {
        "A": "Compromise and misuse of key material can defeat strong primitives regardless of their mathematical design.",
        "B": "Encryption uses keys whose selection and handling are part of its security contract.",
        "C": "Keys remain sensitive throughout production storage, use, replacement, and incident response.",
        "D": "Formatting logs does not implement secure key generation, access, storage, or rotation."
      }
    },
    "q06": {
      "options": {
        "A": "Correct authenticated encryption protects content and verifies a tag before plaintext is accepted as authentic.",
        "B": "Data protection does not decide whether the authenticated caller may access a resource.",
        "C": "Applications can still hold plaintext during processing and must protect its lifetime and exposure.",
        "D": "Nonce misuse can defeat authenticated-encryption guarantees and must follow the chosen API's rules."
      }
    },
    "q07": {
      "options": {
        "A": "A MAC uses shared secret authority to detect unauthorized message changes; it does not provide public signer attribution.",
        "B": "Compression changes size and does not establish keyed message authenticity.",
        "C": "A MAC does not universally authenticate certificate chains or the intended server identity.",
        "D": "Interface labels do not provide cryptographic integrity or authenticated message origin."
      }
    },
    "q08": {
      "options": {
        "A": "Purpose-built password hashing combines unique salts and calibrated cost to make offline guessing more expensive.",
        "B": "Storage size is not the main weakness of fast hashes for passwords.",
        "C": "Salts are an important part of modern password-verifier storage rather than something to omit.",
        "D": "Cheap verification can let attackers test weak password guesses quickly against stolen hashes."
      }
    },
    "q09": {
      "options": {
        "A": "Successful verification binds the signed data to the corresponding private-key authority only within the trusted key's intended context.",
        "B": "A valid signature does not grant the signer permission for every subsequent application action.",
        "C": "Signed data can be public; authenticity does not imply message confidentiality.",
        "D": "Authenticated data can still violate application schema, business, or access rules."
      }
    },
    "q10": {
      "options": {
        "A": "Unchecked failures can cause unauthenticated plaintext, invalid output, or incomplete cryptographic work to be accepted.",
        "B": "Return values can determine whether verification or an encryption operation actually succeeded.",
        "C": "Crypto operations can fail because of invalid inputs, unavailable resources, or failed authentication.",
        "D": "Checking outcomes enforces the primitive's contract rather than weakening its mathematical protection."
      }
    },
    "q11": {
      "options": {
        "A": "Identity, ordering, version, freshness, and authority rules determine how cryptographic results are safely used together.",
        "B": "A sound protocol still needs protected keys and deliberate credential lifecycle handling.",
        "C": "Headless services and embedded systems also depend on correct protocol context.",
        "D": "Protocol rules need explicit rejection and recovery when cryptographic operations fail."
      }
    },
    "q12": {
      "options": {
        "A": "Cryptography needs reviewed goals, correct integration, checked failures, and continued operational maintenance to provide useful protection.",
        "B": "One primitive cannot establish every key, identity, format, and lifecycle requirement.",
        "C": "Maintained reviewed cryptographic implementations are generally preferable to improvising new algorithms.",
        "D": "Authenticity and integrity do not decide whether a requested application operation is authorized."
      }
    }
  }
};
