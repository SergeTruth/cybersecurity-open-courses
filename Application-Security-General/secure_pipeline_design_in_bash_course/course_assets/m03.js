window.COURSE_MODULE = {
  "title": "Data Boundaries Between Pipeline Stages",
  "graphicAlt": "Upstream records pass field, count and format checks before reaching the next stage; missing data is handled separately.",
  "narration": "Every pipeline stage makes assumptions about the stage before it. A filter may assume lines are present. A parser may assume a delimiter. A summarizer may assume a column order. A deployment step may assume the previous command selected the right artifact. Those assumptions are where reliability and security meet.\n\nUpstream output can be empty, malformed, truncated, localized, reordered, or unexpectedly large. It may contain diagnostic text, duplicate records, missing fields, or values that look valid but do not mean what the next command expects. A pipeline that never checks those conditions can make confident decisions from weak evidence.\n\nText boundaries are especially important. Delimiters can appear inside values. Columns can shift when a tool version changes. Header rows can be added or removed. Empty fields can be meaningful. Human-readable output may be designed for people, not for stable automation.\n\nSecure pipeline design treats output from one command as input to another crossing a trust boundary. The boundary does not need to imply an attacker. It means the next stage should not blindly assume the previous stage produced exactly the expected shape of data.\n\nWhen decisions matter, validate the output. Check that required fields exist, counts are within expected ranges, and no-match conditions are handled deliberately. Keep diagnostic messages away from machine-readable data, and stop safely when the pipeline cannot support the next action.\n\nA good review question is: what must be true at this boundary for the next stage to be safe? If the answer is only in someone's head, document it or encode it in checks. That turns a brittle pipeline into a more trustworthy workflow.",
  "narrationPoints": [
    "Every pipeline stage makes assumptions about the stage before it.",
    "Upstream output can be empty, malformed, truncated, localized, reordered, or unexpectedly large.",
    "Columns can shift when a tool version changes.",
    "Secure pipeline design treats output from one command as input to another crossing a trust boundary.",
    "Check that required fields exist, counts are within expected ranges, and no-match conditions are handled deliberately.",
    "A good review question is: what must be true at this boundary for the next stage to be safe?"
  ]
};
