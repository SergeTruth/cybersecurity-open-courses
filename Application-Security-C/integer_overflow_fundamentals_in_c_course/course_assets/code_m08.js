window.COURSE_CODE_MODULE = {
  "title": "Checked Arithmetic and Defensive Patterns",
  "codeIntro": "Compose checked helpers with an explicit rejection policy so overflowed or over-quota totals never become usable results.",
  "codeExamples": [
    {
      "title": "Calculate a fail-closed resource charge",
      "language": "c",
      "blurb": "Checked multiplication and addition preserve the caller's output on failure, then a business cap rejects representable but unacceptable totals.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>

static bool checked_multiply_u32(uint32_t left, uint32_t right,
                                 uint32_t *product)
{
    if (product == NULL || (left != 0U && right > UINT32_MAX / left)) {
        return false;
    }
    *product = left * right;
    return true;
}

static bool checked_add_u32(uint32_t left, uint32_t right, uint32_t *sum)
{
    if (sum == NULL || right > UINT32_MAX - left) {
        return false;
    }
    *sum = left + right;
    return true;
}

static bool calculate_charge(uint32_t units, uint32_t cost_per_unit,
                             uint32_t service_fee, uint32_t *charge)
{
    const uint32_t policy_limit = UINT32_C(1000000);
    uint32_t subtotal = 0U;
    uint32_t candidate = 0U;

    if (charge == NULL ||
        !checked_multiply_u32(units, cost_per_unit, &subtotal) ||
        !checked_add_u32(subtotal, service_fee, &candidate) ||
        candidate > policy_limit) {
        return false;
    }

    /* IMPORTANT FIX: publish only a representable, policy-approved result. */
    *charge = candidate;
    return true;
}

int main(void)
{
    uint32_t charge = UINT32_C(77);

    /* TEST: an accepted calculation produces the complete charge. */
    assert(calculate_charge(200U, 30U, 50U, &charge));
    assert(charge == UINT32_C(6050));

    /* TEST: multiplication, addition, and policy failures preserve output. */
    charge = UINT32_C(77);
    assert(!calculate_charge(UINT32_MAX, 2U, 0U, &charge));
    assert(charge == UINT32_C(77));
    assert(!calculate_charge(UINT32_MAX, 1U, 1U, &charge));
    assert(charge == UINT32_C(77));
    assert(!calculate_charge(500001U, 2U, 0U, &charge));
    assert(charge == UINT32_C(77));

    puts("checked arithmetic policy tests passed");
    return 0;
}
`
    }
  ]
};
