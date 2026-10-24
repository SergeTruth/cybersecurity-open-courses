window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Output, Downloads, Files, and Pipelines\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Publish a download without following an output symlink",
                             "code": "#!/usr/bin/env bash\nset -euo pipefail\numask 077\n\ndestination_root=\"$(realpath -e -- \"${1:?destination root required}\")\"\n[[ \"$destination_root\" == '/srv/orders/releases' && ! -L \"$destination_root\" ]] || exit 77\nwork=\"$(mktemp -d -p \"$destination_root\" .download.XXXXXX)\"\ntrap 'rm -rf -- \"$work\"' EXIT\n/usr/bin/curl -q --proto '=https' --max-redirs 0 --fail --silent --show-error \\\n  --output \"$work/artifact.tar.gz\" 'https://downloads.example.test/orders/orders-2.4.1.tar.gz'\n[[ -s \"$work/artifact.tar.gz\" ]] || exit 70\n/usr/bin/mv -T -- \"$work/artifact.tar.gz\" \"$destination_root/orders-2.4.1.tar.gz\"",
                             "blurb":  "curl writes inside a new private directory; validation happens before mv replaces the destination entry itself instead of opening a caller-selected path."
                         },
                         {
                             "title":  "Trust a release digest only after signature verification",
                             "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nrelease_dir=\"${1:?release directory required}\"\n/usr/bin/gpgv --keyring /etc/orders/release-signers.gpg \\\n  \"$release_dir/SHA256SUMS.asc\" \"$release_dir/SHA256SUMS\"\n(cd \"$release_dir\" && /usr/bin/sha256sum --check --strict SHA256SUMS)",
                             "blurb": "The expected hash comes from a manifest authenticated by a pinned release-signing key rather than from an untrusted caller argument. Missing listed files are failures; a partial download cannot pass a complete-release check."
                         }
                     ]
};
