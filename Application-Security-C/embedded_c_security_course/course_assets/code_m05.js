window.COURSE_CODE_MODULE = {
  "title": "Secure Boot and Firmware Integrity: code example",
  "codeIntro": "Signature validity is one secure-boot input; product identity, version policy, and image bounds must also pass before boot.",
  "codeExamples": [
    {
      "title": "Vulnerable: valid signature is the entire boot policy",
      "language": "c",
      "blurb": "The decision accepts a signed image intended for another product and an older version because no compatibility policy is checked.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

struct image_manifest {
    bool signature_valid;
    uint32_t product_id;
    uint32_t version;
    size_t image_length;
};

static bool boot_allows(const struct image_manifest *image)
{
    /* IMPORTANT DEFECT: authenticity alone does not establish suitability. */
    return image != NULL && image->signature_valid;
}

int main(void)
{
    const struct image_manifest wrong_product =
        { true, 99u, 1u, 4096u };

    assert(boot_allows(&wrong_product));
    /* TEST: a signed image for product 99 was accepted without policy. */
    return 0;
}
`
    },
    {
      "title": "Safer: enforce the complete boot policy",
      "language": "c",
      "blurb": "The policy combines the platform verifier's signature result with target compatibility, anti-rollback, and image-size limits.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

struct image_manifest {
    bool signature_valid;
    uint32_t product_id;
    uint32_t version;
    size_t image_length;
};

struct boot_policy {
    uint32_t product_id;
    uint32_t minimum_version;
    size_t partition_capacity;
};

static bool boot_allows(const struct image_manifest *image,
                        const struct boot_policy *policy)
{
    /* IMPORTANT FIX: all release constraints must pass together. */
    return image != NULL && policy != NULL && image->signature_valid &&
           image->product_id == policy->product_id &&
           image->version >= policy->minimum_version &&
           image->image_length > 0u &&
           image->image_length <= policy->partition_capacity;
}

int main(void)
{
    const struct boot_policy policy = { 42u, 7u, 8192u };
    const struct image_manifest valid = { true, 42u, 8u, 4096u };
    const struct image_manifest rollback = { true, 42u, 6u, 4096u };
    const struct image_manifest wrong_product = { true, 99u, 8u, 4096u };

    assert(boot_allows(&valid, &policy));
    /* TEST: signed but unsuitable images fail closed. */
    assert(!boot_allows(&rollback, &policy));
    assert(!boot_allows(&wrong_product, &policy));
    return 0;
}
`
    }
  ]
};
