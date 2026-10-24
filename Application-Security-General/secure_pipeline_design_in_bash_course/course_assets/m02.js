window.COURSE_MODULE = {
  "title": "How Bash Pipelines Work",
  "graphicAlt": "Standard output feeds the next command while standard error and exit results remain separate for each command.",
  "narration": "A Bash pipeline connects the standard output of one command to the standard input of another. That basic model is simple, but it is worth slowing down on the details. Standard output is the data stream being passed forward. Standard error is separate unless the script redirects it intentionally.\n\nThat distinction matters for parsing and logging. A tool may write machine-readable data to standard output while writing warnings or diagnostics to standard error. If a script mixes the streams carelessly, downstream stages may process error messages as if they were data, or logs may miss the evidence needed to explain a failure.\n\nA pipeline is not one simple command. It is several commands connected by streams. Each command has its own behavior, output, error stream, and exit status. Some elements may run in subshells, which can affect variables and state. A change made inside part of a pipeline may not be visible where the author expects.\n\nBash reports pipeline status according to shell rules. If the script only looks at the final command, it may miss an earlier failure. That can create false confidence when a final formatting or filtering step completes successfully after receiving empty or invalid upstream data.\n\nThe secure mental model is multiple processes with separate streams and results. When you design a pipeline with that model, you are more likely to separate stdout and stderr intentionally, check important stages, and avoid treating the pipeline as a black box.",
  "narrationPoints": [
    "A Bash pipeline connects the standard output of one command to the standard input of another.",
    "A tool may write machine-readable data to standard output while writing warnings or diagnostics to standard error.",
    "Each command has its own behavior, output, error stream, and exit status.",
    "Bash reports pipeline status according to shell rules.",
    "The secure mental model is multiple processes with separate streams and results.",
    "Standard output is the data stream being passed forward."
  ]
};
