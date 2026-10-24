window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-fb9f389709",
  "questions": {
    "q1": {
      "options": {
        "A": "Transport encryption does not establish that an executed command makes a safe or approved state change.",
        "B": "SSH accounts and remote commands exercise authority as well as expose transport confidentiality concerns.",
        "C": "Connection success does not prove that the requested action was permitted by application or operational policy.",
        "D": "Automated SSH can exercise production credentials and execute lasting changes, so its scope and effects need explicit controls."
      }
    },
    "q2": {
      "options": {
        "A": "A known name does not authenticate the server currently answering at that destination.",
        "B": "Host-key trust lets the client verify the server identity before relying on the connection.",
        "C": "User keys authenticate the client account; server host keys serve the separate server-identity role.",
        "D": "A verified server can still reject or permit commands independently of whether the client knows its host key."
      }
    },
    "q3": {
      "options": {
        "A": "Skipping verification removes the check that the connection reached the server identity the client intended to trust.",
        "B": "Later output checks cannot reliably undo commands or credential disclosures sent to an untrusted endpoint.",
        "C": "Encryption without the intended peer identity can protect a connection to the wrong server.",
        "D": "Protected DNS information does not by itself establish every required SSH host-key trust decision."
      }
    },
    "q4": {
      "options": {
        "A": "Available agent keys need not match the least-privilege identity approved for this job.",
        "B": "Job-specific credentials provide defined ownership and limit the remote resources affected by a single workflow.",
        "C": "A general administrator key grants unnecessary authority and couples unrelated automation lifecycles.",
        "D": "Untrusted identity selection can bypass the intended connection and credential policy."
      }
    },
    "q5": {
      "options": {
        "A": "Additional dependents make urgent credential replacement more disruptive and harder to coordinate.",
        "B": "Verifying a server does not limit the commands an overprivileged account may execute there.",
        "C": "Sharing credentials couples workflows and complicates independent rotation, revocation, and compromise containment.",
        "D": "A common key does not uniquely attribute access to the individual job that used it."
      }
    },
    "q6": {
      "options": {
        "A": "Array elements preserve separate local SSH options and operands instead of relying on shell splitting.",
        "B": "Converting the array into one interpreted command string can discard the boundaries it originally preserved.",
        "C": "Argument preservation does not validate whether the host is authorized or correctly authenticated.",
        "D": "A remote program may still interpret option-like data according to its own command contract."
      }
    },
    "q7": {
      "options": {
        "A": "Local quoting does not automatically determine how a remote shell parses the transmitted command.",
        "B": "Ordinary remote shell execution does not universally deliver the local typed argument vector unchanged.",
        "C": "Remote environment and shell settings can affect interpretation and command behavior.",
        "D": "Separate local and remote parsing stages require deliberate control over syntax, values, and execution context."
      }
    },
    "q8": {
      "options": {
        "A": "Recording that an action was attempted does not establish its resulting state.",
        "B": "Remote commands as well as transfers need checked outcomes and suitable postcondition verification.",
        "C": "Checking status and expected results makes failed or partial remote work visible before the script reports success.",
        "D": "A successful transport does not universally establish every application-level postcondition the workflow requires."
      }
    },
    "q9": {
      "options": {
        "A": "A short execution window can still expose a credential with long-lived and broad remote authority.",
        "B": "Masked output does not stop code in an authorized job from reading or exporting the secret.",
        "C": "Lower-trust feature branches should not automatically receive production deployment authority.",
        "D": "Credential scope determines which jobs and environments can exercise remote access if workflow input or code is compromised."
      }
    },
    "q10": {
      "options": {
        "A": "Private key material remains sensitive even in logs intended for a restricted audience.",
        "B": "Command output can contain credentials, private records, or sensitive operational details.",
        "C": "Safe job evidence should avoid retaining credential values and unnecessary raw remote output.",
        "D": "Failure diagnosis still requires redaction because error paths can expose the same secrets as successful operations."
      }
    },
    "q11": {
      "options": {
        "A": "Keys, server trust, and permitted commands can drift as jobs, hosts, and responsibilities change.",
        "B": "Training records do not establish the actual credentials, trusted servers, or commands currently configured.",
        "C": "Key review does not determine sudo policy or constrain every command the remote account can execute.",
        "D": "Terminal presentation does not establish the job's identity, trust relationships, or authority."
      }
    },
    "q12": {
      "options": {
        "A": "One powerful identity across jobs broadens compromise impact and obscures independent lifecycle ownership.",
        "B": "Narrow authority, trusted peers, checked results, and safe operational evidence keep remote automation controlled.",
        "C": "Arbitrary caller commands can expand execution beyond the workflow's intended operation set.",
        "D": "Recovery convenience does not establish the identity of a server when host checks are disabled."
      }
    }
  }
};
