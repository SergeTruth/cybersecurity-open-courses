(function () {
  "use strict";

  function findAPI(win) {
    var attempts = 0;
    while (win && attempts < 500) {
      try {
        if (win.API) return win.API;
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
    return value === "true" || value === true;
  }

  function initialize() {
    if (initialized) return true;
    if (!discover()) return false;
    var result = invoke("LMSInitialize", [""]);
    initialized = result.called && succeeded(result.value);
    if (!initialized) rememberFailure("LMSInitialize");
    return initialized;
  }

  function setValue(key, value) {
    if (!initialize()) return false;
    var result = invoke("LMSSetValue", [key, String(value)]);
    var ok = result.called && succeeded(result.value);
    if (!ok) rememberFailure("LMSSetValue");
    return ok;
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
    var ok = result.called && succeeded(result.value);
    if (!ok) rememberFailure("LMSCommit");
    return ok;
  }

  function terminate() {
    if (!initialized || !api) return false;
    var committed = commit();
    var result = invoke("LMSFinish", [""]);
    var finished = result.called && succeeded(result.value);
    if (!finished) rememberFailure("LMSFinish");
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
