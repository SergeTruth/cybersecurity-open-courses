window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Configure history policy before automation",
      "language": "powershell",
      "blurb": "Set a dedicated session to avoid new PSReadLine file persistence. This does not erase history or suppress transcripts; never enter secret literals, and do not restore incremental saving in that session.",
      "code": "Set-StrictMode -Version Latest\n# Configure a dedicated automation session before accepting commands.\n# Never type/paste a secret into a command. SaveNothing is not a secret boundary:\n# it does not clear memory, previous history, transcripts, or host-side logging.\n# Restoring SaveIncrementally can persist commands entered during SaveNothing.\nSet-PSReadLineOption -HistorySaveStyle SaveNothing\n# Retrieve secrets from the approved vault inside trusted commands instead.\n"
    },
    {
      "title": "Require a private credential-file ACL",
      "language": "powershell",
      "blurb": "On Windows, compare owner and access rules by OS-derived SIDs, reject reparse points and inherited ACLs. This snapshot requires a deployment-protected parent and no concurrent mutation; it does not authorize a later hostile-path open.",
      "code": "Set-StrictMode -Version Latest\n# Windows-only snapshot; deployment protects the parent and prevents concurrent mutation.\nfunction Assert-PrivateCredentialAcl {\n param([Parameter(Mandatory)][string]$LiteralPath)\n $item=Get-Item -LiteralPath $LiteralPath -Force -ErrorAction Stop\n if($item.PSIsContainer -or ($item.Attributes -band [IO.FileAttributes]::ReparsePoint)){throw 'file rejected'}\n $acl=Get-Acl -LiteralPath $item.FullName -ErrorAction Stop\n $sid=[Security.Principal.WindowsIdentity]::GetCurrent().User.Value\n $allowed=@('S-1-5-18','S-1-5-32-544',$sid)\n $owner=$acl.GetOwner([Security.Principal.SecurityIdentifier]).Value\n if(-not $acl.AreAccessRulesProtected -or $owner -notin $allowed){throw 'ACL owner or inheritance rejected'}\n foreach($rule in $acl.GetAccessRules($true,$true,[Security.Principal.SecurityIdentifier])){\n  if($rule.IdentityReference.Value -notin $allowed){throw 'ACL principal rejected'}\n }\n}\n"
    }
  ]
};
