window.COURSE_CODE_MODULE = {
  "title": "Complete the token acceptance policy",
  "codeIntro": "Conceptual application-adapter contract, not a library API. Map each option to documented library behavior and explicit application checks.",
  "codeExamples": [
    {
      "title": "Require the API's issuer, audience, time, and profile",
      "language": "typescript",
      "blurb": "This example assumes the trusted issuer uses the RFC 9068 access-token profile. The adapter must validate that full profile, including required claim types and the at+jwt type. Other profiles need their own explicit purpose policy. The small tolerance is illustrative.",
      "code": "const verified = await verifyAccessJwt(token, trustedKeySource, {\n  issuer: config.expectedIssuer,\n  audience: config.apiAudience,\n  algorithms: [\"RS256\"],\n  requiredClaims: [\"iss\", \"aud\", \"sub\", \"exp\", \"iat\", \"jti\", \"client_id\"],\n  validateJwtAccessTokenProfile: true,\n  validateExpiration: true,\n  validateNotBeforeWhenPresent: true,\n  clockToleranceSeconds: 5,\n  expectedType: \"at+jwt\"\n});\n\n// Next: validate custom claims and construct AuthContext.\nconst auth = validateAndMapClaims(verified.payload);"
    }
  ]
};
