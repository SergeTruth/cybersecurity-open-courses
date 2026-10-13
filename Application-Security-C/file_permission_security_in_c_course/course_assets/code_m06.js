window.COURSE_CODE_MODULE = {
  "title": "Sensitive Files, Logs, and Temporary Output",
  "codeIntro": "Keep diagnostic output short-lived and redact sensitive values before they reach even a temporary stream.",
  "codeExamples": [
    {
      "title": "Redacted audit data in an automatically cleaned stream",
      "language": "c",
      "blurb": "The audit writer validates that a credential exists but records only a fixed redaction marker; closing the temporary stream performs cleanup.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <string.h>

static bool write_export_audit(FILE *stream, const char *credential)
{
    if (stream == NULL || credential == NULL || credential[0] == '\\0') {
        return false;
    }
    /* IMPORTANT FIX: sensitive content never enters the diagnostic stream. */
    return fputs("export completed; credential=[redacted]\\n", stream) >= 0;
}

int main(void)
{
    static const char credential[] = "customer-token-42";
    char line[64];
    FILE *temporary = tmpfile();

    assert(temporary != NULL);
    assert(write_export_audit(temporary, credential));
    assert(fflush(temporary) == 0);
    assert(fseek(temporary, 0L, SEEK_SET) == 0);
    assert(fgets(line, sizeof line, temporary) != NULL);

    /* TEST: the temporary output contains the marker, not the credential. */
    assert(strstr(line, "[redacted]") != NULL);
    assert(strstr(line, credential) == NULL);
    assert(!write_export_audit(NULL, credential));
    assert(!write_export_audit(temporary, ""));
    assert(fclose(temporary) == 0);
    return 0;
}
`
    }
  ]
};
