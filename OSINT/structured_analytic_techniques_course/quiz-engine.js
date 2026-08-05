(function () {
  "use strict";

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
    var key = answerKey(form);
    var ids = Object.keys(key);
    if (!ids.length) return;

    var results = ids.map(function (id) {
      var response = selectedValue(form, id);
      return {
        id: id,
        response: response,
        answer: String(key[id]),
        correct: response === String(key[id])
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
