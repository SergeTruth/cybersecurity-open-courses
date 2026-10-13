window.COURSE_CODE_MODULE = {
  "title": "Debug Interfaces and Production Hardening",
  "codeIntro": "Make the release baseline auditable and apply an explicit command policy for factory and service capabilities.",
  "codeExamples": [
    {
      "title": "Enforce a production debug baseline",
      "language": "c",
      "blurb": "A production profile rejects leftover debug capabilities while permitting an authorized, narrowly scoped service command.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stdio.h>

typedef enum {
    PROFILE_DEVELOPMENT,
    PROFILE_MANUFACTURING,
    PROFILE_PRODUCTION
} build_profile_kind;

typedef struct {
    build_profile_kind kind;
    bool debug_port_enabled;
    bool factory_commands_enabled;
    bool sensitive_trace_enabled;
    bool service_authorization_required;
} build_profile;

typedef enum {
    COMMAND_STATUS,
    COMMAND_FACTORY_ERASE,
    COMMAND_SERVICE_RESET
} maintenance_command;

static bool production_baseline_valid(const build_profile *profile)
{
    /* IMPORTANT FIX: verify release settings as one explicit baseline. */
    return profile != NULL && profile->kind == PROFILE_PRODUCTION &&
           !profile->debug_port_enabled &&
           !profile->factory_commands_enabled &&
           !profile->sensitive_trace_enabled &&
           profile->service_authorization_required;
}

static bool command_allowed(const build_profile *profile,
                            maintenance_command command,
                            bool service_authorized)
{
    if (profile == NULL) {
        return false;
    }
    if (command == COMMAND_STATUS) {
        return true;
    }
    if (command == COMMAND_FACTORY_ERASE) {
        return profile->kind == PROFILE_MANUFACTURING &&
               profile->factory_commands_enabled;
    }
    if (command == COMMAND_SERVICE_RESET) {
        return !profile->service_authorization_required ||
               service_authorized;
    }
    return false;
}

int main(void)
{
    const build_profile production = {
        PROFILE_PRODUCTION, false, false, false, true
    };
    const build_profile unsafe_release = {
        PROFILE_PRODUCTION, true, false, false, true
    };
    const build_profile manufacturing = {
        PROFILE_MANUFACTURING, true, true, true, false
    };

    /* TEST: the production baseline disables development capabilities. */
    assert(production_baseline_valid(&production));
    assert(!production_baseline_valid(&unsafe_release));
    assert(command_allowed(&production, COMMAND_STATUS, false));
    assert(!command_allowed(&production, COMMAND_FACTORY_ERASE, true));

    /* TEST: production service actions need authorization. */
    assert(!command_allowed(&production, COMMAND_SERVICE_RESET, false));
    assert(command_allowed(&production, COMMAND_SERVICE_RESET, true));
    assert(command_allowed(&manufacturing, COMMAND_FACTORY_ERASE, false));

    puts("production hardening tests passed");
    return 0;
}
`
    }
  ]
};
