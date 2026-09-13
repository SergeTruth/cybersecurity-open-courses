window.COURSE_MODULE = {
  "title": "Course Summary: Borrow Checker Checklist",
  "graphicAlt": "A borrow-checking review identifies the owner, chooses access, shortens borrows, and matches API intent.",
  "narration": "Borrow checker fundamentals are a practical way to design clearer Rust code. Start by identifying who owns each value. Then decide who only needs temporary access. Borrow when ownership is not needed. Take ownership when responsibility really moves. Return owned data when a reference cannot safely outlive the function that created it.\n\nUse shared references for reading and mutable references for controlled changes. Keep mutable borrows narrow. Avoid mixing unrelated work into the same borrow scope. Separate read phases from write phases when collections or state transitions make access patterns difficult to express.\n\nUse lifetimes as design feedback. Lifetime annotations describe relationships; they do not extend data. When lifetime errors appear, ask whether the owner lives long enough, whether the function should return owned data, or whether the structure should own its fields instead of borrowing them.\n\nIn functions, structs, collections, loops, and APIs, choose owned, borrowed, or shared data intentionally. Avoid unnecessary cloning that only hides uncertainty, but do not reject cloning or owned data when it is the clearest way to express independent responsibility.\n\nThe borrow checker is not an enemy. It is a design partner that makes unsafe relationships visible early. With practice, its feedback helps developers write Rust code with safe references, clear ownership, controlled mutation, and reviewable data flow across applications, services, libraries, and systems components.",
  "narrationPoints": [
    "Borrow checker fundamentals are a practical way to design.",
    "Use shared references for reading and mutable references.",
    "Use lifetimes as design feedback.",
    "In functions, structs, collections, loops, and APIs, choose.",
    "The borrow checker is not an enemy.",
    "Avoid mixing unrelated work into the same borrow scope."
  ]
};
