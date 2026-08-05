window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Use shared ownership for active sessions and a bounded, self-pruning weak registry that cannot prolong their lifetime.",
  codeExamples: [
    {
      title: "Store weak session observations",
      language: "cpp",
      blurb: "Insertion removes expired observations before applying a fixed capacity, and lookup locks a weak pointer only for the duration of access.",
      code: String.raw`#include <cstddef>
#include <memory>
#include <optional>
#include <string>
#include <unordered_map>
#include <utility>
#include <vector>

struct AllocationSession {
    std::string id;
    bool active = true;
};

class AllocationRegistry {
public:
    bool remember(const std::shared_ptr<AllocationSession>& session) {
        if (!session || session->id.empty() || session->id.size() > 64) {
            return false;
        }
        prune_expired();
        const bool new_id = !sessions_.contains(session->id);
        if (new_id && sessions_.size() >= maximum_entries) return false;
        sessions_.insert_or_assign(session->id, session);
        return true;
    }

    std::optional<std::string> active_id(const std::string& id) {
        const auto found = sessions_.find(id);
        if (found == sessions_.end()) return std::nullopt;
        auto session = found->second.lock();
        if (!session) {
            sessions_.erase(found);
            return std::nullopt;
        }
        if (!session->active) return std::nullopt;
        return session->id;
    }

    std::size_t tracked() const noexcept { return sessions_.size(); }

private:
    void prune_expired() {
        for (auto entry = sessions_.begin(); entry != sessions_.end();) {
            if (entry->second.expired()) entry = sessions_.erase(entry);
            else ++entry;
        }
    }

    static constexpr std::size_t maximum_entries = 1024;
    std::unordered_map<std::string, std::weak_ptr<AllocationSession>> sessions_;
};`
    },
    {
      title: "Verify live, inactive, and expired observations",
      language: "cpp",
      blurb: "Positive and negative cases cover live and inactive sessions, while insertion-time sweeping prevents unqueried expired identifiers from accumulating.",
      code: String.raw`int test_allocation_registry() {
    AllocationRegistry registry;
    auto session = std::make_shared<AllocationSession>();
    session->id = "allocation-1";
    if (!registry.remember(session)) return 1;
    if (registry.active_id("allocation-1") != "allocation-1") return 2;
    session->active = false;
    if (registry.active_id("allocation-1")) return 3;
    session.reset();
    if (registry.active_id("allocation-1")) return 4;
    if (registry.tracked() != 0) return 5;

    for (int index = 0; index < 10000; ++index) {
        auto expired = std::make_shared<AllocationSession>();
        expired->id = "expired-" + std::to_string(index);
        if (!registry.remember(expired)) return 6;
    }
    auto live = std::make_shared<AllocationSession>();
    live->id = "live";
    if (!registry.remember(live) || registry.tracked() != 1) return 7;
    if (registry.active_id("live") != "live") return 8;

    std::vector<std::shared_ptr<AllocationSession>> owners;
    owners.reserve(1023);
    for (int index = 0; index < 1023; ++index) {
        auto owned = std::make_shared<AllocationSession>();
        owned->id = "owned-" + std::to_string(index);
        if (!registry.remember(owned)) return 9;
        owners.push_back(std::move(owned));
    }
    auto overflow = std::make_shared<AllocationSession>();
    overflow->id = "overflow";
    if (registry.remember(overflow)) return 10;
    return registry.tracked() == 1024 ? 0 : 11;
}`
    }
  ]
};
