window.COURSE_CODE_MODULE = {
  "title": "Task Design and Least Privilege: code example",
  "codeIntro": "A sensor task should have only the authority its narrow role requires, and watchdog health should reflect completed work rather than mere scheduling.",
  "codeExamples": [
    {
      "title": "Vulnerable: give a sensor task unrelated authority",
      "language": "c",
      "blurb": "The task can sample a sensor, drive an actuator, and enter diagnostics even though its stated responsibility is sensor collection.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

enum capability {
    CAP_READ_SENSOR = 1u << 0,
    CAP_DRIVE_ACTUATOR = 1u << 1,
    CAP_ENTER_DIAGNOSTICS = 1u << 2
};

enum operation {
    OP_SAMPLE_SENSOR,
    OP_SET_ACTUATOR,
    OP_OPEN_DIAGNOSTICS
};

struct task_context {
    unsigned int capabilities;
    size_t completed_operations;
};

static unsigned int required_capability(enum operation operation)
{
    switch (operation) {
        case OP_SAMPLE_SENSOR:
            return CAP_READ_SENSOR;
        case OP_SET_ACTUATOR:
            return CAP_DRIVE_ACTUATOR;
        case OP_OPEN_DIAGNOSTICS:
            return CAP_ENTER_DIAGNOSTICS;
        default:
            return 0u;
    }
}

static bool task_execute(struct task_context *task, enum operation operation)
{
    unsigned int required = 0u;

    if (task == NULL) {
        return false;
    }
    required = required_capability(operation);
    if (required == 0u || (task->capabilities & required) == 0u ||
        task->completed_operations == SIZE_MAX) {
        return false;
    }
    task->completed_operations++;
    return true;
}

int main(void)
{
    struct task_context sensor_task = {
        CAP_READ_SENSOR | CAP_DRIVE_ACTUATOR | CAP_ENTER_DIAGNOSTICS,
        0u
    };

    assert(task_execute(&sensor_task, OP_SAMPLE_SENSOR));
    /* IMPORTANT DEFECT: the sensor task can perform unrelated control work. */
    assert(task_execute(&sensor_task, OP_SET_ACTUATOR));
    /* TEST: excessive authority, not memory corruption, is the demonstrated defect. */
    assert(sensor_task.completed_operations == 2u);
    return 0;
}
`
    },
    {
      "title": "Safer: bind authority and health to the sensor role",
      "language": "c",
      "blurb": "The task profile permits sensor reads only, and its watchdog check advances only after an authorized operation completes.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

enum capability {
    CAP_READ_SENSOR = 1u << 0,
    CAP_DRIVE_ACTUATOR = 1u << 1,
    CAP_ENTER_DIAGNOSTICS = 1u << 2
};

enum operation {
    OP_SAMPLE_SENSOR,
    OP_SET_ACTUATOR,
    OP_OPEN_DIAGNOSTICS
};

struct task_context {
    unsigned int capabilities;
    size_t completed_operations;
};

static unsigned int required_capability(enum operation operation)
{
    switch (operation) {
        case OP_SAMPLE_SENSOR:
            return CAP_READ_SENSOR;
        case OP_SET_ACTUATOR:
            return CAP_DRIVE_ACTUATOR;
        case OP_OPEN_DIAGNOSTICS:
            return CAP_ENTER_DIAGNOSTICS;
        default:
            return 0u;
    }
}

static bool task_execute(struct task_context *task, enum operation operation)
{
    unsigned int required = 0u;

    if (task == NULL) {
        return false;
    }
    required = required_capability(operation);
    if (required == 0u || (task->capabilities & required) == 0u ||
        task->completed_operations == SIZE_MAX) {
        return false;
    }
    task->completed_operations++;
    return true;
}

static bool watchdog_saw_progress(const struct task_context *task,
                                  size_t previous_count)
{
    return task != NULL && task->completed_operations > previous_count;
}

int main(void)
{
    struct task_context sensor_task = {CAP_READ_SENSOR, 0u};
    size_t checkpoint = sensor_task.completed_operations;

    assert(!watchdog_saw_progress(&sensor_task, checkpoint));
    /* IMPORTANT FIX: the profile exposes only the resource needed by this role. */
    assert(task_execute(&sensor_task, OP_SAMPLE_SENSOR));
    assert(watchdog_saw_progress(&sensor_task, checkpoint));

    checkpoint = sensor_task.completed_operations;
    /* TEST: unrelated authority is rejected and does not fake watchdog progress. */
    assert(!task_execute(&sensor_task, OP_SET_ACTUATOR));
    assert(!task_execute(&sensor_task, OP_OPEN_DIAGNOSTICS));
    assert(!watchdog_saw_progress(&sensor_task, checkpoint));
    return 0;
}
`
    }
  ]
};
