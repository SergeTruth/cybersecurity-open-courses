window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Secure Server Socket Behavior through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Bind a private TCP listener with a finite backlog",
      "language": "python",
      "blurb": "The server binds an application-owned private address, sets intentional socket options, limits queued connections, and applies a deadline to accepted clients.",
      "code": "import socket\n\ndef open_private_listener() -> socket.socket:\n    listener = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n    try:\n        listener.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)\n        listener.bind((\"10.24.8.10\", 7443))\n        listener.listen(64)\n        listener.settimeout(1.0)\n        return listener\n    except BaseException:\n        listener.close()\n        raise\n\ndef accept_bounded_client(listener: socket.socket) -> socket.socket:\n    client, _peer = listener.accept()\n    client.settimeout(5.0)\n    return client\n"
    },
    {
      "title": "Limit concurrent connection handlers",
      "language": "python",
      "blurb": "A bounded executor caps active work, and a rejected submission closes the accepted socket instead of accumulating unbounded threads or descriptors.",
      "code": "import socket\nfrom concurrent.futures import ThreadPoolExecutor\nfrom threading import BoundedSemaphore\n\nHANDLERS = ThreadPoolExecutor(max_workers=32, thread_name_prefix=\"socket-client\")\nHANDLER_SLOTS = BoundedSemaphore(32)\n\ndef dispatch_client(client: socket.socket, handle) -> None:\n    if not HANDLER_SLOTS.acquire(blocking=False):\n        client.close()\n        raise RuntimeError(\"socket handler capacity exhausted\")\n    try:\n        future = HANDLERS.submit(handle, client)\n    except BaseException:\n        HANDLER_SLOTS.release()\n        client.close()\n        raise\n    def complete(_future) -> None:\n        client.close()\n        HANDLER_SLOTS.release()\n    future.add_done_callback(complete)\n"
    }
  ]
};
