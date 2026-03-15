"use client";

import { useState } from "react";

type StatusType = "idle" | "success" | "error";

const examples = [
  { encoded: "%3A", decoded: ":" },
  { encoded: "%2F", decoded: "/" },
  { encoded: "%20", decoded: "space" },
];

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<StatusType>("idle");

  function showStatus(message: string, type: StatusType) {
    setStatus(message);
    setStatusType(type);
  }

  function requireInput() {
    const value = input.trim();

    if (!value) {
      setOutput("");
      showStatus("Enter a URL or encoded string first.", "error");
      return null;
    }

    return value;
  }

  function handleEncode() {
    const value = requireInput();

    if (!value) {
      return;
    }

    setOutput(encodeURIComponent(value));
    showStatus("URL encoded successfully.", "success");
  }

  function handleDecode() {
    const value = requireInput();

    if (!value) {
      return;
    }

    try {
      setOutput(decodeURIComponent(value));
      showStatus("URL decoded successfully.", "success");
    } catch {
      setOutput("");
      showStatus(
        "That input cannot be decoded with decodeURIComponent().",
        "error",
      );
    }
  }

  function handleAutoDecode() {
    const value = requireInput();

    if (!value) {
      return;
    }

    if (!value.includes("%")) {
      setOutput(value);
      showStatus("No percent-encoded segments were detected.", "error");
      return;
    }

    try {
      setOutput(decodeURIComponent(value));
      showStatus("Encoded text detected and decoded.", "success");
    } catch {
      setOutput("");
      showStatus("Encoded text was detected, but decoding failed.", "error");
    }
  }

  async function handleCopy() {
    const value = output.trim();

    if (!value) {
      showStatus("There is no result to copy yet.", "error");
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      showStatus("Result copied to clipboard.", "success");
    } catch {
      showStatus("Clipboard access failed in this browser.", "error");
    }
  }

  function handleClear() {
    setInput("");
    setOutput("");
    setStatus("");
    setStatusType("idle");
  }

  return (
    <main className="tool-shell">
      <section className="hero">
        <div className="hero__copy">
          <h1>URL Encoder &amp; Decoder</h1>
          <p className="hero__lede">
            Encode clean URLs for query strings, decode unreadable
            percent-encoded text, and copy the result instantly from one page.
          </p>
          <div className="hero__chips">
            <span>Manifest V3 extension included</span>
            <span>Fast clipboard workflow</span>
            <span>Developer-tool style UI</span>
          </div>
        </div>

        <div className="hero__card">
          <div className="panel">
            <div className="panel__heading">
              <span className="panel__label">Input</span>
              <span className="panel__hint">
                Paste a full URL or encoded value
              </span>
            </div>
            <textarea
              className="tool-field"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="https%3A%2F%2Fexample.com%2Fdocs%3Fsearch%3Dhello%2520world"
              spellCheck={false}
            />
          </div>

          <div className="tool-actions">
            <button
              className="action action--primary"
              onClick={handleDecode}
              type="button"
            >
              Decode URL
            </button>
            <button className="action" onClick={handleEncode} type="button">
              Encode URL
            </button>
            <button className="action" onClick={handleAutoDecode} type="button">
              Auto Detect &amp; Decode
            </button>
            <button className="action" onClick={handleCopy} type="button">
              Copy Result
            </button>
            <button
              className="action action--ghost"
              onClick={handleClear}
              type="button"
            >
              Clear
            </button>
          </div>

          <div className="panel">
            <div className="panel__heading">
              <span className="panel__label">Result</span>
              <span className={`status status--${statusType}`}>{status}</span>
            </div>
            <textarea
              className="tool-field tool-field--output"
              value={output}
              readOnly
              placeholder="Your converted value will appear here."
              spellCheck={false}
            />
          </div>
        </div>
      </section>

      <section className="info-grid">
        <article className="info-card">
          <h2>Examples</h2>
          <ul className="example-list">
            {examples.map((example) => (
              <li key={example.encoded}>
                <code>{example.encoded}</code>
                <span>{example.decoded}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="info-card">
          <h2>How to use it</h2>
          <p>
            Use <strong>Encode URL</strong> when you need safe query-string or
            path values. Use <strong>Decode URL</strong> when a link looks
            unreadable because of percent encoding.
          </p>
        </article>
      </section>

      <footer className="site-footer">
        <p>© 2026 URL Encoder &amp; Decoder Tool. All rights reserved.</p>
      </footer>
    </main>
  );
}
