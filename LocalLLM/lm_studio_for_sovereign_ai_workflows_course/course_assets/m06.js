window.COURSE_MODULE = {
  "title": "Sovereign Data Boundaries and Privacy",
  "graphicAlt": "Draft visual summary for Sovereign Data Boundaries and Privacy",
  "narration": "Local inference can reduce dependence on external model services, but privacy still requires design. Data boundaries include more than the prompt box. Files, attachments, chat histories, local logs, screenshots, exports, backups, shared folders, and connected tools can all carry information from the workflow.\n\nBefore a workflow is repeated, classify the data. Public information, internal notes, project-confidential material, personal data, customer data, regulated data, and sensitive operational details may require different handling. Some data may be fine for a local session. Other data may need redaction, approval, or a different workflow entirely.\n\nDo not assume every local workflow is safe for every dataset. A model session may be local, but the output may be copied into email, documents, source control, tickets, or chat. Backups may sync files. Logs may preserve prompts or response fragments. A useful boundary follows the data after the model response is generated.\n\nRetention choices matter. Decide which prompts, outputs, settings, and exported files should be kept. Remove temporary material when it is no longer useful. Keep important records only where they belong and where access is appropriate.\n\nPrivacy is both technical and behavioral. Device security, file permissions, workspace separation, redaction habits, cautious sharing, and clear review rules all support sovereign AI. The safest local workflow is explicit about what data enters, what leaves, and what remains stored. When the boundary is unclear, pause and decide before adding more files or automation.",
  "narrationPoints": [
    "Local inference can reduce dependence on external model services, but privacy still requires design.",
    "Before a workflow is repeated, classify the data.",
    "Do not assume every local workflow is safe for every dataset.",
    "Retention choices matter.",
    "Privacy is both technical and behavioral."
  ]
};
