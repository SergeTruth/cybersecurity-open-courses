window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Dynamic Filters, Sorting, and Search with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Map sort choices to model attributes",
      "language": "python",
      "blurb": "The API accepts friendly sort tokens but only reviewed ORM expressions can become ORDER BY structure.",
      "code": "from sqlalchemy import asc, desc\n\ndef order_expression(Account, requested: str):\n    choices = {\n        \"name\": asc(Account.display_name),\n        \"-name\": desc(Account.display_name),\n        \"created\": asc(Account.created_at),\n        \"-created\": desc(Account.created_at),\n    }\n    try:\n        return choices[requested]\n    except KeyError:\n        raise ValueError(\"sort field is not supported\") from None\n"
    },
    {
      "title": "Build filters from an explicit search model",
      "language": "python",
      "blurb": "Only two documented fields can influence the query, and each receives type and size validation before expression construction.",
      "code": "from dataclasses import dataclass\nfrom sqlalchemy import select\n\n@dataclass(frozen=True)\nclass AccountSearch:\n    state: str | None = None\n    prefix: str | None = None\n\ndef search_accounts(Account, tenant_id: str, search: AccountSearch):\n    statement = select(Account).where(Account.tenant_id == tenant_id)\n    if search.state is not None:\n        if search.state not in {\"active\", \"disabled\"}: raise ValueError(\"invalid state\")\n        statement = statement.where(Account.state == search.state)\n    if search.prefix is not None:\n        if not 1 <= len(search.prefix) <= 40: raise ValueError(\"invalid prefix\")\n        statement = statement.where(Account.display_name.startswith(search.prefix))\n    return statement.limit(100)\n"
    }
  ]
};
