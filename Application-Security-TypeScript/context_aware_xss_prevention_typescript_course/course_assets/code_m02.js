window.COURSE_CODE_MODULE = {
  "title": "Construct Structure with DOM APIs",
  "codeIntro": "Developer code creates the element structure while external values remain text or pass through a captured, application-owned URL boundary.",
  "codeExamples": [
    {
      "title": "Separate label text from link destination",
      "language": "typescript",
      "blurb": "The label is created as character data. The navigation boundary performs the protocol and origin decision and assigns the href itself, so this renderer never receives a reusable trusted URL string or a mutable URL object.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
interface NavigationBoundary {
  // Parses and authorizes the candidate, then assigns the canonical href.
  assignApprovedHref(link: HTMLAnchorElement, candidate: unknown): void;
}

function buildProfileLinkRenderer(
  navigation: NavigationBoundary
): (container: HTMLDivElement, profile: unknown) => void {
  if (typeof navigation !== "object" || navigation === null ||
      typeof navigation.assignApprovedHref !== "function") {
    throw new TypeError("invalid navigation boundary");
  }
  const assignApprovedHref =
    navigation.assignApprovedHref.bind(navigation);

  return (container, profile) => {
    if (container.localName !== "div" ||
        container.namespaceURI !== "http://www.w3.org/1999/xhtml") {
      throw new TypeError("invalid profile container");
    }
    if (typeof profile !== "object" || profile === null ||
        Array.isArray(profile)) {
      throw new TypeError("invalid profile view");
    }
    const fields = profile as Record<string, unknown>;
    const displayName = fields.displayName;
    const website = fields.website;
    if (typeof displayName !== "string" ||
        displayName.length < 1 || displayName.length > 200 ||
        typeof website !== "string" ||
        website.length < 1 || website.length > 2048) {
      throw new TypeError("invalid profile view");
    }

    const link = container.ownerDocument.createElement("a");
    link.className = "profile-link";
    link.textContent = displayName;
    assignApprovedHref(link, website);
    container.replaceChildren(link);
  };
}`
    }
  ]
};
