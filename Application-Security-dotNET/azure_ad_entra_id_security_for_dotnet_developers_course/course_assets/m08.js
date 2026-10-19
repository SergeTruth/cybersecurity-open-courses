window.COURSE_MODULE = {
  "title": "Conditional Access, MFA, and Claims Challenges",
  "graphicAlt": "A downstream resource may challenge an already signed-in user, requiring a supported flow that respects tenant policy.",
  "narration": "Conditional Access and MFA can affect how users and workloads access protected resources. A .NET application may encounter claims challenges when a resource requires additional policy satisfaction, such as multi-factor authentication, device state, location policy, session control, or other tenant-defined requirements.\n\nWeb apps, web APIs, on-behalf-of flows, and Microsoft Graph calls can be affected differently by tenant policies. A user may sign in to the application successfully and still encounter a policy requirement when the application calls a downstream API. Developers should distinguish authentication failures, authorization failures, consent problems, and Conditional Access challenges.\n\nContinuous Access Evaluation and session controls may affect token lifetime and access behavior. Applications should handle policy-driven failures predictably and safely. That may involve prompting the user through a supported library flow, returning a clear API response, or recording an operational event for review.\n\nDo not hardcode assumptions that all tenants have the same Conditional Access behavior. Enterprise customers may have different MFA requirements, device policies, sign-in risk policies, network restrictions, and session controls. A robust .NET application treats tenant policy as part of the integration surface and avoids turning policy variance into confusing failures.",
  "narrationPoints": [
    "A .NET application may encounter claims challenges when a resource requires additional policy satisfaction.",
    "Conditional Access and MFA can affect how users and workloads access protected resources.",
    "Developers should distinguish authentication failures, authorization failures, consent problems, and Conditional Access challenges.",
    "Applications should handle policy-driven failures predictably and safely.",
    "A robust .NET application treats tenant policy as part of the integration surface and avoids turning policy variance into confusing failures."
  ]
};
