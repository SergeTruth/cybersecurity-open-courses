window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Template Injection and Unsafe Dynamic Rendering through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Reject caller-selected template source",
      "language": "python",
      "blurb": "The renderer maps a business document type to one installed template and never passes caller text to from_string or a template compiler.",
      "code": "from jinja2 import Environment\n\nDOCUMENT_TEMPLATES = {\n    \"invoice\": \"documents/invoice.html\",\n    \"receipt\": \"documents/receipt.html\",\n}\n\ndef render_document(environment: Environment, document_type: str, context: dict[str, object]) -> str:\n    template_name = DOCUMENT_TEMPLATES.get(document_type)\n    if template_name is None:\n        raise ValueError(\"document template rejected\")\n    if set(context) != {\"number\", \"total\"}:\n        raise ValueError(\"document context rejected\")\n    return environment.get_template(template_name).render(**context)\n"
    },
    {
      "title": "Inspect installed templates for unsafe constructs",
      "language": "python",
      "blurb": "A deployment check parses server-owned Jinja templates and rejects includes or extensions outside a documented feature subset before publication.",
      "code": "from jinja2 import Environment, FileSystemLoader, nodes\n\nFORBIDDEN_NODES = (nodes.Call, nodes.CallBlock, nodes.Extends, nodes.Import, nodes.FromImport)\n\ndef audit_template(environment: Environment, template_name: str) -> None:\n    source, _filename, _current = environment.loader.get_source(environment, template_name)\n    syntax = environment.parse(source)\n    if any(any(syntax.find_all(kind)) for kind in FORBIDDEN_NODES):\n        raise ValueError(\"template uses a forbidden construct\")\n    for include in syntax.find_all(nodes.Include):\n        if not isinstance(include.template, nodes.Const) or not str(include.template.value).startswith(\"components/\"):\n            raise ValueError(\"dynamic or unapproved include rejected\")\n\ndef audited_environment(root: str) -> Environment:\n    return Environment(loader=FileSystemLoader(root), autoescape=True)\n"
    }
  ]
};
