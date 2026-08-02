window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Authorization-Aware ORM Access with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Enforce tenant and object authorization in one repository query",
      "language": "python",
      "blurb": "The protected read includes tenant, object, owner, and lifecycle constraints so a caller cannot fetch then forget to authorize.",
      "code": "from sqlalchemy import select\n\ndef authorized_document(session, Document, *, tenant_id: str, subject_id: str, document_id: str):\n    statement = select(Document).where(\n        Document.id == document_id,\n        Document.tenant_id == tenant_id,\n        Document.owner_id == subject_id,\n        Document.deleted_at.is_(None),\n    )\n    return session.scalar(statement)\n"
    },
    {
      "title": "Scope list queries before pagination",
      "language": "python",
      "blurb": "Authorization predicates are applied in SQL before limits and offsets, preventing unauthorized rows from affecting pages or counts.",
      "code": "from sqlalchemy import select\n\ndef visible_projects(session, Project, Membership, tenant_id: str, subject_id: str, after_id: str | None):\n    statement = (\n        select(Project)\n        .join(Membership, Membership.project_id == Project.id)\n        .where(Project.tenant_id == tenant_id, Membership.subject_id == subject_id)\n        .order_by(Project.id)\n        .limit(51)\n    )\n    if after_id is not None:\n        statement = statement.where(Project.id > after_id)\n    return list(session.scalars(statement))\n"
    }
  ]
};
