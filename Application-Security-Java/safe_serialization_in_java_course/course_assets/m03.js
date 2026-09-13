window.COURSE_MODULE = {
  "title": "Native Java Serialization and ObjectInputStream Risk",
  "graphicAlt": "Native Java object reconstruction can involve classes, callbacks and library behavior, contrasted with narrow data validated and authorized before internal domain construction.",
  "narration": "Native Java serialization can reconstruct complex object graphs from bytes. That is powerful and convenient in some legacy designs, but it is high risk when the input is not fully trusted. Deserialization may involve class loading, constructor-like mechanisms, readObject methods, validation callbacks, and library behavior developers do not expect. The result is not merely data parsing. It is object reconstruction inside the application runtime.\n\nThe classes available on the application classpath affect what can happen during deserialization. The risk is not limited to the application's own classes. Third-party dependencies, framework classes, and utility libraries may define behavior that runs while an object graph is rebuilt. This is why ObjectInputStream should be treated as a high-risk boundary rather than as a generic way to read data from clients, files, caches, queues, or partner integrations.\n\nLegacy systems may still rely on serialized Java objects for sessions, caches, RMI-style communication, files, or internal protocols. If that path remains, minimize exposure. Authenticate the source, protect transport, restrict accepted classes, apply size and graph limits, monitor failures, isolate the workflow where practical, and document who owns it. Do not allow native Java deserialization to quietly expand into new untrusted input paths because it is easy to wire up.\n\nThe safest design is often to replace native object deserialization with constrained data formats and explicit mapping to application models. Instead of accepting a serialized object graph, accept a narrow DTO or message schema, validate it, authorize the action, and then construct the domain object internally. That pattern gives the application a chance to decide what state is allowed before rich objects are created.",
  "narrationPoints": [
    "Native Java serialization can reconstruct complex object.",
    "The classes available on the application classpath affect.",
    "Legacy systems may still rely on serialized Java objects.",
    "The safest design is often to replace native object.",
    "This is why ObjectInputStream should be treated.",
    "Authenticate the source."
  ]
};
