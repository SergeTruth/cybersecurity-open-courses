window.COURSE_CODE_MODULE = {
  "title": "Defensive Deallocation Patterns",
  "codeIntro": "Make owned and borrowed fields visible, and replace owned data only after the new allocation is ready.",
  "codeExamples": [
    {
      "title": "Transactional replacement of an owned field",
      "language": "c",
      "blurb": "The setter copies first, preserves the old value on rejection, and the destroy routine frees only the field the service owns.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdlib.h>
#include <string.h>

struct service {
    char *owned_label;
    const char *borrowed_region;
};

static void service_init(struct service *service, const char *region)
{
    service->owned_label = NULL;
    service->borrowed_region = region;
}

static bool service_replace_label(struct service *service,
                                  const char *label, size_t label_len)
{
    char *replacement;

    if (service == NULL || label == NULL || label_len == 0U || label_len > 31U) {
        return false;
    }
    replacement = malloc(label_len + 1U);
    if (replacement == NULL) {
        return false;
    }
    memcpy(replacement, label, label_len);
    replacement[label_len] = '\\0';

    /* IMPORTANT FIX: construct the replacement before releasing the old value. */
    free(service->owned_label);
    service->owned_label = replacement;
    return true;
}

static void service_destroy(struct service *service)
{
    if (service == NULL) {
        return;
    }
    free(service->owned_label);
    service->owned_label = NULL;
    /* borrowed_region belongs to the caller and is never freed here. */
    service->borrowed_region = NULL;
}

int main(void)
{
    static const char region[] = "east";
    static const char too_long[] = "this label is deliberately much too long";
    struct service service;

    service_init(&service, region);
    assert(service_replace_label(&service, "api", 3U));
    assert(strcmp(service.owned_label, "api") == 0);
    assert(service_replace_label(&service, "worker", 6U));
    assert(strcmp(service.owned_label, "worker") == 0);

    /* TEST: rejection preserves the currently owned allocation. */
    assert(!service_replace_label(&service, too_long, sizeof too_long - 1U));
    assert(strcmp(service.owned_label, "worker") == 0);
    assert(strcmp(service.borrowed_region, "east") == 0);

    service_destroy(&service);
    assert(service.owned_label == NULL && service.borrowed_region == NULL);
    assert(strcmp(region, "east") == 0);
    return 0;
}
`
    }
  ]
};
