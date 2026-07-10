window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Code Examples: Inspect Plists and Application Data",
  "codeExamples": [
    {
      "title": "Inspect a Preference Plist Safely",
      "language": "shell",
      "code": "ROOT=/Volumes/Evidence/MacintoshHD\nPREF=\"$ROOT/Users/alice/Library/Preferences/com.apple.finder.plist\"\n\nplutil -p \"$PREF\" | tee finder-preferences.txt\nshasum -a 256 \"$PREF\" | tee finder-preferences.sha256"
    },
    {
      "title": "Extract Selected Plist Keys with Python",
      "language": "python",
      "code": "from pathlib import Path\nimport plistlib\n\nplist_path = Path(\"/Volumes/Evidence/MacintoshHD/Users/alice/Library/Preferences/com.apple.recentitems.plist\")\n\nwith plist_path.open(\"rb\") as handle:\n    data = plistlib.load(handle)\n\nfor key in sorted(data):\n    value = data[key]\n    if \"Recent\" in key or \"File\" in key or \"Application\" in key:\n        print({key: value})"
    },
    {
      "title": "Find Application Databases and Local State",
      "language": "shell",
      "code": "ROOT=/Volumes/Evidence/MacintoshHD\n\nfind \"$ROOT/Users\" -path '*/Library/Application Support/*' \\( \\\n  -name '*.sqlite' -o -name '*.sqlite3' -o -name 'Local State' -o -name '*.plist' \\\n\\) -type f -print 2>/dev/null | sort | tee application-data-inventory.txt"
    }
  ]
};
