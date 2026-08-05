window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Give a polymorphic allocator a fixed buffer and a failing upstream resource so pool exhaustion is explicit and bounded.",
  codeExamples: [
    {
      title: "Build a bounded PMR workspace",
      language: "cpp",
      blurb: "The monotonic resource cannot allocate beyond its owned arena because the upstream resource always fails.",
      code: String.raw`#include <array>
#include <cstddef>
#include <memory_resource>
#include <vector>

class BoundedWorkspace {
public:
    BoundedWorkspace()
        : resource_(storage_.data(), storage_.size(),
                    std::pmr::null_memory_resource()),
          values_(&resource_) {}

    void append(std::byte value) { values_.push_back(value); }
    std::size_t size() const noexcept { return values_.size(); }

private:
    std::array<std::byte, 128> storage_{};
    std::pmr::monotonic_buffer_resource resource_;
    std::pmr::vector<std::byte> values_;
};`
    },
    {
      title: "Verify bounded pool exhaustion",
      language: "cpp",
      blurb: "Small workloads succeed, while continued growth throws bad_alloc rather than silently using the general heap.",
      code: String.raw`#include <new>

int test_bounded_workspace() {
    BoundedWorkspace workspace;
    for (int index = 0; index < 16; ++index) {
        workspace.append(std::byte{1});
    }
    if (workspace.size() != 16) return 1;
    try {
        for (int index = 0; index < 4096; ++index) {
            workspace.append(std::byte{2});
        }
    } catch (const std::bad_alloc&) {
        return 0;
    }
    return 2;
}`
    }
  ]
};
