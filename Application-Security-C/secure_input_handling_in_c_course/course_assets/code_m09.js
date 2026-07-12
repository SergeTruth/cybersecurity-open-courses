window.COURSE_CODE_MODULE = {
  "title": "Code Example: A Complete Validation Pattern",
  "codeExamples": [
    {
      "title": "A Complete Validation Pattern",
      "language": "c",
      "code": String.raw`#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define LINE_CAP 128U
#define NAME_CAP 32U

struct request {
    char name[NAME_CAP];
    int count;
};

static void drain_line(FILE *stream)
{
    int ch;

    while ((ch = fgetc(stream)) != '\n' && ch != EOF) {
    }
}

static int valid_name_char(unsigned char ch)
{
    return (ch >= (unsigned char)'A' && ch <= (unsigned char)'Z') ||
           (ch >= (unsigned char)'a' && ch <= (unsigned char)'z') ||
           (ch >= (unsigned char)'0' && ch <= (unsigned char)'9') ||
           ch == (unsigned char)'_' || ch == (unsigned char)'-';
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

int parse_request_line(const char *line, struct request *request)
{
    const char *count_text;
    char name[NAME_CAP] = {0};
    char *end = NULL;
    long count;
    size_t index;
    size_t name_length;

    if (line == NULL || request == NULL) {
        return -1;
    }
    /* Grammar: name, one or more spaces/tabs, decimal count, then end. */
    name_length = strcspn(line, " \t");
    if (name_length == 0U || name_length >= NAME_CAP ||
        line[name_length] == '\0') {
        return -1;
    }
    for (index = 0U; index < name_length; index++) {
        if (!valid_name_char((unsigned char)line[index])) {
            return -1;
        }
    }

    count_text = line + name_length;
    while (*count_text == ' ' || *count_text == '\t') {
        count_text++;
    }
    if (*count_text == '\0' || strpbrk(count_text, " \t") != NULL ||
        !canonical_decimal(count_text)) {
        return -1;
    }

    errno = 0;
    count = strtol(count_text, &end, 10);
    if (errno != 0 || end == count_text || *end != '\0' ||
        count < 1L || count > 100L) {
        return -1;
    }

    memcpy(name, line, name_length);
    name[name_length] = '\0';
    memcpy(request->name, name, sizeof(name));
    request->count = (int)count;
    return 0;
}

int read_request(FILE *stream, struct request *request)
{
    char line[LINE_CAP] = {0};
    char *newline;
    size_t line_length;

    if (stream == NULL || request == NULL) {
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

    return parse_request_line(line, request);
}
`
    }
  ]
};
