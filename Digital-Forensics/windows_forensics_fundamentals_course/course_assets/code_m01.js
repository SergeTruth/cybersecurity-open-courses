window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Code Examples: Preserve Context and Integrity",
  "codeExamples": [
    {
      "title": "Hash Collected Evidence",
      "language": "powershell",
      "code": "$Case = \"case-2026-06-26\"\n$Image = \"E:\\Evidence\\win10-disk.E01\"\n\nNew-Item -ItemType Directory -Path $Case -Force | Out-Null\nGet-FileHash -Algorithm SHA256 -LiteralPath $Image |\n  Tee-Object -FilePath \"$Case\\evidence-hash.txt\"\n\nGet-Item -LiteralPath $Image |\n  Select-Object FullName, Length, CreationTimeUtc, LastWriteTimeUtc |\n  Export-Csv \"$Case\\evidence-file-metadata.csv\" -NoTypeInformation"
    },
    {
      "title": "Start a Case Note",
      "language": "powershell",
      "code": "$Case = \"case-2026-06-26\"\n$Note = [ordered]@{\n  case_id = $Case\n  analyst = $env:USERNAME\n  started_utc = (Get-Date).ToUniversalTime().ToString(\"o\")\n  scope = \"Authorized Windows forensic review\"\n}\n\n$Note.GetEnumerator() |\n  ForEach-Object { \"{0}={1}\" -f $_.Key, $_.Value } |\n  Set-Content -Path \"$Case\\case-notes.txt\" -Encoding UTF8"
    }
  ]
};
