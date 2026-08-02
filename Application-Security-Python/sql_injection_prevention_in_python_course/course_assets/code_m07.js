window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Error Handling, Logging, and Data Exposure through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Translate explicit driver errors into opaque failures",
      "language": "python",
      "blurb": "The boundary catches psycopg's imported database exception, rolls back, logs only a stable query identifier and exception class, and returns no SQL text or values to users.",
      "code": "from psycopg import DatabaseError\n\nclass OrderLookupFailed(RuntimeError):\n    pass\n\ndef load_order_safely(connection, logger, order_id: str):\n    try:\n        return connection.execute(\n            \"select id, status from orders where id = %s\",\n            (order_id,),\n        ).fetchone()\n    except DatabaseError as error:\n        connection.rollback()\n        logger.error(\n            \"database_operation_failed\",\n            extra={\"query_id\": \"load_order_v2\", \"driver_error\": type(error).__name__},\n        )\n        raise OrderLookupFailed(\"order lookup unavailable\") from None\n"
    },
    {
      "title": "Project only fields the caller may receive",
      "language": "python",
      "blurb": "The query names permitted columns instead of selecting an entire row that might later expose credentials, notes, or authorization metadata.",
      "code": "def public_account(connection, tenant_id: str, account_id: str) -> dict[str, object] | None:\n    cursor = connection.execute(\n        \"select public_id, display_name, created_at from accounts where tenant_id = %s and public_id = %s\",\n        (tenant_id, account_id),\n    )\n    row = cursor.fetchone()\n    if row is None:\n        return None\n    public_id, display_name, created_at = row\n    return {\"id\": public_id, \"display_name\": display_name, \"created_at\": created_at.isoformat()}\n"
    }
  ]
};
