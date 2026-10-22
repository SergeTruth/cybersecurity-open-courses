window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-3670170470",
  "questions": {
    "q1": {
      "options": {
        "A": "Security settings continue to influence every request after the application has started.",
        "B": "Pipeline components collectively determine identity, policy enforcement, endpoint behavior, and responses.",
        "C": "The request pipeline runs in deployed applications as well as local development.",
        "D": "Earlier middleware and later response handling can influence security beyond the controller action."
      }
    },
    "q2": {
      "options": {
        "A": "Production stack traces can disclose internal implementation and sensitive operational details.",
        "B": "Different audiences and exposure levels require deliberate environment-specific diagnostic behavior.",
        "C": "Give callers controlled errors while retaining useful details in protected operational diagnostics.",
        "D": "Development logging can be useful, while production still must exclude secret values."
      }
    },
    "q3": {
      "options": {
        "A": "Middleware dependencies require routing context, identity, error handling, and response controls in suitable order.",
        "B": "Middleware can enforce authentication, authorization, and other controls beyond presentation layout.",
        "C": "Execution follows the configured pipeline rather than arbitrary runtime randomization.",
        "D": "Authorization execution depends on registration and placement within the configured pipeline."
      }
    },
    "q4": {
      "options": {
        "A": "All untrusted callers need appropriate validation rather than only administrator accounts.",
        "B": "A correct-looking form does not prevent a direct malformed or scripted server request.",
        "C": "Validate on the server before values influence resources, workflow, or sensitive decisions.",
        "D": "Binding converts request representation without proving every value is acceptable to the operation."
      }
    },
    "q5": {
      "options": {
        "A": "Binding request values does not establish who may access a resource.",
        "B": "Populated model fields may be invalid or outside the set clients are allowed to change.",
        "C": "Binding ordinarily precedes processing and does not wait until all data is saved.",
        "D": "Bound file data still requires content, size, and storage validation."
      }
    },
    "q6": {
      "options": {
        "A": "Both identity and authorization must be enforced at relevant server boundaries.",
        "B": "A successful login does not grant unrestricted access to application resources.",
        "C": "Identify the caller, then evaluate permission for the particular action and resource.",
        "D": "Authentication and authorization are distinct checks even when frameworks integrate both."
      }
    },
    "q7": {
      "options": {
        "A": "Object-level access controls protect data and actions rather than page styling.",
        "B": "Resource authorization is necessary during ordinary database operation as well as failures.",
        "C": "Object rules rely on trusted identity and do not replace authentication.",
        "D": "A permitted feature can contain objects belonging to other users, tenants, or privilege levels."
      }
    },
    "q8": {
      "options": {
        "A": "CORS does not assign database permissions to browser or service callers.",
        "B": "Direct non-browser clients are not universally blocked by browser CORS policies.",
        "C": "An approved origin does not authenticate the user sending a request.",
        "D": "Browser response-sharing policy must be combined with server identity, permissions, and data controls."
      }
    },
    "q9": {
      "options": {
        "A": "Browser-attached credentials on state-changing requests create the principal antiforgery use case.",
        "B": "The threat commonly involves an already authenticated browser rather than only anonymous access.",
        "C": "Read-only endpoints without side effects are not the primary mutation concern here.",
        "D": "Static public image retrieval normally lacks the authenticated state-changing operation at issue."
      }
    },
    "q10": {
      "options": {
        "A": "File extensions are names that can misrepresent the actual uploaded content.",
        "B": "Treat all file properties as untrusted and enforce server-owned storage and processing policy.",
        "C": "Servers must validate independently rather than assume browsers fully inspected each uploaded file.",
        "D": "Authenticated users can still upload unsafe, inappropriate, or malicious file data."
      }
    },
    "q11": {
      "options": {
        "A": "Committing a credential does not rotate it or limit its continued validity.",
        "B": "JSON formatting does not make a secret value harmless or nonconfidential.",
        "C": "Repositories and logs spread retained copies that make secret exposure harder to contain.",
        "D": "Authentication diagnostics can report outcomes without recording complete credentials."
      }
    },
    "q12": {
      "options": {
        "A": "Deployment configuration can change middleware behavior, credential sources, and diagnostic exposure.",
        "B": "NuGet packages can execute code and affect deployed behavior and trust assumptions.",
        "C": "Runtime and delivery review is needed before and throughout production use.",
        "D": "Review executable dependencies and the hosting and delivery settings that determine real protection."
      }
    }
  }
};
