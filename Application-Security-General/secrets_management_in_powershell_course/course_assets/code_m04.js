window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Use one approved vault and secret type",
      "language": "powershell",
      "blurb": "A trusted consume-only callback receives the credential; success-stream output is discarded. The callback must not write secrets to other streams or external sinks.",
      "code": "Set-StrictMode -Version Latest\nfunction Invoke-WithOrdersCredential {\n param([Parameter(Mandatory)][ValidatePattern('^[A-Za-z0-9_.-]{3,48}$')][string]$Name,[Parameter(Mandatory)][scriptblock]$Action)\n $value=Get-Secret -Vault 'ProductionVault' -Name $Name -ErrorAction Stop\n if($value -isnot [pscredential]){throw 'unexpected secret type'}\n try { $null = & $Action $value } finally { $value=$null }\n}\n"
    },
    {
      "title": "Verify the registered vault",
      "language": "powershell",
      "blurb": "The extension, default status, and health must match deployment policy.",
      "code": "Set-StrictMode -Version Latest\n$vault=Get-SecretVault -Name 'ProductionVault' -ErrorAction Stop\nif($vault.ModuleName -ne 'Microsoft.PowerShell.SecretStore' -or -not $vault.IsDefault){throw 'vault policy mismatch'}\n$health=@(Test-SecretVault -Name $vault.Name -ErrorAction Stop)\nif($health.Count -ne 1 -or $health[0] -isnot [bool] -or -not $health[0]){throw 'vault health check failed'}\n"
    }
  ]
};
