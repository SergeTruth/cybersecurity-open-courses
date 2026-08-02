window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Testing, Logging, Monitoring, and Incident Response through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Record database connection outcomes without secrets",
      "language": "python",
      "blurb": "Telemetry uses finite event categories and application-owned endpoint identifiers, avoiding passwords, DSNs, SQL values, and raw exception text.",
      "code": "DATABASE_EVENTS = {\"connected\", \"timeout\", \"certificate_rejected\", \"pool_exhausted\"}\n\ndef record_database_event(logger, metrics, event: str, elapsed_ms: int) -> None:\n    category = event if event in DATABASE_EVENTS else \"other\"\n    bounded_elapsed = min(max(elapsed_ms, 0), 30_000)\n    logger.info(\n        \"database_connection_event\",\n        extra={\"endpoint_id\": \"orders-primary\", \"event\": category, \"elapsed_ms\": bounded_elapsed},\n    )\n    metrics.increment(\"database_connections\", tags={\"endpoint\": \"orders-primary\", \"event\": category})\n"
    },
    {
      "title": "Probe pool health with a bounded acquisition",
      "language": "python",
      "blurb": "The health check distinguishes pool exhaustion from query failure while keeping diagnostic output independent of credentials and connection strings.",
      "code": "from dataclasses import dataclass\nfrom time import monotonic\nfrom psycopg import OperationalError\nfrom psycopg_pool import PoolTimeout\n\n@dataclass(frozen=True)\nclass DatabaseHealth:\n    healthy: bool\n    category: str\n    elapsed_ms: int\n\ndef check_database_health(pool) -> DatabaseHealth:\n    started = monotonic()\n    try:\n        with pool.connection(timeout=0.5) as connection:\n            healthy = connection.execute(\"select 1\").fetchone() == (1,)\n        category = \"ready\" if healthy else \"unexpected_result\"\n    except PoolTimeout:\n        healthy, category = False, \"pool_timeout\"\n    except OperationalError:\n        healthy, category = False, \"connection_failure\"\n    return DatabaseHealth(healthy, category, min(int((monotonic() - started) * 1000), 10_000))\n"
    }
  ]
};
