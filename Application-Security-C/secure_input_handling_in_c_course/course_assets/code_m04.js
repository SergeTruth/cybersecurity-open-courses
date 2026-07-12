window.COURSE_CODE_MODULE = {
  "title": "Code Example: Bounded Line Read and Exact Parse",
  "codeExamples": [
    {
      "title": "Bounded Line Read and Exact Parse",
      "language": "c",
      "code": String.raw`#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define LINE_CAP 80U
#define NAME_CAP 32U
static void drain_line(FILE *stream)
{
    int ch;

    while ((ch = fgetc(stream)) != '\n' && ch != EOF) {
    }
}

static int ascii_letter(unsigned char ch)
{
    return (ch >= (unsigned char)'A' && ch <= (unsigned char)'Z') ||
           (ch >= (unsigned char)'a' && ch <= (unsigned char)'z');
}

static int canonical_decimal(const char *text)
{
    size_t index;

    if (text[0] < '1' || text[0] > '9') {
        return 0;
    }
    for (index = 1U; text[index] != '\0'; index++) {
        if (text[index] < '0' || text[index] > '9') {
            return 0;
        }
    }
    return 1;
}

int read_name_and_age(FILE *stream, char name[NAME_CAP], int *age)
{
    const char *age_text;
    char line[LINE_CAP] = {0};
    char parsed_name[NAME_CAP] = {0};
    char *end = NULL;
    char *newline;
    long parsed_age;
    size_t index;
    size_t line_length;
    size_t name_length;

    if (stream == NULL || name == NULL || age == NULL) {
        return -1;
    }
    if (fgets(line, (int)sizeof(line), stream) == NULL) {
        return -1;
    }

    newline = memchr(line, '\n', sizeof(line));
    if (newline == NULL) {
        drain_line(stream);
        return -1;
    }
    line_length = (size_t)(newline - line);
    if (memchr(line, '\0', line_length) != NULL) {
        return -1;
    }
    *newline = '\0';

    /* Grammar: name, one or more spaces/tabs, decimal age, then end. */
    name_length = strcspn(line, " \t");
    if (name_length == 0U || name_length >= NAME_CAP ||
        line[name_length] == '\0') {
        return -1;
    }
    for (index = 0U; index < name_length; index++) {
        if (!ascii_letter((unsigned char)line[index])) {
            return -1;
        }
    }

    age_text = line + name_length;
    while (*age_text == ' ' || *age_text == '\t') {
        age_text++;
    }
    if (*age_text == '\0' || strpbrk(age_text, " \t") != NULL ||
        !canonical_decimal(age_text)) {
        return -1;
    }

    errno = 0;
    parsed_age = strtol(age_text, &end, 10);
    if (errno != 0 || end == age_text || *end != '\0' ||
        parsed_age < 13L || parsed_age > 120L) {
        return -1;
    }

    memcpy(parsed_name, line, name_length);
    parsed_name[name_length] = '\0';
    memcpy(name, parsed_name, sizeof(parsed_name));
    *age = (int)parsed_age;
    return 0;
}
`
    }
  ]
};
