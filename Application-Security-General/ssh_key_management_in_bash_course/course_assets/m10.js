window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-52896f6943",
  "questions": {
    "q1": {
      "options": {
        "A": "Encrypting a stored key does not limit the remote authority available when that key is used.",
        "B": "A fingerprint identifies a key but does not possess the private signing capability needed for authentication.",
        "C": "Private authentication material can grant access to remote accounts and their permitted operations.",
        "D": "Possession or use of an accepted private key can enable client authentication and the remote authority assigned to that identity."
      }
    },
    "q2": {
      "options": {
        "A": "Known-host records contain server trust information rather than the private client credentials used for login.",
        "B": "Client keys prove client identity, while trusted host keys provide the server-identity side of the connection.",
        "C": "These roles are reversed: user keys authenticate clients and host keys identify servers.",
        "D": "The two key roles authenticate different sides of the client-server relationship."
      }
    },
    "q3": {
      "options": {
        "A": "A filename alone does not identify accountable ownership, authorized workloads, or lifecycle responsibilities.",
        "B": "A label does not constrain a reused key's actual accepted accounts and privileges.",
        "C": "Short-lived authority still needs an owner responsible for scope, renewal, misuse, and response.",
        "D": "A defined owner and use make access reviews and controlled replacement or revocation operationally possible."
      }
    },
    "q4": {
      "options": {
        "A": "A dedicated key can be replaced independently, whereas shared dependents require coordinated changes.",
        "B": "Server authentication does not reduce the authority of a client key accepted on many systems.",
        "C": "Reuse ties unrelated grants together, so one compromised key can affect more systems and disrupt more jobs during revocation.",
        "D": "Indistinguishable key use makes per-job attribution harder rather than improving it."
      }
    },
    "q5": {
      "options": {
        "A": "Ticket systems can retain and distribute private material beyond an appropriate credential delivery boundary.",
        "B": "Private material belongs in controlled storage and delivery paths rather than broadly shared files and operational records.",
        "C": "Repository encryption alone does not establish appropriate key access, lifecycle, or copying controls.",
        "D": "Deleting a key in a later image layer does not necessarily remove it from earlier retained layers."
      }
    },
    "q6": {
      "options": {
        "A": "Explicit identity policy prevents an automation job from accidentally using another available key with broader or different access.",
        "B": "Agent ordering can select an unintended credential unless identity use is deliberately constrained.",
        "C": "Server host-key verification does not choose the client's intended authentication credential.",
        "D": "Quoting an identity path preserves its argument boundary but does not authorize that caller-selected credential."
      }
    },
    "q7": {
      "options": {
        "A": "Forwarding can extend the locations able to request authentication through the agent.",
        "B": "Socket access controls do not define the commands authorized by remote accounts accepting a key.",
        "C": "Other processes with appropriate socket access may request agent operations beyond the loading process.",
        "D": "Agent access and forwarding can expose authentication authority beyond the intended workflow even without exporting private key bytes."
      }
    },
    "q8": {
      "options": {
        "A": "Changing the server host key does not automatically remove accepted client keys from account authorization.",
        "B": "Stopping a local script does not universally delete or expire its public key on remote servers.",
        "C": "Accepted public-key entries define which client credentials may authenticate under the account's configured restrictions.",
        "D": "Authorized-key configuration governs accepted client access rather than the local shell's command history."
      }
    },
    "q9": {
      "options": {
        "A": "Server identity checking helps prevent sending credentials or commands to an impersonated endpoint.",
        "B": "TLS and SSH use different trust mechanisms; checking one does not automatically authenticate the other.",
        "C": "Resolving a hostname does not establish the trusted SSH key of the responding server.",
        "D": "A replacement host key needs an authenticated update path rather than automatic acceptance because it changed."
      }
    },
    "q10": {
      "options": {
        "A": "Output masking does not remove private material from workspace files, process state, or artifacts.",
        "B": "A repository can contain workflows with different trust and target scopes that should not share unrestricted production access.",
        "C": "Overbroad CI credentials can be copied from runners and retained outputs and then used against additional remote systems.",
        "D": "Short job duration does not limit the lifetime or remote scope of a copied key."
      }
    },
    "q11": {
      "options": {
        "A": "Suspected exposure can require immediate containment rather than waiting while the credential remains usable.",
        "B": "Removing accepted access, replacing the credential, investigating use, and tracing copies address both active authority and retained exposure.",
        "C": "Renaming the file leaves the same private credential accepted by the same remote systems.",
        "D": "Destroying audit evidence before investigation makes it harder to establish unauthorized use and affected access."
      }
    },
    "q12": {
      "options": {
        "A": "Defined scope, protected material, access evidence, and workable replacement procedures support safe SSH credential lifecycles.",
        "B": "Avoiding rotation creates persistent exposure and does not provide a recovery plan for compromise.",
        "C": "Public inventories should identify credentials without including the private authentication material.",
        "D": "Successful login monitoring does not establish that a key's granted accounts and commands remain appropriate."
      }
    }
  }
};
