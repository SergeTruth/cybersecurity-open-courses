(function () {
  "use strict";

  function storageKey(name) {
    var courseId = document.body.dataset.courseId || "course";
    return courseId + ":" + name;
  }

  function readPreference(name, fallback) {
    try {
      var value = localStorage.getItem(storageKey(name));
      return value === null ? fallback : value;
    } catch (error) {
      return fallback;
    }
  }

  function savePreference(name, value) {
    try {
      localStorage.setItem(storageKey(name), String(value));
    } catch (error) {
      // Preferences remain active for the current page when storage is unavailable.
    }
  }

  function button(label, className) {
    var control = document.createElement("button");
    control.type = "button";
    control.className = className || "";
    control.textContent = label;
    return control;
  }

  function parseTimestamp(value) {
    var match = String(value).trim().match(/^(?:(\d{2}):)?(\d{2}):(\d{2})[.,](\d{3})$/);
    if (!match) return NaN;
    return Number(match[1] || 0) * 3600 + Number(match[2]) * 60 + Number(match[3]) + Number(match[4]) / 1000;
  }

  function parseVtt(vttText) {
    var lines = String(vttText || "").replace(/\r/g, "").split("\n");
    var cues = [];

    for (var index = 0; index < lines.length; index += 1) {
      var line = lines[index].trim();
      if (!line || line === "WEBVTT" || line.indexOf("NOTE") === 0) continue;

      var timing = line;
      if (timing.indexOf("-->") === -1 && index + 1 < lines.length && lines[index + 1].indexOf("-->") !== -1) {
        index += 1;
        timing = lines[index].trim();
      }
      if (timing.indexOf("-->") === -1) continue;

      var parts = timing.split("-->");
      var start = parseTimestamp(parts[0]);
      var end = parseTimestamp(parts[1].trim().split(/\s+/)[0]);
      if (!isFinite(start) || !isFinite(end) || end <= start) continue;

      var textLines = [];
      while (index + 1 < lines.length && lines[index + 1].trim()) {
        index += 1;
        textLines.push(lines[index].trim());
      }
      var cueText = textLines.join(" ").replace(/<[^>]+>/g, "").trim();
      if (cueText) cues.push({ start: start, end: end, text: cueText });
    }

    return cues;
  }

  function initialize() {
    var meta = document.getElementById("module-meta");
    var audioBase = meta && meta.dataset.audio;
    var narration = document.querySelector(".narration-card");
    if (!audioBase || !narration) return;

    var narrationVisible = readPreference("narrationVisible", "true") === "true";
    var captionsVisible = readPreference("captionsVisible", "false") === "true";
    var playbackRate = Number(readPreference("playbackRate", "1")) || 1;
    var captionCues = [];
    var nativeTrackFailed = false;

    var narrationText = Array.prototype.slice.call(narration.querySelectorAll("p"))
      .map(function (paragraph) { return (paragraph.textContent || "").trim(); })
      .filter(function (value) { return Boolean(value); })
      .join(" ");
    var captionSegments = (narrationText.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [])
      .map(function (segment) { return segment.trim(); })
      .filter(function (segment) { return Boolean(segment); });

    var card = document.createElement("section");
    card.className = "card narration-player-card";
    card.setAttribute("aria-label", "Narration audio controls");

    var audio = document.createElement("audio");
    audio.className = "narration-audio";
    audio.controls = true;
    audio.preload = "metadata";
    audio.src = "course_assets/" + audioBase + ".mp3";

    var trackElement = document.createElement("track");
    trackElement.kind = "captions";
    trackElement.label = "English";
    trackElement.srclang = "en";
    trackElement.src = "course_assets/" + audioBase + ".vtt";
    audio.appendChild(trackElement);
    var textTrack = trackElement.track;

    var controls = document.createElement("div");
    controls.className = "narration-controls";

    var navigation = document.querySelector(".module-nav");
    if (navigation) {
      navigation.classList.add("narration-nav");
      controls.appendChild(navigation);
    }

    var speedLabel = document.createElement("label");
    speedLabel.className = "narration-speed-label";
    speedLabel.textContent = "Speed";
    var speed = document.createElement("select");
    speed.className = "narration-speed";
    speed.setAttribute("aria-label", "Playback speed");
    [0.75, 1, 1.25, 1.5, 2].forEach(function (rate) {
      var option = document.createElement("option");
      option.value = String(rate);
      option.textContent = rate + "x";
      speed.appendChild(option);
    });
    speed.value = String(playbackRate);
    speedLabel.appendChild(speed);

    var ccButton = button(captionsVisible ? "CC On" : "CC Off", "btn secondary");
    ccButton.setAttribute("aria-pressed", String(captionsVisible));
    var narrationButton = button(narrationVisible ? "Hide Narration" : "Show Narration", "btn secondary");
    narrationButton.setAttribute("aria-expanded", String(narrationVisible));

    var captions = document.createElement("div");
    captions.className = "narration-cc" + (captionsVisible ? "" : " hidden");
    captions.setAttribute("aria-live", "polite");

    function buildFallbackCaptionCues() {
      if (captionCues.length || !captionSegments.length || !audio.duration || !isFinite(audio.duration)) return;
      var weights = captionSegments.map(function (segment) {
        return Math.max(16, segment.replace(/\s+/g, "").length);
      });
      var totalWeight = weights.reduce(function (sum, weight) { return sum + weight; }, 0);
      var cursor = 0;
      captionCues = captionSegments.map(function (segment, index) {
        var end = index === captionSegments.length - 1
          ? audio.duration
          : cursor + (weights[index] / totalWeight) * audio.duration;
        var cue = { start: cursor, end: end, text: segment };
        cursor = end;
        return cue;
      });
    }

    function cueAtTime(time) {
      for (var index = 0; index < captionCues.length; index += 1) {
        var cue = captionCues[index];
        if (time >= cue.start && (time < cue.end || index === captionCues.length - 1 && time <= cue.end)) return cue;
      }
      if (captionCues.length && time < captionCues[0].start) return captionCues[0];
      return null;
    }

    function renderCaptions() {
      if (!captionsVisible) {
        captions.textContent = "";
        return;
      }

      if (!captionCues.length) buildFallbackCaptionCues();
      var customCue = cueAtTime(audio.currentTime || 0);
      if (customCue) {
        captions.textContent = customCue.text;
        return;
      }

      var active = textTrack && textTrack.activeCues;
      if (active && active.length) {
        var lines = [];
        for (var index = 0; index < active.length; index += 1) lines.push(active[index].text);
        captions.textContent = lines.join(" ");
      } else if (nativeTrackFailed && !captionSegments.length) {
        captions.textContent = "Captions unavailable.";
      } else {
        captions.textContent = "Captions enabled. Start playback to display captions.";
      }
    }

    function setTrackMode() {
      if (textTrack) {
        try {
          textTrack.mode = captionsVisible ? "hidden" : "disabled";
        } catch (error) {
          nativeTrackFailed = true;
        }
      }
      renderCaptions();
    }

    function loadVttCues() {
      if (window.location.protocol === "file:" || typeof window.fetch !== "function") {
        return Promise.resolve(false);
      }
      return window.fetch(trackElement.src)
        .then(function (response) {
          if (!response.ok) throw new Error("vtt_unavailable");
          return response.text();
        })
        .then(function (vttText) {
          var parsed = parseVtt(vttText);
          if (!parsed.length) throw new Error("vtt_empty");
          captionCues = parsed;
          renderCaptions();
          return true;
        })
        .catch(function () { return false; });
    }

    if (textTrack) textTrack.oncuechange = renderCaptions;
    audio.addEventListener("loadedmetadata", function () {
      buildFallbackCaptionCues();
      renderCaptions();
    });
    audio.addEventListener("durationchange", function () {
      buildFallbackCaptionCues();
      renderCaptions();
    });
    audio.addEventListener("timeupdate", renderCaptions);
    trackElement.addEventListener("load", renderCaptions);
    trackElement.addEventListener("error", function () {
      nativeTrackFailed = true;
      buildFallbackCaptionCues();
      renderCaptions();
    });

    controls.appendChild(speedLabel);
    controls.appendChild(ccButton);
    controls.appendChild(narrationButton);
    card.appendChild(audio);
    card.appendChild(controls);
    card.appendChild(captions);
    narration.parentNode.insertBefore(card, narration);

    narration.classList.toggle("hidden", !narrationVisible);
    audio.playbackRate = playbackRate;
    setTrackMode();
    loadVttCues();

    speed.addEventListener("change", function () {
      audio.playbackRate = Number(speed.value);
      savePreference("playbackRate", speed.value);
    });

    narrationButton.addEventListener("click", function () {
      narrationVisible = !narrationVisible;
      narration.classList.toggle("hidden", !narrationVisible);
      narrationButton.textContent = narrationVisible ? "Hide Narration" : "Show Narration";
      narrationButton.setAttribute("aria-expanded", String(narrationVisible));
      savePreference("narrationVisible", narrationVisible);
    });

    ccButton.addEventListener("click", function () {
      captionsVisible = !captionsVisible;
      captions.classList.toggle("hidden", !captionsVisible);
      ccButton.textContent = captionsVisible ? "CC On" : "CC Off";
      ccButton.setAttribute("aria-pressed", String(captionsVisible));
      setTrackMode();
      savePreference("captionsVisible", captionsVisible);
    });
  }

  document.addEventListener("DOMContentLoaded", initialize);
})();
