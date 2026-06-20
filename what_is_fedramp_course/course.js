(function () {
  var COURSE_MODULES = [
  {
    "label": "01. Introduction to FedRAMP",
    "href": "m01.html"
  },
  {
    "label": "02. Why FedRAMP Exists",
    "href": "m02.html"
  },
  {
    "label": "03. NIST SP 800-53 Relationship",
    "href": "m03.html"
  },
  {
    "label": "04. Authorization Levels",
    "href": "m04.html"
  },
  {
    "label": "05. Assessment and Authorization",
    "href": "m05.html"
  },
  {
    "label": "06. Continuous Monitoring",
    "href": "m06.html"
  },
  {
    "label": "07. Roles and Responsibilities",
    "href": "m07.html"
  },
  {
    "label": "08. Building a FedRAMP Program",
    "href": "m08.html"
  },
  {
    "label": "09. Course Summary",
    "href": "m09.html"
  },
  {
    "label": "10. Final Quiz",
    "href": "m10.html"
  }
];
  var QUIZ_ANSWER_KEY = {
  "q1": "A",
  "q2": "A",
  "q3": "A",
  "q4": "A",
  "q5": "A",
  "q6": "A",
  "q7": "A",
  "q8": "A",
  "q9": "A",
  "q10": "A",
  "q11": "A"
};
  var ASSET_DIR = "course_assets";
  var TOTAL_MODULES = 10;
  var PREF_PREFIX = "what-is-fedramp-course";

  function byId(id) {
    return document.getElementById(id);
  }

  function createEl(tag, className, text) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (typeof text === "string") el.textContent = text;
    return el;
  }

  function prefKey(name) {
    return PREF_PREFIX + ":" + name;
  }

  function readPref(name, fallback) {
    try {
      var value = window.localStorage.getItem(prefKey(name));
      return value === null ? fallback : value;
    } catch (error) {
      return fallback;
    }
  }

  function writePref(name, value) {
    try {
      window.localStorage.setItem(prefKey(name), String(value));
    } catch (error) {
      return false;
    }
    return true;
  }

  function getModule() {
    var el = byId("module-meta");
    return el ? Number(el.dataset.module || 1) : 1;
  }

  function getTotal() {
    var el = byId("module-meta");
    return el ? Number(el.dataset.total || TOTAL_MODULES) : TOTAL_MODULES;
  }

  function getAudioBase() {
    var el = byId("module-meta");
    return el ? (el.dataset.audio || "").trim() : "";
  }

  function setStatusText(text) {
    var message = byId("lms-message");
    var status = byId("lms-status");
    if (message) {
      message.textContent = text;
    } else if (status) {
      status.textContent = text;
    }
  }

  function setProgressText(text) {
    var progress = byId("progress");
    if (progress) progress.textContent = "Progress: " + text;
  }

  function addModuleNavigationPane() {
    var main = document.querySelector("main.main-content");
    var wrap = main ? main.querySelector(".wrap") : null;
    if (!main || !wrap) return;
    if (main.querySelector(".course-nav-pane")) return;

    var pane = createEl("aside", "course-nav-pane card");
    pane.setAttribute("aria-label", "Course modules");
    var title = createEl("h2", "course-nav-title", "Course Modules");
    title.id = "course-nav-title";
    var nav = createEl("nav", "course-nav-links");
    nav.setAttribute("aria-labelledby", title.id);
    var list = createEl("ul", "course-nav-list");

    var currentPage = (window.location.pathname.split("/").pop() || "m01.html").toLowerCase();
    COURSE_MODULES.forEach(function (moduleItem) {
      var item = createEl("li", "course-nav-item");
      var link = createEl("a", "course-nav-link", moduleItem.label);
      link.href = moduleItem.href;
      if (moduleItem.href.toLowerCase() === currentPage) {
        link.classList.add("current");
        link.setAttribute("aria-current", "page");
      }
      item.appendChild(link);
      list.appendChild(item);
    });

    nav.appendChild(list);
    pane.appendChild(title);
    pane.appendChild(nav);
    main.classList.add("course-layout");
    main.insertBefore(pane, wrap);
  }

  function enhancePageAccessibility() {
    var main = document.querySelector("main.main-content");
    if (main && !main.getAttribute("aria-label")) {
      main.setAttribute("aria-label", "Course content");
    }
    var pageTitle = document.querySelector("h1");
    if (main && pageTitle) {
      if (!pageTitle.id) pageTitle.id = "page-title";
      main.setAttribute("aria-labelledby", pageTitle.id);
    }

    var status = byId("lms-status");
    if (status) {
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
    }

    var quizResult = byId("quiz-result");
    if (quizResult) {
      quizResult.setAttribute("role", "status");
      quizResult.setAttribute("aria-live", "polite");
      quizResult.setAttribute("tabindex", "-1");
    }
  }

  function connectLMS() {
    if (window.SCORM && SCORM.initialize()) {
      setStatusText("Connected to LMS (SCORM API found).");
      var lessonStatus = SCORM.getValue("cmi.core.lesson_status");
      if (!lessonStatus || lessonStatus === "not attempted") {
        SCORM.setValue("cmi.core.lesson_status", "incomplete");
      }
      SCORM.setValue("cmi.core.lesson_location", String(getModule()));
      SCORM.setValue("cmi.suspend_data", "module=" + getModule() + ";total=" + getTotal());
      SCORM.commit();
    } else {
      setStatusText("LMS API not found. Running in preview mode.");
    }
  }

  function setCompleted() {
    if (window.SCORM && SCORM.isAvailable()) {
      SCORM.setValue("cmi.core.lesson_status", "completed");
      SCORM.setValue("cmi.core.lesson_location", String(getModule()));
      SCORM.commit();
    }
    setProgressText("completed");
  }

  function initQuiz() {
    var form = byId("quiz-form");
    var submitBtn = byId("submit-quiz");
    var result = byId("quiz-result");
    if (!form || !submitBtn || !result) return;

    var questionIds = Object.keys(QUIZ_ANSWER_KEY);
    submitBtn.addEventListener("click", function () {
      var correct = 0;
      questionIds.forEach(function (qid) {
        var selected = form.querySelector("input[name=\"" + qid + "\"]:checked");
        if (selected && selected.value === QUIZ_ANSWER_KEY[qid]) correct += 1;
      });

      var total = questionIds.length;
      var score = total ? Math.round((correct / total) * 100) : 0;
      var passed = score >= 80;
      result.textContent = "Score: " + score + "% (" + correct + "/" + total + ") - " + (passed ? "Pass" : "Fail");
      if (typeof result.focus === "function") result.focus();

      if (window.SCORM && SCORM.isAvailable()) {
        SCORM.setValue("cmi.core.score.min", "0");
        SCORM.setValue("cmi.core.score.max", "100");
        SCORM.setValue("cmi.core.score.raw", String(score));
        SCORM.setValue("cmi.core.lesson_status", passed ? "passed" : "failed");
        SCORM.setValue("cmi.core.lesson_location", String(getModule()));
        SCORM.commit();
      }

      setProgressText(passed ? "completed" : "in progress");
    });
  }

  function initExpandableGraphics() {
    var graphics = Array.prototype.slice.call(document.querySelectorAll(".graphic-card .module-graphic"));
    graphics.forEach(function (graphic) {
      var card = graphic.closest ? graphic.closest(".graphic-card") : null;
      if (!card) return;

      graphic.setAttribute("role", "button");
      graphic.setAttribute("tabindex", "0");
      graphic.setAttribute("aria-expanded", "false");
      graphic.setAttribute("aria-label", "Expand graphic to full browser width");
      graphic.title = "Expand graphic";

      function toggleGraphic() {
        var expanded = !card.classList.contains("is-expanded");
        card.classList.toggle("is-expanded", expanded);
        graphic.setAttribute("aria-expanded", expanded ? "true" : "false");
        graphic.setAttribute("aria-label", expanded ? "Collapse graphic to normal size" : "Expand graphic to full browser width");
        graphic.title = expanded ? "Collapse graphic" : "Expand graphic";
        if (expanded && typeof card.scrollIntoView === "function") {
          card.scrollIntoView({ block: "nearest", inline: "nearest" });
        }
      }

      graphic.addEventListener("click", toggleGraphic);
      graphic.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleGraphic();
        }
      });
    });
  }

  function getNarrationFile() {
    var audioBase = getAudioBase();
    return audioBase ? audioBase + ".mp3" : null;
  }

  function addNarrationPlayer() {
    var file = getNarrationFile();
    if (!file) return;

    var wrap = document.querySelector(".wrap");
    if (!wrap) return;

    var narrationCard = null;
    Array.prototype.slice.call(wrap.querySelectorAll(".card")).some(function (candidate) {
      var heading = candidate.querySelector("h2");
      var headingText = heading ? (heading.textContent || "").trim().toLowerCase() : "";
      if (headingText === "narration") {
        narrationCard = candidate;
        return true;
      }
      return false;
    });

    var card = createEl("div", "card narration-player-card");
    card.setAttribute("aria-label", "Narration and module controls");
    var controls = createEl("div", "narration-controls");
    var moduleNav = wrap.querySelector('nav.nav[aria-label="Module navigation"]');
    if (moduleNav) moduleNav.classList.add("narration-nav");

    var speedLabel = createEl("label", "narration-speed-label", "Speed");
    speedLabel.setAttribute("for", "narration-speed");
    var speedSelect = createEl("select", "narration-speed");
    speedSelect.id = "narration-speed";
    ["0.75", "1.00", "1.25", "1.50", "2.00"].forEach(function (rate) {
      var option = createEl("option", "", rate + "x");
      option.value = rate;
      speedSelect.appendChild(option);
    });
    var savedRate = readPref("playbackRate", "1.00");
    if (!Array.prototype.some.call(speedSelect.options, function (option) { return option.value === savedRate; })) {
      savedRate = "1.00";
    }
    speedSelect.value = savedRate;

    var toggleCcBtn = createEl("button", "btn secondary", "CC Off");
    toggleCcBtn.type = "button";
    toggleCcBtn.setAttribute("aria-pressed", "false");
    var toggleNarrationBtn = createEl("button", "btn secondary", "Hide Narration");
    toggleNarrationBtn.type = "button";
    toggleNarrationBtn.setAttribute("aria-pressed", "true");
    toggleNarrationBtn.setAttribute("aria-expanded", "true");

    if (narrationCard) {
      if (!narrationCard.id) narrationCard.id = "narration-text";
      toggleNarrationBtn.setAttribute("aria-controls", narrationCard.id);
    } else {
      toggleNarrationBtn.disabled = true;
      toggleNarrationBtn.textContent = "Narration Unavailable";
      toggleNarrationBtn.setAttribute("aria-disabled", "true");
    }

    var captionSegments = [];
    if (narrationCard) {
      var captionText = Array.prototype.slice.call(narrationCard.querySelectorAll("p"))
        .map(function (p) { return (p.textContent || "").trim(); })
        .filter(function (text) { return Boolean(text); })
        .join(" ");
      captionSegments = (captionText.match(/[^.!?]+[.!?]?/g) || [])
        .map(function (segment) { return segment.trim(); })
        .filter(function (segment) { return Boolean(segment); });
    }

    var audio = createEl("audio", "narration-audio");
    audio.controls = true;
    audio.preload = "metadata";
    audio.playbackRate = Number(savedRate || "1");
    audio.setAttribute("aria-label", "Narration audio");
    audio.src = ASSET_DIR + "/" + file;
    var track = createEl("track");
    track.kind = "captions";
    track.label = "English";
    track.srclang = "en";
    track.src = ASSET_DIR + "/" + file.replace(/\.mp3$/i, ".vtt");
    audio.appendChild(track);

    var captionBox = createEl("div", "narration-cc hidden", "Closed captions are off.");
    captionBox.id = "narration-cc";
    captionBox.setAttribute("aria-live", "polite");
    captionBox.setAttribute("role", "status");
    toggleCcBtn.setAttribute("aria-controls", captionBox.id);

    var ccVisible = readPref("ccVisible", "false") === "true";
    var narrationVisible = readPref("narrationVisible", "true") !== "false";
    var lastCaptionIndex = -1;
    var captionCues = [];

    function applyNarrationState() {
      if (!narrationCard) return;
      narrationCard.style.display = narrationVisible ? "" : "none";
      narrationCard.setAttribute("aria-hidden", narrationVisible ? "false" : "true");
      toggleNarrationBtn.setAttribute("aria-pressed", narrationVisible ? "true" : "false");
      toggleNarrationBtn.setAttribute("aria-expanded", narrationVisible ? "true" : "false");
      toggleNarrationBtn.textContent = narrationVisible ? "Hide Narration" : "Show Narration";
    }

    function applyCcState() {
      toggleCcBtn.setAttribute("aria-pressed", ccVisible ? "true" : "false");
      captionBox.classList.toggle("hidden", !ccVisible);
      toggleCcBtn.textContent = ccVisible ? "CC On" : "CC Off";
      if (ccVisible) {
        if (captionCues.length) {
          var active = Math.max(0, lastCaptionIndex);
          captionBox.textContent = captionCues[active].text;
        } else {
          captionBox.textContent = "Captions loading.";
        }
      } else {
        captionBox.textContent = "Closed captions are off.";
        lastCaptionIndex = -1;
      }
    }

    function parseTimestamp(value) {
      var m = String(value).trim().match(/^(\d{2}):(\d{2}):(\d{2})[.,](\d{3})$/);
      if (!m) return NaN;
      return Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]) + Number(m[4]) / 1000;
    }

    function parseVtt(vttText) {
      var lines = String(vttText || "").replace(/\r/g, "").split("\n");
      var cues = [];
      for (var i = 0; i < lines.length; i += 1) {
        var line = lines[i].trim();
        if (!line || line === "WEBVTT") continue;

        var timingLine = line;
        if (timingLine.indexOf("-->") === -1 && i + 1 < lines.length && lines[i + 1].indexOf("-->") !== -1) {
          i += 1;
          timingLine = lines[i].trim();
        }
        if (timingLine.indexOf("-->") === -1) continue;

        var parts = timingLine.split("-->");
        if (parts.length < 2) continue;
        var start = parseTimestamp(parts[0]);
        var end = parseTimestamp(parts[1].trim().split(/\s+/)[0]);
        if (!isFinite(start) || !isFinite(end) || end <= start) continue;

        var textLines = [];
        while (i + 1 < lines.length && lines[i + 1].trim()) {
          i += 1;
          textLines.push(lines[i].trim());
        }
        var text = textLines.join(" ").replace(/<[^>]+>/g, "").trim();
        if (!text) continue;
        cues.push({ start: start, end: end, text: text });
      }
      return cues;
    }

    function buildFallbackCaptionCues() {
      if (!captionSegments.length || !audio.duration || !isFinite(audio.duration)) return;
      var weights = captionSegments.map(function (segment) {
        return Math.max(16, segment.replace(/\s+/g, "").length);
      });
      var totalWeight = weights.reduce(function (sum, w) { return sum + w; }, 0);
      var cursor = 0;
      var fallbackCues = [];
      for (var i = 0; i < captionSegments.length; i += 1) {
        var slice = (weights[i] / totalWeight) * audio.duration;
        fallbackCues.push({
          text: captionSegments[i],
          start: cursor,
          end: i === captionSegments.length - 1 ? audio.duration : cursor + slice
        });
        cursor += slice;
      }
      if (!captionCues.length) captionCues = fallbackCues;
      applyCcState();
    }

    function loadVttCues() {
      var vttPath = ASSET_DIR + "/" + file.replace(/\.mp3$/i, ".vtt");
      return fetch(vttPath)
        .then(function (res) {
          if (!res.ok) throw new Error("vtt_missing");
          return res.text();
        })
        .then(function (text) {
          var parsed = parseVtt(text);
          if (parsed.length) {
            captionCues = parsed;
            applyCcState();
            return true;
          }
          throw new Error("vtt_empty");
        })
        .catch(function () {
          return false;
        });
    }

    if (moduleNav) controls.appendChild(moduleNav);
    controls.appendChild(toggleCcBtn);
    controls.appendChild(toggleNarrationBtn);
    controls.appendChild(speedLabel);
    controls.appendChild(speedSelect);
    card.appendChild(controls);
    card.appendChild(audio);
    card.appendChild(captionBox);
    if (narrationCard) {
      wrap.insertBefore(card, narrationCard);
    } else {
      wrap.appendChild(card);
    }

    applyNarrationState();
    applyCcState();

    speedSelect.addEventListener("change", function () {
      audio.playbackRate = Number(speedSelect.value || "1");
      writePref("playbackRate", speedSelect.value);
    });
    toggleCcBtn.addEventListener("click", function () {
      ccVisible = !ccVisible;
      writePref("ccVisible", ccVisible ? "true" : "false");
      applyCcState();
    });
    toggleNarrationBtn.addEventListener("click", function () {
      if (!narrationCard) return;
      narrationVisible = !narrationVisible;
      writePref("narrationVisible", narrationVisible ? "true" : "false");
      applyNarrationState();
    });
    audio.addEventListener("loadedmetadata", buildFallbackCaptionCues);
    audio.addEventListener("ratechange", function () {
      var currentRate = String(audio.playbackRate.toFixed(2));
      if (readPref("playbackRate", "1.00") !== currentRate) writePref("playbackRate", currentRate);
      if (speedSelect.value !== currentRate && Array.prototype.some.call(speedSelect.options, function (option) { return option.value === currentRate; })) {
        speedSelect.value = currentRate;
      }
    });
    audio.addEventListener("timeupdate", function () {
      if (!captionCues.length || !audio.duration) return;
      var time = audio.currentTime;
      var index = captionCues.findIndex(function (cue, cueIndex) {
        if (cueIndex === captionCues.length - 1) return time >= cue.start && time <= cue.end;
        return time >= cue.start && time < cue.end;
      });
      if (index < 0) index = captionCues.length - 1;
      if (ccVisible && index !== lastCaptionIndex) {
        captionBox.textContent = captionCues[index].text;
        lastCaptionIndex = index;
      }
    });
    audio.addEventListener("error", function () {
      card.setAttribute("data-audio-state", "unavailable");
      audio.setAttribute("aria-label", "Narration audio unavailable");
      speedSelect.disabled = true;
      toggleCcBtn.disabled = true;
      toggleCcBtn.setAttribute("aria-disabled", "true");
    });

    loadVttCues().then(function (loaded) {
      if (!loaded && !captionSegments.length && !captionCues.length) {
        toggleCcBtn.disabled = true;
        toggleCcBtn.setAttribute("aria-disabled", "true");
        captionBox.textContent = "Captions unavailable for this module.";
      } else if (!loaded && ccVisible) {
        captionBox.textContent = captionCues.length ? captionCues[0].text : "Captions unavailable for this module.";
      } else if (!ccVisible) {
        captionBox.textContent = "Closed captions are off.";
      }
    });
  }

  window.addEventListener("load", function () {
    addModuleNavigationPane();
    enhancePageAccessibility();
    connectLMS();
    initQuiz();
    initExpandableGraphics();
    addNarrationPlayer();
    var doneBtn = byId("mark-complete");
    if (doneBtn) doneBtn.addEventListener("click", setCompleted);
  });

  window.addEventListener("beforeunload", function () {
    if (window.SCORM) SCORM.terminate();
  });
})();

