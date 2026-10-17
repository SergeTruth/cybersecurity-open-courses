window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The adapter immediately captures the raw result and never manufactures a second owner.",
  "codeExamples": [
    {
      "title": "Adopt a legacy allocation once",
      "language": "cpp",
      "blurb": "The adapter immediately captures the raw result and never manufactures a second owner.",
      "code": "#include <utility>\n#include <cstddef>\n#include <memory>\n\nstruct LegacyPacket { std::size_t size; };\nLegacyPacket* legacy_create(std::size_t size) { return size <= 1024 ? new LegacyPacket{size} : nullptr; }\nvoid legacy_destroy(LegacyPacket* packet) noexcept { delete packet; }\n\nusing PacketOwner = std::unique_ptr<LegacyPacket, void (*)(LegacyPacket*) noexcept>;\n\nPacketOwner make_packet(std::size_t size) {\n    return PacketOwner{legacy_create(size), legacy_destroy};\n}\n\nint main() {\n    if (make_packet(4096)) return 1;\n    auto packet = make_packet(128);\n    if (!packet || packet->size != 128) return 2;\n    auto moved = std::move(packet);\n    return !packet && moved ? 0 : 3;\n}\n"
    }
  ]
};
