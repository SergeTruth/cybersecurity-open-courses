window.COURSE_MODULE = {
  "title": "Model Pipeline Design",
  "narration": "A staged pipeline uses inexpensive analysis to decide when deeper analysis is worth the cost. Motion or scene-change logic can create a candidate window. Object detection can identify configured categories and zones. Tracking or event rules group repeated detections across frames.\n\nSelected clips may then reach scene-description or vision-language models for richer summaries. This later stage should receive enough preceding and following context to avoid describing an isolated frame as a complete event.\n\nConfidence scoring and thresholds control how candidates advance. A low threshold improves sensitivity while increasing compute and false positives. Separate thresholds can be used for storage, routine review, and urgent alerting rather than forcing one decision point.\n\nMultiple stages can reduce cost and noise, but each stage can also discard a real event. Measure false positives and false negatives end to end. A strong final model cannot recover frames that an earlier trigger never selected.\n\nVersion models, prompts, rules, zones, and thresholds. Record the versions with each event so behavior can be explained after updates. Evaluate representative footage across cameras, lighting, weather, and common harmless activity.\n\nThe pipeline should communicate uncertainty and preserve human review. Model output is assistance, not proof of identity or intent. Design fallback behavior when a model is unavailable, queues are delayed, or compute is saturated, and make degraded analysis visible to operators.",
  "graphicAlt": "A staged pipeline selects, groups and analyzes candidates while evaluating missed events, false alerts and human review.",
  "narrationPoints": [
    "A staged pipeline uses inexpensive analysis to decide when deeper analysis is worth the cost.",
    "Selected clips may then reach scene-description or vision-language models for richer summaries.",
    "Confidence scoring and thresholds control how candidates advance.",
    "Multiple stages can reduce cost and noise, but each stage can also discard a real event."
  ]
};
