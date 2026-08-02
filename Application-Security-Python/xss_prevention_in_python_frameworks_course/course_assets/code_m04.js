window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Template Safety in Django, Flask, and FastAPI through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Rely on Django autoescaping for ordinary values",
      "language": "python",
      "blurb": "The view renders a fixed server template and passes an untrusted display name as data, with no mark_safe or manual HTML concatenation.",
      "code": "from django.shortcuts import render\n\ndef django_profile(request):\n    profile = request.user.profile\n    return render(\n        request,\n        \"profiles/detail.html\",\n        {\"display_name\": profile.display_name, \"biography\": profile.biography},\n    )\n"
    },
    {
      "title": "Configure Flask and Jinja for HTML autoescaping",
      "language": "python",
      "blurb": "The route chooses a server-owned template, enables strict missing-variable handling, and leaves untrusted values as ordinary strings for contextual escaping.",
      "code": "from flask import Flask, render_template\nfrom flask_login import current_user\nfrom jinja2 import StrictUndefined\n\napp = Flask(__name__)\napp.jinja_env.undefined = StrictUndefined\napp.jinja_env.autoescape = True\n\n@app.get(\"/welcome\")\ndef welcome():\n    return render_template(\"welcome.html\", display_name=current_user.display_name)\n"
    }
  ]
};
