window.COURSE_CODE_MODULE = {
  "title": "Hardware Interfaces and Physical Exposure",
  "codeIntro": "A maintenance connector is only one condition for an actuator command; operating mode, service authorization, sensor validity, and safe range also matter.",
  "codeExamples": [
    {
      "title": "Gate a maintenance actuator command",
      "language": "c",
      "blurb": "The heater output changes only during authenticated maintenance with the physical connector present and a valid, safe temperature reading.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stddef.h>\n\nenum operating_mode {\n    MODE_IDLE,\n    MODE_RUNNING,\n    MODE_MAINTENANCE\n};\n\nstruct actuator_context {\n    enum operating_mode mode;\n    bool service_connector_present;\n    bool service_authenticated;\n    bool temperature_valid;\n    unsigned int temperature_celsius;\n    unsigned int heater_percent;\n};\n\nstatic bool set_maintenance_heater(struct actuator_context *context,\n                                   unsigned int requested_percent)\n{\n    if (context == NULL) {\n        return false;\n    }\n\n    /* IMPORTANT FIX: physical access does not bypass state and safety rules. */\n    if (context->mode != MODE_MAINTENANCE ||\n        !context->service_connector_present ||\n        !context->service_authenticated ||\n        !context->temperature_valid ||\n        context->temperature_celsius >= 70u ||\n        requested_percent > 60u) {\n        return false;\n    }\n    context->heater_percent = requested_percent;\n    return true;\n}\n\nint main(void)\n{\n    struct actuator_context device = {\n        MODE_MAINTENANCE, true, true, true, 25u, 0u\n    };\n\n    assert(set_maintenance_heater(&device, 40u));\n    assert(device.heater_percent == 40u);\n\n    /* TEST: unsafe mode, stale sensing, and excess output are rejected. */\n    device.mode = MODE_RUNNING;\n    assert(!set_maintenance_heater(&device, 20u));\n    device.mode = MODE_MAINTENANCE;\n    device.temperature_valid = false;\n    assert(!set_maintenance_heater(&device, 20u));\n    device.temperature_valid = true;\n    assert(!set_maintenance_heater(&device, 61u));\n    assert(device.heater_percent == 40u);\n    return 0;\n}\n"
    }
  ]
};
