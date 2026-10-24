window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Permissions, Ownership, Metadata, and Links\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Preserve safe links while refusing escaping symlinks",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\nreadonly SOURCE=\u0027/srv/orders/static/\u0027\n[[ -d \"$SOURCE\" \u0026\u0026 ! -L \"$SOURCE\" ]] || exit 77\n/usr/bin/rsync --archive --links --safe-links --chown=orders:orders \\\n  --chmod=D750,F640 --itemize-changes -- \"$SOURCE\" \\\n  \u0027web-files:/srv/orders/static/\u0027",
                             "blurb":  "rsync copies links only when their targets remain inside the transferred tree and applies fixed ownership and file modes at the destination."
                         },
                         {
                             "title": "Inspect staging and atomically switch a version pointer",
                             "code": "#!/usr/bin/env bash\nset -euo pipefail\numask 077\n# GNU/Linux. The root and its ancestors are service-owned and not writable by\n# uploaders. All publishers coordinate on this lock. Consumers use current/.\nroot='/srv/orders/imports'\n[[ -d \"$root\" && ! -L \"$root\" ]] || exit 77\nexec {publication_lock}>\"$root/.publish.lock\"\n/usr/bin/flock --nonblock \"$publication_lock\" || exit 75\n# Existing legacy nonempty directories must be migrated administratively.\n[[ ! -e \"$root/current\" || -L \"$root/current\" ]] || exit 77\nwork=\"$(mktemp -d -p \"$root\" version.XXXXXX)\"\npublished=0\ncleanup() {\n  (( published == 1 )) || /usr/bin/rm -rf -- \"$work\"\n}\ntrap cleanup EXIT\n/usr/bin/scp -r -F /etc/orders-transfer/ssh_config \\\n  'source-host:/srv/orders/export/.' \"$work/tree\"\n[[ -d \"$work/tree\" && ! -L \"$work/tree\" ]] || exit 65\nunexpected=\"$(/usr/bin/find -P \"$work/tree\" -xdev ! -type d ! -type f -print -quit)\" || exit 70\n[[ -z \"$unexpected\" ]] || exit 65\n# This checks the local result. scp can follow remote source links; the server\n# must independently constrain the export tree and the transfer account.\nversion=\"$(basename -- \"$work\")\"\n/usr/bin/ln -s -- \"$version/tree\" \"$work/current-link\"\n# Retain the version once publication starts: a signal or ambiguous rename\n# must not let EXIT cleanup delete a tree that current may already reference.\npublished=1\n/usr/bin/mv -T -- \"$work/current-link\" \"$root/current\"\n# Keep the previous immutable version for existing readers; a separate,\n# coordinated retention task removes old versions only when no reader needs them.\nprintf 'published_version=%s\\n' \"$version\"",
                             "blurb": "A failed traversal stops publication. A checked immutable version directory is published through an atomic current-symlink replacement; old versions remain available to readers and require separate retention."
                         }
                     ]
};
