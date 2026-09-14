window.COURSE_MODULE = {
  "title": "Course Summary: A Secure SignalR Baseline",
  "graphicAlt": "A secure real-time baseline maintains identity, authorizes actions, validates messages, bounds resources, and observes safely under server-side control.",
  "narration": "A secure SignalR baseline starts with the right mental model. SignalR is a real-time communication framework, not a trust boundary. Hubs, methods, messages, users, groups, browser transports, and connection lifecycle decisions are all part of the application design and should be reviewed deliberately.\n\nAuthenticate connections explicitly, then authorize hubs, methods, and sensitive actions on the server. Do not rely on UI hiding or group membership as the complete permission model. Validate hub method arguments and message content, use narrow contracts, and verify client-supplied identifiers against trusted server-side data.\n\nProtect tokens, connection data, and browser transport behavior. Review CORS, WebSocket origins, HTTPS, query-string logging, proxies, load balancers, scale-out, and production configuration. Constrain message size, streaming behavior, reconnect buffering, fan-out, and high-frequency events so the real-time system remains predictable.\n\nFinally, return safe errors and log useful events without secrets. A mature SignalR application is observable, bounded, and governed. It gives users real-time behavior while keeping identity, authorization, validation, resource control, and deployment review firmly under server-side engineering control.",
  "narrationPoints": [
    "A secure SignalR baseline starts with the right mental model.",
    "Authenticate connections explicitly, then authorize hubs, methods, and sensitive actions on the server.",
    "Protect tokens, connection data, and browser transport behavior.",
    "Finally, return safe errors and log useful events without secrets."
  ]
};
