(() => {
    const pidginTranslations = new Map([
        ["index.html", "Home"],
        ["python.html", "Python"],
        ["java.html", "Java"],
        ["javascript.html", "JavaScript"],
        ["html.html", "HTML"],
        ["css.html", "CSS"],
        ["bootstrap.html", "Bootstrap"],
        ["tailwind.html", "Tailwind"],
        ["ai.html", "AI"],
        ["ai-development.html", "AI Development"],
        ["sql.html", "SQL"],
        ["react.html", "React"],
        ["c++.html", "C++"],
        ["php.html", "PHP"]
    ]);

    const englishFor = (element) => {
        if (!element.dataset.englishHtml) {
            element.dataset.englishHtml = element.innerHTML;
        }
        return element.dataset.englishHtml;
    };

    const getTranslationBlocks = () => {
        const content = document.querySelector("main");
        if (!content) return [];

        return [...content.querySelectorAll("h1, h2, h3, h4, p, li")]
            .filter((element) =>
                !element.closest(".sidebar, .chapter-navigation, .studio-actions, .studio-note, .site-feature-links") &&
                !element.querySelector("a, button, input, textarea, select, strong, em, i")
            );
    };

    const prepareTranslationBlock = (element, blockIndex) => {
        englishFor(element);
        const clone = element.cloneNode(true);
        const code = [...clone.querySelectorAll("code")];
        const codeTokens = code.map((node, codeIndex) => `__CODE_${blockIndex}_${codeIndex}__`);
        code.forEach((node, index) => {
            node.replaceWith(document.createTextNode(codeTokens[index]));
        });
        return {
            element,
            source: clone.textContent.trim(),
            codeFragments: [...element.querySelectorAll("code")].map((node) => node.cloneNode(true)),
            codeTokens
        };
    };

    const renderTranslatedBlock = (block, translation) => {
        for (const token of block.codeTokens) {
            if (!translation.includes(token)) {
                throw new Error("Pidgin translation did not preserve a code example. Please try again.");
            }
        }

        const fragments = document.createDocumentFragment();
        const tokenPattern = /(__CODE_\d+_\d+__)/g;
        const parts = translation.split(tokenPattern);
        for (const part of parts) {
            const tokenIndex = block.codeTokens.indexOf(part);
            if (tokenIndex === -1) {
                fragments.append(document.createTextNode(part));
            } else {
                fragments.append(block.codeFragments[tokenIndex]);
            }
        }
        block.element.replaceChildren(fragments);
    };

    const translateBlocks = async (blocks) => {
        const storageKey = `codelab-pidgin:${location.pathname}`;
        let cached;
        try {
            cached = JSON.parse(localStorage.getItem(storageKey) || "null");
        } catch {
            cached = null;
        }

        const prepared = blocks.map(prepareTranslationBlock);
        const originalTexts = prepared.map((block) => block.source);

        if (cached && cached.source?.length === originalTexts.length &&
            cached.source.every((text, index) => text === originalTexts[index])) {
            return { prepared, translations: cached.translations };
        }

        const translations = [];
        for (let start = 0; start < originalTexts.length; start += 12) {
            const response = await fetch("/api/translate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ texts: originalTexts.slice(start, start + 12) })
            });
            const result = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(result.error || "Pidgin translation is unavailable.");
            }
            if (!Array.isArray(result.translations) ||
                result.translations.length !== Math.min(12, originalTexts.length - start)) {
                throw new Error("The translation service returned an unexpected response.");
            }
            translations.push(...result.translations);
        }

        try {
            localStorage.setItem(storageKey, JSON.stringify({
                source: originalTexts,
                translations
            }));
        } catch {
            // Translation still works for this page when browser storage is unavailable.
        }
        return { prepared, translations };
    };

    const translatePidgin = async (enabled) => {
        document.documentElement.lang = enabled ? "pcm" : "en";
        document.querySelectorAll("#demo a").forEach((link) => {
            const href = link.getAttribute("href");
            const translation = pidginTranslations.get(href);
            if (!translation) return;
            if (!link.dataset.englishLabel) link.dataset.englishLabel = link.textContent.trim();
            link.textContent = enabled ? translation : link.dataset.englishLabel;
        });

        const blocks = getTranslationBlocks();
        if (!enabled) {
            blocks.forEach((element) => {
                if (element.dataset.englishHtml) {
                    element.innerHTML = element.dataset.englishHtml;
                }
            });
        }

        document.querySelectorAll("[data-pcm]").forEach((element) => {
            const replacement = enabled ? element.dataset.pcm : element.dataset.english;
            if (replacement) element.textContent = replacement;
        });

        const toggle = document.querySelector("[data-pidgin-toggle]");
        if (toggle) {
            toggle.setAttribute("aria-pressed", String(enabled));
            toggle.textContent = enabled ? "Pidgin Mode: On" : "Pidgin Mode";
        }

        try {
            localStorage.setItem("codelab-pidgin", enabled ? "on" : "off");
        } catch {
            // The current page can still switch language when browser storage is unavailable.
        }

        if (enabled && blocks.length) {
            if (toggle) {
                toggle.disabled = true;
                toggle.textContent = "Translating…";
            }
            try {
                const { prepared, translations } = await translateBlocks(blocks);
                prepared.forEach((block, index) => {
                    renderTranslatedBlock(block, translations[index]);
                });
            } catch (error) {
                const status = document.querySelector("[data-pidgin-status]");
                if (status) {
                    status.textContent = `${error.message} Configure the AI service and open this site through the local server.`;
                }
                if (toggle) toggle.setAttribute("aria-pressed", "false");
                document.documentElement.lang = "en";
            } finally {
                if (toggle) {
                    toggle.disabled = false;
                    toggle.textContent = "Pidgin Mode";
                }
            }
        }
    };

    const nav = document.querySelector("#demo, #emo");
    if (nav) {
        const tools = document.createElement("div");
        tools.className = "site-feature-links";

        const existingStudioLink = nav.querySelector('a[href="studio.html"]');
        if (!existingStudioLink) {
            const studioLink = document.createElement("a");
            studioLink.href = "studio.html";
            studioLink.textContent = "Live Editor + AI Tutor";
            tools.append(studioLink);
        }

        const pidginToggle = document.createElement("button");
        pidginToggle.type = "button";
        pidginToggle.dataset.pidginToggle = "";
        pidginToggle.setAttribute("aria-pressed", "false");
        pidginToggle.textContent = "Pidgin Mode";
        pidginToggle.addEventListener("click", () => {
            const enabled = pidginToggle.getAttribute("aria-pressed") !== "true";
            void translatePidgin(enabled);
        });
        tools.append(pidginToggle);
        const status = document.createElement("span");
        status.dataset.pidginStatus = "";
        status.className = "pidgin-status";
        status.setAttribute("role", "status");
        status.setAttribute("aria-live", "polite");
        tools.append(status);
        nav.append(tools);
    }

    const runButton = document.querySelector("[data-studio-run]");
    if (runButton) {
        const htmlInput = document.querySelector("#studio-html");
        const cssInput = document.querySelector("#studio-css");
        const jsInput = document.querySelector("#studio-js");
        const preview = document.querySelector("#studio-preview");
        const output = document.querySelector("#studio-output");
        let lastRuntimeError = "";
        let renderTimer;

        const renderPreview = () => {
            const safeJavaScript = JSON.stringify(jsInput.value).replace(/<\/script/gi, "<\\/script");
            const srcdoc = `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval'; style-src 'unsafe-inline'; img-src data: blob:; connect-src 'none'; form-action 'none'; base-uri 'none'"><style>${cssInput.value}</style></head><body>${htmlInput.value}<script>
window.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("__codelab_output");
  const write = (...values) => {
    const message = values.map(value => {
      try { return typeof value === "string" ? value : JSON.stringify(value); }
      catch { return String(value); }
    }).join(" ");
    output.textContent += message + "\\n";
  };
  console.log = write;
  console.error = write;
  try { new Function(${safeJavaScript})(); }
  catch (error) {
    write(error.name + ": " + error.message);
    parent.postMessage({ type: "codelab-editor-error", message: error.name + ": " + error.message }, "*");
  }
});
<\/script><pre id="__codelab_output" style="white-space:pre-wrap;font:13px monospace;color:#334155"></pre></body></html>`;
            preview.srcdoc = srcdoc;
            output.textContent = "Preview updated. JavaScript console output also appears below the preview.";
            lastRuntimeError = "";
        };

        const schedulePreview = () => {
            window.clearTimeout(renderTimer);
            renderTimer = window.setTimeout(renderPreview, 250);
        };

        runButton.addEventListener("click", renderPreview);
        [htmlInput, cssInput, jsInput].forEach((input) => input.addEventListener("input", schedulePreview));

        window.addEventListener("message", (event) => {
            if (event.source !== preview.contentWindow || event.data?.type !== "codelab-editor-error") return;
            lastRuntimeError = String(event.data.message).slice(0, 500);
            output.textContent = lastRuntimeError;
        });

        document.querySelector("[data-studio-reset]").addEventListener("click", () => {
            htmlInput.value = '<h1>Hello, CodeLab!</h1>\n<button id="greet">Click me</button>\n<p id="message">Your message will appear here.</p>';
            cssInput.value = "body { font-family: sans-serif; padding: 2rem; }\nh1 { color: #0891b2; }\nbutton { padding: .6rem 1rem; }";
            jsInput.value = 'document.querySelector("#greet").addEventListener("click", () => {\n  document.querySelector("#message").textContent = "You ran your JavaScript!";\n  console.log("Button clicked");\n});';
            renderPreview();
        });

        document.querySelector("[data-tutor-ask]").addEventListener("click", async () => {
            const questionInput = document.querySelector("#tutor-question");
            const includeCode = document.querySelector("#tutor-include-code").checked;
            const consent = document.querySelector("#tutor-consent").checked;
            const answer = document.querySelector("#tutor-answer");
            const question = questionInput.value.trim();

            if (!question) {
                answer.textContent = "Enter a question so the tutor can help.";
                questionInput.focus();
                return;
            }
            if (!consent) {
                answer.textContent = "Please confirm that you understand your question and any selected code will be sent to the configured AI provider.";
                document.querySelector("#tutor-consent").focus();
                return;
            }

            answer.textContent = "Asking the AI tutor…";
            const askButton = document.querySelector("[data-tutor-ask]");
            askButton.disabled = true;
            try {
                const code = includeCode
                    ? `${htmlInput.value}\n\n/* CSS */\n${cssInput.value}\n\n// JavaScript\n${jsInput.value}`
                    : "";
                const response = await fetch("/api/tutor", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        question,
                        code,
                        runtimeError: lastRuntimeError,
                        language: localStorage.getItem("codelab-pidgin") === "on" ? "Nigerian Pidgin" : "English"
                    })
                });
                const result = await response.json().catch(() => ({}));
                if (!response.ok) {
                    throw new Error(result.error || "The tutor request failed.");
                }
                answer.textContent = result.answer;
            } catch (error) {
                answer.textContent = `${error.message} Start the CodeLab server and configure the AI provider to use the tutor.`;
            } finally {
                askButton.disabled = false;
            }
        });

        renderPreview();
    }

    const pidginEnabled = localStorage.getItem("codelab-pidgin") === "on";
    if (nav) translatePidgin(pidginEnabled);
})();
