window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Secure Django Template Rendering through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Render a server-owned Django template",
      "language": "python",
      "blurb": "The view selects a fixed template and supplies ordinary strings, relying on Django autoescaping rather than marking caller data safe.",
      "code": "from django.http import HttpRequest, HttpResponse\nfrom django.shortcuts import render\n\ndef account_view(request: HttpRequest) -> HttpResponse:\n    account = request.user.account\n    if account.tenant_id != request.user.tenant_id:\n        raise PermissionError(\"account tenant mismatch\")\n    return render(\n        request,\n        \"accounts/detail.html\",\n        {\"display_name\": account.display_name, \"status\": account.status},\n    )\n"
    },
    {
      "title": "Build trusted markup with Django format_html",
      "language": "python",
      "blurb": "Application-owned markup is combined with separately escaped values, avoiding mark_safe on a string that contains untrusted content.",
      "code": "from django.utils.html import format_html\n\ndef status_badge(label: str, state: str):\n    classes = {\"active\": \"badge-active\", \"disabled\": \"badge-disabled\"}\n    css_class = classes.get(state)\n    if css_class is None or not 1 <= len(label) <= 40:\n        raise ValueError(\"status badge input rejected\")\n    return format_html('<span class=\"{}\">{}</span>', css_class, label)\n"
    }
  ]
};
