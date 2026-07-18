(function () {
  "use strict";

  var languageAliases = {
    asm: "asm",
    assembly: "asm",
    nasm: "asm",
    masm: "asm",
    js: "javascript",
    javascript: "javascript",
    jsx: "javascript",
    ts: "typescript",
    typescript: "typescript",
    tsx: "typescript",
    py: "python",
    python: "python",
    sh: "bash",
    shell: "bash",
    bash: "bash",
    zsh: "bash",
    ps1: "powershell",
    pwsh: "powershell",
    powershell: "powershell",
    c: "c",
    h: "c",
    cpp: "cpp",
    cxx: "cpp",
    cc: "cpp",
    hpp: "cpp",
    "c++": "cpp",
    cs: "csharp",
    csharp: "csharp",
    "c#": "csharp",
    java: "java",
    go: "go",
    golang: "go",
    rs: "rust",
    rust: "rust",
    sql: "sql",
    json: "json",
    yaml: "yaml",
    yml: "yaml",
    html: "markup",
    xml: "markup",
    css: "css",
    dockerfile: "dockerfile",
    docker: "dockerfile",
    text: "text",
    plaintext: "text"
  };

  var keywordSets = {
    asm: [
      "add", "and", "assume", "call", "cli", "cmp", "db", "dd", "dec", "div", "dw",
      "end", "endp", "ends", "equ", "far", "inc", "int", "iret", "je", "jmp", "jne",
      "jnz", "label", "lea", "les", "mov", "near", "offset", "or", "org", "pop",
      "proc", "ptr", "push", "pushf", "ret", "segment", "shr", "sti", "sub", "test",
      "xor"
    ],
    javascript: [
      "async", "await", "break", "case", "catch", "class", "const", "continue", "debugger",
      "default", "delete", "do", "else", "export", "extends", "finally", "for", "from",
      "function", "if", "import", "in", "instanceof", "let", "new", "of", "return",
      "static", "super", "switch", "this", "throw", "try", "typeof", "var", "void",
      "while", "yield"
    ],
    typescript: [
      "abstract", "any", "as", "async", "await", "boolean", "break", "case", "catch",
      "class", "const", "continue", "declare", "default", "delete", "do", "else", "enum",
      "export", "extends", "finally", "for", "from", "function", "if", "implements",
      "import", "in", "instanceof", "interface", "keyof", "let", "module", "namespace",
      "new", "never", "number", "of", "private", "protected", "public", "readonly",
      "return", "static", "string", "super", "switch", "this", "throw", "try", "type",
      "typeof", "unknown", "var", "void", "while"
    ],
    python: [
      "and", "as", "assert", "async", "await", "break", "class", "continue", "def",
      "del", "elif", "else", "except", "False", "finally", "for", "from", "global",
      "if", "import", "in", "is", "lambda", "None", "nonlocal", "not", "or", "pass",
      "raise", "return", "True", "try", "while", "with", "yield"
    ],
    bash: [
      "case", "cd", "done", "do", "elif", "else", "esac", "fi", "for", "function",
      "if", "in", "local", "read", "select", "set", "shift", "then", "until", "while"
    ],
    powershell: [
      "begin", "break", "catch", "class", "continue", "data", "do", "dynamicparam",
      "else", "elseif", "end", "enum", "filter", "finally", "for", "foreach", "from",
      "function", "if", "in", "param", "process", "return", "switch", "throw", "trap",
      "try", "until", "using", "var", "while"
    ],
    c: [
      "auto", "break", "case", "char", "const", "continue", "default", "do", "double",
      "else", "enum", "extern", "float", "for", "goto", "if", "inline", "int", "long",
      "register", "restrict", "return", "short", "signed", "sizeof", "static", "struct",
      "switch", "typedef", "union", "unsigned", "void", "volatile", "while"
    ],
    cpp: [
      "alignas", "alignof", "auto", "bool", "break", "case", "catch", "char", "class",
      "concept", "const", "constexpr", "continue", "decltype", "default", "delete", "do",
      "double", "else", "enum", "explicit", "export", "extern", "false", "float", "for",
      "friend", "if", "inline", "int", "long", "mutable", "namespace", "new", "noexcept",
      "nullptr", "operator", "private", "protected", "public", "return", "short", "signed",
      "sizeof", "static", "struct", "switch", "template", "this", "throw", "true", "try",
      "typedef", "typename", "union", "unsigned", "using", "virtual", "void", "volatile",
      "while"
    ],
    csharp: [
      "abstract", "as", "async", "await", "base", "bool", "break", "case", "catch",
      "class", "const", "continue", "decimal", "default", "delegate", "do", "double",
      "else", "enum", "event", "explicit", "extern", "false", "finally", "fixed", "float",
      "for", "foreach", "if", "implicit", "in", "int", "interface", "internal", "is",
      "lock", "namespace", "new", "null", "object", "out", "override", "params", "private",
      "protected", "public", "readonly", "record", "ref", "return", "sealed", "static",
      "string", "struct", "switch", "this", "throw", "true", "try", "typeof", "using",
      "var", "virtual", "void", "while"
    ],
    java: [
      "abstract", "assert", "boolean", "break", "byte", "case", "catch", "char", "class",
      "const", "continue", "default", "do", "double", "else", "enum", "extends", "false",
      "final", "finally", "float", "for", "if", "implements", "import", "instanceof", "int",
      "interface", "long", "native", "new", "null", "package", "private", "protected",
      "public", "return", "short", "static", "strictfp", "super", "switch", "synchronized",
      "this", "throw", "throws", "transient", "true", "try", "void", "volatile", "while"
    ],
    go: [
      "break", "case", "chan", "const", "continue", "default", "defer", "else", "fallthrough",
      "for", "func", "go", "goto", "if", "import", "interface", "map", "package", "range",
      "return", "select", "struct", "switch", "type", "var"
    ],
    rust: [
      "as", "async", "await", "break", "const", "continue", "crate", "dyn", "else", "enum",
      "extern", "false", "fn", "for", "if", "impl", "in", "let", "loop", "match", "mod",
      "move", "mut", "pub", "ref", "return", "self", "Self", "static", "struct", "super",
      "trait", "true", "type", "unsafe", "use", "where", "while"
    ],
    sql: [
      "alter", "and", "as", "asc", "between", "by", "case", "create", "delete", "desc",
      "distinct", "drop", "else", "end", "exists", "from", "group", "having", "in", "inner",
      "insert", "into", "is", "join", "left", "like", "limit", "not", "null", "on", "or",
      "order", "outer", "right", "select", "set", "table", "then", "union", "update",
      "values", "when", "where"
    ],
    css: [
      "display", "position", "absolute", "relative", "fixed", "grid", "flex", "block",
      "inline", "none", "color", "background", "border", "margin", "padding", "width",
      "height", "font", "content"
    ],
    dockerfile: [
      "add", "arg", "cmd", "copy", "entrypoint", "env", "expose", "from", "healthcheck",
      "label", "maintainer", "onbuild", "run", "shell", "stopsignal", "user", "volume",
      "workdir"
    ]
  };

  var registers = words([
    "ax", "bx", "cx", "dx", "ah", "al", "bh", "bl", "ch", "cl", "dh", "dl",
    "cs", "ds", "es", "ss", "sp", "bp", "si", "di", "ip", "flags"
  ]);

  function words(list) {
    var map = {};
    list.forEach(function (word) { map[word.toLowerCase()] = true; });
    return map;
  }

  Object.keys(keywordSets).forEach(function (language) {
    keywordSets[language] = words(keywordSets[language]);
  });

  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function span(className, value) {
    return '<span class="' + className + '">' + escapeHtml(value) + "</span>";
  }

  function normalizeLanguage(language) {
    var value = String(language || "text").toLowerCase();
    return languageAliases[value] || value;
  }

  function tokenClass(token, language) {
    var normalized = token.replace(/:$/, "").toLowerCase();
    var keywords = keywordSets[language] || {};

    if (/^["'`]/.test(token)) return "tok-string";
    if (/^[0-9a-f]+h$/i.test(token) || /^0x[0-9a-f]+$/i.test(token) || /^\d+(?:\.\d+)?$/.test(token)) return "tok-number";
    if (language === "asm" && registers[normalized]) return "tok-register";
    if (/:$/.test(token)) return "tok-label";
    if (keywords[normalized]) return "tok-keyword";
    if (language === "powershell" && /^-[A-Za-z][A-Za-z0-9-]*$/.test(token)) return "tok-parameter";
    if (language === "bash" && /^--?[A-Za-z0-9][A-Za-z0-9-]*$/.test(token)) return "tok-parameter";
    return "";
  }

  function highlightTokens(code, language) {
    var pattern = /(`[^`]*`|"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|--?[A-Za-z0-9][A-Za-z0-9-]*|[A-Za-z_.$#@][A-Za-z0-9_.$#@-]*:?|0x[0-9A-Fa-f]+|[0-9A-Fa-f]+h|\d+(?:\.\d+)?)/g;
    var output = "";
    var cursor = 0;
    var match;

    while ((match = pattern.exec(code)) !== null) {
      output += escapeHtml(code.slice(cursor, match.index));
      var token = match[0];
      var className = tokenClass(token, language);
      output += className ? span(className, token) : escapeHtml(token);
      cursor = match.index + token.length;
    }

    output += escapeHtml(code.slice(cursor));
    return output;
  }

  function lineCommentIndex(line, language) {
    if (language === "python" || language === "bash" || language === "powershell" || language === "dockerfile") {
      return line.indexOf("#");
    }
    if (language === "sql") return line.indexOf("--");
    if (language === "asm") return line.indexOf(";");
    if (language === "markup") return line.indexOf("<!--");
    return line.indexOf("//");
  }

  function highlightLine(line, language) {
    var commentIndex = lineCommentIndex(line, language);
    if (commentIndex === -1) return highlightTokens(line, language);

    if (language === "markup") {
      return highlightTokens(line.slice(0, commentIndex), language) +
        span("tok-comment", line.slice(commentIndex));
    }

    return highlightTokens(line.slice(0, commentIndex), language) +
      span("tok-comment", line.slice(commentIndex));
  }

  function highlightJson(source) {
    return escapeHtml(source)
      .replace(/(&quot;[^&]*?&quot;)(\s*:)/g, '<span class="tok-keyword">$1</span>$2')
      .replace(/(:\s*)(&quot;[^&]*?&quot;)/g, '$1<span class="tok-string">$2</span>')
      .replace(/\b(true|false|null)\b/g, '<span class="tok-keyword">$1</span>')
      .replace(/\b(-?\d+(?:\.\d+)?)\b/g, '<span class="tok-number">$1</span>');
  }

  function highlightYaml(source) {
    return escapeHtml(source)
      .replace(/^(\s*[-]?\s*)([A-Za-z0-9_.-]+)(\s*:)/gm, '$1<span class="tok-keyword">$2</span>$3')
      .replace(/(&quot;[^&]*?&quot;|'[^']*?')/g, '<span class="tok-string">$1</span>')
      .replace(/\b(true|false|null)\b/g, '<span class="tok-keyword">$1</span>')
      .replace(/\b(-?\d+(?:\.\d+)?)\b/g, '<span class="tok-number">$1</span>');
  }

  function highlightMarkup(source) {
    return escapeHtml(source)
      .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="tok-comment">$1</span>')
      .replace(/(&lt;\/?)([A-Za-z0-9:-]+)/g, '$1<span class="tok-keyword">$2</span>')
      .replace(/([A-Za-z_:][-A-Za-z0-9_:.]*)(=)/g, '<span class="tok-label">$1</span>$2')
      .replace(/(&quot;[^&]*?&quot;|'[^']*?')/g, '<span class="tok-string">$1</span>');
  }

  function highlightCode(source, language) {
    var normalized = normalizeLanguage(language);
    if (normalized === "text") return escapeHtml(source);
    if (normalized === "json") return highlightJson(source);
    if (normalized === "yaml") return highlightYaml(source);
    if (normalized === "markup") return highlightMarkup(source);

    return String(source || "")
      .replace(/\r/g, "")
      .split("\n")
      .map(function (line) { return highlightLine(line, normalized); })
      .join("\n");
  }

  function replaceChildren(element) {
    while (element.firstChild) element.removeChild(element.firstChild);
  }

  function textElement(tag, className, text) {
    var element = document.createElement(tag);
    if (className) element.className = className;
    element.textContent = text || "";
    return element;
  }

  function codeAssetBase() {
    var meta = document.getElementById("module-meta");
    if (!meta || meta.dataset.quiz === "true") return "";
    return (meta.dataset.audio || meta.dataset.narration || "").trim();
  }

  function loadCodeData(callback) {
    if (window.COURSE_CODE_MODULE && typeof window.COURSE_CODE_MODULE === "object") {
      callback();
      return;
    }

    var base = codeAssetBase();
    if (!base) return;

    var script = document.createElement("script");
    script.src = "course_assets/code_" + base + ".js";
    script.onload = callback;
    script.onerror = function () {
      var card = document.querySelector(".code-example-card");
      if (card) card.classList.add("code-example-card-hidden");
    };
    document.head.appendChild(script);
  }

  function renderExample(target, example, index) {
    var article = document.createElement("article");
    article.className = "code-example";

    var titleId = "code-example-" + String(index + 1);
    var heading = textElement("h3", "code-example-title", example.title || "Code Example " + String(index + 1));
    heading.id = titleId;
    article.appendChild(heading);

    if (example.blurb) {
      article.appendChild(textElement("p", "code-example-blurb", example.blurb));
    }

    var figure = document.createElement("figure");
    figure.className = "code-figure";

    var pre = document.createElement("pre");
    pre.className = "code-block";
    pre.tabIndex = 0;
    pre.setAttribute("aria-labelledby", titleId);

    var language = normalizeLanguage(example.language || "text");
    var code = document.createElement("code");
    code.className = "language-" + language;
    code.innerHTML = highlightCode(example.code || "", language);

    pre.appendChild(code);
    figure.appendChild(pre);
    article.appendChild(figure);
    target.appendChild(article);
  }

  function renderCodeExamples() {
    var card = document.querySelector(".code-example-card");
    var target = document.querySelector("[data-code-examples-target]");
    if (!card || !target) return;

    var moduleData = window.COURSE_CODE_MODULE && typeof window.COURSE_CODE_MODULE === "object"
      ? window.COURSE_CODE_MODULE
      : {};
    var examples = Array.isArray(moduleData.codeExamples) ? moduleData.codeExamples : [];

    if (!examples.length) {
      card.classList.add("code-example-card-hidden");
      return;
    }

    replaceChildren(target);

    if (moduleData.title) {
      var heading = card.querySelector("h2");
      if (heading) heading.textContent = moduleData.title;
    }

    if (moduleData.codeIntro) {
      target.appendChild(textElement("p", "code-example-intro", moduleData.codeIntro));
    }

    examples.forEach(function (example, index) {
      renderExample(target, example || {}, index);
    });

    card.classList.remove("code-example-card-hidden");
  }

  onReady(function () {
    loadCodeData(renderCodeExamples);
  });

  window.CourseCodeExamples = {
    render: renderCodeExamples,
    highlight: highlightCode
  };
})();
