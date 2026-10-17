window.COURSE_CODE_MODULE = {
  "title": "Code Example and Regression",
  "codeIntro": "The iterative traversal caps both node count and pending work before growing dynamic storage.",
  "codeExamples": [
    {
      "title": "Replace recursive depth with an explicit limit",
      "language": "cpp",
      "blurb": "The iterative graph traversal counts each reachable node once, including cycles and shared descendants. Fixed-capacity traversal storage and per-node edge limits bound work to at most 128 nodes and 16,384 edges.",
      "code": "#include <array>\n#include <cstddef>\n#include <optional>\n#include <vector>\n\nstruct Node { std::vector<std::size_t> children; };\n\nstd::optional<std::size_t> count_reachable(const std::vector<Node>& graph, std::size_t root) {\n    constexpr std::size_t maximum_nodes = 128;\n    if (root >= graph.size() || graph.size() > maximum_nodes) return std::nullopt;\n    std::array<bool, maximum_nodes> discovered{};\n    std::array<std::size_t, maximum_nodes> pending{};\n    std::size_t pending_count = 1;\n    pending[0] = root;\n    discovered[root] = true;\n    std::size_t visited = 0;\n    while (pending_count != 0) {\n        const auto index = pending[--pending_count];\n        ++visited;\n        const auto& children = graph[index].children;\n        if (children.size() > maximum_nodes) return std::nullopt;\n        for (const auto child : children) {\n            if (child >= graph.size()) return std::nullopt;\n            if (!discovered[child]) {\n                discovered[child] = true; // Mark on discovery, not after popping.\n                pending[pending_count++] = child;\n            }\n        }\n    }\n    return visited;\n}\n\nint main() {\n    const std::vector<Node> graph{{{1}}, {{2}}, {{}}};\n    if (count_reachable(graph, 0) != 3 || count_reachable(graph, 5)) return 1;\n    const std::vector<Node> diamond{{{1, 2}}, {{3}}, {{3}}, {{0}}};\n    if (count_reachable(diamond, 0) != 4) return 2;\n    const std::vector<Node> duplicates{{{1, 1}}, {{1}}};\n    if (count_reachable(duplicates, 0) != 2) return 3;\n    std::vector<Node> wide(2);\n    wide[0].children.resize(129, 1);\n    return count_reachable(wide, 0) ? 4 : 0;\n}\n"
    }
  ]
};
