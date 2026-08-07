window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Secure Client Socket Behavior through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Connect and send a framed TCP message with deadlines",
      "language": "python",
      "blurb": "The client uses a bounded connection attempt, retains an I/O timeout, and sends a complete application frame rather than assuming one send writes everything.",
      "code": "import socket\nimport struct\n\nclass SocketClientError(RuntimeError):\n    pass\n\ndef send_command(payload: bytes) -> None:\n    if not isinstance(payload, bytes) or not 1 <= len(payload) <= 16_384:\n        raise ValueError(\"command size rejected\")\n    frame = struct.pack(\"!I\", len(payload)) + payload\n    try:\n        with socket.create_connection((\"commands.internal.example\", 7443), timeout=3.0) as sock:\n            sock.settimeout(5.0)\n            sock.sendall(frame)\n    except OSError:\n        raise SocketClientError(\"command socket unavailable\") from None\n"
    },
    {
      "title": "Resolve only approved service addresses",
      "language": "python",
      "blurb": "Every DNS result must fall within the service network and use a stream socket before the client attempts a connection, limiting name-resolution surprises.",
      "code": "import ipaddress\nimport socket\n\nSERVICE_NETWORK = ipaddress.ip_network(\"10.24.0.0/16\")\n\ndef approved_service_addresses(hostname: str, port: int) -> tuple[tuple, ...]:\n    if hostname != \"worker.internal.example\" or port != 7443:\n        raise ValueError(\"service destination rejected\")\n    try:\n        results = socket.getaddrinfo(hostname, port, type=socket.SOCK_STREAM)\n    except OSError:\n        raise ConnectionError(\"service resolution failed\") from None\n    approved = []\n    for family, socktype, protocol, _name, address in results:\n        if socktype != socket.SOCK_STREAM or protocol not in {0, socket.IPPROTO_TCP}:\n            raise ValueError(\"resolved socket type rejected\")\n        try:\n            resolved = ipaddress.ip_address(address[0])\n        except ValueError:\n            raise ValueError(\"resolved address rejected\") from None\n        if resolved not in SERVICE_NETWORK:\n            raise ValueError(\"resolved address left the service network\")\n        approved.append((family, socktype, protocol, address))\n    if not approved:\n        raise ConnectionError(\"service produced no approved addresses\")\n    return tuple(approved)\n"
    }
  ]
};
