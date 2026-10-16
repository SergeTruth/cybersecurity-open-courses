window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Use a vault token in an in-process request",
      "language": "powershell",
      "blurb": "The token never becomes a child-process argument.",
      "code": "Set-StrictMode -Version Latest\n$token=Get-Secret -Vault 'AutomationVault' -Name 'OrdersApiToken' -ErrorAction Stop\nif($token -isnot [SecureString]){throw 'SecureString required'}\ntry { Invoke-RestMethod -Uri 'https://orders.example.test/v1/health' -Authentication Bearer -Token $token -TimeoutSec 10 -MaximumRedirection 0 -ErrorAction Stop }\nfinally { $token=$null }\n"
    },
    {
      "title": "Reject secrets in scheduled-task arguments",
      "language": "powershell",
      "blurb": "The task identity is fixed, and sensitive long-option, short-option, slash-option, separated-value, colon-value, and equals-value forms are rejected.",
      "code": "Set-StrictMode -Version Latest\n$task=Get-ScheduledTask -TaskName 'OrdersReconcile' -ErrorAction Stop\nif($task.Principal.UserId -ne 'CONTOSO\\svc-orders'){throw 'identity rejected'}\n$sensitiveOption='(?i)(?:^|\\s|[\"''])(?:--?(?:password|token|secret|api[-_]?key)|/(?:password|token|secret|api[-_]?key))(?=\\s|[:=]|$|[\"''])'\nforeach($action in $task.Actions){\n if($action.Arguments -match $sensitiveOption){throw 'secret argument found'}\n}\n"
    }
  ]
};
