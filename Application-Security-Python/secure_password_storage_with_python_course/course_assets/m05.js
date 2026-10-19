window.COURSE_MODULE = {
  "title": "Work Factors, Performance, and Availability",
  "graphicAlt": "Measured hashing cost balances offline resistance with availability and abuse controls.",
  "narration": "A work factor is a setting that influences the computational cost of password hashing. Higher cost can improve resistance to offline guessing after hash exposure, but it also consumes more server time and sometimes more memory during legitimate authentication. The right setting is not simply the highest number possible. It must balance user experience, server capacity, concurrency, password reset behavior, and availability.\n\nLogin latency is the most visible cost, but it is not the only one. Account creation, password reset, forced password changes, background account migrations, and bursty login events can all trigger hashing work. If cost is tuned without considering peak traffic, the authentication system may become slow or unstable. If cost is too low, exposed hashes may be easier to attack offline. Good tuning uses measurement, capacity planning, and periodic review.\n\nDenial-of-service considerations matter because attackers may try to force the application to spend resources on expensive password checks. Rate limiting, throttling, progressive delays, lockout tradeoffs, and bot or abuse controls at a high level help protect availability. Lockouts must be designed carefully because overly aggressive lockouts can be used to disrupt legitimate users. The defensive goal is to reduce automated abuse without creating a new operational weakness.\n\nMonitoring authentication performance helps teams detect when cost settings, traffic patterns, or infrastructure changes create risk. Track login latency, error rates, reset activity, throttle events, and unusual spikes. Password hashing should be expensive enough to reduce damage after database exposure, but operationally sustainable enough that users can authenticate reliably and defenders can identify abuse quickly.",
  "narrationPoints": [
    "A work factor is a setting that influences.",
    "Login latency is the most visible cost.",
    "Denial-of-service considerations matter.",
    "Monitoring authentication performance helps teams detect.",
    "It must balance user experience.",
    "Good tuning uses measurement."
  ]
};
