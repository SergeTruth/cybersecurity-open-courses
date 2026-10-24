window.COURSE_MODULE = {
  "title": "Temporary Files, Process Substitution, and Intermediate Data",
  "graphicAlt": "Named pipeline steps use protected temporary files or streams, with narrow cleanup and no accidental artifact publication.",
  "narration": "Not every pipeline should remain a single dense line. When a pipeline becomes complex, it may be safer to break it into named steps. Intermediate results can be inspected, validated, logged at a safe level, or reused without forcing reviewers to mentally execute a long chain of commands.\n\nTemporary files can make pipelines clearer, but they must be handled safely. A script should create them in an appropriate location, use permissions suitable for the data, avoid predictable or shared unsafe names, and clean them up deliberately. Temporary data is still data, and it may need protection.\n\nIntermediate data can be sensitive. It may contain secrets, customer data, operational details, deployment decisions, file inventories, or vulnerability reports. If that data would be sensitive in a normal file, it is sensitive in a temporary file, process substitution stream, captured variable, or build artifact.\n\nProcess substitution can improve readability in some cases because it lets tools consume generated streams without forcing everything into one pipeline. It is still part of the data-flow design and should be reviewed for lifecycle, sensitivity, and compatibility assumptions.\n\nAvoid accidental artifact or log exposure. Intermediate files should not be copied into build outputs, left behind in workspaces, or dumped into diagnostic logs by default. A secure pipeline protects intermediate data with the same seriousness as final output.",
  "narrationPoints": [
    "Not every pipeline should remain a single dense line.",
    "Temporary files can make pipelines clearer, but they must be handled safely.",
    "If that data would be sensitive in a normal file, it is sensitive in a temporary file, process substitution stream, captured variable, or build artifact.",
    "Process substitution can improve readability in some cases because it lets tools consume generated streams without forcing everything into one pipeline.",
    "Intermediate files should not be copied into build outputs, left behind in workspaces, or dumped into diagnostic logs by default.",
    "When a pipeline becomes complex, it may be safer to break it into named steps."
  ]
};
