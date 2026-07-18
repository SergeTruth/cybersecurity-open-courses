(function () {
  "use strict";

  var meta;
  var connected = false;
  var state = {
    module: 1,
    total: 1,
    completed: [],
    quizPassed: false,
    quizStatus: "in progress"
  };

  function text(id, value) {
    var element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function moduleNumber() {
    return meta ? Number(meta.dataset.module || 1) : 1;
  }

  function totalModules() {
    return meta ? Number(meta.dataset.total || 1) : 1;
  }

  function isQuiz() {
    return Boolean(meta && meta.dataset.quiz === "true");
  }

  function setProgress(value) {
    text("progress", "Progress: " + value);
  }

  function storageKey() {
    return (document.body.dataset.courseId || "course") + ":progress";
  }

  function defaultState() {
    return {
      module: moduleNumber(),
      total: totalModules(),
      completed: [],
      quizPassed: false,
      quizStatus: "in progress"
    };
  }

  function parseState(value) {
    try {
      var parsed = JSON.parse(value || "{}");
      if (!Array.isArray(parsed.completed)) parsed.completed = [];
      parsed.quizPassed = parsed.quizPassed === true;
      parsed.quizStatus = parsed.quizStatus || (parsed.quizPassed ? "passed" : "in progress");
      return parsed;
    } catch (error) {
      return defaultState();
    }
  }

  function loadState() {
    var saved = "";
    if (connected) saved = SCORM.getValue("cmi.suspend_data");
    if (!saved) {
      try {
        saved = localStorage.getItem(storageKey()) || "";
      } catch (error) {
        saved = "";
      }
    }
    state = saved ? parseState(saved) : defaultState();
    state.module = moduleNumber();
    state.total = totalModules();
  }

  function saveState() {
    var serialized = JSON.stringify(state);
    try {
      localStorage.setItem(storageKey(), serialized);
    } catch (error) {
      // LMS persistence remains available when local storage is blocked.
    }
    if (!connected) return;
    SCORM.setValue("cmi.core.lesson_location", String(moduleNumber()));
    SCORM.setValue("cmi.suspend_data", serialized);
  }

  function recordModuleView() {
    if (isQuiz()) return false;

    var current = moduleNumber();
    if (state.completed.indexOf(current) === -1) {
      state.completed.push(current);
      state.completed.sort(function (a, b) { return a - b; });
    }

    setProgress("completed");
    if (connected) {
      var status = SCORM.getValue("cmi.core.lesson_status");
      if (status !== "passed" && status !== "completed") {
        SCORM.setValue("cmi.core.lesson_status", "incomplete");
      }
      saveState();
      SCORM.commit();
    } else {
      saveState();
    }
    return true;
  }

  function recordQuizResult(passed) {
    state.quizPassed = Boolean(passed);
    state.quizStatus = passed ? "passed" : "failed";
    setProgress(state.quizStatus);
    saveState();
  }

  function connect() {
    connected = Boolean(window.SCORM && SCORM.initialize());
    text(
      "lms-message",
      connected
        ? "Connected to LMS."
        : "LMS API not found. Running in preview mode."
    );

    loadState();

    if (isQuiz()) {
      var quizStatus = connected ? SCORM.getValue("cmi.core.lesson_status") : state.quizStatus;
      if (quizStatus === "passed" || quizStatus === "failed") {
        state.quizPassed = quizStatus === "passed";
        state.quizStatus = quizStatus;
      }
      setProgress(state.quizStatus);
      saveState();
      if (connected) SCORM.commit();
      return;
    }

    recordModuleView();
  }

  function initializeGraphic() {
    var graphic = document.querySelector(".module-graphic");
    if (!graphic) return;

    function toggle() {
      var card = graphic.closest(".graphic-card");
      if (!card) return;
      var expanded = card.classList.toggle("is-expanded");
      graphic.setAttribute("aria-expanded", String(expanded));
    }

    graphic.addEventListener("click", toggle);
    graphic.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      }
    });
  }



  function escapeCodeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function codeToken(value, className) {
    return className
      ? '<span class="' + className + '">' + escapeCodeHtml(value) + '</span>'
      : escapeCodeHtml(value);
  }

  function isIdentifierStart(character) {
    return /[A-Za-z_]/.test(character);
  }

  function isIdentifierPart(character) {
    return /[A-Za-z0-9_]/.test(character);
  }

  function readCppString(source, index) {
    var quote = source.charAt(index);
    var cursor = index + 1;

    while (cursor < source.length) {
      if (source.charAt(cursor) === "\\") {
        cursor += 2;
        continue;
      }
      if (source.charAt(cursor) === quote) {
        cursor += 1;
        break;
      }
      cursor += 1;
    }

    return source.slice(index, cursor);
  }

  function highlightCppCode() {
    var keywords = {
      "alignas": true, "alignof": true, "auto": true, "break": true, "case": true, "catch": true,
      "class": true, "concept": true, "const": true, "consteval": true, "constexpr": true,
      "constinit": true, "continue": true, "co_await": true, "co_return": true, "co_yield": true,
      "decltype": true, "default": true, "delete": true, "do": true, "else": true, "enum": true,
      "explicit": true, "export": true, "extern": true, "for": true, "friend": true, "goto": true,
      "if": true, "import": true, "inline": true, "namespace": true, "new": true, "noexcept": true,
      "operator": true, "private": true, "protected": true, "public": true, "requires": true,
      "return": true, "sizeof": true, "static": true, "static_assert": true, "struct": true,
      "switch": true, "template": true, "this": true, "throw": true, "try": true, "typedef": true,
      "typeid": true, "typename": true, "using": true, "virtual": true, "while": true
    };
    var types = {
      "bool": true, "char": true, "char8_t": true, "char16_t": true, "char32_t": true,
      "double": true, "float": true, "int": true, "long": true, "short": true, "signed": true,
      "unsigned": true, "void": true, "size_t": true, "uint8_t": true, "uint16_t": true,
      "uint32_t": true, "string": true, "string_view": true, "array": true, "vector": true,
      "optional": true, "path": true, "error_code": true, "errc": true, "istream": true,
      "istringstream": true
    };
    var builtins = {
      "false": true, "nullptr": true, "std": true, "true": true, "nullopt": true,
      "cerr": true, "cout": true, "endl": true
    };

    var blocks = document.querySelectorAll(".code-block code");
    Array.prototype.forEach.call(blocks, function (block) {
      if (block.dataset.highlighted === "true") return;

      var pre = block.closest(".code-block");
      var language = pre ? pre.getAttribute("data-lang") || "" : "";
      if (language && language !== "cpp" && language !== "c++") return;

      var source = block.textContent || "";
      var output = "";
      var index = 0;
      var lineStart = true;

      while (index < source.length) {
        var character = source.charAt(index);
        var next = source.charAt(index + 1);

        if (lineStart && character === "#") {
          var directiveEnd = source.indexOf("\n", index);
          if (directiveEnd === -1) directiveEnd = source.length;
          output += codeToken(source.slice(index, directiveEnd), "tok-preprocessor");
          index = directiveEnd;
          lineStart = false;
          continue;
        }

        if (character === "/" && next === "/") {
          var lineEnd = source.indexOf("\n", index);
          if (lineEnd === -1) lineEnd = source.length;
          output += codeToken(source.slice(index, lineEnd), "tok-comment");
          index = lineEnd;
          lineStart = false;
          continue;
        }

        if (character === "/" && next === "*") {
          var blockEnd = source.indexOf("*/", index + 2);
          if (blockEnd === -1) blockEnd = source.length - 2;
          var comment = source.slice(index, blockEnd + 2);
          output += codeToken(comment, "tok-comment");
          lineStart = comment.indexOf("\n") !== -1;
          index = blockEnd + 2;
          continue;
        }

        if (character === '"' || character === "'") {
          var stringToken = readCppString(source, index);
          output += codeToken(stringToken, character === '"' ? "tok-string" : "tok-char");
          lineStart = false;
          index += stringToken.length;
          continue;
        }

        if (/[0-9]/.test(character)) {
          var numberEnd = index + 1;
          while (numberEnd < source.length && /[A-Za-z0-9_.]/.test(source.charAt(numberEnd))) {
            numberEnd += 1;
          }
          output += codeToken(source.slice(index, numberEnd), "tok-number");
          lineStart = false;
          index = numberEnd;
          continue;
        }

        if (isIdentifierStart(character)) {
          var wordEnd = index + 1;
          while (wordEnd < source.length && isIdentifierPart(source.charAt(wordEnd))) {
            wordEnd += 1;
          }

          var word = source.slice(index, wordEnd);
          var nextIndex = wordEnd;
          while (nextIndex < source.length && /\s/.test(source.charAt(nextIndex))) nextIndex += 1;

          if (keywords[word]) {
            output += codeToken(word, "tok-keyword");
          } else if (types[word]) {
            output += codeToken(word, "tok-type");
          } else if (builtins[word]) {
            output += codeToken(word, "tok-builtin");
          } else if (source.charAt(nextIndex) === "(") {
            output += codeToken(word, "tok-function");
          } else {
            output += escapeCodeHtml(word);
          }

          lineStart = false;
          index = wordEnd;
          continue;
        }

        if (/[+\-*%=!<>|&^~?:;,.()[\]{}#]/.test(character)) {
          output += codeToken(character, "tok-punctuation");
          lineStart = false;
          index += 1;
          continue;
        }

        output += escapeCodeHtml(character);
        if (character === "\n") {
          lineStart = true;
        } else if (!/\s/.test(character)) {
          lineStart = false;
        }
        index += 1;
      }

      block.innerHTML = output;
      block.dataset.highlighted = "true";
    });
  }


  document.addEventListener("DOMContentLoaded", function () {
    meta = document.getElementById("module-meta");
    connect();
    initializeGraphic();
    highlightCppCode();
  });

  window.addEventListener("beforeunload", function () {
    if (connected && window.SCORM) SCORM.terminate();
  });

  window.CourseRuntime = {
    getModule: moduleNumber,
    getTotal: totalModules,
    isConnected: function () { return connected; },
    isQuiz: isQuiz,
    recordQuizResult: recordQuizResult,
    setProgress: setProgress
  };
})();
