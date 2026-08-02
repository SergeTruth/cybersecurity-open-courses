window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply APIs, JavaScript, JSON, and Frontend Integration through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Embed JSON with Django's json_script helper",
      "language": "python",
      "blurb": "The framework serializes data into a non-executable JSON script element with safe escaping, avoiding direct interpolation into JavaScript source.",
      "code": "from django.utils.html import json_script\n\ndef account_bootstrap_data(account) -> str:\n    document = {\n        \"id\": str(account.public_id),\n        \"displayName\": account.display_name,\n        \"features\": sorted(account.public_features),\n    }\n    return json_script(document, element_id=\"account-data\")\n"
    },
    {
      "title": "Return a JSON API response without HTML assembly",
      "language": "python",
      "blurb": "The framework owns serialization and media type, while the response projection excludes pre-rendered HTML and fields the frontend does not need.",
      "code": "from flask import jsonify\n\ndef public_account_response(account):\n    return jsonify(\n        {\n            \"id\": str(account.public_id),\n            \"display_name\": account.display_name,\n            \"status\": account.status,\n        }\n    )\n"
    }
  ]
};
