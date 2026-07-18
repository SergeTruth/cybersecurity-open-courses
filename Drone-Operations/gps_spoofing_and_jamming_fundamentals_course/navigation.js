(function () {
  "use strict";

  function createElement(tag, className, content) {
    var element = document.createElement(tag);
    if (className) element.className = className;
    if (typeof content === "string") element.textContent = content;
    return element;
  }

  function unavailable(link) {
    var href = link.getAttribute("href") || "";
    return !href || href === "#" || href.indexOf("{{") !== -1;
  }

  function fallbackModules() {
    var meta = document.getElementById("module-meta");
    var total = meta ? Number(meta.dataset.total || 1) : 1;
    var modules = [];
    for (var number = 1; number <= total; number += 1) {
      modules.push({
        label: number === total ? "Final Quiz" : "Module " + number,
        href: "m" + ("0" + number).slice(-2) + ".html"
      });
    }
    return modules;
  }

  function cleanModuleLabel(value) {
    return String(value || "")
      .replace(/^\s*(?:module\s*)?\d{1,3}\s*[\.\):\-–—]\s*/i, "")
      .replace(/^\s*m\d{1,3}\s*[\):\-–—]\s*/i, "")
      .trim();
  }

  function normalizeModules(value) {
    if (value && Array.isArray(value.modules)) value = value.modules;
    return Array.isArray(value)
      ? value
        .filter(function (moduleItem) { return moduleItem && moduleItem.href; })
        .map(function (moduleItem) {
          var label = cleanModuleLabel(moduleItem.label || moduleItem.title || moduleItem.href);
          return {
            label: label || moduleItem.href,
            href: moduleItem.href
          };
        })
      : [];
  }

  function scriptModules() {
    return normalizeModules(window.COURSE_MODULES);
  }

  function courseModules() {
    var modules = scriptModules();
    return Promise.resolve(modules.length ? modules : fallbackModules());
  }

  function notifyNavigationReady() {
    if (typeof window.CustomEvent !== "function") return;
    document.dispatchEvent(new CustomEvent("course:navigation-ready"));
  }

  function addSidebar(modules) {
    var main = document.querySelector("main.main-content");
    var wrap = main ? main.querySelector(".wrap") : null;
    if (!main || !wrap || main.querySelector(".course-nav-pane")) {
      notifyNavigationReady();
      return;
    }

    var pane = createElement("aside", "course-nav-pane card");
    pane.setAttribute("aria-label", "Course modules");
    var title = createElement("h2", "course-nav-title", "Course Modules");
    title.id = "course-nav-title";
    var navigation = createElement("nav", "course-nav-links");
    navigation.setAttribute("aria-labelledby", title.id);
    var list = createElement("ul", "course-nav-list");
    var currentPage = (window.location.pathname.split("/").pop() || "m01.html").toLowerCase();

    modules.forEach(function (moduleItem) {
      if (!moduleItem || !moduleItem.href) return;
      var item = createElement("li", "course-nav-item");
      var label = cleanModuleLabel(moduleItem.label || moduleItem.title || "") || moduleItem.href;
      var link = createElement("a", "course-nav-link", label);
      link.href = moduleItem.href;
      if (moduleItem.href.toLowerCase() === currentPage) {
        link.classList.add("current");
        link.setAttribute("aria-current", "page");
      }
      item.appendChild(link);
      list.appendChild(item);
    });

    navigation.appendChild(list);
    pane.appendChild(title);
    pane.appendChild(navigation);
    main.classList.add("course-layout");
    main.insertBefore(pane, wrap);
    notifyNavigationReady();
  }

  document.addEventListener("DOMContentLoaded", function () {
    courseModules().then(addSidebar);

    var links = document.querySelectorAll(".module-nav a");
    Array.prototype.forEach.call(links, function (link) {
      if (unavailable(link)) link.remove();
    });
  });
})();
