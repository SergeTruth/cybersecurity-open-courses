window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-15bf71cc4e",
  "questions": {
    "q1": {
      "options": {
        "A": "Uploaded names, labels, and metadata can all be selected by the sender.",
        "B": "Receiving a file introduces untrusted content and decisions affecting storage, processing, and later users.",
        "C": "Reaching a server proves delivery rather than the safety of the uploaded bytes.",
        "D": "Upload endpoints commonly receive files produced outside the application's control."
      }
    },
    "q2": {
      "options": {
        "A": "Receiving a file does not authorize immediate public access to its contents.",
        "B": "A filename can misrepresent both the file's type and whether it is appropriate.",
        "C": "Reception must be followed by the controls required before storage, processing, or publication.",
        "D": "A clear processing state helps distinguish received, quarantined, rejected, and approved files."
      }
    },
    "q3": {
      "options": {
        "A": "Bound request sizes before uploads can exhaust memory, storage, time, or shared service capacity.",
        "B": "A small file can still contain hostile or inappropriate content requiring validation.",
        "C": "Size limits restrict cost and do not determine who may upload or access a file.",
        "D": "Dynamic upload endpoints especially need limits on accepted content and processing work."
      }
    },
    "q4": {
      "options": {
        "A": "The server should choose storage destinations rather than allowing a browser to direct filesystem access.",
        "B": "Client names can collide and should not be assumed unique or suitable as internal identifiers.",
        "C": "Keep display names separate from server-controlled identifiers and approved storage locations.",
        "D": "A chosen filename does not prove that the content matches its apparent category."
      }
    },
    "q5": {
      "options": {
        "A": "Executable roots do not automatically isolate every uploaded file from interpretation or serving.",
        "B": "Keep received content from becoming executable application content or automatically public static output.",
        "C": "Storage location affects access, execution, publication, and operational lifecycle assumptions.",
        "D": "Authenticated uploaders can also provide malicious content, so isolation is not only for anonymous input."
      }
    },
    "q6": {
      "options": {
        "A": "Extensions and MIME metadata do not establish safe use in every processing workflow.",
        "B": "Type signals do not replace isolation and least-privilege access to uploaded storage.",
        "C": "Use several validated signals and workflow rules because declared type and names can mislead.",
        "D": "Clients can supply type metadata without any trusted scanner having approved the file."
      }
    },
    "q7": {
      "options": {
        "A": "Quarantine marks content pending approval rather than permanently trusting every received file.",
        "B": "Restricted staging should delay publication until required validation and authorization succeed.",
        "C": "Quarantine benefits from tracked state and controlled diagnostics for processing outcomes.",
        "D": "A restricted pending state prevents normal use before required checks and review complete."
      }
    },
    "q8": {
      "options": {
        "A": "File categories have different formats, parser behavior, expansion, and workflow risks.",
        "B": "Processing libraries are trusted executable dependencies that can affect safety and availability.",
        "C": "Document and spreadsheet imports can alter application records and business state.",
        "D": "Complex parsers need maintained dependencies, bounded work, and category-specific validation."
      }
    },
    "q9": {
      "options": {
        "A": "A valid user may still lack permission for a specific file, tenant, or generated derivative.",
        "B": "Authentication does not give universal access to every private uploaded object.",
        "C": "Public and private content can have distinct publication and access rules.",
        "D": "Authorization must precede serving an existing file rather than occur only after deletion."
      }
    },
    "q10": {
      "options": {
        "A": "Revealing a filesystem path does not enforce least privilege or object-level permissions.",
        "B": "Stable approved identifiers avoid leaking storage layout and coupling clients to internal paths.",
        "C": "Interfaces can use controlled routes without revealing the actual storage path.",
        "D": "Internal paths can disclose infrastructure layout, account names, or implementation assumptions."
      }
    },
    "q11": {
      "options": {
        "A": "Logs can be exported and retained beyond the protected storage boundary.",
        "B": "Logging sensitive contents creates another retention location rather than replacing retention policy.",
        "C": "Copied diagnostic records can become an unintended second store for confidential uploaded information.",
        "D": "Most events can be diagnosed with approved metadata instead of entire file contents."
      }
    },
    "q12": {
      "options": {
        "A": "Upload pipelines can use privileged CI and runtime identities that need separation and review.",
        "B": "Production storage permissions determine which workloads can read, publish, or delete uploaded files.",
        "C": "Parsing and scanning dependencies directly influence processing behavior and security.",
        "D": "Review the trusted code and identities controlling every processing and storage stage."
      }
    }
  }
};
