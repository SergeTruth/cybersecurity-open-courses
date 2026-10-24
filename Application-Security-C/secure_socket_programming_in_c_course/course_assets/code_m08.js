window.COURSE_CODE_MODULE = {
  "title": "Transport Protection and Sensitive Data: code example",
  "codeIntro": "Encryption alone is not peer assurance. The comparison makes protocol policy, certificate validation, and expected service identity part of connection acceptance.",
  "codeExamples": [
    {
      "title": "Vulnerable: encryption is mistaken for authenticated transport",
      "language": "c",
      "blurb": "The client accepts any encrypted channel without checking the peer certificate, trust decision, or expected service identity.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

struct transport_result {
    bool encrypted;
    bool certificate_trusted;
    bool service_identity_matches;
};

static bool channel_acceptable(const struct transport_result *result)
{
    if (result == NULL) {
        return false;
    }

    /* IMPORTANT DEFECT: encryption is accepted without peer validation. */
    return result->encrypted;
}

int main(void)
{
    const struct transport_result impostor = { true, false, false };
    const struct transport_result plaintext = { false, false, false };

    /* TEST: an encrypted connection to an untrusted impostor is accepted. */
    assert(channel_acceptable(&impostor));
    assert(!channel_acceptable(&plaintext));
    return 0;
}
`
    },
    {
      "title": "Safer: require trusted TLS and the expected service identity",
      "language": "c",
      "blurb": "The application accepts a channel only when the negotiated version meets policy and certificate validation proves the intended peer identity.",
      "code": `#include <assert.h>
#include <stdbool.h>
#include <stddef.h>

enum tls_version {
    TLS_VERSION_1_0,
    TLS_VERSION_1_2,
    TLS_VERSION_1_3
};

struct transport_result {
    bool encrypted;
    bool certificate_present;
    bool certificate_trusted;
    bool service_identity_matches;
    enum tls_version negotiated_version;
};

static bool channel_acceptable(const struct transport_result *result)
{
    if (result == NULL) {
        return false;
    }

    /* IMPORTANT FIX: encryption, policy, trust, and identity all matter. */
    return result->encrypted &&
           result->negotiated_version >= TLS_VERSION_1_2 &&
           result->certificate_present &&
           result->certificate_trusted &&
           result->service_identity_matches;
}

int main(void)
{
    const struct transport_result valid = {
        true, true, true, true, TLS_VERSION_1_3
    };
    const struct transport_result wrong_identity = {
        true, true, true, false, TLS_VERSION_1_3
    };
    const struct transport_result untrusted = {
        true, true, false, true, TLS_VERSION_1_3
    };
    const struct transport_result obsolete = {
        true, true, true, true, TLS_VERSION_1_0
    };

    assert(channel_acceptable(&valid));
    /* TEST: protected bytes do not excuse failed identity or version policy. */
    assert(!channel_acceptable(&wrong_identity));
    assert(!channel_acceptable(&untrusted));
    assert(!channel_acceptable(&obsolete));
    assert(!channel_acceptable(NULL));
    return 0;
}
`
    }
  ]
};
