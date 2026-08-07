window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply TCP, UDP, and Data Framing through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Receive one length-prefixed TCP frame",
      "language": "python",
      "blurb": "The receiver distinguishes stream chunks from messages, reads exactly four header bytes, bounds the declared frame, and treats early EOF as a protocol error.",
      "code": "import socket\nimport struct\n\nMAX_FRAME_BYTES = 64 * 1024\n\ndef receive_exact(sock: socket.socket, length: int) -> bytes:\n    if type(length) is not int or not 1 <= length <= MAX_FRAME_BYTES:\n        raise ValueError(\"receive length rejected\")\n    output = bytearray()\n    while len(output) < length:\n        chunk = sock.recv(length - len(output))\n        if not chunk:\n            raise ConnectionError(\"peer closed within a frame\")\n        output.extend(chunk)\n    return bytes(output)\n\ndef receive_frame(sock: socket.socket) -> bytes:\n    (length,) = struct.unpack(\"!I\", receive_exact(sock, 4))\n    if not 1 <= length <= MAX_FRAME_BYTES:\n        raise ValueError(\"frame length rejected\")\n    return receive_exact(sock, length)\n"
    },
    {
      "title": "Reject a truncated UDP datagram",
      "language": "python",
      "blurb": "recvmsg exposes truncation where available; the portable fallback reads one extra byte so oversized datagrams are rejected instead of treating a prefix as a valid message.",
      "code": "import socket\n\nMAX_UDP_PAYLOAD_BYTES = 65_507\n\ndef receive_datagram(sock: socket.socket, maximum: int = 4096) -> tuple[bytes, tuple[str, int]]:\n    if type(maximum) is not int or not 1 <= maximum <= MAX_UDP_PAYLOAD_BYTES:\n        raise ValueError(\"UDP receive limit rejected\")\n    if hasattr(sock, \"recvmsg\"):\n        payload, _ancillary, flags, peer = sock.recvmsg(maximum)\n        if flags & getattr(socket, \"MSG_TRUNC\", 0):\n            raise ValueError(\"truncated UDP datagram rejected\")\n    else:\n        payload, peer = sock.recvfrom(maximum + 1)\n        if len(payload) > maximum:\n            raise ValueError(\"oversized UDP datagram rejected\")\n    if not payload:\n        raise ValueError(\"empty UDP datagram rejected\")\n    if not isinstance(peer, tuple) or len(peer) < 2:\n        raise ValueError(\"UDP peer rejected\")\n    host, port = peer[:2]\n    if not isinstance(host, str) or type(port) is not int or not 1 <= port <= 65535:\n        raise ValueError(\"UDP peer rejected\")\n    return payload, (host, port)\n"
    }
  ]
};
