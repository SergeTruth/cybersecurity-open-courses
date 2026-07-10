window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Code Examples: Review Startup and Persistence Artifacts",
  "codeExamples": [
    {
      "title": "Inventory LaunchAgents and LaunchDaemons",
      "language": "shell",
      "code": "ROOT=/Volumes/Evidence/MacintoshHD\n\nfind \"$ROOT/Library/LaunchAgents\" \"$ROOT/Library/LaunchDaemons\" \\\n     \"$ROOT/System/Library/LaunchAgents\" \"$ROOT/System/Library/LaunchDaemons\" \\\n     \"$ROOT/Users\" -path '*/Library/LaunchAgents/*.plist' \\\n  -type f -print 2>/dev/null | sort | tee launch-items.txt"
    },
    {
      "title": "Extract Launch Item Program Details",
      "language": "python",
      "code": "from pathlib import Path\nimport plistlib\n\nfor plist_path in Path(\".\").glob(\"collected-launch-items/**/*.plist\"):\n    with plist_path.open(\"rb\") as handle:\n        item = plistlib.load(handle)\n\n    print({\n        \"file\": str(plist_path),\n        \"label\": item.get(\"Label\"),\n        \"program\": item.get(\"Program\"),\n        \"program_arguments\": item.get(\"ProgramArguments\"),\n        \"run_at_load\": item.get(\"RunAtLoad\"),\n        \"start_interval\": item.get(\"StartInterval\"),\n    })"
    },
    {
      "title": "Check Other Startup-Adjacent Locations",
      "language": "shell",
      "code": "ROOT=/Volumes/Evidence/MacintoshHD\n\nfind \"$ROOT/private/var/at\" \"$ROOT/usr/local\" \"$ROOT/etc\" \"$ROOT/Users\" \\( \\\n  -name 'crontab' -o -name '.zshrc' -o -name '.zprofile' -o -name '.bash_profile' \\\n\\) -type f -print 2>/dev/null | sort | tee startup-adjacent-artifacts.txt"
    }
  ]
};
