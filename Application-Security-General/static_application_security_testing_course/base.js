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

  document.addEventListener("DOMContentLoaded", function () {
    meta = document.getElementById("module-meta");
    connect();
    initializeGraphic();
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
