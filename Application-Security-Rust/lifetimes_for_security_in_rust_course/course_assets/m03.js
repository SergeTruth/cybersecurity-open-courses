window.COURSE_MODULE = {
  "title": "Lifetime Inference, Elision, and Annotations",
  "graphicAlt": "A returned borrow is tied to a specific input; lifetime annotations express that relationship without extending the owner's life.",
  "narration": "Most Rust code uses lifetimes without writing explicit lifetime annotations. The compiler can infer many relationships from ownership, borrowing, and scope. That is why common functions can accept references and return ordinary values without becoming cluttered with lifetime names.\n\nLifetime elision rules keep common signatures readable. They do not remove the underlying model. They simply allow developers to omit lifetime names when the relationship is obvious enough for the compiler to apply standard rules. The safety check is still present even when the annotation is not written.\n\nExplicit annotations become useful when a function has multiple references and the relationship between inputs and outputs must be stated. For example, a function may return a reference that is tied to one specific input. In that case, the annotation is part of the API contract.\n\nThe key lesson is that annotations do not make data live longer. They document a relationship the code must already satisfy. If a local value is cleaned up when a function returns, no lifetime annotation can make a reference to that local value valid for the caller.\n\nDefensive Rust avoids lifetime cargo culting. Do not add lifetime names mechanically just to satisfy a compiler error. Ask what relationship the API needs to express. If there is no valid borrowed owner for the caller, return owned data. If the relationship is real, make it clear through the signature.",
  "narrationPoints": [
    "Most Rust code uses lifetimes without writing explicit.",
    "Lifetime elision rules keep common signatures readable.",
    "Explicit annotations become useful.",
    "The key lesson is that annotations do not make data live.",
    "Defensive Rust avoids lifetime cargo culting.",
    "The compiler can infer many relationships from ownership."
  ]
};
