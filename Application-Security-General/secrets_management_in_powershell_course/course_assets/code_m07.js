window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Request an Azure managed-identity token",
      "language": "powershell",
      "blurb": "The metadata response must be a fresh bearer token retained in memory.",
      "code": "Set-StrictMode -Version Latest\n$uri='http://169.254.169.254/metadata/identity/oauth2/token?api-version=2019-08-01&resource=https%3A%2F%2Fvault.azure.net'\n$response=Invoke-RestMethod -Uri $uri -Headers @{Metadata='true'} -TimeoutSec 3 -NoProxy -MaximumRedirection 0 -ErrorAction Stop\n$expiry=0L\n$expiryText=[string]$response.expires_on\nif($response.token_type -cne 'Bearer' -or $expiryText -cnotmatch '\\A[0-9]{10,11}\\z' -or\n -not [int64]::TryParse($expiryText,[ref]$expiry) -or $expiry -le [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()+300 -or\n $response.access_token -isnot [string] -or $response.access_token.Length -lt 1 -or $response.access_token.Length -gt 16384 -or\n $response.access_token -match '[\\x00-\\x20\\x7f]'){throw 'token rejected'}\n$accessToken=$response.access_token; try { Invoke-ApprovedVaultRequest -AccessToken $accessToken } finally {$accessToken=$null;$response=$null}\n"
    },
    {
      "title": "Select a client certificate from an application allowlist",
      "language": "powershell",
      "blurb": "A caller selects only a named application-owned certificate; the machine-store object must also have a private key, client-authentication EKU, and sufficient lifetime.",
      "code": "Set-StrictMode -Version Latest\nfunction Get-ApprovedClientCertificate {\n param([Parameter(Mandatory)][ValidateSet('Primary','Backup')][string]$CertificateName)\n $approved=[ordered]@{\n  Primary='0123456789ABCDEF0123456789ABCDEF01234567'\n  Backup='89ABCDEF0123456789ABCDEF0123456789ABCDEF01'\n }\n $thumbprint=$approved[$CertificateName]\n $certificate=Get-Item -LiteralPath \"Cert:\\LocalMachine\\My\\$thumbprint\" -ErrorAction Stop\n if($certificate.NotBefore -gt (Get-Date) -or -not $certificate.HasPrivateKey -or $certificate.NotAfter -lt (Get-Date).AddDays(14)){throw 'certificate rejected'}\n if('1.3.6.1.5.5.7.3.2' -notin $certificate.EnhancedKeyUsageList.ObjectId.Value){throw 'client EKU required'}\n return $certificate\n}\n"
    }
  ]
};
