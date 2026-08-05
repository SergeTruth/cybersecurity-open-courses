window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Represent an allocation quota with a movable lease that returns reserved bytes automatically.",
  codeExamples: [
    {
      title: "Reserve allocation capacity through RAII leases",
      language: "cpp",
      blurb: "Shared accounting keeps escaped leases safe after the budget facade is destroyed, and movement transfers exactly one reservation.",
      code: String.raw`#include <cstddef>
#include <memory>
#include <optional>
#include <utility>

class AllocationBudget {
private:
    struct State {
        std::size_t limit;
        std::size_t used = 0;
    };

public:
    class Lease {
    public:
        Lease(const Lease&) = delete;
        Lease& operator=(const Lease&) = delete;
        Lease(Lease&& other) noexcept
            : state_(std::move(other.state_)),
              bytes_(std::exchange(other.bytes_, 0)) {}
        Lease& operator=(Lease&& other) noexcept {
            if (this != &other) {
                release();
                state_ = std::move(other.state_);
                bytes_ = std::exchange(other.bytes_, 0);
            }
            return *this;
        }
        ~Lease() { release(); }

    private:
        friend class AllocationBudget;
        Lease(std::shared_ptr<State> state, std::size_t bytes)
            : state_(std::move(state)), bytes_(bytes) {}
        void release() noexcept {
            if (state_) state_->used -= std::exchange(bytes_, 0);
            state_.reset();
        }
        std::shared_ptr<State> state_;
        std::size_t bytes_ = 0;
    };

    explicit AllocationBudget(std::size_t limit)
        : state_(std::make_shared<State>(State{limit, 0})) {}
    AllocationBudget(const AllocationBudget&) = delete;
    AllocationBudget& operator=(const AllocationBudget&) = delete;
    AllocationBudget(AllocationBudget&&) = delete;
    AllocationBudget& operator=(AllocationBudget&&) = delete;

    std::optional<Lease> reserve(std::size_t bytes) {
        if (bytes == 0 || bytes > state_->limit - state_->used) {
            return std::nullopt;
        }
        state_->used += bytes;
        return Lease{state_, bytes};
    }
    std::size_t used() const noexcept { return state_->used; }

private:
    std::shared_ptr<State> state_;
};`
    },
    {
      title: "Verify quota exhaustion and automatic release",
      language: "cpp",
      blurb: "The test proves quota enforcement, move reassignment, ordinary release, and safe lease cleanup after the budget facade has ended.",
      code: String.raw`int test_allocation_budget() {
    AllocationBudget budget{100};
    {
        auto first = budget.reserve(70);
        if (!first || budget.used() != 70) return 1;
        if (budget.reserve(31)) return 2;
        auto second = budget.reserve(30);
        if (!second || budget.used() != 100) return 3;
    }
    if (budget.used() != 0) return 4;

    auto reassigned = budget.reserve(20);
    auto replacement = budget.reserve(30);
    if (!reassigned || !replacement || budget.used() != 50) return 5;
    *reassigned = std::move(*replacement);
    if (budget.used() != 30) return 6;
    reassigned.reset();
    if (budget.used() != 0) return 7;

    std::optional<AllocationBudget::Lease> escaped;
    {
        AllocationBudget temporary{16};
        escaped = temporary.reserve(16);
        if (!escaped || temporary.used() != 16) return 8;
    }
    escaped.reset();
    return budget.reserve(100) ? 0 : 9;
}`
    }
  ]
};
