window.COURSE_MODULE = {
  "title": "Why File Upload Security Matters",
  "graphicAlt": "An upload moves through intake, validation, private storage, safe processing and authorized access, supported by monitoring, retention and deletion.",
  "narration": "File upload features look simple at first. A Java application accepts a profile image, stores it somewhere, and returns a link. Over time, that same pattern often expands into support attachments, invoices, resumes, diagnostic archives, identity documents, previews, malware scanning, object storage, download links, and background processing. At that point, the upload endpoint is only one piece of the risk. The full lifecycle includes intake, validation, temporary handling, storage, processing, access control, logging, retention, deletion, and incident response.\n\nUploads are high-risk input paths because they let users, partners, administrators, or integrations place content into the application environment. A file may flow through a reverse proxy, servlet container, multipart resolver, temporary directory, Java controller, object store, malware scanner, image library, document parser, preview generator, search indexer, and download route. Each step can change the risk. A file that was harmless during intake may become dangerous when parsed, exposed publicly, indexed, or served with the wrong headers.\n\nThe practical risks include malicious content, oversized files, unsafe filenames, path traversal, public exposure, unauthorized access, metadata leakage, storage abuse, resource exhaustion, parser vulnerabilities, unsafe post-processing, and sensitive data exposure. Java teams may use Spring MVC, Spring Boot, Jakarta Servlet, JAX-RS, application servers, reverse proxies, object storage, and background workers. Those tools help, but none of them make an upload safe by default.\n\nThe goal is to accept only the files the business actually needs, process them safely, store them in the right place, and control who can retrieve them. Secure upload handling is not one annotation, one filename cleanup function, one antivirus scan, or one bucket policy. It is a design that makes allowed use cases, limits, validation, storage boundaries, processing behavior, and operational response explicit and reviewable.",
  "narrationPoints": [
    "File upload features look simple at first.",
    "Uploads are high-risk input paths.",
    "The practical risks include malicious content.",
    "The goal is to accept only the files the business actually.",
    "Java teams may use Spring MVC.",
    "It is a design."
  ]
};
