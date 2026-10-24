window.COURSE_CODE_MODULE = {
  "title": "Command Paths and Program Selection: code example",
  "codeIntro": "Program-path selection should use a reviewed absolute path instead of ambient search order. The path allowlist is only one control: deployment must also protect parent directories and verify ownership, permissions, file type, and executable identity with platform-appropriate mechanisms.",
  "codeExamples": [
    {
      "title": "Vulnerable: basename relies on ambient search paths",
      "language": "c",
      "blurb": "The launcher accepts a bare helper name, leaving executable identity to PATH and current-directory behavior outside the reviewed contract.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

static bool program_selected(const char *configured_name)
{
    /* IMPORTANT DEFECT: any nonempty name is treated as program identity. */
    return configured_name != NULL && configured_name[0] != '\0';
}

int main(void)
{
    assert(program_selected("report-helper"));
    /* TEST: a basename with unknown search resolution was accepted. */
    return 0;
}
`
    },
    {
      "title": "Safer: select only reviewed absolute program paths",
      "language": "c",
      "blurb": "The selection boundary rejects search names and accepts only known installation paths. This does not prove object identity if a path component or file can be replaced; trusted deployment and platform-specific executable verification remain required.",
      "code": String.raw`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>

static bool program_selected(const char *path)
{
    if (path == NULL || path[0] != '/') {
        return false;
    }
    /* IMPORTANT FIX: program-path selection is an explicit allowlist. */
    /* Deployment must separately protect and verify the selected object. */
    return strcmp(path, "/usr/libexec/report-helper") == 0 ||
           strcmp(path, "/opt/app/bin/report-helper") == 0;
}

int main(void)
{
    assert(program_selected("/usr/libexec/report-helper"));
    /* TEST: search names, relative paths, and other binaries fail closed. */
    assert(!program_selected("report-helper"));
    assert(!program_selected("./report-helper"));
    assert(!program_selected("/tmp/report-helper"));
    return 0;
}
`
    }
  ]
};
