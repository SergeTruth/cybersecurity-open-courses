window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-387c952285",
  "questions": {
    "q01": {
      "options": {
        "A": "Compiler protections cannot prove that every source-level lifetime or concurrency contract is safe.",
        "B": "Different defect classes and deployment platforms require complementary controls and verification.",
        "C": "Hardening adds detection and resistance while source design still needs correction.",
        "D": "Development instrumentation and production hardening serve different purposes and need suitable configurations."
      }
    },
    "q02": {
      "options": {
        "A": "Broad suppression hides future real defects along with the original false positive.",
        "B": "Warning-free compilation does not establish safety for all runtime inputs and paths.",
        "C": "Investigate causes and keep justified suppressions narrow, documented, and reviewable.",
        "D": "Broad application suppressions can conceal defects unrelated to unavoidable third-party diagnostics."
      }
    },
    "q03": {
      "options": {
        "A": "Canaries detect some stack corruption and do not prevent every out-of-bounds write.",
        "B": "Stack protection does not validate every copy length or destination capacity.",
        "C": "Canary checks do not make stack memory executable as part of their design.",
        "D": "Checking a stack guard can detect certain corruption before a protected function returns."
      }
    },
    "q04": {
      "options": {
        "A": "Position-independent executables let supported loaders vary locations and reduce address predictability.",
        "B": "PIE changes executable relocation properties rather than validating source-level pointer expressions.",
        "C": "ASLR varies eligible mappings rather than guaranteeing identical addresses across process launches.",
        "D": "Executable permissions and relocatability are distinct properties requiring appropriate platform controls."
      }
    },
    "q05": {
      "options": {
        "A": "Supported defenses constrain indirect targets or protect return addresses against certain corruption.",
        "B": "An allowed control-flow target can still perform an unauthorized business operation.",
        "C": "Return-address protection does not establish the validity of every ordinary data pointer.",
        "D": "Control-flow defenses do not constitute application authorization for every direct function call."
      }
    },
    "q06": {
      "options": {
        "A": "Sanitizers can have substantial cost and are not universally suitable release mitigations.",
        "B": "Instrumented executions produce actionable diagnostics for defects on paths the tests exercise.",
        "C": "Test instrumentation does not establish production linker and executable hardening settings.",
        "D": "Sanitizers generally inspect executed operations and cannot prove all unexecuted paths safe."
      }
    },
    "q07": {
      "options": {
        "A": "Separately built release artifacts do not inherit instrumentation from earlier test binaries.",
        "B": "Passing ASan tests says nothing about the release binary's relocation or linker protections.",
        "C": "Calling every public function does not cover every input, path, or deployment condition.",
        "D": "Production protections apply during real executions beyond the paths covered by sanitizer tests."
      }
    },
    "q08": {
      "options": {
        "A": "Compiler option names and supported protections differ across toolchains and target architectures.",
        "B": "The number of flags does not establish whether required protections reached the artifact.",
        "C": "Translate required security outcomes per toolchain and detect unsupported mandatory controls explicitly.",
        "D": "Platform-specific exceptions should not silently remove available protections from every other target."
      }
    },
    "q09": {
      "options": {
        "A": "Inspecting the produced artifact confirms protection metadata beyond the build configuration's intent.",
        "B": "Packaging can change the final artifact, so configuration files alone are insufficient evidence.",
        "C": "Source code does not reveal the final executable's loader metadata and permissions.",
        "D": "Loaders use relevant hardening metadata in deployed binaries as well as development artifacts."
      }
    },
    "q10": {
      "options": {
        "A": "Unbounded permanent exceptions can outlive their justification and hide accumulating exposure.",
        "B": "Defined scope, responsibility, mitigations, and expiry make exceptions assessable and reviewable.",
        "C": "Silently dropping mandatory protections conceals risk and violates the stated release policy.",
        "D": "A useful exception record includes affected targets, security impact, and accountable ownership."
      }
    }
  }
};
