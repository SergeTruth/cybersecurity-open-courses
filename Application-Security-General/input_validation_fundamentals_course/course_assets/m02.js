window.COURSE_MODULE = {
  "title": "Where Input Comes From",
  "graphicAlt": "Blank placeholder graphic for application input sources",
  "narration": "Input comes from more places than most teams first expect. Web forms are obvious, but applications also receive data through API request bodies, query strings, route parameters, headers, cookies, uploaded files, webhooks, message queues, command-line arguments, environment variables, database records, and third-party integrations. Any place where data crosses a boundary deserves attention.\n\nClient-controlled fields are not limited to visible form inputs. A user can modify hidden fields, cookies, headers, JSON bodies, multipart requests, and request parameters. Mobile apps, desktop clients, browser extensions, automated scripts, and test tools can all send requests that do not follow the intended interface. Server-side code must validate what it receives, not what the user interface hoped to send.\n\nInternal data can still be unsafe. A database record may originally have come from a user import, a partner feed, a previous software version, a support tool, or a compromised account. Message queues can carry malformed or replayed messages. Environment variables and configuration can be changed by deployment systems. Even data created inside the organization may be stale, inconsistent, or outside current business rules.\n\nA useful validation design starts by mapping input sources and trust boundaries. Ask where the data came from, who or what controls it, how it is encoded, what transformations it has already passed through, and where it will be used next. The more clearly a team understands the path of data, the easier it becomes to validate it at the right points.",
  "narrationPoints": [
    "Input comes from more places than most teams first expect.",
    "Client-controlled fields are not limited to visible form inputs.",
    "Internal data can still be unsafe.",
    "A useful validation design starts by mapping input sources and trust boundaries."
  ]
};
