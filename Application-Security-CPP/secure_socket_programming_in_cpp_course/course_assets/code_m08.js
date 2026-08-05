window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Connection admission and queued bytes are governed by one synchronized resource budget.",
  "codeExamples": [
    {
      "title": "Reserve bounded network capacity with RAII leases",
      "language": "cpp",
      "blurb": "Only the synchronized budget can create a lease, so every destructor corresponds to a successful reservation.",
      "code": "#include <cstddef>\n#include <memory>\n#include <mutex>\n#include <optional>\n#include <utility>\n\nstruct NetworkBudgetState {\n    std::mutex mutex;\n    std::size_t connections = 0;\n    std::size_t queued_bytes = 0;\n};\n\nclass ConnectionLease {\npublic:\n    ConnectionLease(const ConnectionLease&) = delete;\n    ConnectionLease& operator=(const ConnectionLease&) = delete;\n    ConnectionLease(ConnectionLease&&) noexcept = default;\n    ~ConnectionLease() {\n        if (!state_) return;\n        std::lock_guard lock(state_->mutex);\n        --state_->connections;\n        state_->queued_bytes -= bytes_;\n    }\nprivate:\n    friend class NetworkBudget;\n    ConnectionLease(\n        std::shared_ptr<NetworkBudgetState> state,\n        std::size_t bytes\n    ) noexcept : state_(std::move(state)), bytes_(bytes) {}\n    std::shared_ptr<NetworkBudgetState> state_;\n    std::size_t bytes_;\n};\n\nclass NetworkBudget {\npublic:\n    NetworkBudget(std::size_t max_connections, std::size_t max_bytes)\n        : max_connections_(max_connections), max_bytes_(max_bytes),\n          state_(std::make_shared<NetworkBudgetState>()) {}\n    std::optional<ConnectionLease> acquire(std::size_t bytes) {\n        std::lock_guard lock(state_->mutex);\n        if (bytes > max_bytes_ ||\n            state_->connections >= max_connections_ ||\n            state_->queued_bytes > max_bytes_ - bytes) {\n            return std::nullopt;\n        }\n        ++state_->connections;\n        state_->queued_bytes += bytes;\n        return ConnectionLease(state_, bytes);\n    }\nprivate:\n    std::size_t max_connections_;\n    std::size_t max_bytes_;\n    std::shared_ptr<NetworkBudgetState> state_;\n};\n"
    },
    {
      "title": "Reject connection and queue exhaustion",
      "language": "cpp",
      "blurb": "The regression proves callers cannot forge leases, exercises both limits, and confirms capacity returns after destruction.",
      "code": "#include <type_traits>\n\nstatic_assert(!std::is_constructible_v<\n    ConnectionLease,\n    std::shared_ptr<NetworkBudgetState>,\n    std::size_t\n>);\n\nint main() {\n    NetworkBudget budget(1, 1024);\n    {\n        auto lease = budget.acquire(1000);\n        if (!lease) return 1;\n        if (budget.acquire(1)) return 2;\n    }\n    if (!budget.acquire(1024)) return 3;\n    if (budget.acquire(1025)) return 4;\n    return 0;\n}\n"
    }
  ]
};
