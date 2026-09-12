window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "The type below describes the intended output. NotificationSchema is a conceptual runtime adapter that must validate the closed variants, destination formats, message bounds, and unknown fields.",
  "codeExamples": [
    {
      "title": "Closed runtime union, fixed server dispatch",
      "language": "typescript",
      "blurb": "Authorization must cover the selected operation and destination before dispatch. No client value becomes a module path, class name, or constructor lookup.",
      "code": "type Notification =\n  | { kind: \"email\"; address: string; message: string }\n  | { kind: \"sms\"; phone: string; message: string };\n\nconst input: Notification = NotificationSchema.parse(req.body);\nawait requireNotificationPermission(auth, input);\n\nswitch (input.kind) {\n  case \"email\":\n    await sendEmail(input.address, input.message);\n    break;\n  case \"sms\":\n    await sendSms(input.phone, input.message);\n    break;\n}\n// The type annotation does not replace NotificationSchema's checks."
    }
  ]
};
