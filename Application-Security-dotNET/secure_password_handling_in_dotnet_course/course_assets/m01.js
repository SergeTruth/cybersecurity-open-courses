window.COURSE_MODULE = {
  "title": "Passwords as High-Value Secrets",
  "graphicAlt": "Bullet summary graphic for Passwords as High-Value Secrets.",
  "narration": "Passwords are authentication secrets. They are not ordinary form fields, comments, profile preferences, or support notes. A password can unlock account access, user data, administrative actions, billing workflows, and connected systems. That is why password handling needs explicit design across the full account lifecycle.\n\nSecure handling starts before storage. It includes collection in the user interface, protected transport, server-side validation, hashing, verification, reset, account recovery, logging, storage, migration, monitoring, support procedures, and compromise response. A weak choice in any one of those areas can expose password material or make account abuse easier to sustain.\n\nThe defensive goal has two sides. First, reduce online account abuse by making registration, login, reset, and recovery flows predictable, monitored, and resistant to repeated misuse. Second, reduce offline damage if a database, backup, log source, crash dump, or analytics stream is exposed. Correct password hashing is important, but it is only one part of the system.\n\nA password should not be stored, logged, displayed, transmitted, copied into tickets, or repeated back to a user unless there is a clearly justified and secure workflow. Password security depends on application code, ASP.NET Core Identity configuration, infrastructure, database access, key management, operational procedures, and support behavior. Treating passwords as high-value secrets keeps the review practical and grounded.",
  "narrationPoints": [
    "A password can unlock account access, user data, administrative actions, billing workflows, and connected systems.",
    "A weak choice in any one of those areas can expose password material or make account abuse easier to sustain.",
    "Second, reduce offline damage if a database, backup, log source, crash dump, or analytics stream is exposed.",
    "Password security depends on application code, ASP.NET Core Identity configuration, infrastructure, database access, key management, operational procedures, and support behavior.",
    "Treating passwords as high-value secrets keeps the review practical and grounded."
  ]
};
