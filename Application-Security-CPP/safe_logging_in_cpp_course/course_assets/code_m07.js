window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Bound an in-memory log queue and synchronize producers so logging pressure cannot grow memory without limit.",
  codeExamples: [
    {
      title: "Queue log records under a fixed capacity",
      language: "cpp",
      blurb: "A mutex protects the queue, full-capacity submissions fail explicitly, and draining transfers owned strings to the consumer.",
      code: String.raw`#include <cstddef>
#include <deque>
#include <mutex>
#include <optional>
#include <stdexcept>
#include <string>
#include <utility>

class BoundedLogQueue {
public:
    explicit BoundedLogQueue(std::size_t capacity) : capacity_(capacity) {
        if (capacity == 0 || capacity > 1024) {
            throw std::length_error("log queue capacity outside policy");
        }
    }

    bool submit(std::string record) {
        std::scoped_lock lock{mutex_};
        if (record.size() > 1024 || records_.size() >= capacity_) return false;
        records_.push_back(std::move(record));
        return true;
    }

    std::optional<std::string> take() {
        std::scoped_lock lock{mutex_};
        if (records_.empty()) return std::nullopt;
        auto record = std::move(records_.front());
        records_.pop_front();
        return record;
    }

private:
    std::size_t capacity_;
    std::mutex mutex_;
    std::deque<std::string> records_;
};`
    },
    {
      title: "Verify concurrent producers and backpressure",
      language: "cpp",
      blurb: "Two producers fill the bounded queue safely, and an additional record is rejected until the consumer drains capacity.",
      code: String.raw`#include <thread>

int test_bounded_log_queue() {
    try {
        BoundedLogQueue invalid{0};
        return 1;
    } catch (const std::length_error&) {
    }
    BoundedLogQueue queue{2};
    bool first = false;
    bool second = false;
    std::jthread one{[&] { first = queue.submit("one"); }};
    std::jthread two{[&] { second = queue.submit("two"); }};
    one.join();
    two.join();
    if (!first || !second || queue.submit("overflow")) return 2;
    if (!queue.take() || !queue.submit("three")) return 3;
    if (queue.submit(std::string(1025, 'x'))) return 4;
    return 0;
}`
    }
  ]
};
