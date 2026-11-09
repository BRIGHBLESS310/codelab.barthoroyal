# CodeLab interactive features

## Run the site

Install Node.js 20.12 or newer, then run `npm start` from the project folder. Open `http://127.0.0.1:3000`. The server also serves the static lessons; do not open the HTML files as `file://` URLs when using the tutor or Pidgin translation.

The Live Code Editor runs HTML, CSS, and JavaScript in a sandboxed browser preview. Python remains a limited preview on the Python lessons; other languages need their own compiler or runtime.

## Configure the AI Tutor and Pidgin Mode

The AI Tutor and lesson translation use an OpenAI-compatible chat-completions API. Copy `.env.example` to `.env`, then set `AI_API_KEY`, `AI_API_URL`, and `AI_MODEL` for a provider that supports that API shape. Keep `.env` private; it is ignored by Git. Never put the key in client-side JavaScript or commit it.

Restart `npm start` after setting the environment values. Tutor questions are sent only after the learner submits the form and checks consent. Lesson code is excluded unless the learner explicitly selects the code-sharing checkbox. Pidgin Mode sends visible lesson text to the configured provider when enabled. Do not send private information or secrets.
