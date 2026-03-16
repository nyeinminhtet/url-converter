"use client";

import { useState } from "react";

import UrlField from "./url-field";
import ActionsGroup from "./actions-group";
import UrlFieldResult from "./url-field-result";

type StatusType = "idle" | "success" | "error";

const examples = [
  { encoded: "%3A", decoded: ":" },
  { encoded: "%2F", decoded: "/" },
  { encoded: "%20", decoded: "space" },
];

export default function UrlToolClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<StatusType>("idle");

  const showStatus = (message: string, type: StatusType) => {
    setStatus(message);
    setStatusType(type);
  };

  const requireInput = () => {
    const value = input.trim();

    if (!value) {
      setOutput("");
      showStatus("Enter a URL or encoded string first.", "error");
      return null;
    }

    return value;
  };

  const handleEncode = () => {
    const value = requireInput();

    if (!value) {
      return;
    }

    setOutput(encodeURIComponent(value));
    showStatus("URL encoded successfully.", "success");
  };

  const handleDecode = () => {
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
  };

  const handleAutoDecode = () => {
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
  };

  const extractNextImageUrl = (value: string): string => {
    try {
      const parsedUrl = new URL(value);
      const imageUrl = parsedUrl.searchParams.get("url");

      if (!imageUrl) {
        throw new Error("No image URL found in this Next.js image link.");
      }

      return imageUrl;
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error("Enter a valid Next.js image URL.");
    }
  };

  const handleExtractNextImageUrl = () => {
    const value = requireInput();

    if (!value) {
      return;
    }

    try {
      setOutput(extractNextImageUrl(value));
      showStatus("Original image URL extracted.", "success");
    } catch (error) {
      setOutput("");
      showStatus(
        error instanceof Error ? error.message : "Extraction failed.",
        "error",
      );
    }
  };

  const handleCopy = async () => {
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
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setStatus("");
    setStatusType("idle");
  };

  return (
    <main className="page">
      <section className="tool-card">
        <div className="tool-card__glow" aria-hidden="true" />
        <div className="tool-card__header">
          <div>
            <p className="tool-card__eyebrow">Free online tool</p>
            <h1>URL Encoder &amp; Decoder</h1>
            <p className="tool-card__lede">
              Encode readable URLs or decode percent-encoded strings in one
              place.
            </p>
          </div>
          <div className="tool-card__meta">
            <span className="meta-chip">Fast utility</span>
            <span className={`status-badge status-badge--${statusType}`}>
              {status || "Ready"}
            </span>
          </div>
        </div>

        <UrlField input={input} onInputChange={setInput} />
        <ActionsGroup
          onDecode={handleDecode}
          onEncode={handleEncode}
          onExtractImageUrl={handleExtractNextImageUrl}
          onAutoDecode={handleAutoDecode}
          onCopy={handleCopy}
          onClear={handleClear}
        />
        <UrlFieldResult output={output} />
      </section>

      <section className="help-card">
        <div className="help-card__header">
          <p className="help-card__eyebrow">Examples</p>
          <h2>Common encoded values</h2>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {examples.map((example) => (
            <div key={example.encoded} className="example-item">
              <code>{example.encoded}</code>
              <span>{example.decoded}</span>
            </div>
          ))}
        </div>
        <p className="help-note">
          Next.js image example: paste a `/_next/image?...&url=...` link and use
          <strong> Extract Image URL</strong> to return only the original image
          source.
        </p>
      </section>

      <footer className="site-footer">
        <p>© 2026 URL Encoder &amp; Decoder Tool. All rights reserved.</p>
      </footer>
    </main>
  );
}
