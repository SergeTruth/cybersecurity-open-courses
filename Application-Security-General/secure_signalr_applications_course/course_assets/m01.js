window.COURSE_MODULE = {
  "title": "SignalR Security Model and Trust Boundaries",
  "graphicAlt": "A bidirectional hub remains a server entry point and delivery surface requiring identity, authorization, validation, resource controls, and lifecycle review.",
  "narration": "SignalR is a framework for real-time communication. It helps an ASP.NET Core application keep connected clients updated without forcing every interaction through a fresh request and response. That convenience is powerful, but it does not turn SignalR into a security boundary. The same application still has to decide who is connected, what that connection may do, what data may cross the hub boundary, and how the system behaves under load.\n\nA hub is both a server entry point and a message delivery surface. Connected clients can invoke server methods, and the server can send messages back to one client, many clients, users, groups, or all active connections. That two-way model means hub methods, message contracts, group routing, and connection state all deserve the same careful review given to controllers, APIs, queues, and background workers.\n\nReal-time applications also introduce long-lived connection concerns. Identity may be captured when a connection starts. Permissions may change while a connection remains active. Reconnect behavior, buffered messages, streaming, fan-out, and presence state can create operational and security questions that ordinary request and response flows may not expose.\n\nThe defensive baseline is explicit engineering. Treat every browser, mobile app, desktop app, service client, and generated client as a client, not as a trusted enforcement point. Put identity, authorization, validation, resource controls, logging, and deployment review on the server side where they can be tested, observed, and maintained.",
  "narrationPoints": [
    "SignalR is a framework for real-time communication.",
    "A hub is both a server entry point and a message delivery surface.",
    "Real-time applications also introduce long-lived connection concerns.",
    "The defensive baseline is explicit engineering."
  ]
};
