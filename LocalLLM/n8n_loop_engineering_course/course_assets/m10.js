window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-d3a09da878",
  "questions": {
    "q01": {
      "options": {
        "A": "Item processing does not automatically create every possible condition-controlled feedback loop.",
        "B": "Most nodes already operate across incoming items, so an explicit loop is often unnecessary.",
        "C": "Multiple inputs do not universally disable the Loop Over Items node.",
        "D": "Execute Once restricts node execution behavior rather than repeat everything until all work completes."
      }
    },
    "q02": {
      "options": {
        "A": "A node already processing each contact may not need an extra explicit iteration structure.",
        "B": "Suitable native pagination can manage page retrieval without a separate manually wired loop.",
        "C": "A final summary belongs after iteration rather than justifying a repeated enrichment body.",
        "D": "Explicit batching supports a multi-node body that processes a limited group and returns after pacing."
      }
    },
    "q03": {
      "options": {
        "A": "Batch Size 1 releases one input item on each iteration through the loop output.",
        "B": "One-item batching does not mean the done path is permanently skipped.",
        "C": "Batch sizing does not inherently combine all input records into one object.",
        "D": "Releasing one item does not force all downstream work to execute concurrently."
      }
    },
    "q04": {
      "options": {
        "A": "The loop output drives repeated work, while done represents completion of iteration.",
        "B": "Done does not automatically alter every downstream node's execution mode.",
        "C": "The done branch continues after the node has finished releasing its input items or batches.",
        "D": "Completion output does not itself initialize all remote pagination state before the first request."
      }
    },
    "q05": {
      "options": {
        "A": "A wait placed before any items enter does not pace individual loop-body requests.",
        "B": "Waiting after the API operation and before returning to the loop spaces successive iterations.",
        "C": "Waiting only after completion does not limit the rate of earlier API calls.",
        "D": "Quiz-page behavior is unrelated to workflow-node pacing for remote service calls."
      }
    },
    "q06": {
      "options": {
        "A": "Bounded retries can handle genuinely transient outages, network failures, or eligible rate-limit responses.",
        "B": "Permanent invalid schemas need correction rather than repeated identical failing submissions.",
        "C": "Retry settings do not repair missing connections that prevent intended loop progression.",
        "D": "One-time completion actions belong on the correct path rather than being supplied by retry behavior."
      }
    },
    "q07": {
      "options": {
        "A": "Downstream node count alone does not determine whether an API's pagination options fit.",
        "B": "Native pagination is useful specifically when multiple supported pages need retrieval.",
        "C": "Retrying non-idempotent writes without safeguards can duplicate effects rather than justify pagination.",
        "D": "Use native options when they match the API and avoid unnecessary custom page-state management."
      }
    },
    "q08": {
      "options": {
        "A": "Reset does not simply discard every input after the initial iteration.",
        "B": "Reset does not remove the item-handling behavior implemented by downstream nodes.",
        "C": "Reset reinitializes iteration from current input for specific designs needing dynamic batches or page data.",
        "D": "Reset can contribute to repeated work and does not itself prove termination."
      }
    },
    "q09": {
      "options": {
        "A": "Condition-driven loops need a valid stopping rule and practical iteration or time bounds.",
        "B": "Completion actions inside the repeated body can run many times rather than once.",
        "C": "Larger batches do not authorize bypassing rate limits imposed by the remote service.",
        "D": "Removing a customer identifier does not establish progress or a correct termination condition."
      }
    },
    "q10": {
      "options": {
        "A": "Loop counters may change across executions and should not replace stable domain identifiers.",
        "B": "Item outcomes still need explicit status rather than inference solely from loop position.",
        "C": "An iteration counter does not prove that the corresponding external action succeeded.",
        "D": "Internal run and remaining-item state can support diagnostics and conditions without establishing business identity or success."
      }
    },
    "q11": {
      "options": {
        "A": "Stable identifiers preserve correspondence but do not change sequential batching into parallel release.",
        "B": "IDs do not prevent HTTP nodes from returning normal response content.",
        "C": "Carrying source identifiers maintains the relationship between transformed items and their later results or updates.",
        "D": "A record identifier does not override configured retry limits or justify unlimited attempts."
      }
    },
    "q12": {
      "options": {
        "A": "Changing Reset without diagnosis can repeat or lose production work unexpectedly.",
        "B": "Inspect actual item flow, batch settings, and loop-return and completion connections before changing the design.",
        "C": "Moving completion work into the repeated body can create duplicate final actions.",
        "D": "Removing identity makes reconciliation harder rather than revealing why the wrong number of items was processed."
      }
    }
  }
};
