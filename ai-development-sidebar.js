(() => {
const topics = [['AI Development Intro', 'ai-development.html'], ['Problem Framing', 'ai-development-problem-framing.html'], ['Choose an Approach', 'ai-development-choose-approach.html'], ['Data Readiness', 'ai-development-data-readiness.html'], ['Models & APIs', 'ai-development-model-api.html'], ['Application Architecture', 'ai-development-architecture.html'], ['Prompt Design', 'ai-development-prompt-design.html'], ['Structured Output', 'ai-development-structured-output.html'], ['Retrieval-Augmented Generation', 'ai-development-retrieval.html'], ['Tool Use & Actions', 'ai-development-tool-use.html'], ['Testing & Evaluation', 'ai-development-evaluation.html'], ['Safety & Security', 'ai-development-safety-security.html'], ['Privacy & Data Handling', 'ai-development-privacy.html'], ['Reliability & Fallbacks', 'ai-development-reliability.html'], ['Deployment & Monitoring', 'ai-development-deployment.html'], ['Project Practice', 'ai-development-project-practice.html']];
const sidebar = document.querySelector(".sidebar");
if (!sidebar) return;
const heading = document.createElement("h3");
heading.className = "sidebar-title";
heading.innerHTML = '<i class="fa-solid fa-gears"></i> AI Development Tutorial';
sidebar.append(heading);
const currentPage = window.location.pathname.split("/").pop();
for (const [label, href] of topics) {
    const link = document.createElement("a");
    link.href = href;
    link.textContent = label;
    if (currentPage === href) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
    }
    sidebar.append(link);
}
})();