window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Rotation keeps old and new versions active until cutover is confirmed.",
  "codeExamples": [
    {
      "title": "Track a recoverable secret-rotation state machine",
      "language": "cpp",
      "blurb": "The workflow never disables the previous version before reference cutover succeeds.",
      "code": "#include <string>\n\nenum class RotationState { prepared, new_enabled, reference_cut_over, old_disabled, recovery_required };\n\nclass SecretRotation {\npublic:\n    bool enable_new() noexcept { if (state_ != RotationState::prepared) return false; state_ = RotationState::new_enabled; return true; }\n    bool cut_over_reference() noexcept { if (state_ != RotationState::new_enabled) return false; state_ = RotationState::reference_cut_over; return true; }\n    bool disable_old() noexcept { if (state_ != RotationState::reference_cut_over) return false; state_ = RotationState::old_disabled; return true; }\n    bool rollback_reference() noexcept { if (state_ != RotationState::reference_cut_over) return false; state_ = RotationState::new_enabled; return true; }\n    RotationState state() const noexcept { return state_; }\nprivate: RotationState state_ = RotationState::prepared;\n};\n"
    },
    {
      "title": "Verify ordering and recoverable rollback",
      "language": "cpp",
      "blurb": "The regression proves the old version cannot be disabled before cutover and that post-cutover rollback is explicit.",
      "code": "int main() {\n    SecretRotation rotation;\n    if (rotation.disable_old()) return 1;\n    if (!rotation.enable_new() || !rotation.cut_over_reference()) return 2;\n    if (!rotation.rollback_reference() || rotation.state() != RotationState::new_enabled) return 3;\n    if (rotation.disable_old()) return 4;\n    if (!rotation.cut_over_reference() || !rotation.disable_old()) return 5;\n    return 0;\n}\n"
    }
  ]
};
