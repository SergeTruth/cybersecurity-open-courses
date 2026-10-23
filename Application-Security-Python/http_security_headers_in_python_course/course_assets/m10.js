window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-37ff3df3c9",
  "questions": {
    "q01": {
      "options": {
        "A": "Browser policies do not replace server validation of untrusted input.",
        "B": "Response headers do not authenticate clients before request processing.",
        "C": "Server authorization and validation require independent application enforcement controls.",
        "D": "Headers instruct supporting clients and add complementary browser protections."
      }
    },
    "q02": {
      "options": {
        "A": "Missing authorization remains exploitable even when browser headers exist.",
        "B": "Headers cannot eliminate all injection flaws in unsafe application code.",
        "C": "Browser restrictions complement validation, authorization, and safe rendering practices.",
        "D": "Unsafe templates and missing authorization need direct application fixes."
      }
    },
    "q03": {
      "options": {
        "A": "HTTP headers are normally configured in response handling infrastructure.",
        "B": "Frameworks and deployment layers can set HTTP response headers.",
        "C": "Templates are not the only location for header configuration.",
        "D": "Multiple application and delivery layers can configure response policies."
      }
    },
    "q04": {
      "options": {
        "A": "Duplicate policies can conflict or behave unexpectedly across layers.",
        "B": "Independent route choices still require coordinated policy design and review.",
        "C": "Duplicated policies do not automatically merge into intended protection.",
        "D": "Defined ownership prevents accidental omissions, conflicts, and deployment differences."
      }
    },
    "q05": {
      "options": {
        "A": "HSTS does not permit bypassing certificate validation for remembered hosts.",
        "B": "HSTS directs supporting browsers to use HTTPS for covered hosts.",
        "C": "A redirect changes one response; HSTS establishes remembered browser policy.",
        "D": "HSTS creates remembered HTTPS policy beyond the initial response."
      }
    },
    "q06": {
      "options": {
        "A": "Remembered policies can disrupt services lacking compatible HTTPS deployment.",
        "B": "Certificate checks remain necessary and become stricter under HSTS.",
        "C": "HSTS changes browser behavior, not certificates issued to hosts.",
        "D": "Subdomain coverage can affect other services sharing that domain."
      }
    },
    "q07": {
      "options": {
        "A": "CSP controls permitted execution and sources rather than encrypting scripts.",
        "B": "CSP restricts allowed resource sources and script execution behavior.",
        "C": "Contextual encoding remains necessary even with a restrictive CSP.",
        "D": "CSP complements safe templates and contextual output encoding practices."
      }
    },
    "q08": {
      "options": {
        "A": "Report-only policies collect violations without enforcing their blocking behavior.",
        "B": "Observations help tune policies but do not prove correctness.",
        "C": "Blocking requires enforcement; report-only mode observes potential policy violations.",
        "D": "Report-only mode reveals compatibility issues before enabling policy enforcement."
      }
    },
    "q09": {
      "options": {
        "A": "Framing policy addresses embedding, not general cross-origin API access.",
        "B": "Cache directives control storage of sensitive responses in caches.",
        "C": "Cross-origin API access uses separate controls such as CORS.",
        "D": "Restricting framing reduces clickjacking through unwanted embedded application pages."
      }
    },
    "q10": {
      "options": {
        "A": "Request character decoding is separate from browser response sniffing.",
        "B": "Compression choices do not define browser MIME sniffing behavior.",
        "C": "MIME sniffing concerns response interpretation by browsers, not request decoding.",
        "D": "Sniffing can override declared types and activate unintended content."
      }
    },
    "q11": {
      "options": {
        "A": "Referrer policy limits URL information disclosed in outgoing requests.",
        "B": "Framing controls determine allowed embedders, not outgoing URL disclosure.",
        "C": "Referrer policy does not select allowed HTTP request methods.",
        "D": "Embedding restrictions belong to framing policies rather than Referrer-Policy."
      }
    },
    "q12": {
      "options": {
        "A": "Permissions-Policy governs browser capabilities, not server operating system permissions.",
        "B": "Application authorization controls database access independently of browser policies.",
        "C": "Server file and socket access require separate operating system controls.",
        "D": "Permissions-Policy limits availability of supported browser features by policy."
      }
    },
    "q13": {
      "options": {
        "A": "Secure restricts transport; it does not prevent script access.",
        "B": "HttpOnly prevents ordinary client scripts from reading cookie values.",
        "C": "SameSite controls cross-site sending rather than script read access.",
        "D": "SameSite does not substitute for HttpOnly script access protection."
      }
    },
    "q14": {
      "options": {
        "A": "Cache directives limit unintended storage and reuse of sensitive responses.",
        "B": "Caches do not automatically strip sensitive content before storage.",
        "C": "API responses can be cached regardless of filename suffixes.",
        "D": "HTTPS encryption does not prevent endpoint or intermediary caching."
      }
    },
    "q15": {
      "options": {
        "A": "Tests should verify intended protection across important response paths.",
        "B": "More header names do not guarantee appropriate security policy.",
        "C": "Policies should match route requirements rather than alphabetical presentation.",
        "D": "Different route needs can justify different reviewed response policies."
      }
    },
    "q16": {
      "options": {
        "A": "Tested policies matched to deployment architecture provide complementary browser protections.",
        "B": "Routes and deployments may require different reviewed header policies.",
        "C": "Browser policies cannot replace application validation and access controls.",
        "D": "Policies need review as route and embedding requirements change."
      }
    }
  }
};
