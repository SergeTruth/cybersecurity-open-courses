window.COURSE_CODE_MODULE = {
  "title": "Detection, Tooling, and Review Practices",
  "codeIntro": "Exercise allocation, partial failure, replacement, removal, and cleanup under leak instrumentation.",
  "codeExamples": [
    {
      "title": "Leak regression probe",
      "language": "c",
      "blurb": "A small owned list performs repeated insertion and complete iterative cleanup for leak tools to observe.",
      "code": "#include <assert.h>\n#include <stdbool.h>\n#include <stdio.h>\n#include <stdlib.h>\ntypedef struct node{int value;struct node *next;}node;\nstatic bool push(node **head,int value){node *n=NULL;if(head==NULL)return false;n=malloc(sizeof *n);if(n==NULL)return false;n->value=value;n->next=*head;*head=n;return true;}\nstatic void clear(node **head){if(head!=NULL)while(*head!=NULL){node *old=*head;*head=old->next;free(old);}}\nint main(void){node *head=NULL;size_t round=0U;/* TEST: repeated ownership cycles finish with no live head. */for(round=0U;round<100U;++round){assert(push(&head,1));assert(push(&head,2));clear(&head);assert(head==NULL);}/* IMPORTANT FIX: keep failure and cleanup paths in instrumented tests. */assert(!push(NULL,3));clear(&head);puts(\"leak regression probe passed\");return 0;}\n"
    },
    {
      "title": "Build and run with leak detection",
      "language": "bash",
      "blurb": "Compile the exact probe with strict warnings and sanitizers, then enable leak reporting.",
      "code": "set -eu\ngcc -std=c17 -Wall -Wextra -Wpedantic -Wconversion -Wshadow -Werror   -fsanitize=address,undefined -fno-sanitize-recover=all -fno-omit-frame-pointer   leak_probe.c -o leak_probe\nASAN_OPTIONS=detect_leaks=1 ./leak_probe\n"
    }
  ]
};
