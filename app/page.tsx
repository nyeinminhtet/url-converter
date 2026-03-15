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
      showStatus("That input cannot be decoded.", "error");
    }
  }

  function handleAutoDecode() {
    const value = requireInput();

    if (!value) {
      return;
    }

    if (!value.includes("%")) {
      setOutput(value);
      showStatus("No encoded pattern was detected.", "error");
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
    <main className="page">
      <section className="tool-card">
        <div className="tool-card__glow" aria-hidden="true" />
        <div className="tool-card__header">
          <div>
            <p className="tool-card__eyebrow">Free online tool</p>
            <h1>URL Encoder &amp; Decoder</h1>
            <p className="tool-card__lede">
              Encode readable URLs or decode percent-encoded strings in one place.
            </p>
          </div>
          <div className="tool-card__meta">
            <span className="meta-chip">Fast utility</span>
            <span className={`status-badge status-badge--${statusType}`}>
              {status || "Ready"}
            </span>
          </div>
        </div>

        <div className="field-group">
          <label className="field-label" htmlFor="input">
            Input
          </label>
          <textarea
            id="input"
            className="tool-field"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Paste a URL or encoded string here..."
            spellCheck={false}
          />
        </div>

        <div className="actions">
          <button className="button button--primary" onClick={handleDecode} type="button">
            Decode URL
          </button>
          <button className="button" onClick={handleEncode} type="button">
            Encode URL
          </button>
          <button className="button" onClick={handleAutoDecode} type="button">
            Auto Detect &amp; Decode
          </button>
          <button className="button" onClick={handleCopy} type="button">
            Copy Result
          </button>
          <button className="button button--ghost" onClick={handleClear} type="button">
            Clear
          </button>
        </div>

        <div className="field-group">
          <label className="field-label" htmlFor="output">
            Result
          </label>
          <textarea
            id="output"
            className="tool-field"
            value={output}
            readOnly
            placeholder="Your converted result will appear here..."
            spellCheck={false}
          />
        </div>
      </section>

      <section className="help-card">
        <div className="help-card__header">
          <p className="help-card__eyebrow">Examples</p>
          <h2>Common encoded values</h2>
        </div>
        <div className="example-grid">
          {examples.map((example) => (
            <div key={example.encoded} className="example-item">
              <code>{example.encoded}</code>
              <span>{example.decoded}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <p>© 2026 URL Encoder &amp; Decoder Tool. All rights reserved.</p>
      </footer>
    </main>
  );
}
