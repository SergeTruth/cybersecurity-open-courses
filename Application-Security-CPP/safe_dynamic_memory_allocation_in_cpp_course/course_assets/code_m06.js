window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Keep dynamically allocated blocks under a custom deleter immediately and represent their bytes with an owner that preserves the real extent.",
  codeExamples: [
    {
      title: "Adopt an external allocation before validation",
      language: "cpp",
      blurb: "The block stores bytes in an extent-preserving vector, while the unique owner is established before validation so every rejection invokes the matching release function.",
      code: String.raw`#include <atomic>
#include <cstddef>
#include <memory>
#include <stdexcept>
#include <utility>
#include <vector>

struct BlockReleaseState {
    std::atomic_int releases{0};
};

struct BlockDeleter;
class ValidatedBlock;

class ExternalBlock {
public:
    ExternalBlock(std::vector<std::byte> data,
                  std::shared_ptr<BlockReleaseState> state)
        : data_(std::move(data)), state_(std::move(state)) {}

    std::size_t size() const noexcept { return data_.size(); }
    bool has_release_state() const noexcept {
        return static_cast<bool>(state_);
    }

private:
    friend struct BlockDeleter;
    friend class ValidatedBlock;
    void record_release() noexcept {
        if (state_) {
            state_->releases.fetch_add(1, std::memory_order_relaxed);
        }
    }
    std::vector<std::byte> data_;
    std::shared_ptr<BlockReleaseState> state_;
};

struct BlockDeleter {
    void operator()(ExternalBlock* block) const noexcept {
        if (!block) return;
        block->record_release();
        delete block;
    }
};

using UniqueBlock = std::unique_ptr<ExternalBlock, BlockDeleter>;

class ValidatedBlock {
public:
    static ValidatedBlock accept(UniqueBlock block) {
        if (!block || !block->has_release_state() || block->size() == 0 ||
            block->size() > 1024) {
            throw std::invalid_argument("external block rejected");
        }
        return ValidatedBlock{std::move(block)};
    }

    ValidatedBlock(const ValidatedBlock&) = delete;
    ValidatedBlock& operator=(const ValidatedBlock&) = delete;
    ValidatedBlock(ValidatedBlock&&) = delete;
    ValidatedBlock& operator=(ValidatedBlock&&) = delete;

    std::size_t size() const noexcept { return block_->data_.size(); }
    bool write(std::size_t index, std::byte value) noexcept {
        if (index >= block_->data_.size()) return false;
        block_->data_[index] = value;
        return true;
    }

private:
    explicit ValidatedBlock(UniqueBlock block)
        : block_(std::move(block)) {}
    UniqueBlock block_;
};

ValidatedBlock validate_block(UniqueBlock block) {
    return ValidatedBlock::accept(std::move(block));
}`
    },
    {
      title: "Verify cleanup on validation failure",
      language: "cpp",
      blurb: "Empty and state-less blocks fail with deterministic cleanup, while an accepted block exposes only the extent owned by its vector.",
      code: String.raw`int test_external_block_cleanup() {
    auto state = std::make_shared<BlockReleaseState>();
    try {
        validate_block(UniqueBlock{
            new ExternalBlock{std::vector<std::byte>{}, state}
        });
        return 1;
    } catch (const std::invalid_argument&) {
    }
    if (state->releases.load(std::memory_order_relaxed) != 1) return 2;
    try {
        validate_block(UniqueBlock{
            new ExternalBlock{std::vector<std::byte>(1), nullptr}
        });
        return 3;
    } catch (const std::invalid_argument&) {
    }
    {
        auto block = UniqueBlock{
            new ExternalBlock{std::vector<std::byte>(8), state}
        };
        auto accepted = validate_block(std::move(block));
        if (accepted.size() != 8) return 4;
        if (!accepted.write(7, std::byte{7}) ||
            accepted.write(8, std::byte{1})) return 5;
    }
    if (state->releases.load(std::memory_order_relaxed) != 2) return 6;
    try {
        validate_block(UniqueBlock{
            new ExternalBlock{std::vector<std::byte>(1025), state}
        });
        return 7;
    } catch (const std::invalid_argument&) {
    }
    return state->releases.load(std::memory_order_relaxed) == 3 ? 0 : 8;
}`
    }
  ]
};
