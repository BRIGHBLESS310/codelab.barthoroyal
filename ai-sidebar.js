(() => {
const topics = [['Artificial Intelligence Intro', 'ai.html'], ['AI Fundamentals', 'ai-fundamentals.html'], ['AI Approaches', 'ai-ai-types.html'], ['Data & Representation', 'ai-data.html'], ['Machine Learning Workflow', 'ai-ml-workflow.html'], ['Supervised Learning', 'ai-supervised-learning.html'], ['Unsupervised Learning', 'ai-unsupervised-learning.html'], ['Neural Networks', 'ai-neural-networks.html'], ['Natural Language Processing', 'ai-natural-language.html'], ['Generative AI', 'ai-generative-ai.html'], ['Prompting Basics', 'ai-prompting.html'], ['Evaluation & Metrics', 'ai-evaluation.html'], ['Limitations & Bias', 'ai-limitations-bias.html'], ['Privacy & Responsible AI', 'ai-privacy-responsible-ai.html'], ['Applications & Project Practice', 'ai-applications-project.html']];
const sidebar = document.querySelector(".sidebar");
if (!sidebar) return;
const heading = document.createElement("h3");
heading.className = "sidebar-title";
heading.innerHTML = '<i class="fa-solid fa-brain"></i> Artificial Intelligence Tutorial';
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