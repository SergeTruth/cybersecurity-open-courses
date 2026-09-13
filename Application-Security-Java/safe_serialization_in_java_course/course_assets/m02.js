window.COURSE_MODULE = {
  "title": "Serialization Formats and Trust Boundaries",
  "graphicAlt": "Data retains its untrusted provenance through a queue, database or cache and must pass an explicit contract boundary before service use.",
  "narration": "Serialization format choice should follow the workflow. Common formats include JSON, XML, YAML, protocol buffers, Avro, CSV, form data, Java native serialization, custom binary formats, and framework-specific encodings. Data-only formats are generally easier to constrain because they describe fields and values. Formats or configurations that reconstruct arbitrary object graphs are harder to reason about and usually require much stronger controls.\n\nTrust boundaries exist between clients, APIs, partners, queues, caches, session stores, files, databases, object stores, internal services, admin tools, and Java application code. Data can become untrusted when it crosses a network, comes from a user, is read from a file, is pulled from a queue, is restored from cache, or is supplied by another service. A value stored in a database can still be untrusted if it originally came from a user or external integration.\n\nA useful review question is simple: who created this serialized data, what format is it in, what code parses it, what objects or DTOs are created, and what action follows? A public request DTO should not have the same assumptions as an internal migration file. A queue message that changes account state should not have the same controls as a low-impact analytics event. Security requirements should attach to each serialization path, not only to the library name.\n\nWhen the application only needs a small request shape, it usually does not need to deserialize a rich domain object or arbitrary class. When a queue message describes a business event, it should have a schema and version. When an admin tool imports data, it should have clear authorization and validation. Format choice, parser configuration, and object mapping should all express the intended trust boundary.",
  "narrationPoints": [
    "Serialization format choice should follow the workflow.",
    "Trust boundaries exist between clients.",
    "A useful review question is simple: who created.",
    "When the application only needs a small request shape.",
    "A public request DTO should not have the same assumptions.",
    "A queue message that changes account state should not have."
  ]
};
