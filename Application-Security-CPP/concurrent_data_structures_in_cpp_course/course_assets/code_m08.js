window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Memory Reclamation and Lifetime Hazards to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Reclaim replaced state through shared ownership",
      "language": "cpp",
      "blurb": "Readers obtain an owning snapshot atomically, so removing the current pointer cannot destroy an object still being observed.",
      "code": "#include <atomic>\n#include <memory>\n\nstruct RoutingTable { int generation; };\nstd::atomic<std::shared_ptr<const RoutingTable>> routes;\n\nstd::shared_ptr<const RoutingTable> read_routes() {\n    return routes.load(std::memory_order_acquire);\n}\n\nvoid replace_routes(int generation) {\n    routes.store(\n        std::make_shared<const RoutingTable>(RoutingTable{generation}),\n        std::memory_order_release);\n}\n"
    },
    {
      "title": "Delay destruction until every worker reaches quiescence",
      "language": "cpp",
      "blurb": "Each std::jthread owns an immutable snapshot and automatically requests stop and joins, including when a later thread construction throws.",
      "code": "#include <cstddef>\n#include <memory>\n#include <stdexcept>\n#include <thread>\n#include <vector>\n\nclass ReaderGroup {\n    std::shared_ptr<const int> state_ = std::make_shared<const int>(7);\n    std::vector<std::jthread> readers_;\npublic:\n    explicit ReaderGroup(std::size_t count) {\n        if (count == 0 || count > 64) {\n            throw std::invalid_argument(\"reader count outside policy\");\n        }\n        readers_.reserve(count);\n        for (std::size_t index = 0; index < count; ++index) {\n            auto snapshot = state_;\n            readers_.emplace_back(\n                [snapshot](std::stop_token stop) {\n                    while (!stop.stop_requested()) {\n                        volatile int observed = *snapshot;\n                        (void)observed;\n                    }\n                });\n        }\n    }\n    ReaderGroup(const ReaderGroup&) = delete;\n    ReaderGroup& operator=(const ReaderGroup&) = delete;\n};\n"
    }
  ]
};
