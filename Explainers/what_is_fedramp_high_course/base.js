(function () {
  "use strict";

  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  function cleanText(value) {
    return String(value || "")
      .replace(/\r/g, "")
      .split("\n")
      .map(function (line) { return line.trim(); })
      .filter(function (line) { return Boolean(line); })
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function moduleData() {
    return window.COURSE_MODULE && typeof window.COURSE_MODULE === "object"
      ? window.COURSE_MODULE
      : {};
  }

  function moduleText(name) {
    var value = moduleValue(name);
    return value ? cleanText(value) : "";
  }

  function moduleValue(name) {
    var value = moduleData()[name];
    return typeof value === "string" ? value : "";
  }

  function applyAlt(graphic, altText) {
    graphic.dataset.graphicLabel = altText || "Module graphic";
    if (altText) {
      graphic.alt = altText;
      graphic.setAttribute("aria-label", altText + ". Activate to expand graphic.");
      return;
    }

    graphic.alt = "";
    graphic.setAttribute("aria-label", "Expand module graphic");
  }

  function loadGraphicAlt() {
    var meta = document.getElementById("module-meta");
    var graphic = document.querySelector(".module-graphic");
    if (!meta || !graphic || meta.dataset.quiz === "true") return Promise.resolve({ loaded: false, skipped: true });

    var altText = moduleText("graphicAlt") || moduleText("graphic_alt") || moduleText("alt");
    applyAlt(graphic, altText);
    return Promise.resolve({ loaded: Boolean(altText), source: "course_assets/module.js" });
  }

  window.CourseModuleData = window.CourseModuleData || {};
  window.CourseModuleData.get = moduleData;
  window.CourseModuleData.text = moduleText;
  window.CourseModuleData.raw = moduleValue;

  window.CourseGraphicAlt = window.CourseGraphicAlt || {};
  window.CourseGraphicAlt.load = loadGraphicAlt;
  window.CourseGraphicAlt.ready = new Promise(function (resolve) {
    onReady(function () {
      loadGraphicAlt().then(resolve, function () {
        resolve({ loaded: false });
      });
    });
  });
})();

(function () {
  "use strict";

  var latestTitleMap = {};

  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  function cleanTitle(value) {
    return String(value || "")
      .replace(/\r/g, "")
      .split("\n")
      .map(function (line) { return line.trim(); })
      .filter(function (line) { return Boolean(line); })
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function courseData() {
    return window.COURSE && typeof window.COURSE === "object"
      ? window.COURSE
      : {};
  }

  function courseTitle() {
    return cleanTitle(courseData().title);
  }

  function moduleNumber(meta) {
    var fromMeta = meta ? Number(meta.dataset.module || "") : NaN;
    if (isFinite(fromMeta) && fromMeta > 0) return fromMeta;

    var currentPage = (window.location.pathname.split("/").pop() || "").toLowerCase();
    var match = currentPage.match(/^m(\d+)\.html$/);
    return match ? Number(match[1]) : 1;
  }

  function moduleKey(number) {
    return "m" + ("0" + number).slice(-2);
  }

  function usableAssetBase(value) {
    var base = String(value || "").trim();
    return base && base.indexOf("{{") === -1 ? base : "";
  }

  function currentModuleKey(meta) {
    var explicit = meta ? usableAssetBase(meta.dataset.title || meta.dataset.audio || meta.dataset.narration) : "";
    return explicit || moduleKey(moduleNumber(meta));
  }

  function totalModules(meta) {
    var total = meta ? Number(meta.dataset.total || "") : NaN;
    return isFinite(total) && total > 0 ? total : moduleNumber(meta);
  }

  function setText(selector, value) {
    var element = document.querySelector(selector);
    if (element && value) element.textContent = value;
  }

  function updateDocumentTitle(courseTitle, moduleTitle) {
    if (courseTitle && moduleTitle) {
      document.title = moduleTitle + " | " + courseTitle;
    } else if (moduleTitle) {
      document.title = moduleTitle;
    } else if (courseTitle) {
      document.title = courseTitle;
    }
  }

  function updateSidebarLabels(titleMap) {
    var links = document.querySelectorAll(".course-nav-link");
    Array.prototype.forEach.call(links, function (link) {
      var href = (link.getAttribute("href") || "").toLowerCase();
      var match = href.match(/m(\d+)\.html$/);
      if (!match) return;

      var title = titleMap[moduleKey(Number(match[1]))];
      if (title) link.textContent = title;
    });
  }

  function loadTitles() {
    var meta = document.getElementById("module-meta");
    var currentNumber = moduleNumber(meta);
    var currentKey = currentModuleKey(meta);
    var fallbackModuleTitle = meta && meta.dataset.quiz === "true" ? "Final Quiz" : "Module " + currentNumber;
    var scriptedTitle = window.CourseModuleData && CourseModuleData.text
      ? CourseModuleData.text("title")
      : "";

    var title = courseTitle() || "Course";
    var moduleTitle = scriptedTitle || fallbackModuleTitle;
    var titleMap = {};
    titleMap[currentKey] = moduleTitle;
    latestTitleMap = titleMap;

    setText("[data-course-title-target]", title);
    setText("[data-module-title-target]", moduleTitle);
    updateDocumentTitle(title, moduleTitle);
    updateSidebarLabels(titleMap);

    return Promise.resolve({
      courseTitle: title,
      moduleTitle: moduleTitle,
      moduleKey: currentKey,
      titles: titleMap
    });
  }

  window.CourseTitles = window.CourseTitles || {};
  window.CourseTitles.load = loadTitles;
  window.CourseTitles.ready = new Promise(function (resolve) {
    onReady(function () {
      loadTitles().then(resolve, function () {
        resolve({ courseTitle: "Course", moduleTitle: "Module" });
      });
    });
  });

  document.addEventListener("course:navigation-ready", function () {
    updateSidebarLabels(latestTitleMap);
  });
})();

(function () {
  "use strict";

  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  function assetBase(meta) {
    return meta ? (meta.dataset.narration || meta.dataset.audio || "").trim() : "";
  }

  function narrationScriptSource(meta) {
    var base = assetBase(meta);
    return base ? "course_assets/" + base + ".js" : "";
  }

  function scriptNarration(meta) {
    var value = window.CourseModuleData && CourseModuleData.raw
      ? CourseModuleData.raw("narration")
      : "";
    if (!value && window.CourseModuleData && CourseModuleData.raw) {
      value = CourseModuleData.raw("text");
    }
    if (value && typeof value === "object") {
      var base = assetBase(meta);
      value = value[base] || value.text || value.narration || "";
    }
    return typeof value === "string" ? value : "";
  }

  function paragraphsFromText(value) {
    return String(value || "")
      .replace(/\r/g, "")
      .split(/\n\s*\n/)
      .map(function (paragraph) { return paragraph.replace(/\s*\n\s*/g, " ").trim(); })
      .filter(function (paragraph) { return Boolean(paragraph); });
  }

  function replaceChildren(element) {
    while (element.firstChild) element.removeChild(element.firstChild);
  }

  function renderParagraphs(target, paragraphs) {
    replaceChildren(target);
    paragraphs.forEach(function (paragraph) {
      var node = document.createElement("p");
      node.textContent = paragraph;
      target.appendChild(node);
    });
  }

  function renderStatus(target, message, className) {
    replaceChildren(target);
    var node = document.createElement("p");
    node.className = className;
    node.textContent = message;
    target.appendChild(node);
  }

  function notify(detail) {
    if (typeof window.CustomEvent !== "function") return;
    document.dispatchEvent(new CustomEvent("course:narration-ready", { detail: detail }));
  }

  function loadNarration() {
    var meta = document.getElementById("module-meta");
    var target = document.querySelector("[data-narration-target]");
    if (!meta || !target || meta.dataset.quiz === "true") return Promise.resolve({ loaded: false, skipped: true });

    var scriptSource = narrationScriptSource(meta);
    var scriptedText = scriptNarration(meta);
    if (scriptedText) {
      var scriptedParagraphs = paragraphsFromText(scriptedText);
      if (scriptedParagraphs.length) {
        renderParagraphs(target, scriptedParagraphs);
        notify({ loaded: true, source: scriptSource });
        return Promise.resolve({ loaded: true, source: scriptSource });
      }
    }

    renderStatus(target, "Narration unavailable. Add " + (scriptSource || "the module narration script") + " with COURSE_MODULE.narration.", "narration-unavailable");
    notify({ loaded: false, source: scriptSource });
    return Promise.resolve({ loaded: false, source: scriptSource });
  }

  window.CourseNarration = window.CourseNarration || {};
  window.CourseNarration.load = loadNarration;
  window.CourseNarration.ready = new Promise(function (resolve) {
    onReady(function () {
      loadNarration().then(resolve, function () {
        resolve({ loaded: false });
      });
    });
  });
})();

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

    function updateGraphicState(expanded) {
      var baseLabel = graphic.dataset.graphicLabel || "Module graphic";
      var action = expanded ? "collapse" : "expand";
      graphic.setAttribute("aria-expanded", String(expanded));
      graphic.setAttribute("aria-label", baseLabel + ". Activate to " + action + " graphic.");
    }

    function setExpanded(card, expanded) {
      card.classList.toggle("is-expanded", expanded);
      document.body.classList.toggle("graphic-zoom-active", expanded);
      updateGraphicState(expanded);
    }

    function toggle() {
      var card = graphic.closest(".graphic-card");
      if (!card) return;
      setExpanded(card, !card.classList.contains("is-expanded"));
    }

    graphic.addEventListener("click", toggle);
    graphic.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      } else if (event.key === "Escape") {
        var card = graphic.closest(".graphic-card");
        if (card && card.classList.contains("is-expanded")) {
          setExpanded(card, false);
        }
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      var card = graphic.closest(".graphic-card");
      if (card && card.classList.contains("is-expanded")) {
        setExpanded(card, false);
      }
    });

    updateGraphicState(graphic.getAttribute("aria-expanded") === "true");
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
