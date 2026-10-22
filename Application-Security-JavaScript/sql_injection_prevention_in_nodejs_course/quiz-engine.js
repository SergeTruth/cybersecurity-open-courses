(function () {
  "use strict";

  var lastReview = null;
  var lastSaveMessage = "";

  function answerKey(form) {
    if (window.QUIZ_ANSWER_KEY) return window.QUIZ_ANSWER_KEY;
    try {
      return JSON.parse(form.dataset.answerKey || "{}");
    } catch (error) {
      return {};
    }
  }

  function selectedValue(form, name) {
    var fields = form.elements[name];
    if (!fields) return "";
    if (fields.length === undefined) return fields.checked ? fields.value : "";
    for (var index = 0; index < fields.length; index += 1) {
      if (fields[index].checked) return fields[index].value;
    }
    return "";
  }

  function checkConfiguration(form) {
    var key = answerKey(form);
    var ids = key && typeof key === "object" && !Array.isArray(key) ? Object.keys(key) : [];
    var feedback = window.QUIZ_FEEDBACK;
    var passing = Number(form.dataset.passingScore);
    var valid = ids.length > 0 && Number.isFinite(passing) && passing >= 0 && passing <= 100 &&
      Boolean(form.dataset.passingScore) && Boolean(feedback && typeof feedback.version === "string" &&
      feedback.version.trim() && feedback.version.indexOf("{{") === -1 && feedback.questions);
    valid = valid && form.querySelectorAll("fieldset.quiz-question").length === ids.length && ids.every(function (id) {
      if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(id) || !/^[A-D]$/.test(key[id])) return false;
      var inputs = form.querySelectorAll('input[name="' + id + '"]');
      var detail = feedback.questions[id];
      var values = [];
      if (inputs.length !== 4 || !detail || !detail.options) return false;
      var fieldset = inputs[0].closest("fieldset");
      if (!fieldset || !fieldset.querySelector("legend")) return false;
      return Array.prototype.every.call(inputs, function (input) {
        var label = input.closest("label");
        var explanation = detail.options[input.value];
        var usable = input.type === "radio" && /^[A-D]$/.test(input.value) &&
          values.indexOf(input.value) === -1 && input.closest("fieldset") === fieldset &&
          label && label.querySelector("span") && typeof explanation === "string" &&
          explanation.trim() && explanation.indexOf("{{") === -1;
        values.push(input.value);
        input.required = true;
        return Boolean(usable);
      });
    });
    var message = document.getElementById("quiz-configuration-error");
    message.hidden = valid;
    message.textContent = valid ? "" : "This quiz is not configured correctly. Please contact the course administrator before submitting.";
    document.getElementById("submit-quiz").disabled = !valid;
    return valid;
  }

  function reportToLms(results, score, passed, review) {
    var runtime = window.CourseRuntime;
    var connected = Boolean(runtime && runtime.isConnected());
    var hosted = Boolean(runtime && runtime.isHosted());
    var outcome = { attempted: connected, hosted: hosted, lms: false, local: false };

    if (!connected) {
      if (runtime) {
        var localResult = runtime.recordQuizResult(passed, review);
        outcome.local = Boolean(localResult && localResult.local);
      }
      return outcome;
    }

    if (typeof SCORM.clearLastError === "function") SCORM.clearLastError();
    outcome.lms = true;

    function write(key, value) {
      var saved = SCORM.setValue(key, value);
      outcome.lms = saved && outcome.lms;
    }

    results.forEach(function (result, index) {
      var prefix = "cmi.interactions." + index;
      write(prefix + ".id", result.id);
      write(prefix + ".type", "choice");
      write(prefix + ".student_response", result.response);
      write(prefix + ".correct_responses.0.pattern", result.answer);
      write(prefix + ".result", result.correct ? "correct" : "wrong");
    });

    write("cmi.core.score.min", "0");
    write("cmi.core.score.max", "100");
    write("cmi.core.score.raw", String(score));
    write("cmi.core.lesson_status", passed ? "passed" : "failed");

    var runtimeResult = runtime.recordQuizResult(passed, review);
    outcome.local = Boolean(runtimeResult && runtimeResult.local);
    outcome.lms = Boolean(runtimeResult && runtimeResult.lms) && outcome.lms;

    var committed = SCORM.commit();
    outcome.lms = committed && outcome.lms;
    if (outcome.lms) {
      runtime.reportPersistenceSuccess(passed ? "passed" : "failed");
    } else {
      runtime.reportPersistenceFailure(outcome.local);
    }
    return outcome;
  }

  function resultsFor(form, responses) {
    var key = answerKey(form);
    return Object.keys(key).map(function (id) {
      var response = responses[id] || "";
      return {
        id: id,
        response: response,
        answer: String(key[id]),
        correct: response === String(key[id])
      };
    });
  }

  function append(parent, tag, text, className) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    node.textContent = text;
    parent.appendChild(node);
    return node;
  }

  function validReview(form, review) {
    var feedback = window.QUIZ_FEEDBACK;
    if (!feedback || !review || review.version !== feedback.version || !review.responses) return false;
    return Object.keys(answerKey(form)).every(function (id) {
      return /^[A-D]$/.test(review.responses[id] || "");
    });
  }

  function showReview(form, review, message, focus) {
    if (!checkConfiguration(form) || !validReview(form, review)) return;
    lastReview = review;
    lastSaveMessage = message;
    var results = resultsFor(form, review.responses);
    var correct = results.filter(function (result) { return result.correct; }).length;
    var score = Math.round(correct / results.length * 100);
    var passed = score >= Number(form.dataset.passingScore || 80);
    var container = document.getElementById("review-questions");
    container.replaceChildren();
    results.forEach(function (result, index) {
      var input = form.querySelector('input[name="' + result.id + '"]');
      var fieldset = input.closest("fieldset");
      var feedback = window.QUIZ_FEEDBACK.questions[result.id];
      var card = append(container, "section", "", "card review-question");
      var heading = append(card, "h3", fieldset.querySelector("legend").textContent);
      heading.id = "review-question-" + index;
      card.setAttribute("aria-labelledby", heading.id);
      append(card, "p", result.correct ? "Correct — your answer: " + result.response :
        "Incorrect — your answer: " + result.response + ". Correct answer: " + result.answer + ".",
        "review-outcome " + (result.correct ? "correct" : "incorrect"));
      var list = append(card, "ul", "", "review-options");
      fieldset.querySelectorAll("input[type=radio]").forEach(function (option) {
        var isCorrect = option.value === result.answer;
        var selected = option.value === result.response;
        var item = append(list, "li", "", "review-option" + (isCorrect ? " is-correct" : "") + (selected ? " is-selected" : ""));
        append(item, "strong", option.value + ". " + option.closest("label").querySelector("span").textContent);
        append(item, "span", (isCorrect ? "Correct option" : "Incorrect option") + (selected ? " · Your choice" : ""), "review-verdict");
        append(item, "p", feedback.options[option.value]);
      });
    });
    document.getElementById("quiz-result").textContent = "Score: " + score + "% (" + correct + "/" + results.length + ") — " + (passed ? "Pass" : "Fail");
    document.getElementById("review-save-status").textContent = message;
    document.getElementById("quiz-assessment").hidden = true;
    document.getElementById("quiz-review").hidden = false;
    document.getElementById("show-last-review").hidden = false;
    if (focus) {
      document.getElementById("review-heading").focus();
      document.getElementById("review-heading").scrollIntoView({ block: "start" });
    }
  }

  function grade(form) {
    if (!checkConfiguration(form) || !form.reportValidity()) return;
    var ids = Object.keys(answerKey(form));
    if (!ids.length) return;
    var responses = {};
    ids.forEach(function (id) { responses[id] = selectedValue(form, id); });
    var review = { version: window.QUIZ_FEEDBACK.version, responses: responses };
    var results = resultsFor(form, responses);

    var correct = results.filter(function (result) { return result.correct; }).length;
    var score = Math.round((correct / results.length) * 100);
    var passingScore = Number(form.dataset.passingScore || 80);
    var passed = score >= passingScore;
    var persistence = reportToLms(results, score, passed, review);
    var message = persistence.lms ? "Score and feedback saved to the LMS." :
      persistence.hosted ? "The LMS could not save this submission. Keep this page open. Your feedback is shown below." :
      persistence.local ? "Preview result saved in this browser only." : "This preview result could not be saved.";
    showReview(form, review, message, true);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("quiz-form");
    if (!form) return;
    checkConfiguration(form);
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      grade(form);
    });
    document.querySelectorAll("[data-retry-quiz]").forEach(function (button) {
      button.addEventListener("click", function () {
        document.getElementById("quiz-review").hidden = true;
        document.getElementById("quiz-assessment").hidden = false;
        form.reset();
        form.querySelector("input").focus();
        document.getElementById("quiz-assessment").scrollIntoView({ block: "start" });
      });
    });
    document.getElementById("show-last-review").addEventListener("click", function () {
      showReview(form, lastReview, lastSaveMessage, true);
    });
  });

  document.addEventListener("course:runtime-ready", function () {
    var form = document.getElementById("quiz-form");
    var runtime = window.CourseRuntime;
    if (!form || !runtime) return;
    var saved = runtime.getQuizReview();
    showReview(form, saved, "Showing your last submitted answers. See the LMS status below for connection and save information.", false);
  });

  window.QuizEngine = { grade: grade };
})();
