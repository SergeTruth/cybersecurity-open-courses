window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Apply resource budgets before broker work so a sandboxed process cannot convert valid requests into unbounded host consumption.",
  codeExamples: [
    {
      title: "Consume a multidimensional request budget",
      language: "cpp",
      blurb: "CPU units, output bytes, and opened handles are checked independently with subtraction-based arithmetic.",
      code: String.raw`#include <cstddef>

struct ResourceRequest {
    std::size_t cpu_units;
    std::size_t output_bytes;
    std::size_t handles;
};

class SandboxBudget {
public:
    SandboxBudget(std::size_t cpu, std::size_t bytes, std::size_t handles)
        : cpu_(cpu), bytes_(bytes), handles_(handles) {}

    bool consume(const ResourceRequest& request) noexcept {
        if (request.cpu_units > cpu_ || request.output_bytes > bytes_ ||
            request.handles > handles_) return false;
        cpu_ -= request.cpu_units;
        bytes_ -= request.output_bytes;
        handles_ -= request.handles;
        return true;
    }

private:
    std::size_t cpu_;
    std::size_t bytes_;
    std::size_t handles_;
};`
    },
    {
      title: "Verify independent resource exhaustion",
      language: "cpp",
      blurb: "A valid request consumes its exact budget, and later requests fail when any one dimension exceeds what remains.",
      code: String.raw`int test_sandbox_budget() {
    SandboxBudget budget{10, 1024, 2};
    if (!budget.consume({4, 512, 1})) return 1;
    if (budget.consume({7, 1, 0})) return 2;
    if (budget.consume({1, 513, 0})) return 3;
    if (!budget.consume({6, 512, 1})) return 4;
    return budget.consume({0, 0, 1}) ? 5 : 0;
}`
    }
  ]
};
