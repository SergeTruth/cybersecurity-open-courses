window.COURSE_MODULE = {
  "title": "Encoding, Unicode, and Normalization",
  "graphicAlt": "Checked encoding conversion and field-specific normalization policy precede consistent security-sensitive text comparison.",
  "narration": "Modern string security is not only about buffer safety. Encoding determines what bytes mean. If one component treats data as UTF-8, another treats it as a local code page, and another treats it as arbitrary bytes, comparisons and validation can become inconsistent.\n\nUnicode adds another layer. Text that appears similar to a person may have different underlying representations. Some characters can be represented in composed or decomposed forms. Some scripts contain characters that look alike but are not the same. These facts matter when strings are used as identifiers, user names, file names, policy values, or security labels.\n\nNormalization can make comparisons more predictable by converting text into a chosen canonical form. That does not mean every string should always be normalized the same way. It means the application should define which fields require canonical comparison and which form is expected before the comparison happens.\n\nCase conversion and locale also need attention. Rules that seem obvious in simple ASCII examples may not hold for all languages or platforms. Security-sensitive comparison should avoid accidental dependence on the current process locale unless that is part of the design.\n\nThe practical guidance is to choose expected encodings, validate conversions, normalize before security-sensitive comparison where appropriate, and document the canonical form. Avoid making security decisions on inconsistent representations.",
  "narrationPoints": [
    "If one component treats data as UTF-8, another treats it as a local code page, and another treats it as arbitrary bytes, comparisons and validation can become inconsistent.",
    "Modern string security is not only about buffer safety.",
    "Text that appears similar to a person may have different underlying representations.",
    "The application should define which fields require canonical comparison and which form is expected before the comparison happens.",
    "Security-sensitive comparison should avoid accidental dependence on the current process locale unless that is part of the design.",
    "The practical guidance is to choose expected encodings, validate conversions, normalize before security-sensitive comparison where appropriate, and document the canonical form."
  ]
};
