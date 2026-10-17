window.COURSE_CODE_MODULE = {
  "title": "C++ Code Examples",
  "codeIntro": "",
  "codeExamples": [
    {
      "title": "Allowlist Command-Line and Environment Values",
      "language": "cpp",
      "blurb": "",
      "code": "#include <cstdlib>\n#include <iostream>\n#include <optional>\n#include <string>\n#include <string_view>\n\nenum class Mode {\n    read_only,\n    batch\n};\n\nstd::optional<Mode> parse_mode(std::string_view value) {\n    if (value == \"read-only\") {\n        return Mode::read_only;\n    }\n    if (value == \"batch\") {\n        return Mode::batch;\n    }\n    return std::nullopt;\n}\n\nstd::optional<std::string> parse_input_name(std::string_view value) {\n    if (value.empty() || value.size() > 64) {\n        return std::nullopt;\n    }\n    if (value.find('/') != std::string_view::npos ||\n        value.find('\\\\') != std::string_view::npos ||\n        value.find(\"..\") != std::string_view::npos) {\n        return std::nullopt;\n    }\n    return std::string(value);\n}\n\nint main(int argc, char* argv[]) {\n    const char* raw_mode = std::getenv(\"APP_MODE\");\n    auto mode = parse_mode(raw_mode == nullptr ? \"read-only\" : raw_mode);\n    auto name = argc == 2 ? parse_input_name(argv[1]) : std::nullopt;\n\n    if (!mode || !name) {\n        std::cerr << \"invalid command-line or environment input\\n\";\n        return 1;\n    }\n\n    std::cout << \"accepted input set\\n\";\n    return 0;\n}"
    },
    {
      "title": "Treat Callback Data as Boundary Data",
      "language": "cpp",
      "blurb": "",
      "code": "#include <optional>\n#include <string>\n#include <string_view>\n#include <utility>\n#include <cmath>\n\nstruct DeviceReading {\n    std::string sensor_id;\n    double volts;\n};\n\nstd::optional<DeviceReading> parse_device_callback(std::string_view sensor_id, double volts) {\n    if (sensor_id.empty() || sensor_id.size() > 24) {\n        return std::nullopt;\n    }\n    if (!std::isfinite(volts) || volts < 0.0 || volts > 5.0) {\n        return std::nullopt;\n    }\n\n    for (char ch : sensor_id) {\n        if (!(ch >= 'A' && ch <= 'Z') && !(ch >= '0' && ch <= '9') && ch != '-') {\n            return std::nullopt;\n        }\n    }\n\n    return DeviceReading{std::string(sensor_id), volts};\n}"
    }
  ]
};
