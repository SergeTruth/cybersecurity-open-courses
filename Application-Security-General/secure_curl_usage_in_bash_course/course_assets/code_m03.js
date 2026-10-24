window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro": "These examples apply 'TLS, Certificates, and Transport Trust' to distinct, reviewable Bash workflows. Runtime: GNU/Linux, Bash 5+, GNU command-line tools, and Python 3.11+ where shown. Install the demonstrated clients separately; fixed /etc and /opt policies and application-specific consumers are deployment-owned prerequisites. These are administrator/service scripts, not unauthenticated web endpoints.",
    "codeExamples":  [
                         {
                             "title":  "Require HTTPS and the approved CA for one API origin",
                             "code": "#!/usr/bin/env bash\nset -euo pipefail\n\n/usr/bin/curl -q --proto '=https' --tlsv1.2 \\\n  --cacert /etc/ssl/certs/company-api-ca.pem \\\n  --max-redirs 0 --fail-with-body --silent --show-error \\\n  'https://api.example.test/v1/health' >/dev/null",
                             "blurb": "Implicit curlrc loading is disabled before the fixed HTTPS URL, company CA, protocol policy, and no-redirect options are applied."
                         },
                         {
                             "title":  "Pin the public key for a high-value enrollment request",
                             "code": "#!/usr/bin/env bash\nset -euo pipefail\n\npin=\"$(< /etc/orders/enrollment.spki-pin)\"\n[[ \"$pin\" =~ ^sha256//[A-Za-z0-9+/]{43}=$ ]] || exit 65\n/usr/bin/curl -q --proto '=https' --tlsv1.2 --pinnedpubkey \"$pin\" \\\n  --max-redirs 0 --fail --silent --show-error \\\n  'https://enroll.example.test/v1/status' >/dev/null",
                             "blurb":  "A reviewed SHA-256 SPKI pin supplements normal CA and hostname validation for the fixed enrollment service."
                         }
                     ]
};
