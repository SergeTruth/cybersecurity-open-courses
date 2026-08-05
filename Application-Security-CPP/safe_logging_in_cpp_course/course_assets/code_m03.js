window.COURSE_CODE_MODULE = {
  title: "Code Examples",
  codeIntro: "Represent approved log events as typed fields instead of accepting arbitrary key-value maps that can smuggle secrets.",
  codeExamples: [
    {
      title: "Build an allowlisted operational event",
      language: "cpp",
      blurb: "The event schema contains only an event type, bounded correlation identifier, and enumerated outcome.",
      code: String.raw`#include <algorithm>
#include <optional>
#include <string>
#include <string_view>
#include <type_traits>
#include <utility>

enum class EventType { authentication, authorization, configuration };
enum class Outcome { success, denied, error };

class OperationalEvent {
public:
    EventType type() const noexcept { return type_; }
    Outcome outcome() const noexcept { return outcome_; }
    std::string correlation_id() const { return correlation_id_; }

private:
    OperationalEvent(EventType type, Outcome outcome,
                     std::string correlation_id)
        : type_(type), outcome_(outcome),
          correlation_id_(std::move(correlation_id)) {}

    EventType type_;
    Outcome outcome_;
    std::string correlation_id_;

    friend std::optional<OperationalEvent> make_event(
        EventType, Outcome, std::string);
};

static_assert(!std::is_aggregate_v<OperationalEvent>);
static_assert(!std::is_constructible_v<OperationalEvent,
                                       EventType, Outcome, std::string>);

bool approved_event_type(EventType type) noexcept {
    switch (type) {
    case EventType::authentication:
    case EventType::authorization:
    case EventType::configuration:
        return true;
    }
    return false;
}

bool approved_outcome(Outcome outcome) noexcept {
    switch (outcome) {
    case Outcome::success:
    case Outcome::denied:
    case Outcome::error:
        return true;
    }
    return false;
}

bool safe_identifier(std::string_view value) noexcept {
    return !value.empty() && value.size() <= 64 &&
        std::all_of(value.begin(), value.end(), [](unsigned char ch) {
            return (ch >= 'a' && ch <= 'z') ||
                   (ch >= 'A' && ch <= 'Z') ||
                   (ch >= '0' && ch <= '9') || ch == '-' || ch == '_';
        });
}

std::optional<OperationalEvent> make_event(
    EventType type, Outcome outcome, std::string correlation_id
) {
    if (!approved_event_type(type) || !approved_outcome(outcome) ||
        !safe_identifier(correlation_id)) return std::nullopt;
    return OperationalEvent{type, outcome, std::move(correlation_id)};
}`
    },
    {
      title: "Verify approved context and control rejection",
      language: "cpp",
      blurb: "A normal correlation identifier is accepted, while newline injection and oversized context fail before logging.",
      code: String.raw`int test_operational_event_schema() {
    auto event = make_event(EventType::authorization, Outcome::denied,
                            "request-17");
    if (!event || event->correlation_id() != "request-17" ||
        event->type() != EventType::authorization ||
        event->outcome() != Outcome::denied) return 1;
    if (make_event(EventType::authorization, Outcome::denied,
                   "request-17\nstatus=success")) return 2;
    if (make_event(EventType::authentication, Outcome::error,
                   std::string(65, 'a'))) return 3;
    if (make_event(static_cast<EventType>(99), Outcome::success,
                   "request-18")) return 4;
    return make_event(EventType::configuration,
                      static_cast<Outcome>(99), "request-19") ? 5 : 0;
}`
    }
  ]
};
