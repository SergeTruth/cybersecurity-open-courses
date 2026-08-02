window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Connection Pools, Timeouts, and Retry Safety through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Acquire pooled connections with query deadlines",
      "language": "python",
      "blurb": "Pool acquisition, transaction scope, and statement execution all have explicit bounds, and the context manager always returns the connection.",
      "code": "from contextlib import contextmanager\n\n@contextmanager\ndef bounded_transaction(pool):\n    with pool.connection(timeout=2.0) as connection:\n        with connection.transaction():\n            connection.execute(\"set local statement_timeout = '2000ms'\")\n            connection.execute(\"set local lock_timeout = '500ms'\")\n            yield connection\n\ndef load_order(pool, order_id: str):\n    with bounded_transaction(pool) as connection:\n        return connection.execute(\n            \"select id, status, total_cents from orders where id = %s\",\n            (order_id,),\n        ).fetchone()\n"
    },
    {
      "title": "Retry an idempotent read only for known transient failures",
      "language": "python",
      "blurb": "The bounded read retry checks psycopg SQLSTATE against a finite connection-capacity and server-restart set, so authentication, TLS, configuration, and permission failures fail immediately.",
      "code": "from time import sleep\nfrom psycopg import OperationalError\n\nTRANSIENT_DATABASE_STATES = {\n    \"08001\", \"08003\", \"08006\", \"08007\",\n    \"53300\", \"57P01\", \"57P02\", \"57P03\",\n}\n\ndef read_with_bounded_retry(pool, order_id: str):\n    delays = (0.05, 0.15, 0.35)\n    for attempt, delay in enumerate(delays, start=1):\n        try:\n            with pool.connection(timeout=1.0) as connection:\n                return connection.execute(\n                    \"select status from orders where id = %s\",\n                    (order_id,),\n                ).fetchone()\n        except OperationalError as error:\n            if error.sqlstate not in TRANSIENT_DATABASE_STATES or attempt == len(delays):\n                raise\n            sleep(delay)\n    raise AssertionError(\"retry loop exhausted unexpectedly\")\n"
    }
  ]
};
