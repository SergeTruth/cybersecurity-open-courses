window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-1a345992f3",
  "questions": {
    "q01": {
      "options": {
        "A": "Log compression changes storage size; it does not establish identities or access decisions.",
        "B": "IAM connects identities with authentication and controls over the resources and actions they may access.",
        "C": "Indexes organize database access paths for retrieval, rather than determining identity and permission policy.",
        "D": "Browser rendering controls presentation, while IAM governs identity and access across trusted application components."
      }
    },
    "q02": {
      "options": {
        "A": "Deciding permitted actions is authorization, which uses identity and other context.",
        "B": "Encrypting stored data protects confidentiality but does not verify who is requesting access.",
        "C": "Authentication verifies the identity claim that subsequent access decisions can use.",
        "D": "Error logging records failures; it does not establish a caller's identity."
      }
    },
    "q03": {
      "options": {
        "A": "Authorization evaluates whether an identity may perform the requested action on the relevant resource.",
        "B": "Password hashing supports credential protection, rather than deciding an identity's resource permissions.",
        "C": "A login page presents an interface; permissions still require trusted enforcement.",
        "D": "Cookie compression changes representation, not the access rights associated with a session."
      }
    },
    "q04": {
      "options": {
        "A": "Attackers can alter browser behavior or send requests directly, bypassing displayed restrictions.",
        "B": "Server-side checks enforce the boundary at the protected operation, beyond a caller's control.",
        "C": "A cookie can identify a session, but the server must still decide what that session may do.",
        "D": "The server must enforce permissions because the client and its checks are controlled by the requester."
      }
    },
    "q05": {
      "options": {
        "A": "Universal administrator access grants unnecessary authority and increases the impact of compromise.",
        "B": "Limiting permissions to the task reduces the actions a compromised or mistaken identity can perform.",
        "C": "Removing audit logs reduces visibility and does not limit an identity's privileges.",
        "D": "Shared credentials blur attribution and can expose more authority than an individual task needs."
      }
    },
    "q06": {
      "options": {
        "A": "Source comments do not convey an API access grant to a resource server.",
        "B": "The server still needs to validate the token and enforce the requested operation's permissions.",
        "C": "An access token carries an authorization grant that a resource server evaluates when processing a request.",
        "D": "An access token does not disable the authentication controls used to establish or protect a session."
      }
    },
    "q07": {
      "options": {
        "A": "A stolen refresh token can extend access by obtaining replacement access tokens, making its protection especially important.",
        "B": "Refresh tokens carry valuable authority and should not be treated as public identifiers.",
        "C": "Refresh tokens support continued authorization, rather than merely recording display preferences.",
        "D": "Refresh-token handling and password hashing protect different credentials and neither replaces the other."
      }
    },
    "q08": {
      "options": {
        "A": "Password hashing protects stored credentials; OAuth defines delegated access grants and token flows.",
        "B": "Replication distributes database data and is separate from delegated API authorization.",
        "C": "HTML rendering concerns presentation, rather than granting a client delegated resource access.",
        "D": "OAuth allows a client to obtain scoped access to resources under an authorization grant."
      }
    },
    "q09": {
      "options": {
        "A": "Database encryption protects stored data and is not the identity layer added by OpenID Connect.",
        "B": "OpenID Connect supplies an authentication and identity layer over OAuth's authorization framework.",
        "C": "Compression reduces data size and does not establish the user's authenticated identity.",
        "D": "CSS validation concerns presentation rules, rather than authentication or identity claims."
      }
    },
    "q10": {
      "options": {
        "A": "Shared credentials make it harder to attribute an operation to the specific caller.",
        "B": "Long-lived shared credentials retain privilege and can widen the effect of theft or misuse.",
        "C": "Shared, persistent secrets complicate independent rotation, precise attribution, and task-specific access limits.",
        "D": "Managed identities can reduce reliance on shared secrets; sharing credentials does not provide those protections."
      }
    },
    "q11": {
      "options": {
        "A": "Access must be checked for the particular resource instance, such as another user's record or another tenant's object.",
        "B": "A login establishes identity without proving permission to access the requested object.",
        "C": "Encrypting an object does not determine which caller may access it through the application.",
        "D": "Component styling affects presentation, rather than enforcing access to a resource instance."
      }
    },
    "q12": {
      "options": {
        "A": "Happy-path tests demonstrate allowed behavior; negative tests exercise requests that should be denied.",
        "B": "Tests validate enforcement behavior while logs supply operational evidence; both have distinct roles.",
        "C": "Denied-action tests depend on identity and permissions rather than making authentication unnecessary.",
        "D": "Testing forbidden actions verifies that permission boundaries reject unauthorized users, tenants, and operations."
      }
    },
    "q13": {
      "options": {
        "A": "UI color does not identify the actor, action, time, or protected resource involved.",
        "B": "Actor, action, time, source context, and resource information support attribution and investigation of access events.",
        "C": "File counts alone do not show who accessed or changed a protected resource.",
        "D": "A render result does not record the security-relevant details of an access decision or operation."
      }
    },
    "q14": {
      "options": {
        "A": "Trusted server-side enforcement is a protective measure when applied consistently to the relevant operations.",
        "B": "Denied-action tests help detect permission gaps before they become exploitable.",
        "C": "A caller can bypass client checks, so trusting them without server enforcement leaves the protected operation exposed.",
        "D": "Secret rotation limits credential exposure duration and is a protective practice."
      }
    },
    "q15": {
      "options": {
        "A": "IAM spans the full identity and access lifecycle, requiring implementation, tests, and operational monitoring across application boundaries.",
        "B": "Developers implement routes, token validation, and resource checks that help-desk processes cannot enforce for them.",
        "C": "IAM is one part of secure development and does not remove other coding and design risks.",
        "D": "Access decisions continue after login across APIs, service calls, tokens, and individual resources."
      }
    }
  }
};
