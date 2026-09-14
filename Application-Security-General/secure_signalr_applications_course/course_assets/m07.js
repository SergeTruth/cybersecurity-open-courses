window.COURSE_MODULE = {
  "title": "Groups, Users, Presence, and Targeted Messaging",
  "graphicAlt": "One user may have multiple connections; server-managed group membership and reconnect review preserve tenant and presence boundaries.",
  "narration": "Users and groups are routing tools in SignalR. They help the server decide which active connections should receive a message. A single user may have several connections at the same time, such as a browser tab, a mobile session, and a desktop client. The design should account for that one-to-many relationship when sending targeted messages or tracking presence.\n\nGroup membership should come from trusted server-side decisions. A group can represent a room, tenant, project, role-like audience, subscription, administrative channel, or workflow state, but joining that group should follow the application policy. The server should decide whether a connection belongs in the group, and it should revisit that decision when the underlying permission changes.\n\nGroups should not replace identity, authorization policies, or resource checks. They can make delivery efficient, but they do not prove that a caller may act on a resource or receive a sensitive message. A secure design combines authenticated identity, server-side authorization, and careful group management.\n\nPresence features need restraint. Showing that a user is online, typing, viewing a record, or active in a room can improve collaboration, but it can also reveal sensitive behavior. Presence should respect tenant boundaries, privacy expectations, and the difference between internal operational signals and user-visible status.\n\nDisconnect and reconnect behavior affects group membership, presence, and delivery expectations. Teams should define what happens when a connection drops, reconnects, changes identity, or loses permission. Real-time delivery is most reliable when those lifecycle decisions are explicit instead of accidental.",
  "narrationPoints": [
    "Users and groups are routing tools in SignalR.",
    "Group membership should come from trusted server-side decisions.",
    "Groups should not replace identity, authorization policies, or resource checks.",
    "Presence features need restraint.",
    "Disconnect and reconnect behavior affects group membership, presence, and delivery expectations."
  ]
};
