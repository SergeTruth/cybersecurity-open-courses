window.COURSE_CODE_MODULE = {
  "title": "Compound Objects and Nested Cleanup",
  "codeIntro": "A compound object's destroy routine follows a field-by-field ownership map, including per-element rules for dynamic arrays.",
  "codeExamples": [
    {
      "title": "Destroy owned children but preserve borrowed policy",
      "language": "c",
      "blurb": "The caller first establishes an empty state. Initialization rejects nonempty groups, and failed attempts remain safely destroyable.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>

struct task {
    int id;
};

struct task_group {
    struct task **owned_tasks;
    size_t count;
    size_t capacity;
    const char *borrowed_policy;
};

static struct task *task_create(int id)
{
    struct task *task = malloc(sizeof *task);

    if (task != NULL) {
        task->id = id;
    }
    return task;
}

static bool task_group_init(struct task_group *group, size_t capacity,
                            const char *borrowed_policy)
{
    if (group == NULL || capacity == 0U || borrowed_policy == NULL ||
        capacity > SIZE_MAX / sizeof *group->owned_tasks) {
        return false;
    }
    if (group->owned_tasks != NULL || group->count != 0U ||
        group->capacity != 0U || group->borrowed_policy != NULL) {
        return false;
    }
    group->owned_tasks = calloc(capacity, sizeof *group->owned_tasks);
    if (group->owned_tasks == NULL) {
        return false;
    }
    group->count = 0U;
    group->capacity = capacity;
    group->borrowed_policy = borrowed_policy;
    return true;
}

static bool task_group_add(struct task_group *group, struct task **candidate)
{
    if (group == NULL || candidate == NULL || *candidate == NULL ||
        group->count >= group->capacity) {
        return false;
    }
    group->owned_tasks[group->count] = *candidate;
    group->count++;
    *candidate = NULL;
    return true;
}

static void task_group_destroy(struct task_group *group)
{
    size_t index;

    if (group == NULL) {
        return;
    }
    /* IMPORTANT FIX: release every owned child exactly once. */
    for (index = 0U; index < group->count; index++) {
        free(group->owned_tasks[index]);
        group->owned_tasks[index] = NULL;
    }
    free(group->owned_tasks);
    /* borrowed_policy is deliberately not freed. */
    *group = (struct task_group){0};
}

int main(void)
{
    static const char policy[] = "fifo";
    struct task_group group = {0};
    struct task *first = task_create(1);
    struct task *second = task_create(2);

    assert(first != NULL && second != NULL);
    /* TEST: rejected initialization preserves a safely destroyable empty state. */
    assert(!task_group_init(&group, 0U, policy));
    task_group_destroy(&group);
    assert(group.owned_tasks == NULL && group.capacity == 0U);

    assert(task_group_init(&group, 1U, policy));
    assert(!task_group_init(&group, 2U, policy));
    assert(task_group_add(&group, &first));
    assert(first == NULL);

    /* TEST: insertion rejection leaves the unaccepted child with the caller. */
    assert(!task_group_add(&group, &second));
    assert(second != NULL && second->id == 2);
    free(second);

    task_group_destroy(&group);
    assert(group.owned_tasks == NULL);
    assert(strcmp(policy, "fifo") == 0);
    return 0;
}
`
    }
  ]
};
