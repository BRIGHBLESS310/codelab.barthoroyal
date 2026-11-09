function parsePythonPreviewValue(expression, variables) {
    const value = expression.trim();

    if (variables.has(value)) return variables.get(value);
    if (value === "True") return true;
    if (value === "False") return false;
    if (value === "None") return null;
    if (/^-?\d+(?:\.\d+)?$/.test(value)) return Number(value);
    if (/^"(?:[^"\\]|\\.)*"$/.test(value)) return JSON.parse(value);
    if (/^\[(?:\s*(?:"(?:[^"\\]|\\.)*"|-?\d+(?:\.\d+)?|True|False|None)\s*,?)*\]$/.test(value)) {
        return JSON.parse(value.replace(/\bTrue\b/g, "true").replace(/\bFalse\b/g, "false").replace(/\bNone\b/g, "null"));
    }

    const arithmetic = value.match(/^(-?\d+(?:\.\d+)?)\s*(\*\*|\/\/|[+\-*/%])\s*(-?\d+(?:\.\d+)?)$/);
    if (arithmetic) {
        const left = Number(arithmetic[1]);
        const right = Number(arithmetic[3]);
        switch (arithmetic[2]) {
            case "+": return left + right;
            case "-": return left - right;
            case "*": return left * right;
            case "/": return left / right;
            case "//": return Math.floor(left / right);
            case "%": return left % right;
            case "**": return left ** right;
        }
    }

    throw new Error(`This preview cannot evaluate: ${value}`);
}

function runPythonPreview(editor, output) {
    const variables = new Map();
    const results = [];

    try {
        for (const rawLine of editor.value.split(/\r?\n/)) {
            const line = rawLine.trim();
            if (!line || line.startsWith("#")) continue;

            const assignment = line.match(/^([A-Za-z_]\w*)\s*=\s*(.+)$/);
            if (assignment) {
                variables.set(assignment[1], parsePythonPreviewValue(assignment[2], variables));
                continue;
            }

            const print = line.match(/^print\((.*)\)$/);
            if (!print) throw new Error(`This preview cannot run: ${line}`);

            const content = print[1].trim();
            const value = parsePythonPreviewValue(content, variables);
            results.push(Array.isArray(value) ? JSON.stringify(value) : String(value));
        }

        output.textContent = results.length ? results.join("\n") : "Finished with no output.";
        output.dataset.state = "success";
    } catch (error) {
        output.textContent = error.message;
        output.dataset.state = "error";
    }
}

document.querySelectorAll("[data-python-sandbox]").forEach(sandbox => {
    const editor = sandbox.querySelector("textarea");
    const output = sandbox.querySelector(".terminal-box");

    sandbox.querySelector("[data-action='run']").addEventListener("click", () => {
        runPythonPreview(editor, output);
    });

    sandbox.querySelector("[data-action='clear']").addEventListener("click", () => {
        output.textContent = 'Click "Run Code" to view output...';
        delete output.dataset.state;
    });

    sandbox.querySelector("[data-action='copy']").addEventListener("click", async event => {
        try {
            await navigator.clipboard.writeText(editor.value);
            event.currentTarget.textContent = "Copied";
        } catch (error) {
            output.textContent = `Could not copy code: ${error.message}`;
            output.dataset.state = "error";
        }
    });
});
