window.COURSE_CODE_MODULE = {
  "title": "Stack Discipline in Constrained Systems",
  "codeIntro": "Replace recursive traversal with caller-budgeted work storage so worst-case stack demand and exhaustion behavior are explicit.",
  "codeExamples": [
    {
      "title": "Traverse a tree with a bounded work stack",
      "language": "c",
      "blurb": "The iterative function uses a caller-owned pointer array and rejects a traversal whose pending nodes exceed that reviewed budget.",
      "code": `/* Test checks are active even with -DNDEBUG; each expression runs once. */
#define CHECK(condition) do { if (!(condition)) { \\
    (void)fprintf(stderr, "check failed: %s at line %d\\n", \\
                  #condition, __LINE__); return 1; \\
} } while (0)
#include <limits.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>

typedef struct tree_node {
    int value;
    const struct tree_node *left;
    const struct tree_node *right;
} tree_node;

static bool tree_sum_bounded(const tree_node *root,
                             const tree_node **work, size_t work_capacity,
                             int *sum)
{
    size_t used = 0U;
    int total = 0;

    if (root == NULL || work == NULL || work_capacity == 0U || sum == NULL) {
        return false;
    }
    work[used] = root;
    used += 1U;

    while (used != 0U) {
        const tree_node *current = work[used - 1U];
        size_t children = 0U;

        used -= 1U;
        if ((current->value > 0 && total > INT_MAX - current->value) ||
            (current->value < 0 && total < INT_MIN - current->value)) {
            return false;
        }
        total += current->value;
        children = (current->left != NULL ? 1U : 0U) +
                   (current->right != NULL ? 1U : 0U);

        /* IMPORTANT FIX: reject before the explicit work stack can fill. */
        if (children > work_capacity - used) {
            return false;
        }
        if (current->right != NULL) {
            work[used] = current->right;
            used += 1U;
        }
        if (current->left != NULL) {
            work[used] = current->left;
            used += 1U;
        }
    }
    *sum = total;
    return true;
}

int main(void)
{
    const tree_node left = { 2, NULL, NULL };
    const tree_node right = { 3, NULL, NULL };
    const tree_node root = { 1, &left, &right };
    const tree_node *work[2] = { NULL, NULL };
    int sum = 99;

    /* TEST: the reviewed two-entry work budget handles this tree. */
    CHECK(tree_sum_bounded(&root, work, 2U, &sum));
    CHECK(sum == 6);

    /* TEST: a smaller budget rejects and leaves the output unchanged. */
    sum = 99;
    CHECK(!tree_sum_bounded(&root, work, 1U, &sum));
    CHECK(sum == 99);

    puts("bounded stack traversal tests passed");
    return 0;
}
`
    }
  ]
};
