window.COURSE_MODULE = {
  "title": "Public-Key Cryptography, Certificates, and TLS",
  "graphicAlt": "A TLS connection checks the intended host, trusted certificate chain and validity period, with private-key protection and renewal planning.",
  "narration": "Public-key cryptography uses a key pair: a public key and a private key. At a high level, key pairs can support encryption, key establishment, and digital signatures depending on the protocol. The public key can be shared. The private key must be protected. This structure helps solve problems where parties need to establish trust without already sharing the same secret key, but it introduces new responsibilities around identity, certificates, and private key protection.\n\nCertificates bind public keys to identities through a public key infrastructure. A certificate chain helps a client decide whether to trust a server certificate based on trusted authorities and validation rules. TLS and HTTPS are standard protocols for protecting data in transit. Python applications should normally rely on standard TLS libraries, platform validation, and mature HTTP clients or servers rather than inventing transport security behavior.\n\nCertificate validation concepts include checking that the certificate is valid for the intended host, within its validity period, issued by a trusted chain, and appropriate for the connection. Disabling TLS verification or accepting any certificate creates serious risk because the application may trust the wrong server or connection. Temporary troubleshooting choices can become permanent vulnerabilities if they are not removed and reviewed.\n\nPublic-key systems also need operational care. Private keys must be stored securely, rotated when needed, protected in backups, and monitored for exposure. Certificate expiration can cause outages. Misconfigured trust stores can cause unsafe acceptance or broken connectivity. For Python developers, the safest path is to use standard libraries and protocols correctly, keep validation enabled, and treat certificate and key management as production operations, not one-time setup.",
  "narrationPoints": [
    "Public-key cryptography uses a key pair: a public key.",
    "Certificates bind public keys to identities through.",
    "Certificate validation concepts include checking.",
    "Public-key systems also need operational care.",
    "The private key must be protected.",
    "Private keys must be stored securely, rotated."
  ]
};
