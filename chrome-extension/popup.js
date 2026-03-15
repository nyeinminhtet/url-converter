const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const status = document.getElementById("status");

const decodeBtn = document.getElementById("decodeBtn");
const encodeBtn = document.getElementById("encodeBtn");
const extractBtn = document.getElementById("extractBtn");
const autoBtn = document.getElementById("autoBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");

let statusTimer = null;

function setStatus(message, type = "") {
  status.textContent = message;
  status.className = "status";

  if (type) {
    status.classList.add(`is-${type}`);
  }

  if (statusTimer) {
    clearTimeout(statusTimer);
  }

  if (message) {
    statusTimer = window.setTimeout(() => {
      status.textContent = "";
      status.className = "status";
    }, 2200);
  }
}

function getTrimmedInput() {
  return inputText.value.trim();
}

function requireInput() {
  const value = getTrimmedInput();

  if (!value) {
    outputText.value = "";
    setStatus("Enter a value first.", "error");
    inputText.focus();
    return null;
  }

  return value;
}

function runConversion(converter) {
  const value = requireInput();

  if (!value) {
    return;
  }

  try {
    outputText.value = converter(value);
    setStatus("Conversion complete.", "success");
  } catch (error) {
    outputText.value = "";
    setStatus(error instanceof Error ? error.message : "Conversion failed.", "error");
  }
}

function extractNextImageUrl(value) {
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
}

decodeBtn.addEventListener("click", () => {
  runConversion((value) => decodeURIComponent(value));
});

encodeBtn.addEventListener("click", () => {
  runConversion((value) => encodeURIComponent(value));
});

extractBtn.addEventListener("click", () => {
  runConversion((value) => extractNextImageUrl(value));
});

autoBtn.addEventListener("click", () => {
  const value = requireInput();

  if (!value) {
    return;
  }

  if (!value.includes("%")) {
    outputText.value = value;
    setStatus("No encoded patterns found.", "error");
    return;
  }

  try {
    outputText.value = decodeURIComponent(value);
    setStatus("Detected encoded text and decoded it.", "success");
  } catch (error) {
    outputText.value = "";
    setStatus(error instanceof Error ? error.message : "Unable to decode.", "error");
  }
});

copyBtn.addEventListener("click", async () => {
  const value = outputText.value.trim();

  if (!value) {
    setStatus("Nothing to copy yet.", "error");
    return;
  }

  try {
    await navigator.clipboard.writeText(value);
    setStatus("Copied to clipboard.", "success");
  } catch (error) {
    setStatus(error instanceof Error ? error.message : "Copy failed.", "error");
  }
});

clearBtn.addEventListener("click", () => {
  inputText.value = "";
  outputText.value = "";
  setStatus("");
  inputText.focus();
});
