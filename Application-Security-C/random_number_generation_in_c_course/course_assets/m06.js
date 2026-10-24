window.COURSE_MODULE = {
  "title": "Random Ranges and Bias Avoidance",
  "graphicAlt": "Large source-value container has an accepted evenly mappable region blue and excluded remainder amber.",
  "narration": "Many programs need a random value in a bounded range: an index, a retry slot, a selection from a list, or a shuffled position. Turning random bytes or integers into a range is not only a formatting step. The mapping can introduce bias if it is done carelessly.\n\nSimple modulo reduction can bias results when the source range is not evenly divisible by the target range. Some outputs become slightly more likely than others. The impact depends on the use case, but where fairness or security matters, biased mapping is a real design issue.\n\nRejection sampling is a common conceptual approach for unbiased bounded values. The idea is to accept only source values that map evenly into the target range and retry when the value falls outside that acceptable region. The exact implementation should come from a reviewed helper or approved library pattern rather than improvised at each call site.\n\nRange functions should validate that the requested range is meaningful and non-empty. A helper should handle edge cases such as zero range, inverted bounds, maximum values, and type conversions deliberately. These checks are separate from the strength of the underlying random source.\n\nShuffling and selection logic should use unbiased index generation where fairness or security matters. Code review should check range mapping separately from random byte generation. A good source can still be weakened by poor mapping, and a careful mapping cannot make a weak source suitable for sensitive values.",
  "narrationPoints": [
    "Many programs need a random value in a bounded range: an index, a retry slot, a selection from a list.",
    "The impact depends on the use case, but where fairness or security matters, biased mapping is a real design issue.",
    "The exact implementation should come from a reviewed helper or approved library pattern rather than improvised at each call site.",
    "Range functions should validate that the requested range is meaningful and non-empty.",
    "Code review should check range mapping separately from random byte generation."
  ]
};
