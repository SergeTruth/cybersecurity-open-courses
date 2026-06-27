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


  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function token(value, className) {
    return className
      ? '<span class="' + className + '">' + escapeHtml(value) + '</span>'
      : escapeHtml(value);
  }

  function isIdentifierStart(character) {
    return /[A-Za-z_]/.test(character);
  }

  function isIdentifierPart(character) {
    return /[A-Za-z0-9_]/.test(character);
  }

  function isStringStart(source, index) {
    var cursor = index;
    var prefix = "";
    while (cursor < source.length && /[rRuUbBfF]/.test(source.charAt(cursor)) && prefix.length < 3) {
      prefix += source.charAt(cursor);
      cursor += 1;
    }
    return source.charAt(cursor) === "'" || source.charAt(cursor) === '"' ? cursor : -1;
  }

  function readPythonString(source, index) {
    var quoteIndex = isStringStart(source, index);
    var quote = source.charAt(quoteIndex);
    var triple = source.substr(quoteIndex, 3) === quote + quote + quote;
    var cursor = quoteIndex + (triple ? 3 : 1);

    while (cursor < source.length) {
      if (source.charAt(cursor) === "\\" && !triple) {
        cursor += 2;
        continue;
      }
      if (triple && source.substr(cursor, 3) === quote + quote + quote) {
        cursor += 3;
        break;
      }
      if (!triple && source.charAt(cursor) === quote) {
        cursor += 1;
        break;
      }
      cursor += 1;
    }

    return source.slice(index, cursor);
  }

  function highlightPythonCode() {
    var keywords = {
      "False": true, "None": true, "True": true, "and": true, "as": true, "assert": true,
      "async": true, "await": true, "break": true, "case": true, "class": true, "continue": true,
      "def": true, "del": true, "elif": true, "else": true, "except": true, "finally": true,
      "for": true, "from": true, "global": true, "if": true, "import": true, "in": true,
      "is": true, "lambda": true, "match": true, "nonlocal": true, "not": true, "or": true,
      "pass": true, "raise": true, "return": true, "try": true, "while": true, "with": true,
      "yield": true
    };
    var builtins = {
      "BaseModel": true, "Boolean": true, "ConfigDict": true, "Decimal": true, "EmailStr": true,
      "Exception": true, "FastAPI": true, "Field": true, "HTTPException": true, "InvalidOperation": true,
      "Path": true, "TypeError": true, "ValidationError": true, "ValueError": true, "bool": true,
      "dict": true, "int": true, "isinstance": true, "json": true, "len": true, "list": true,
      "object": true, "os": true, "print": true, "range": true, "set": true, "sorted": true,
      "str": true
    };

    var blocks = document.querySelectorAll(".code-block code");
    Array.prototype.forEach.call(blocks, function (block) {
      if (block.dataset.highlighted === "true") return;

      var source = block.textContent || "";
      var output = "";
      var index = 0;
      var expectName = "";

      while (index < source.length) {
        var character = source.charAt(index);
        var stringStart = isStringStart(source, index);

        if (character === "#") {
          var commentEnd = source.indexOf("\n", index);
          if (commentEnd === -1) commentEnd = source.length;
          output += token(source.slice(index, commentEnd), "tok-comment");
          index = commentEnd;
          continue;
        }

        if (stringStart !== -1) {
          var stringToken = readPythonString(source, index);
          output += token(stringToken, "tok-string");
          index += stringToken.length;
          continue;
        }

        if (character === "@" && isIdentifierStart(source.charAt(index + 1))) {
          var decoratorEnd = index + 1;
          while (decoratorEnd < source.length && /[A-Za-z0-9_.]/.test(source.charAt(decoratorEnd))) {
            decoratorEnd += 1;
          }
          output += token(source.slice(index, decoratorEnd), "tok-decorator");
          index = decoratorEnd;
          continue;
        }

        if (/[0-9]/.test(character)) {
          var numberEnd = index + 1;
          while (numberEnd < source.length && /[A-Za-z0-9_.]/.test(source.charAt(numberEnd))) {
            numberEnd += 1;
          }
          output += token(source.slice(index, numberEnd), "tok-number");
          index = numberEnd;
          continue;
        }

        if (isIdentifierStart(character)) {
          var wordEnd = index + 1;
          while (wordEnd < source.length && isIdentifierPart(source.charAt(wordEnd))) {
            wordEnd += 1;
          }

          var word = source.slice(index, wordEnd);
          var nextCharacterIndex = wordEnd;
          while (/\s/.test(source.charAt(nextCharacterIndex))) nextCharacterIndex += 1;

          if (expectName === "def") {
            output += token(word, "tok-function-name");
            expectName = "";
          } else if (expectName === "class") {
            output += token(word, "tok-class-name");
            expectName = "";
          } else if (keywords[word]) {
            output += token(word, "tok-keyword");
            if (word === "def" || word === "class") expectName = word;
          } else if (builtins[word]) {
            output += token(word, "tok-builtin");
          } else if (source.charAt(nextCharacterIndex) === "(") {
            output += token(word, "tok-function");
          } else {
            output += escapeHtml(word);
          }

          index = wordEnd;
          continue;
        }

        if (/[+\-*%=!<>|&^~:,.()[\]{}]/.test(character)) {
          output += token(character, "tok-punctuation");
          index += 1;
          continue;
        }

        output += escapeHtml(character);
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
    highlightPythonCode();
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
