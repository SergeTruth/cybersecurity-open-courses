window.COURSE_MODULE = {
  "title": "Enrollment and Factor Binding",
  "graphicAlt": "Enrollment verifies the account holder and factor possession before binding minimal metadata and notifying changes.",
  "narration": "MFA enrollment is the process of binding an authenticator or factor to an account or identity. It is security-sensitive because whoever controls enrollment controls future proof of identity. The user should be appropriately verified before adding a factor, and enrollment endpoints should require protection equal to the risk of the account. A logged-in session may not be enough for high-risk enrollment; step-up verification may be appropriate.\n\nEnrollment should confirm factor possession. The application or identity provider should not merely record that a factor was requested; it should verify that the user can complete the challenge. MFA metadata should be stored safely and should contain only what is needed: factor type, enrollment state, display name or device label, timestamps, recovery status, and other operational context. Avoid storing unnecessary secrets or sensitive authenticator material in application logs or broad-access tables.\n\nMany accounts need more than one factor, because devices are lost, replaced, or upgraded. Supporting multiple factors can improve availability, but it also increases management complexity. Device naming helps users recognize their authenticators. Factor replacement should require appropriate proof. Administrative enrollment is especially risky because support staff may be able to change future access without the user's normal factor.\n\nUser notifications are a valuable control. When a factor is added, removed, reset, or renamed, users should receive clear notice through an appropriate channel. Notifications are not a substitute for secure controls, but they improve visibility and response. Treat enrollment and factor reset as seriously as login because a weak enrollment path can become the easiest way to defeat otherwise strong MFA.",
  "narrationPoints": [
    "MFA enrollment is the process of binding an authenticator.",
    "Enrollment should confirm factor possession.",
    "Many accounts need more than one factor.",
    "User notifications are a valuable control.",
    "Avoid storing unnecessary secrets or sensitive.",
    "Factor replacement should require appropriate proof."
  ]
};
