window.COURSE_CODE_MODULE={"title":"Containers, Strings, and Nested Allocations","codeIntro":"An owning container must release replaced strings, return removed ownership explicitly, and destroy every remaining element.","codeExamples":[{"title":"Manage an owning string table","language":"c","blurb":"Insertion duplicates bytes, replacement frees the old string, removal returns ownership, and destruction visits every slot.","code":`#include <assert.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TABLE_SIZE 3U
typedef struct { char *items[TABLE_SIZE]; } string_table;

static char *duplicate_text(const char *text, size_t length)
{
    char *copy = NULL;
    if (text == NULL || length == SIZE_MAX) return NULL;
    copy = malloc(length + 1U);
    if (copy != NULL) { (void)memcpy(copy, text, length); copy[length] = 0; }
    return copy;
}
static bool table_replace(string_table *table, size_t index, const char *text, size_t length)
{
    char *copy = NULL;
    if (table == NULL || index >= TABLE_SIZE) return false;
    copy = duplicate_text(text, length); if (copy == NULL) return false;
    /* IMPORTANT FIX: release the owned old element before replacement. */
    free(table->items[index]); table->items[index] = copy; return true;
}
static char *table_remove_owned(string_table *table, size_t index)
{ char *r = NULL; if (table != NULL && index < TABLE_SIZE) { r=table->items[index];table->items[index]=NULL;} return r; }
static void table_destroy(string_table *table)
{ size_t i=0U; if(table!=NULL)for(i=0U;i<TABLE_SIZE;++i){free(table->items[i]);table->items[i]=NULL;} }

int main(void)
{
    string_table table = { { NULL, NULL, NULL } };
    char *removed = NULL;
    assert(table_replace(&table,0U,"old",3U));
    assert(table_replace(&table,0U,"new",3U));
    assert(strcmp(table.items[0],"new")==0);
    /* TEST: removal returns ownership; destruction releases remaining items. */
    removed=table_remove_owned(&table,0U);assert(removed!=NULL&&table.items[0]==NULL);free(removed);
    assert(table_replace(&table,1U,"kept",4U));table_destroy(&table);assert(table.items[1]==NULL);
    puts("owning container tests passed");return 0;
}
`} ]};
