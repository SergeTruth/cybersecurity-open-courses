(function () {
  "use strict";

  function isSCORM12API(candidate) {
    return Boolean(
      candidate &&
      typeof candidate.LMSInitialize === "function" &&
      typeof candidate.LMSGetValue === "function" &&
      typeof candidate.LMSSetValue === "function" &&
      typeof candidate.LMSCommit === "function" &&
      typeof candidate.LMSFinish === "function" &&
      typeof candidate.LMSGetLastError === "function"
    );
  }

  function findAPI(win) {
    var attempts = 0;
    while (win && attempts < 500) {
      try {
        if (isSCORM12API(win.API)) return win.API;
        if (win.parent === win) break;
        win = win.parent;
      } catch (error) {
        return null;
      }
      attempts += 1;
    }
    return null;
  }

  var api = null;
  var initialized = false;
  var lastError = null;

  function discover() {
    if (api) return api;
    api = findAPI(window);
    if (!api) {
      try {
        api = findAPI(window.opener);
      } catch (error) {
        api = null;
      }
    }
    return api;
  }

  function invoke(method, args) {
    var target = discover();
    if (!target || typeof target[method] !== "function") {
      return { called: false, value: null };
    }
    try {
      return { called: true, value: target[method].apply(target, args) };
    } catch (error) {
      return { called: false, value: null };
    }
  }

  function errorCode() {
    var result = invoke("LMSGetLastError", []);
    if (!result.called || result.value === null || result.value === undefined) return "unknown";
    var code = String(result.value);
    return /^\d{1,8}$/.test(code) ? code : "unknown";
  }

  function rememberFailure(method, code) {
    lastError = {
      method: method,
      code: code || errorCode()
    };
  }

  function succeeded(value) {
    return value === "true" || value === true || value === "1" || value === 1;
  }

  function sessionIsUsable() {
    var status = invoke("LMSGetValue", ["cmi.core.lesson_status"]);
    if (status.called && errorCode() === "0") return true;

    var learner = invoke("LMSGetValue", ["cmi.core.student_id"]);
    var learnerValue = learner.value === null || learner.value === undefined
      ? ""
      : String(learner.value);
    return learner.called && learnerValue !== "" && learnerValue !== "false";
  }

  function mutationSucceeded(method, result) {
    var code = errorCode();
    var ok = (result.called && succeeded(result.value)) || code === "0";
    if (!ok) rememberFailure(method, code);
    return ok;
  }

  function initialize() {
    if (initialized) return true;
    if (!discover()) return false;

    // Every document in a multi-SCO package must call LMSInitialize so
    // Moodle updates its private SCO id from scorm_current_node. If the
    // previous document did not finish in time, Moodle returns 101 after it
    // has selected and initialized the newly requested SCO; that case is
    // attached below.
    var result = invoke("LMSInitialize", [""]);
    initialized = result.called && succeeded(result.value);
    if (!initialized) {
      var initCode = errorCode();
      if (initCode === "101" || sessionIsUsable()) {
        initialized = true;
        lastError = null;
        return true;
      }
      rememberFailure("LMSInitialize", initCode);
    }
    return initialized;
  }

  function setValue(key, value) {
    if (!initialize()) return false;
    var result = invoke("LMSSetValue", [key, String(value)]);
    return mutationSucceeded("LMSSetValue", result);
  }

  function getValue(key) {
    if (!initialize()) return "";
    var result = invoke("LMSGetValue", [key]);
    if (!result.called) {
      rememberFailure("LMSGetValue");
      return "";
    }

    var code = errorCode();
    if (code !== "0") {
      rememberFailure("LMSGetValue", code);
      return "";
    }
    return result.value === null || result.value === undefined ? "" : String(result.value);
  }

  function commit() {
    if (!initialize()) return false;
    var result = invoke("LMSCommit", [""]);
    return mutationSucceeded("LMSCommit", result);
  }

  function terminate() {
    if (!initialized || !api) return false;
    var committed = commit();
    var result = invoke("LMSFinish", [""]);
    var finished = mutationSucceeded("LMSFinish", result);
    initialized = false;
    api = null;
    return committed && finished;
  }

  window.SCORM = {
    initialize: initialize,
    setValue: setValue,
    getValue: getValue,
    commit: commit,
    terminate: terminate,
    isAvailable: initialize,
    isHosted: function () {
      return Boolean(discover());
    },
    getLastError: function () {
      return lastError ? { method: lastError.method, code: lastError.code } : null;
    },
    clearLastError: function () {
      lastError = null;
    }
  };
})();
