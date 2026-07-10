(function () {
  function findAPI(win) {
    var attempts = 0;
    while (win && attempts < 500) {
      if (win.API) return win.API;
      attempts += 1;
      win = win.parent;
    }
    return null;
  }

  var api = null;
  var initialized = false;

  function initialize() {
    if (initialized) return true;
    api = findAPI(window) || findAPI(window.opener);
    if (!api) return false;
    var ok = api.LMSInitialize("");
    initialized = ok === "true" || ok === true;
    return initialized;
  }

  function setValue(key, value) {
    if (!initialize()) return false;
    return api.LMSSetValue(key, String(value));
  }

  function getValue(key) {
    if (!initialize()) return "";
    return api.LMSGetValue(key);
  }

  function commit() {
    if (!initialize()) return false;
    return api.LMSCommit("");
  }

  function terminate() {
    if (!initialized || !api) return false;
    api.LMSCommit("");
    var done = api.LMSFinish("");
    initialized = false;
    return done === "true" || done === true;
  }

  window.SCORM = {
    initialize: initialize,
    setValue: setValue,
    getValue: getValue,
    commit: commit,
    terminate: terminate,
    isAvailable: function () {
      return initialize();
    }
  };
})();
