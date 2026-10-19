window.COURSE_CODE_MODULE = {
  "title": "Secure Error Handling Under Pressure",
  "codeIntro": "Validate before writing even to aliased scratch storage, then commit with overlap-safe copies, and make retry and compact diagnostic policy explicit.",
  "codeExamples": [
    {
      "title": "Preserve configuration when scratch space is unavailable",
      "language": "c",
      "blurb": "The current configuration remains unchanged on size, scratch, or validation failure; only a complete candidate is committed.",
      "code": `/* Test checks are active even with -DNDEBUG; each expression runs once. */
#define CHECK(condition) do { if (!(condition)) { \\
    (void)fprintf(stderr, "check failed: %s at line %d\\n", \\
                  #condition, __LINE__); return 1; \\
} } while (0)
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <string.h>

#define CONFIG_CAPACITY 8U

typedef struct {
    uint8_t bytes[CONFIG_CAPACITY];
    size_t length;
} configuration;

typedef enum {
    UPDATE_OK,
    UPDATE_LIMIT,
    UPDATE_NO_SCRATCH,
    UPDATE_INVALID
} update_status;

static update_status update_configuration(configuration *current,
                                          const uint8_t *input,
                                          size_t input_length,
                                          uint8_t *scratch,
                                          size_t scratch_capacity)
{
    size_t i = 0U;

    if (current == NULL || input == NULL || input_length == 0U ||
        input_length > CONFIG_CAPACITY) {
        return UPDATE_LIMIT;
    }
    if (scratch == NULL || input_length > scratch_capacity) {
        return UPDATE_NO_SCRATCH;
    }
    /* Validate before writing: scratch may overlap input or current. */
    for (i = 0U; i < input_length; ++i) {
        if (input[i] < 'A' || input[i] > 'Z') {
            return UPDATE_INVALID;
        }
    }

    /* No fallible steps remain. The caller exclusively owns these buffers. */
    (void)memmove(scratch, input, input_length);
    (void)memmove(current->bytes, scratch, input_length);
    (void)memset(current->bytes + input_length, 0,
                 sizeof current->bytes - input_length);
    current->length = input_length;
    return UPDATE_OK;
}

static bool retry_allowed(update_status status, size_t attempts)
{
    return status == UPDATE_NO_SCRATCH && attempts < 2U;
}

int main(void)
{
    static const uint8_t initial[] = { 'S', 'A', 'F', 'E' };
    static const uint8_t replacement[] = { 'R', 'E', 'A', 'D', 'Y' };
    static const uint8_t invalid[] = { 'B', 'A', 'D', '1' };
    configuration current = { { 'S', 'A', 'F', 'E' }, 4U };
    uint8_t scratch[CONFIG_CAPACITY] = { 0U };
    update_status status = UPDATE_OK;

    /* TEST: unavailable scratch preserves the previous safe state. */
    status = update_configuration(&current, replacement, sizeof replacement,
                                  scratch, 3U);
    CHECK(status == UPDATE_NO_SCRATCH);
    CHECK(current.length == sizeof initial &&
           memcmp(current.bytes, initial, sizeof initial) == 0);
    CHECK(retry_allowed(status, 0U) && !retry_allowed(status, 2U));

    /* TEST: invalid candidates reject; complete candidates commit under exclusive ownership. */
    CHECK(update_configuration(&current, invalid, sizeof invalid,
                                scratch, sizeof scratch) == UPDATE_INVALID);
    CHECK(memcmp(current.bytes, initial, sizeof initial) == 0);
    CHECK(update_configuration(&current, replacement, sizeof replacement,
                                scratch, sizeof scratch) == UPDATE_OK);
    CHECK(current.length == sizeof replacement &&
           memcmp(current.bytes, replacement, sizeof replacement) == 0);

    /* TEST: aliased scratch cannot corrupt state on rejected input. */
    CHECK(update_configuration(&current, invalid, sizeof invalid,
                                current.bytes, sizeof current.bytes) == UPDATE_INVALID);
    CHECK(current.length == sizeof replacement &&
           memcmp(current.bytes, replacement, sizeof replacement) == 0);
    CHECK(update_configuration(&current, initial, sizeof initial,
                                current.bytes + 1U, sizeof current.bytes - 1U) == UPDATE_OK);
    CHECK(current.length == sizeof initial &&
           memcmp(current.bytes, initial, sizeof initial) == 0);

    puts("pressure error-path tests passed");
    return 0;
}
`
    }
  ]
};
