window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Parsing, Validation, and Resource Limits through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Parse a bounded line protocol incrementally",
      "language": "python",
      "blurb": "The parser waits for a delimiter across TCP chunks, caps buffered bytes, decodes strict UTF-8, and validates the complete command grammar.",
      "code": "import re\nimport socket\n\nCOMMAND = re.compile(r\"(?:PING|GET [A-Za-z0-9_-]{1,40})\")\n\ndef receive_command(sock: socket.socket) -> str:\n    buffer = bytearray()\n    while b\"\\n\" not in buffer:\n        chunk = sock.recv(1024)\n        if not chunk:\n            raise ConnectionError(\"peer closed before command delimiter\")\n        buffer.extend(chunk)\n        if len(buffer) > 4096:\n            raise ValueError(\"command exceeded its byte limit\")\n    line, separator, remainder = buffer.partition(b\"\\n\")\n    if remainder or separator != b\"\\n\":\n        raise ValueError(\"multiple commands per connection rejected\")\n    try:\n        command = line.decode(\"utf-8\", \"strict\")\n    except UnicodeDecodeError:\n        raise ValueError(\"command encoding rejected\") from None\n    if COMMAND.fullmatch(command) is None:\n        raise ValueError(\"command grammar rejected\")\n    return command\n"
    },
    {
      "title": "Receive and process at most twenty bounded frames",
      "language": "python",
      "blurb": "The self-contained handler reads exact length-prefixed frames, bounds each frame and aggregate work, validates replies, processes at most twenty messages, and closes the connection on every exit.",
      "code": "import socket\nimport struct\n\nMAX_FRAME_BYTES = 64 * 1024\n\ndef receive_exact(sock: socket.socket, length: int) -> bytes:\n    if type(length) is not int or not 1 <= length <= MAX_FRAME_BYTES:\n        raise ValueError(\"receive length rejected\")\n    output = bytearray()\n    while len(output) < length:\n        chunk = sock.recv(length - len(output))\n        if not chunk:\n            raise ConnectionError(\"peer closed within a frame\")\n        output.extend(chunk)\n    return bytes(output)\n\ndef receive_frame(sock: socket.socket) -> bytes:\n    (length,) = struct.unpack(\"!I\", receive_exact(sock, 4))\n    if not 1 <= length <= MAX_FRAME_BYTES:\n        raise ValueError(\"frame length rejected\")\n    return receive_exact(sock, length)\n\ndef handle_connection(sock: socket.socket, process_frame) -> None:\n    sock.settimeout(5.0)\n    total = 0\n    try:\n        for _ in range(20):\n            frame = receive_frame(sock)\n            total += len(frame)\n            if total > 256 * 1024:\n                raise ValueError(\"connection byte budget exceeded\")\n            reply = process_frame(frame)\n            if not isinstance(reply, bytes) or len(reply) > 16_384:\n                raise ValueError(\"reply contract rejected\")\n            sock.sendall(len(reply).to_bytes(4, \"big\") + reply)\n    finally:\n        try:\n            sock.shutdown(socket.SHUT_WR)\n        except Exception:\n            pass\n        try:\n            sock.close()\n        except Exception:\n            pass\n"
    }
  ]
};
