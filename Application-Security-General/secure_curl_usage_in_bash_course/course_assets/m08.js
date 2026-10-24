window.COURSE_MODULE = {
  "title": "Output, Downloads, Files, and Pipelines",
  "graphicAlt": "A response is stored safely and validated before the next operation, with metadata kept separate and unexpected output stopped.",
  "narration": "curl output often feeds the next step in a Bash workflow. It may be written to a file, piped to a parser, saved as an artifact, uploaded elsewhere, or used to make a deployment decision. That output should be treated as data crossing a trust boundary.\n\nOutput paths should be validated before writing. A script should avoid accidental overwrites, unsupported directories, and ambiguous filenames. Downloads should be stored in approved locations with permissions appropriate for the data and the next process that will consume it.\n\nHeaders and bodies should be separated when the workflow requires it. Mixing metadata, diagnostic information, and response content can make parsing fragile. A script should know which stream or file contains data and which contains evidence about the request.\n\nDownloaded content should be checked where practical. Expected size, type, checksum, or signature verification can provide assurance that the script received what the workflow expects. Not every file has a signature, but when verification data is available, use it as part of the automation design.\n\nPipelines should not blindly trust response content before high-impact actions. A parser should handle empty, malformed, redirected, or unexpected responses. If later steps deploy, configure, or approve something based on the response, the script needs validation before that decision.\n\nGood output handling makes curl automation safer and easier to operate. Operators should know where output went, whether it was accepted, and what happened when expectations were not met, without logs becoming a source of sensitive data exposure.",
  "narrationPoints": [
    "curl output often feeds the next step in a Bash workflow.",
    "A script should avoid accidental overwrites, unsupported directories, and ambiguous filenames.",
    "Headers and bodies should be separated when the workflow requires it.",
    "Expected size, type, checksum, or signature verification can provide assurance that the script received what the workflow expects.",
    "Pipelines should not blindly trust response content before high-impact actions.",
    "Good output handling makes curl automation safer and easier to operate."
  ]
};
