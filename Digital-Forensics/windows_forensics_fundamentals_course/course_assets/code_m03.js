window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Code Examples: Review User Activity Artifacts",
  "codeExamples": [
    {
      "title": "Locate User Activity Artifacts",
      "language": "powershell",
      "code": "$Root = \"E:\\Mount\\C\"\n\nGet-ChildItem -LiteralPath \"$Root\\Users\" -Directory -Force |\n  ForEach-Object {\n    $Profile = $_.FullName\n    Get-ChildItem -LiteralPath $Profile -Force -Recurse -ErrorAction SilentlyContinue |\n      Where-Object {\n        $_.Name -like \"*.lnk\" -or\n        $_.Name -like \"*.automaticDestinations-ms\" -or\n        $_.Name -in @(\"NTUSER.DAT\", \"UsrClass.dat\")\n      } |\n      Select-Object FullName, Length, LastWriteTimeUtc\n  } |\n  Export-Csv \"case-user-artifacts.csv\" -NoTypeInformation"
    },
    {
      "title": "List Recent Downloads and Desktop Items",
      "language": "powershell",
      "code": "$Root = \"E:\\Mount\\C\"\n\n\"Downloads\",\"Desktop\",\"Documents\" | ForEach-Object {\n  $FolderName = $_\n  Get-ChildItem -LiteralPath \"$Root\\Users\" -Directory -Force |\n    ForEach-Object {\n      Get-ChildItem -LiteralPath (Join-Path $_.FullName $FolderName) -Force -ErrorAction SilentlyContinue |\n        Select-Object @{Name=\"Profile\";Expression={$_.Directory.Parent.Name}}, FullName, Length, LastWriteTimeUtc\n    }\n} | Export-Csv \"case-user-file-leads.csv\" -NoTypeInformation"
    },
    {
      "title": "Convert Profile Inventory to a Review List",
      "language": "python",
      "code": "import csv\nfrom pathlib import Path\n\nrows = list(csv.DictReader(Path(\"case-user-artifacts.csv\").open(newline=\"\", encoding=\"utf-8\")))\nfor row in rows:\n    path = row[\"FullName\"]\n    if \"\\\\Users\\\\\" in path:\n        profile = path.split(\"\\\\Users\\\\\", 1)[1].split(\"\\\\\", 1)[0]\n        print(f\"{row['LastWriteTimeUtc']} profile={profile} artifact={path}\")"
    }
  ]
};
