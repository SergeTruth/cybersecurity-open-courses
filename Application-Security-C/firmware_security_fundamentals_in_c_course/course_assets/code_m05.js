window.COURSE_CODE_MODULE = {
  "title": "Hardware Interfaces and Peripheral Input",
  "codeIntro": "Keep bus decoding separate from application policy, and reject faulty, duplicate, out-of-order, or out-of-range sensor data.",
  "codeExamples": [
    {
      "title": "Validate a sensor before controlling an actuator",
      "language": "c",
      "blurb": "The driver decodes a fixed wire format; the application independently enforces operating mode, a modulo-256 half-range sequence policy, and pressure limits.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>

typedef struct {
    uint8_t sequence;
    uint16_t pressure_kpa;
} pressure_sample;

typedef enum {
    MODE_SERVICE,
    MODE_AUTOMATIC
} device_mode;

static bool decode_pressure_frame(const uint8_t *frame, size_t frame_length,
                                  pressure_sample *sample)
{
    uint32_t decoded_pressure = 0U;

    if (frame == NULL || sample == NULL || frame_length != 5U ||
        frame[0] != 0U || frame[2] > 3U) {
        return false;
    }

    /* IMPORTANT FIX: decode the wire bytes explicitly after status checks. */
    decoded_pressure = ((uint32_t)frame[3] << 8U) | (uint32_t)frame[4];
    sample->sequence = frame[1];
    sample->pressure_kpa = (uint16_t)decoded_pressure;
    return true;
}

static bool sequence_is_newer(uint8_t current, uint8_t previous)
{
    uint8_t distance = (uint8_t)(current - previous);

    /* Forward progress is 1..127; 0 is duplicate and 128..255 is older. */
    return distance != 0U && distance < 128U;
}

static bool valve_may_open(const pressure_sample *sample, device_mode mode,
                           uint8_t previous_sequence)
{
    return sample != NULL && mode == MODE_AUTOMATIC &&
           sequence_is_newer(sample->sequence, previous_sequence) &&
           sample->pressure_kpa >= 900U &&
           sample->pressure_kpa <= 1100U;
}

int main(void)
{
    static const uint8_t valid_frame[] = {
        0U, 12U, 1U, 0x03U, 0xe8U
    };
    static const uint8_t bad_status_frame[] = {
        0U, 13U, 9U, 0x03U, 0xe8U
    };
    static const uint8_t fault_frame[] = {
        2U, 14U, 1U, 0x03U, 0xe8U
    };
    static const uint8_t high_frame[] = {
        0U, 15U, 1U, 0x04U, 0xb0U
    };
    pressure_sample sample = { 0U, 0U };

    /* TEST: valid forward progress can drive the actuator in the right mode. */
    assert(decode_pressure_frame(valid_frame, sizeof valid_frame, &sample));
    assert(sample.pressure_kpa == 1000U);
    assert(valve_may_open(&sample, MODE_AUTOMATIC, 11U));
    assert(!valve_may_open(&sample, MODE_SERVICE, 11U));
    assert(!valve_may_open(&sample, MODE_AUTOMATIC, 12U));

    /* TEST: an older sample is rejected, while wraparound progress is valid. */
    sample.sequence = 10U;
    assert(!valve_may_open(&sample, MODE_AUTOMATIC, 12U));
    sample.sequence = 0U;
    assert(valve_may_open(&sample, MODE_AUTOMATIC, 255U));

    /* TEST: bad status and out-of-range inputs are rejected. */
    assert(!decode_pressure_frame(bad_status_frame,
                                 sizeof bad_status_frame, &sample));
    assert(!decode_pressure_frame(fault_frame, sizeof fault_frame, &sample));
    assert(decode_pressure_frame(high_frame, sizeof high_frame, &sample));
    assert(!valve_may_open(&sample, MODE_AUTOMATIC, 14U));

    puts("peripheral validation tests passed");
    return 0;
}
`
    }
  ]
};
