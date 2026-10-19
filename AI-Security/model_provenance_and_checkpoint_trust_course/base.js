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

  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  function moduleData() {
    return window.COURSE_MODULE && typeof window.COURSE_MODULE === "object"
      ? window.COURSE_MODULE
      : {};
  }

  function cleanPoint(value) {
    return String(value || "")
      .replace(/\r/g, "")
      .replace(/\s*\n\s*/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function pointValues() {
    var data = moduleData();
    var value = data.narrationPoints || data.onScreenText || data.screenText || data.bulletPoints || [];
    var points = [];

    if (Array.isArray(value)) {
      points = value;
    } else if (typeof value === "string") {
      points = value.split("\n");
    }

    return points
      .map(cleanPoint)
      .filter(function (point) { return Boolean(point); })
      .slice(0, 8);
  }

  function replaceChildren(element) {
    while (element.firstChild) element.removeChild(element.firstChild);
  }

  function graphicAvailability() {
    var graphicCard = document.getElementById("module-graphic-card");
    if (!graphicCard) return null;
    if (graphicCard.dataset.graphicAvailable === "true") return true;
    if (graphicCard.dataset.graphicAvailable === "false") return false;
    return null;
  }

  function hideScreenText(card, target) {
    card.classList.add("screen-text-card-hidden");
    replaceChildren(target);
  }

  function renderScreenText(graphicLoaded) {
    var meta = document.getElementById("module-meta");
    var card = document.getElementById("module-screen-text-card");
    var target = document.querySelector("[data-screen-text-target]");
    if (!meta || !card || !target || meta.dataset.quiz === "true") {
      return Promise.resolve({ loaded: false, skipped: true });
    }

    if (graphicLoaded !== false) {
      hideScreenText(card, target);
      return Promise.resolve({ loaded: false, graphicLoaded: graphicLoaded });
    }

    var points = pointValues();
    if (!points.length) {
      hideScreenText(card, target);
      return Promise.resolve({ loaded: false, graphicLoaded: false });
    }

    replaceChildren(target);
    points.forEach(function (point) {
      var item = document.createElement("li");
      item.textContent = point;
      target.appendChild(item);
    });
    card.classList.remove("screen-text-card-hidden");
    return Promise.resolve({ loaded: true, count: points.length, graphicLoaded: false });
  }

  function syncScreenText() {
    return renderScreenText(graphicAvailability());
  }

  document.addEventListener("course:graphic-ready", function (event) {
    var loaded = event && event.detail && typeof event.detail.loaded === "boolean"
      ? event.detail.loaded
      : graphicAvailability();
    renderScreenText(loaded);
  });

  window.CourseScreenText = window.CourseScreenText || {};
  window.CourseScreenText.load = syncScreenText;
  window.CourseScreenText.ready = new Promise(function (resolve) {
    onReady(function () {
      syncScreenText().then(resolve, function () {
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
  var hosted = false;
  var learnerScope = "preview";
  var learnerScoped = false;
  var state = {
    module: 1,
    total: 1,
    completed: [],
    quizPassed: false,
    quizStatus: "in progress",
    updatedAt: 0
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
    var moduleId = ("0" + moduleNumber()).slice(-2);
    return (document.body.dataset.courseId || "course") + ":sco:m" + moduleId + ":progress:" + learnerScope;
  }

  function stateStorage() {
    return hosted && !learnerScoped ? window.sessionStorage : window.localStorage;
  }

  function identityToken(value) {
    var hash = 2166136261;
    for (var index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return ("00000000" + (hash >>> 0).toString(16)).slice(-8);
  }

  function defaultState() {
    return {
      module: moduleNumber(),
      total: totalModules(),
      completed: [],
      quizPassed: false,
      quizStatus: "in progress",
      updatedAt: 0
    };
  }

  function parseState(value) {
    try {
      var parsed = JSON.parse(value || "{}");
      var current = moduleNumber();
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
      if (Number(parsed.module) !== current) return null;
      return {
        module: current,
        total: totalModules(),
        completed: Array.isArray(parsed.completed) && parsed.completed.indexOf(current) !== -1 ? [current] : [],
        quizPassed: parsed.quizPassed === true,
        quizStatus: parsed.quizStatus === "passed" || parsed.quizStatus === "failed" ? parsed.quizStatus : "in progress",
        updatedAt: Number.isFinite(parsed.updatedAt) && parsed.updatedAt >= 0 ? parsed.updatedAt : 0
      };
    } catch (error) {
      return null;
    }
  }

  function localState() {
    try {
      return parseState(stateStorage().getItem(storageKey()) || "");
    } catch (error) {
      return null;
    }
  }

  function loadState() {
    var local = localState();
    var lms = null;
    var lmsRead = false;

    if (connected) {
      if (typeof SCORM.clearLastError === "function") SCORM.clearLastError();
      var saved = SCORM.getValue("cmi.suspend_data");
      lmsRead = !SCORM.getLastError || !SCORM.getLastError();
      lms = (saved ? parseState(saved) : null) || defaultState();
    }

    if (connected && lmsRead) {
      state = learnerScoped && local && local.updatedAt > lms.updatedAt ? local : lms;
    } else {
      state = local || defaultState();
    }
    return { lmsRead: lmsRead, local: Boolean(local) };
  }

  function saveState() {
    state.updatedAt = Date.now();
    var serialized = JSON.stringify(state);
    var localSaved = false;
    try {
      stateStorage().setItem(storageKey(), serialized);
      localSaved = true;
    } catch (error) {
      // LMS persistence remains available when local storage is blocked.
    }

    var lmsSaved = false;
    if (connected) {
      var locationSaved = SCORM.setValue("cmi.core.lesson_location", String(moduleNumber()));
      var suspendSaved = SCORM.setValue("cmi.suspend_data", serialized);
      lmsSaved = locationSaved && suspendSaved;
    }
    return { local: localSaved, lms: lmsSaved };
  }

  function errorSuffix() {
    if (!window.SCORM || typeof SCORM.getLastError !== "function") return "";
    var error = SCORM.getLastError();
    return error && /^\d{1,8}$/.test(error.code) && error.code !== "0"
      ? " (LMS error " + error.code + ")"
      : "";
  }

  function reportPersistenceFailure(localSaved) {
    setProgress("not saved");
    if (hosted) {
      text(
        "lms-message",
        "LMS progress could not be saved" + errorSuffix() + "." +
          (localSaved ? " A local recovery copy is available." : " Please keep this window open and contact support.")
      );
    } else {
      text("lms-message", "Preview progress could not be saved in this browser.");
    }
    return false;
  }

  function reportPersistenceSuccess(value) {
    setProgress(value);
    if (connected) text("lms-message", "Connected to LMS. Progress saved.");
    if (window.SCORM && typeof SCORM.clearLastError === "function") SCORM.clearLastError();
    return true;
  }

  function readLearnerScope() {
    if (!connected) {
      learnerScope = hosted ? "lms-session" : "preview";
      learnerScoped = false;
      return;
    }

    if (typeof SCORM.clearLastError === "function") SCORM.clearLastError();
    var learnerId = SCORM.getValue("cmi.core.student_id");
    var readFailed = typeof SCORM.getLastError === "function" && SCORM.getLastError();
    if (!readFailed && learnerId) {
      learnerScope = "learner-" + identityToken(learnerId);
      learnerScoped = true;
    } else {
      learnerScope = "lms-session";
      learnerScoped = false;
    }
    if (typeof SCORM.clearLastError === "function") SCORM.clearLastError();
  }

  function recordModuleView() {
    if (isQuiz()) return false;

    var current = moduleNumber();
    if (state.completed.indexOf(current) === -1) {
      state.completed.push(current);
      state.completed.sort(function (a, b) { return a - b; });
    }

    if (window.SCORM && typeof SCORM.clearLastError === "function") SCORM.clearLastError();
    if (connected) {
      var status = SCORM.getValue("cmi.core.lesson_status");
      var statusReadFailed = typeof SCORM.getLastError === "function" && SCORM.getLastError();
      var statusSaved = !statusReadFailed;
      if (statusSaved && status !== "passed" && status !== "completed") {
        statusSaved = SCORM.setValue("cmi.core.lesson_status", "completed");
      }
      var saved = saveState();
      var committed = SCORM.commit();
      if (statusSaved && saved.lms && committed) {
        return reportPersistenceSuccess("completed");
      }
      return reportPersistenceFailure(saved.local);
    }

    var previewSaved = saveState();
    if (hosted) return reportPersistenceFailure(previewSaved.local);
    if (!previewSaved.local) return reportPersistenceFailure(false);
    setProgress("completed");
    return true;
  }

  function recordQuizResult(passed) {
    state.quizPassed = Boolean(passed);
    state.quizStatus = passed ? "passed" : "failed";
    var saved = saveState();
    if (!connected) {
      if (hosted || !saved.local) {
        reportPersistenceFailure(saved.local);
      } else {
        setProgress(state.quizStatus);
      }
    }
    return saved;
  }

  function connect() {
    hosted = Boolean(window.SCORM && typeof SCORM.isHosted === "function" && SCORM.isHosted());
    connected = Boolean(window.SCORM && SCORM.initialize());
    if (connected) hosted = true;
    text(
      "lms-message",
      connected
        ? "Connected to LMS."
        : hosted
          ? "LMS detected, but the course could not connect. Progress has not been saved to the LMS."
          : "LMS API not found. Running in preview mode."
    );

    readLearnerScope();
    var loaded = loadState();

    if (isQuiz()) {
      if (window.SCORM && typeof SCORM.clearLastError === "function") SCORM.clearLastError();
      var quizStatus = connected ? SCORM.getValue("cmi.core.lesson_status") : state.quizStatus;
      if (quizStatus === "passed" || quizStatus === "failed") {
        state.quizPassed = quizStatus === "passed";
        state.quizStatus = quizStatus;
      }
      setProgress(state.quizStatus);
      if (connected && (!loaded.lmsRead || (typeof SCORM.getLastError === "function" && SCORM.getLastError()))) {
        text("lms-message", "Connected to LMS, but saved progress could not be loaded. Local recovery state is being used when available.");
      }
      return;
    }

    recordModuleView();
  }

  function initializeGraphic() {
    var graphic = document.querySelector(".module-graphic");
    var card = document.querySelector(".graphic-card");
    if (!graphic || !card) return;

    function notifyGraphic(loaded) {
      card.dataset.graphicAvailable = loaded ? "true" : "false";
      if (typeof window.CustomEvent === "function") {
        document.dispatchEvent(new CustomEvent("course:graphic-ready", {
          detail: { loaded: loaded, src: graphic.currentSrc || graphic.src || "" }
        }));
      }
    }

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

    function fullscreenElement() {
      return document.fullscreenElement || document.webkitFullscreenElement || null;
    }

    function fullscreenRequest() {
      return card.requestFullscreen || card.webkitRequestFullscreen || null;
    }

    function fullscreenExit() {
      return document.exitFullscreen || document.webkitExitFullscreen || null;
    }

    var usingFullscreen = false;

    function expandGraphic() {
      var request = fullscreenRequest();
      setExpanded(card, true);
      if (!request) return;

      try {
        var result = request.call(card);
        if (result && typeof result.then === "function") {
          result.then(function () {
            usingFullscreen = true;
            setExpanded(card, true);
          }, function () {
            // Keep the existing iframe-sized overlay as a fallback.
            usingFullscreen = false;
          });
        } else {
          usingFullscreen = true;
        }
      } catch (error) {
        // Keep the existing iframe-sized overlay as a fallback.
        usingFullscreen = false;
      }
    }

    function collapseGraphic() {
      var exit = fullscreenExit();
      if (fullscreenElement() === card && exit) {
        try {
          var result = exit.call(document);
          if (result && typeof result.catch === "function") {
            result.catch(function () {
              usingFullscreen = false;
              setExpanded(card, false);
            });
          }
          return;
        } catch (error) {
          usingFullscreen = false;
        }
      }
      setExpanded(card, false);
    }

    function syncFullscreenState() {
      if (fullscreenElement() === card) {
        usingFullscreen = true;
        setExpanded(card, true);
      } else if (usingFullscreen) {
        usingFullscreen = false;
        setExpanded(card, false);
      }
    }

    function showGraphic() {
      card.classList.remove("graphic-card-hidden");
      graphic.removeAttribute("aria-hidden");
      updateGraphicState(card.classList.contains("is-expanded"));
      notifyGraphic(true);
    }

    function hideGraphic() {
      collapseGraphic();
      card.classList.add("graphic-card-hidden");
      graphic.setAttribute("aria-hidden", "true");
      notifyGraphic(false);
    }

    function toggle() {
      if (card.classList.contains("graphic-card-hidden")) return;
      if (fullscreenElement() === card || card.classList.contains("is-expanded")) {
        collapseGraphic();
      } else {
        expandGraphic();
      }
    }

    graphic.addEventListener("click", toggle);
    graphic.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      } else if (event.key === "Escape") {
        if (card && card.classList.contains("is-expanded")) {
          collapseGraphic();
        }
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      if (card && card.classList.contains("is-expanded")) {
        collapseGraphic();
      }
    });

    document.addEventListener("fullscreenchange", syncFullscreenState);
    document.addEventListener("webkitfullscreenchange", syncFullscreenState);

    graphic.addEventListener("load", function () {
      if (graphic.naturalWidth > 0) {
        showGraphic();
      } else {
        hideGraphic();
      }
    });
    graphic.addEventListener("error", hideGraphic);

    if (graphic.complete) {
      if (graphic.naturalWidth > 0) {
        showGraphic();
      } else {
        hideGraphic();
      }
    } else {
      updateGraphicState(false);
    }
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
    isHosted: function () { return hosted; },
    isQuiz: isQuiz,
    recordQuizResult: recordQuizResult,
    reportPersistenceFailure: reportPersistenceFailure,
    reportPersistenceSuccess: reportPersistenceSuccess,
    setProgress: setProgress
  };
})();
