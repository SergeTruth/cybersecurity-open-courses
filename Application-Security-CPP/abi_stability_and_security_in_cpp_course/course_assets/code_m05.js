window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Memory Ownership, Allocators, and Runtime Mismatch to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Release library allocations through the creating library",
      "language": "cpp",
      "blurb": "The opaque blob carries no caller-side delete contract; the paired destroy function uses the same runtime that allocated it.",
      "code": "#include <cstddef>\n#include <memory>\n#include <new>\n\nstruct orders_blob { std::size_t size; std::unique_ptr<std::byte[]> bytes; };\n\nextern \"C\" orders_blob* orders_blob_create(std::size_t size) noexcept {\n    if (size > 1024 * 1024) return nullptr;\n    try {\n        auto blob = std::make_unique<orders_blob>();\n        blob->size = size;\n        blob->bytes = std::make_unique<std::byte[]>(size);\n        return blob.release();\n    } catch (...) {\n        return nullptr;\n    }\n}\n\nextern \"C\" void orders_blob_destroy(orders_blob* blob) noexcept {\n    delete blob;\n}\n"
    },
    {
      "title": "Make allocator callbacks an explicit ABI contract",
      "language": "cpp",
      "blurb": "A host allocator pair travels together and the plugin refuses incomplete callback sets before allocating.",
      "code": "#include <cstddef>\n#include <cstdint>\n\nstruct HostAllocatorV1 {\n    std::uint32_t size;\n    void* context;\n    void* (*allocate)(void*, std::size_t) noexcept;\n    void (*deallocate)(void*, void*) noexcept;\n};\n\nbool valid_allocator(const HostAllocatorV1& allocator) noexcept {\n    return allocator.size >= sizeof(HostAllocatorV1) &&\n           allocator.allocate != nullptr &&\n           allocator.deallocate != nullptr;\n}\n\nvoid* plugin_make_record(\n    const HostAllocatorV1& allocator, std::size_t bytes) noexcept {\n    if (!valid_allocator(allocator) || bytes == 0 || bytes > 4096) return nullptr;\n    return allocator.allocate(allocator.context, bytes);\n}\n"
    }
  ]
};
