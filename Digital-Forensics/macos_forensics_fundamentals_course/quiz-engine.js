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
    if (!window.SCORM || !SCORM.isAvailable()) return;

    results.forEach(function (result, index) {
      var prefix = "cmi.interactions." + index;
      SCORM.setValue(prefix + ".id", result.id);
      SCORM.setValue(prefix + ".type", "choice");
      SCORM.setValue(prefix + ".student_response", result.response);
      SCORM.setValue(prefix + ".correct_responses.0.pattern", result.answer);
      SCORM.setValue(prefix + ".result", result.correct ? "correct" : "wrong");
    });

    SCORM.setValue("cmi.core.score.min", "0");
    SCORM.setValue("cmi.core.score.max", "100");
    SCORM.setValue("cmi.core.score.raw", String(score));
    SCORM.setValue("cmi.core.lesson_status", passed ? "passed" : "failed");
    if (window.CourseRuntime) {
      SCORM.setValue("cmi.core.lesson_location", String(CourseRuntime.getModule()));
      CourseRuntime.recordQuizResult(passed);
    }
    SCORM.commit();
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

    if (window.CourseRuntime && (!window.SCORM || !SCORM.isAvailable())) {
      CourseRuntime.recordQuizResult(passed);
    }
    reportToLms(results, score, passed);
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
