window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Require a typed PSCredential",
      "language": "powershell",
      "blurb": "The boundary accepts a credential object and never serializes it.",
      "code": "# Prerequisites: PowerShell 7.4+ with current security updates; Windows-only APIs are labeled.\n# Install SecretManagement and the approved vault extension where used. Custom Orders\n# commands are application-owned integration adapters, not standard PowerShell cmdlets.\nSet-StrictMode -Version Latest\nfunction Invoke-ApprovedRemoteCheck {\n param([Parameter(Mandatory)][pscredential]$Credential)\n Invoke-Command -ComputerName 'orders-admin.example.test' -Credential $Credential -ScriptBlock { Get-Service Orders } -ErrorAction Stop\n}\n"
    },
    {
      "title": "Zero plaintext interop memory",
      "language": "powershell",
      "blurb": "SecureString conversion is limited to a callback and unmanaged memory is cleared.",
      "code": "Set-StrictMode -Version Latest\nfunction Invoke-WithPlainSecret {\n param([Parameter(Mandatory)][SecureString]$Secret,[Parameter(Mandatory)][scriptblock]$Action)\n $pointer=[Runtime.InteropServices.Marshal]::SecureStringToBSTR($Secret)\n try { & $Action ([Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer)) }\n finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer) }\n}\n"
    }
  ]
};
