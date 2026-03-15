# URL Encoder & Decoder Tool

This repository contains two versions of the same utility:

- A Chrome extension built with Manifest V3 in [`chrome-extension`](/Users/nyeinminhtet/Desktop/hobby/url-tool-extension/chrome-extension)
- A hosted Next.js website in [`app`](/Users/nyeinminhtet/Desktop/hobby/url-tool-extension/app) for deployment on Vercel

Both versions let users:

- Encode URLs with `encodeURIComponent()`
- Decode encoded URLs with `decodeURIComponent()`
- Auto-detect percent-encoded text and decode it
- Copy the result to the clipboard
- Clear the input and output quickly

## Project Structure

```text
url-tool-extension/
├── app/                     # Next.js hosted website
├── chrome-extension/        # Chrome Manifest V3 extension
│   ├── icons/
│   ├── manifest.json
│   ├── popup.css
│   ├── popup.html
│   └── popup.js
├── public/
├── package.json
└── README.md
```

## Website Development

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful commands:

```bash
npm run lint
npm run build -- --webpack
```

Note: `npm run build` may fail in restricted local sandboxes if Turbopack cannot bind a port. `npm run build -- --webpack` is the verified production build path used for this project.

## Chrome Extension Installation

To test the extension locally in Chrome:

1. Open `chrome://extensions`
2. Enable `Developer mode`
3. Click `Load unpacked`
4. Select [`chrome-extension`](/Users/nyeinminhtet/Desktop/hobby/url-tool-extension/chrome-extension)
5. Pin the extension and click the toolbar icon to open the popup

If you update extension files:

1. Go back to `chrome://extensions`
2. Click `Reload` on the extension card
3. Close and reopen the popup

## Deploying the Website to Vercel

1. Push this repository to GitHub
2. Import the repository into [Vercel](https://vercel.com)
3. Keep the default `Next.js` framework preset
4. Deploy

After deployment, update the site URL in [`app/layout.tsx`](/Users/nyeinminhtet/Desktop/hobby/url-tool-extension/app/layout.tsx) if your final Vercel domain is different from the placeholder `https://url-tool-extension.vercel.app`.

## Website Metadata

The site metadata is configured in [`app/layout.tsx`](/Users/nyeinminhtet/Desktop/hobby/url-tool-extension/app/layout.tsx), including:

- Title and description
- Canonical URL
- Open Graph metadata
- Twitter card metadata
- Robots directives

## Extension Features

The popup includes:

- Clean light UI with rounded buttons and subtle shadows
- Monospace input and output fields
- Copy success messaging
- Error handling for empty input and invalid decoding
- A quick help section for common encoded values like `%3A`, `%2F`, and `%20`

## License

Use and modify this project as needed for your own deployment or extension distribution.
