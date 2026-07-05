window.COURSE_CODE_MODULE = {
  "title": "Runtime Secret Boundaries",
  "codeIntro": "These examples show how to keep secrets close to the component that actually needs them instead of passing broad config through the whole service.",
  "codeExamples": [
    {
      "title": "Pass a Token Source to the HTTP Client",
      "language": "go",
      "blurb": "The caller gets a constructed client, not the raw token. The token is attached only when an outbound request needs it.",
      "code": `package api

import (
    "context"
    "errors"
    "io"
    "net/http"
)

type TokenSource interface {
    Token(ctx context.Context) (string, error)
}

type Client struct {
    baseURL     string
    tokenSource TokenSource
    httpClient  *http.Client
}

func NewClient(baseURL string, tokenSource TokenSource) *Client {
    return &Client{
        baseURL:     baseURL,
        tokenSource: tokenSource,
        httpClient:  http.DefaultClient,
    }
}

func (c *Client) NewRequest(ctx context.Context, method, path string, body io.Reader) (*http.Request, error) {
    token, err := c.tokenSource.Token(ctx)
    if err != nil {
        return nil, errors.New("authorization token unavailable")
    }

    req, err := http.NewRequestWithContext(ctx, method, c.baseURL+path, body)
    if err != nil {
        return nil, err
    }
    req.Header.Set("Authorization", "Bearer "+token)
    return req, nil
}`
    },
    {
      "title": "Open a Database Without Logging the DSN",
      "language": "go",
      "blurb": "The DSN is passed only to the database driver. Logs and returned errors use a safe alias instead of the credential-bearing string.",
      "code": `package data

import (
    "context"
    "database/sql"
    "fmt"
    "time"
)

func OpenDatabase(ctx context.Context, alias string, dsn string) (*sql.DB, error) {
    db, err := sql.Open("postgres", dsn)
    if err != nil {
        return nil, fmt.Errorf("open database %q: %w", alias, err)
    }

    pingCtx, cancel := context.WithTimeout(ctx, 5*time.Second)
    defer cancel()

    if err := db.PingContext(pingCtx); err != nil {
        db.Close()
        return nil, fmt.Errorf("connect database %q: %w", alias, err)
    }
    return db, nil
}`
    }
  ]
};
