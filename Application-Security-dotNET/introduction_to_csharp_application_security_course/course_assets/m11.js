window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-c146f25259",
  "questions": {
    "q1": {
      "options": {
        "A": "Identifying a boundary helps place server validation rather than replace it with client trust.",
        "B": "Boundaries reveal where identity, data, commands, and configuration enter under different assumptions.",
        "C": "Authorization remains necessary to decide which operations and resources a caller may access.",
        "D": "Data can become invalid after transformations or cross new boundaries inside an application."
      }
    },
    "q2": {
      "options": {
        "A": "Client-side feedback can be useful while remaining insufficient for security enforcement.",
        "B": "Client validation can use suitable types but can still be bypassed or altered.",
        "C": "The server receives arbitrary requests and must enforce security rules independently of the UI.",
        "D": "Web servers and APIs also require server-side validation of externally supplied values."
      }
    },
    "q3": {
      "options": {
        "A": "Authentication establishes identity evidence; authorization evaluates permissions for the requested operation.",
        "B": "Authorization must protect server operations as well as any interface controls.",
        "C": "Logging in does not entitle a user to every record or administrative action.",
        "D": "Identity and permission checks are related but distinct decisions in C# applications."
      }
    },
    "q4": {
      "options": {
        "A": "Private and authenticated features also need resource-specific access checks.",
        "B": "Browsers cannot be trusted to enforce every resource access decision.",
        "C": "Object-level rules are part of server authorization rather than a replacement for it.",
        "D": "Feature access does not automatically grant access to each object selected by a request."
      }
    },
    "q5": {
      "options": {
        "A": "The compiler does not automatically protect embedded production credentials from extraction.",
        "B": "Source and artifact copies complicate access control, effective rotation, and investigation.",
        "C": "Hardcoding removes flexibility without removing the need for governed production configuration.",
        "D": "Repositories and binaries distribute content and should not store confidential production credentials."
      }
    },
    "q6": {
      "options": {
        "A": "Custom algorithms still need key management and often add implementation risk.",
        "B": "Encryption, hashing, and signing provide different properties and are not interchangeable.",
        "C": "Use maintained reviewed facilities because cryptographic correctness requires specialized design and implementation.",
        "D": "The platform provides mature options without requiring each application to invent cryptography."
      }
    },
    "q7": {
      "options": {
        "A": "Parameterized access separates data values from SQL rather than storing credentials in code.",
        "B": "Parameters do not authorize every user to read or modify every matching record.",
        "C": "Binding data independently prevents input values from becoming executable query syntax.",
        "D": "Record ownership and tenant isolation still need checks beyond safe query construction."
      }
    },
    "q8": {
      "options": {
        "A": "Model binding does not validate all file content, processing, or storage assumptions.",
        "B": "Client filenames can contain unsafe paths and should not directly select storage destinations.",
        "C": "Size and location affect exhaustion, disclosure, executable access, and overwrite risk.",
        "D": "Upload safety combines content validation with naming, capacity, storage, and processing controls."
      }
    },
    "q9": {
      "options": {
        "A": "Raw internal errors can disclose secrets, infrastructure, or implementation details to callers.",
        "B": "A task-appropriate message can explain failure without exposing sensitive internals.",
        "C": "A nonsecret support reference can connect a public failure to controlled diagnostics.",
        "D": "A bounded safe explanation is appropriate when it reveals no unnecessary internal information."
      }
    },
    "q10": {
      "options": {
        "A": "Security logs must exclude secrets rather than preserve every credential for debugging.",
        "B": "Controlled event records help authorized responders understand decisions and suspicious behavior.",
        "C": "Monitoring supplies evidence and does not enforce identity or resource permissions itself.",
        "D": "Operational logging remains useful throughout deployment, maintenance, and incident response."
      }
    },
    "q11": {
      "options": {
        "A": "Packages can execute trusted code and change behavior in deployed applications.",
        "B": "Transitive dependencies can be restored and shipped even without direct project references.",
        "C": "Dependencies and runtime changes alter the code and assumptions incorporated into the release.",
        "D": "Backend services and libraries need dependency review as well as frontend applications."
      }
    },
    "q12": {
      "options": {
        "A": "Cloud, container, and managed deployments also have security-relevant identities and configuration.",
        "B": "Production settings can expose endpoints, enable diagnostics, or alter trust behavior.",
        "C": "Security review continues through deployment rather than ending before release operations.",
        "D": "The real security boundary includes runtime settings, delivery credentials, identities, and hosting controls."
      }
    }
  }
};
