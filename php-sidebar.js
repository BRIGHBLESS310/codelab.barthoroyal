(() => {
const topics = [
    ['Course Overview', 'php.html'],
    ['Get Started', 'php-get-started.html'],
    ['Syntax and Output', 'php-syntax.html'],
    ['Variables and Types', 'php-variables.html'],
    ['Strings and Arrays', 'php-arrays.html'],
    ['Conditions and Loops', 'php-control-flow.html'],
    ['Functions', 'php-functions.html'],
    ['Forms and Request Data', 'php-forms.html'],
    ['Validation and Safe Output', 'php-validation.html'],
    ['Includes and Organization', 'php-includes.html'],
    ['Sessions and State', 'php-sessions.html'],
    ['Database Access with PDO', 'php-pdo.html'],
    ['Project Practice and Errors', 'php-practice.html']
];
const sidebar = document.querySelector(".sidebar[aria-label='PHP tutorial chapters']");
if (!sidebar) return;
const heading = document.createElement("h3");
heading.className = "sidebar-title";
heading.innerHTML = '<i class="fa-brands fa-php"></i> PHP Tutorial';
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
