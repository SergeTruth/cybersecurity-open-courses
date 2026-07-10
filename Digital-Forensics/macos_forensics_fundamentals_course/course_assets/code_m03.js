window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Code Examples: Review User and Activity Artifacts",
  "codeExamples": [
    {
      "title": "Parse Local User Account Plists",
      "language": "python",
      "code": "from pathlib import Path\nimport plistlib\n\nusers_dir = Path(\"/Volumes/Evidence/MacintoshHD/var/db/dslocal/nodes/Default/users\")\n\nfor plist_path in sorted(users_dir.glob(\"*.plist\")):\n    with plist_path.open(\"rb\") as handle:\n        data = plistlib.load(handle)\n\n    uid = data.get(\"uid\", [\"\"])[0]\n    home = data.get(\"home\", [\"\"])[0]\n    shell = data.get(\"shell\", [\"\"])[0]\n    realname = data.get(\"realname\", [\"\"])[0]\n    print({\"account\": plist_path.stem, \"uid\": uid, \"home\": home, \"shell\": shell, \"realname\": realname})"
    },
    {
      "title": "Locate User Activity Leads",
      "language": "shell",
      "code": "ROOT=/Volumes/Evidence/MacintoshHD\n\nfind \"$ROOT/Users\" -maxdepth 4 \\( \\\n  -name '.zsh_history' -o \\\n  -name '.bash_history' -o \\\n  -name 'History' -o \\\n  -name 'Downloads.plist' -o \\\n  -path '*/Downloads/*' \\\n\\) -print 2>/dev/null | sort | tee user-activity-leads.txt"
    },
    {
      "title": "Query Browser History from a Collected Profile",
      "language": "python",
      "code": "import sqlite3\nfrom pathlib import Path\n\nhistory = Path(\"/Volumes/Evidence/MacintoshHD/Users/alice/Library/Application Support/Google/Chrome/Default/History\")\n\nwith sqlite3.connect(f\"file:{history}?mode=ro\", uri=True) as db:\n    rows = db.execute('''\n        SELECT datetime(last_visit_time / 1000000 - 11644473600, 'unixepoch') AS visit_utc,\n               url,\n               title\n        FROM urls\n        ORDER BY last_visit_time DESC\n        LIMIT 25\n    ''')\n    for row in rows:\n        print(row)"
    }
  ]
};
