window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Testing, Logging, Monitoring, and Review with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Test cross-tenant mutation denial",
      "language": "python",
      "blurb": "The regression attempts an update with a valid object identifier under the wrong tenant and confirms no row changes.",
      "code": "def test_update_cannot_cross_tenant(session, repositories, tenant_a, tenant_b, account_a):\n    changed = repositories.accounts(tenant_b.id).update_profile(\n        account_id=account_a.id,\n        subject_id=\"member-b\",\n        changes={\"display_name\": \"changed\"},\n    )\n    session.expire_all()\n    assert changed is False\n    assert account_a.display_name != \"changed\"\n"
    },
    {
      "title": "Disable sensitive SQL parameter logging",
      "language": "python",
      "blurb": "Engine configuration keeps statement telemetry available while preventing bound credential and personal-data values from entering logs.",
      "code": "from sqlalchemy import create_engine\n\ndef production_engine(database_url: str):\n    return create_engine(\n        database_url,\n        echo=False,\n        hide_parameters=True,\n        pool_pre_ping=True,\n        pool_recycle=900,\n    )\n"
    }
  ]
};
