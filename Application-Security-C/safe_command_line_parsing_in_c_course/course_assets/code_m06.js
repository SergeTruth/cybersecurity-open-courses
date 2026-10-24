window.COURSE_CODE_MODULE = {
  "title": "File Paths and Resource Arguments",
  "codeIntro": "Apply a documented lexical workspace-name policy before constructing a candidate path. This string check does not establish filesystem containment.",
  "codeExamples": [
    {
      "title": "Validate a lexical workspace name and role",
      "language": "c",
      "blurb": "The tool constructs a lexical candidate only. Production containment needs directory-anchored platform operations plus an explicit symlink, mount, and check/use race policy.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <string.h>

typedef enum {
    INPUT_CONFIG,
    OUTPUT_REPORT
} ResourceRole;

static bool is_name_character(char ch)
{
    return (ch >= 'a' && ch <= 'z') ||
           (ch >= 'A' && ch <= 'Z') ||
           (ch >= '0' && ch <= '9') || ch == '.' || ch == '_' || ch == '-';
}

static bool has_suffix(const char *text, size_t length, const char *suffix)
{
    const size_t suffix_length = strlen(suffix);
    return length >= suffix_length &&
           memcmp(text + length - suffix_length, suffix, suffix_length) == 0;
}

static bool make_workspace_path(const char *root, const char *name,
                                ResourceRole role, char *out, size_t capacity)
{
    size_t root_length = 0u;
    size_t name_length = 0u;
    size_t i = 0u;
    size_t required = 0u;
    char leaf_copy[64] = {0};

    if (root == NULL || name == NULL || out == NULL || capacity == 0u ||
        (role != INPUT_CONFIG && role != OUTPUT_REPORT)) {
        return false;
    }
    root_length = strlen(root);
    name_length = strlen(name);
    if (root_length == 0u || name_length == 0u || name_length > 63u ||
        strcmp(name, ".") == 0 || strcmp(name, "..") == 0) {
        return false;
    }
    for (i = 0u; i < name_length; i++) {
        if (!is_name_character(name[i])) {
            return false;
        }
    }
    if ((role == INPUT_CONFIG && !has_suffix(name, name_length, ".cfg")) ||
        (role == OUTPUT_REPORT && !has_suffix(name, name_length, ".report"))) {
        return false;
    }

    /* LEXICAL CHECK ONLY: validate size before building the candidate.
       Open relative to a trusted directory handle for real containment. */
    if (root_length > SIZE_MAX - name_length - 2u) {
        return false;
    }
    required = root_length + 1u + name_length + 1u;
    if (required > capacity) {
        return false;
    }

    /* Both root and name may alias output: snapshot the bounded leaf first. */
    memcpy(leaf_copy, name, name_length + 1u);
    memmove(out, root, root_length);
    out[root_length] = '/';
    memcpy(out + root_length + 1u, leaf_copy, name_length + 1u);
    return true;
}

int main(void)
{
    char path[64] = {0};

    /* TEST: names are rooted and checked according to their resource role. */
    assert(make_workspace_path("workspace", "build.cfg", INPUT_CONFIG,
                               path, sizeof path));
    assert(strcmp(path, "workspace/build.cfg") == 0);
    assert(make_workspace_path("workspace", "scan.report", OUTPUT_REPORT,
                               path, sizeof path));

    /* TEST: traversal, absolute syntax, wrong roles, and short buffers fail. */
    assert(!make_workspace_path("workspace", "../build.cfg", INPUT_CONFIG,
                                path, sizeof path));
    assert(!make_workspace_path("workspace", "/build.cfg", INPUT_CONFIG,
                                path, sizeof path));
    assert(!make_workspace_path("workspace", "build.report", INPUT_CONFIG,
                                path, sizeof path));
    assert(!make_workspace_path("workspace", "build.cfg", INPUT_CONFIG,
                                path, 8u));
    assert(!make_workspace_path("workspace", "payload.exe", (ResourceRole)99,
                                path, sizeof path));
    {
        char in_place[64] = "workspace";
        assert(make_workspace_path(in_place, "build.cfg", INPUT_CONFIG,
                                   in_place, sizeof in_place));
        assert(strcmp(in_place, "workspace/build.cfg") == 0);
        memcpy(in_place, "build.cfg", 10u);
        assert(make_workspace_path("workspace", in_place, INPUT_CONFIG,
                                   in_place, sizeof in_place));
        assert(strcmp(in_place, "workspace/build.cfg") == 0);
    }
    return 0;
}
`
    }
  ]
};
