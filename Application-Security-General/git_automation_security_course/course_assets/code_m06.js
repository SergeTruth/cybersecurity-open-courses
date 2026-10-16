window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Validate a CI Git event and immutable revision",
      "language": "bash",
      "blurb": "The trigger accepts an approved event and branch plus a full commit ID that must exist as a commit object.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nevent=\"${CI_EVENT:?event required}\"\nref=\"${CI_REF:?ref required}\"\nrevision=\"${CI_COMMIT_SHA:?revision required}\"\n[[ \"$event\" =~ ^(push|workflow_dispatch)$ ]] || exit 64\n[[ \"$ref\" == refs/heads/main ]] || exit 77\n[[ \"$revision\" =~ ^[a-f0-9]{40}$ ]] || exit 64\ngit cat-file -e \"$revision^{commit}\" 2>/dev/null || exit 66\ngit merge-base --is-ancestor \"$revision\" refs/remotes/approved/main || exit 77\n"
    },
    {
      "title": "Require a valid commit signature before release",
      "language": "bash",
      "blurb": "The release gate verifies the selected commit cryptographically and checks that the signer fingerprint is in an application-owned allowlist.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\n# Trusted checkout/configuration and pinned GPG verifier/keyring; this is not an untrusted-repository sandbox.\nrevision=\"${1:?commit required}\"\n[[ \"$revision\" =~ ^[a-f0-9]{40}$ ]] || exit 64\nsignature=\"$(git verify-commit --raw \"$revision\" 2>&1)\" || {\n  printf 'commit signature verification failed\\n' >&2; exit 77;\n}\nfingerprint=\"$(sed -n 's/^\\[GNUPG:\\] VALIDSIG \\([A-F0-9]\\{40\\}\\).*/\\1/p' <<< \"$signature\")\"\ncase \"$fingerprint\" in\n  0123456789ABCDEF0123456789ABCDEF01234567|89ABCDEF0123456789ABCDEF0123456789ABCDEF01) ;;\n  *) exit 77 ;;\nesac\n"
    }
  ]
};
