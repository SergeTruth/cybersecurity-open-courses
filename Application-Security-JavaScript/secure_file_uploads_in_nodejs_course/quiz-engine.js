(function () {
  "use strict";

  function fnv1a(value) {
    var hash = 0x811c9dc5;
    for (var index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 0x01000193);
    }
    return (hash >>> 0).toString(16).padStart(8, "0");
  }

  function answerChecks(form) {
    try {
      return JSON.parse(form.dataset.answerChecks || "{}");
    } catch (error) {
      return {};
    }
  }

  function expectedAnswer(form, id, expectedHash) {
    var fields = form.elements[id];
    if (!fields) return "";
    var values = fields.length === undefined
      ? [fields.value]
      : Array.from(fields).map(function (field) { return field.value; });
    return values.find(function (value) {
      return fnv1a(form.dataset.answerSalt + ":" + id + ":" + value) === expectedHash;
    }) || "";
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

  function reportToLms(results, score, passed) {
    var runtime = window.CourseRuntime;
    var connected = Boolean(runtime && runtime.isConnected());
    var hosted = Boolean(runtime && runtime.isHosted());
    var outcome = { attempted: connected, hosted: hosted, lms: false, local: false };

    if (!connected) {
      if (runtime) {
        var localResult = runtime.recordQuizResult(passed);
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

    var runtimeResult = runtime.recordQuizResult(passed);
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

  function grade(form) {
    var checks = answerChecks(form);
    var ids = Object.keys(checks);
    if (!ids.length) return;

    var results = ids.map(function (id) {
      var response = selectedValue(form, id);
      var answer = expectedAnswer(form, id, checks[id]);
      return {
        id: id,
        response: response,
        answer: answer,
        correct: response === answer
      };
    });

    var correct = results.filter(function (result) { return result.correct; }).length;
    var score = Math.round((correct / results.length) * 100);
    var passingScore = Number(form.dataset.passingScore || 80);
    var passed = score >= passingScore;
    var resultElement = document.getElementById("quiz-result");

    if (resultElement) {
      resultElement.textContent = "Score: " + score + "% (" + correct + "/" + results.length + ") - " + (passed ? "Pass" : "Fail");
      resultElement.setAttribute("role", "status");
      resultElement.setAttribute("tabindex", "-1");
      resultElement.focus();
    }

    var persistence = reportToLms(results, score, passed);
    if (resultElement && persistence && ((persistence.hosted && !persistence.lms) || (!persistence.hosted && !persistence.local))) {
      resultElement.textContent += persistence.hosted
        ? " LMS progress was not saved."
        : " Progress could not be saved in this browser.";
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("quiz-form");
    if (!form) return;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      grade(form);
    });
  });

  window.QuizEngine = { grade: grade };
})();
