window.COURSE_CODE_MODULE = {
  "title": "Drivers, Peripherals, and External Interfaces: code example",
  "codeIntro": "A DMA receive buffer needs platform completion synchronization before an ownership-state transition, followed by length and application-range validation before hardware data affects control logic.",
  "codeExamples": [
    {
      "title": "Enforce DMA ownership and validate sensor data",
      "language": "c",
      "blurb": "The state machine is an application model, not DMA synchronization. Descriptor completion, barriers, cache maintenance, coherency, and ISR operations must finish before CPU-ready publication.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <string.h>

#define DMA_BUFFER_SIZE 6u

enum dma_state {
    DMA_CPU_IDLE,
    DMA_HARDWARE_OWNS,
    DMA_CPU_READY
};

struct sensor_driver {
    uint8_t buffer[DMA_BUFFER_SIZE];
    size_t hardware_length;
    size_t completed_length;
    enum dma_state state;
};

static bool driver_start_receive(struct sensor_driver *driver)
{
    if (driver == NULL || driver->state != DMA_CPU_IDLE) {
        return false;
    }
    driver->hardware_length = 0u;
    driver->completed_length = 0u;
    driver->state = DMA_HARDWARE_OWNS;
    return true;
}

static bool test_hardware_write(struct sensor_driver *driver,
                                const uint8_t *bytes, size_t length)
{
    if (driver == NULL || bytes == NULL ||
        driver->state != DMA_HARDWARE_OWNS || length > DMA_BUFFER_SIZE) {
        return false;
    }
    memmove(driver->buffer, bytes, length);
    driver->hardware_length = length;
    return true;
}

static bool driver_complete_from_interrupt(struct sensor_driver *driver,
                                           size_t reported_length,
                                           bool platform_sync_complete)
{
    if (driver == NULL || driver->state != DMA_HARDWARE_OWNS ||
        !platform_sync_complete) {
        return false;
    }
    if (reported_length > DMA_BUFFER_SIZE ||
        reported_length != driver->hardware_length) {
        driver->state = DMA_CPU_IDLE;
        driver->hardware_length = 0u;
        return false;
    }
    /* POLICY MODEL: the platform driver has synchronized completion state,
       barriers, descriptors, and caches before publishing CPU ownership. */
    driver->completed_length = reported_length;
    driver->state = DMA_CPU_READY;
    return true;
}

static bool driver_read_temperature(struct sensor_driver *driver,
                                    uint16_t *tenths_celsius)
{
    uint16_t value = 0u;
    size_t completed_length = 0u;

    if (driver == NULL || tenths_celsius == NULL ||
        driver->state != DMA_CPU_READY) {
        return false;
    }
    /* Hardware ownership ended: consume/discard every completed frame. */
    completed_length = driver->completed_length;
    driver->state = DMA_CPU_IDLE;
    driver->completed_length = 0u;
    driver->hardware_length = 0u;
    if (completed_length != 2u) {
        return false;
    }
    value = (uint16_t)((uint16_t)driver->buffer[0] << 8) |
            (uint16_t)driver->buffer[1];
    if (value > 1250u) {
        return false;
    }
    *tenths_celsius = value;
    return true;
}

int main(void)
{
    const uint8_t valid_reading[] = {0x00u, 0xfau};
    const uint8_t out_of_range[] = {0x05u, 0xdcu};
    struct sensor_driver driver = {{0u}, 0u, 0u, DMA_CPU_IDLE};
    uint16_t temperature = 0u;

    assert(driver_start_receive(&driver));
    assert(!driver_start_receive(&driver));
    assert(!driver_read_temperature(&driver, &temperature));
    assert(test_hardware_write(&driver, valid_reading, sizeof valid_reading));
    assert(!driver_complete_from_interrupt(&driver,
                                           sizeof valid_reading, false));
    assert(driver_complete_from_interrupt(&driver,
                                          sizeof valid_reading, true));
    assert(driver_read_temperature(&driver, &temperature));
    assert(temperature == 250u);

    assert(driver_start_receive(&driver));
    assert(test_hardware_write(&driver, out_of_range, sizeof out_of_range));
    assert(driver_complete_from_interrupt(&driver,
                                          sizeof out_of_range, true));
    /* TEST: a complete DMA transfer can still contain invalid external data. */
    assert(!driver_read_temperature(&driver, &temperature));
    assert(driver.state == DMA_CPU_IDLE);
    {
        const uint8_t malformed[DMA_BUFFER_SIZE] = {0u};
        const size_t lengths[] = {0u, 1u, 3u, DMA_BUFFER_SIZE};
        size_t index = 0u;
        for (index = 0u; index < sizeof lengths / sizeof lengths[0]; index++) {
            assert(driver_start_receive(&driver));
            assert(test_hardware_write(&driver, malformed, lengths[index]));
            assert(driver_complete_from_interrupt(&driver, lengths[index], true));
            assert(!driver_read_temperature(&driver, &temperature));
            assert(driver.state == DMA_CPU_IDLE && temperature == 250u);
        }
        assert(driver_start_receive(&driver));
        assert(test_hardware_write(&driver, valid_reading, sizeof valid_reading));
        assert(driver_complete_from_interrupt(&driver, sizeof valid_reading, true));
        assert(driver_read_temperature(&driver, &temperature));
    }
    return 0;
}
`
    }
  ]
};
