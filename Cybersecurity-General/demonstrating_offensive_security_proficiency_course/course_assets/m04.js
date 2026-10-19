window.COURSE_MODULE = {
  "id": "m04",
  "title": "Writing Technical Blogs That Demonstrate Real Understanding",
  "type": "lesson",
  "narration": "A technical blog can be strong evidence when it reveals how you think. The weakest version of a security post says only that something is vulnerable. A better post explains the system model, the trust boundary, the expected behavior, the observed behavior, the impact, and the reasoning that connects those pieces. The reader should come away understanding the class of weakness, not merely the fact that you reached an interesting result.\n\nBegin with context. Describe the application pattern, protocol, library behavior, or configuration mistake at a level that helps a working engineer follow the issue. Avoid assuming that every reader knows the background, but do not bury the main point under a textbook. A concise threat model is often enough: who can send input, what authority the component has, what data is at risk, and what security decision is being made.\n\nThe evidence section should be careful and safe. Use a lab, sanitized example, or authorized target summary. Show enough detail to prove the observation, but remove secrets, customer data, private endpoints, and steps that would make abuse easy. When a screenshot is useful, explain what it proves. Screenshots alone rarely demonstrate understanding. The best posts pair visual evidence with plain reasoning, test conditions, and a clear boundary around what was not shown.\n\nRemediation is where many posts become more professional. Do not stop at \"validate input\" or \"use least privilege.\" Explain what validation must decide, where the check belongs, what should happen on failure, and how the organization can verify the fix. If multiple remediations are possible, compare tradeoffs. For example, a short-term configuration change might reduce exposure, while a longer-term design change removes the risky trust assumption.\n\nA good blog also protects credibility by naming uncertainty. Maybe the test used one product version. Maybe the impact depends on a deployment pattern. Maybe a vendor fixed the issue after coordinated disclosure. State those facts plainly. Technical writing is not a victory lap. It is a durable artifact that shows judgment, communication, evidence handling, and a habit of making security knowledge useful to others.\n\nBefore publishing, read the post as if you were the maintainer receiving it. Check whether the explanation is fair, whether the evidence is bounded, whether the recommended fix is actionable, and whether the public details are necessary. That review step turns a post from \"look what I found\" into \"here is knowledge others can safely use.",
  "narrationPoints": [
    "A strong blog reveals reasoning, not only results.",
    "Context should explain the system model and trust boundary.",
    "Safe evidence uses labs, sanitized examples, or authorized summaries.",
    "Screenshots need interpretation and test conditions.",
    "Remediation should explain where controls belong and why.",
    "Tradeoffs and uncertainty make the post more credible.",
    "Technical writing turns private skill into public evidence."
  ],
  "graphic": "course_assets/m04.png",
  "graphicAlt": "A technical explanation connects the system boundary and observed behavior to sanitized evidence, remediation and uncertainty.",
  "codeExamples": []
};
