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

  function readQuoted(source, index) {
    var quote = source.charAt(index);
    var cursor = index + 1;

    while (cursor < source.length) {
      if (source.charAt(cursor) === "\\" && quote !== "'") {
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

  function highlightGpuDriverCode() {
    var shellKeywords = {
      "case": true, "do": true, "done": true, "else": true, "esac": true, "fi": true,
      "for": true, "function": true, "if": true, "in": true, "then": true, "while": true
    };
    var shellCommands = {
      "apt-cache": true, "apt-mark": true, "awk": true, "cat": true, "clinfo": true,
      "curl": true, "date": true, "dkms": true, "dmesg": true, "docker": true, "dpkg-query": true,
      "find": true, "getent": true, "grep": true, "head": true, "id": true, "journalctl": true,
      "ldconfig": true, "ls": true, "lspci": true, "lsmod": true, "mkdir": true, "modinfo": true,
      "mokutil": true, "nvidia-container-cli": true, "nvidia-smi": true, "nvcc": true,
      "printf": true, "rocminfo": true, "rocm-smi": true, "rpm": true, "sed": true,
      "sort": true, "tee": true, "test": true, "uname": true, "vulkaninfo": true
    };
    var pythonKeywords = {
      "False": true, "None": true, "True": true, "and": true, "as": true, "class": true,
      "def": true, "elif": true, "else": true, "for": true, "from": true, "if": true,
      "import": true, "in": true, "is": true, "not": true, "or": true, "pass": true,
      "raise": true, "return": true, "try": true, "while": true, "with": true
    };
    var pythonBuiltins = {
      "Path": true, "SystemExit": true, "dict": true, "encoding": true, "getattr": true,
      "json": true, "len": true, "list": true, "platform": true, "print": true,
      "range": true, "round": true, "str": true, "time": true, "torch": true, "tuple": true
    };

    var blocks = document.querySelectorAll(".code-block code");
    Array.prototype.forEach.call(blocks, function (block) {
      if (block.dataset.highlighted === "true") return;

      var pre = block.closest(".code-block");
      var language = pre ? pre.getAttribute("data-lang") || "" : "";
      var source = block.textContent || "";
      var output = "";
      var index = 0;

      while (index < source.length) {
        var character = source.charAt(index);

        if (character === "#") {
          var commentEnd = source.indexOf("\n", index);
          if (commentEnd === -1) commentEnd = source.length;
          output += codeToken(source.slice(index, commentEnd), "tok-comment");
          index = commentEnd;
          continue;
        }

        if (character === "'" || character === '"') {
          var stringToken = readQuoted(source, index);
          output += codeToken(stringToken, "tok-string");
          index += stringToken.length;
          continue;
        }

        if (language === "shell" && character === "$") {
          var varEnd = index + 1;
          while (varEnd < source.length && /[A-Za-z0-9_{}?]+/.test(source.charAt(varEnd))) {
            varEnd += 1;
          }
          output += codeToken(source.slice(index, varEnd), "tok-variable");
          index = varEnd;
          continue;
        }

        if (language === "shell" && character === "-" && /[A-Za-z]/.test(source.charAt(index + 1))) {
          var paramEnd = index + 1;
          while (paramEnd < source.length && /[A-Za-z0-9-]/.test(source.charAt(paramEnd))) {
            paramEnd += 1;
          }
          output += codeToken(source.slice(index, paramEnd), "tok-parameter");
          index = paramEnd;
          continue;
        }

        if (/[0-9]/.test(character)) {
          var numberEnd = index + 1;
          while (numberEnd < source.length && /[A-Za-z0-9_.:-]/.test(source.charAt(numberEnd))) {
            numberEnd += 1;
          }
          output += codeToken(source.slice(index, numberEnd), "tok-number");
          index = numberEnd;
          continue;
        }

        if (/[A-Za-z_]/.test(character)) {
          var wordEnd = index + 1;
          while (wordEnd < source.length && /[A-Za-z0-9_.-]/.test(source.charAt(wordEnd))) {
            wordEnd += 1;
          }
          var word = source.slice(index, wordEnd);
          var nextIndex = wordEnd;
          while (nextIndex < source.length && /\s/.test(source.charAt(nextIndex))) nextIndex += 1;

          if (language === "python" && pythonKeywords[word]) {
            output += codeToken(word, "tok-keyword");
          } else if (language === "python" && pythonBuiltins[word]) {
            output += codeToken(word, "tok-builtin");
          } else if (language === "python" && source.charAt(nextIndex) === "(") {
            output += codeToken(word, "tok-function");
          } else if (language === "shell" && shellKeywords[word]) {
            output += codeToken(word, "tok-keyword");
          } else if (language === "shell" && shellCommands[word]) {
            output += codeToken(word, "tok-command");
          } else {
            output += escapeCodeHtml(word);
          }
          index = wordEnd;
          continue;
        }

        if (/[+\-*%=!<>|&^~?:;,.()[\]{}@\/]/.test(character)) {
          output += codeToken(character, "tok-punctuation");
          index += 1;
          continue;
        }

        output += escapeCodeHtml(character);
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
    highlightGpuDriverCode();
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
