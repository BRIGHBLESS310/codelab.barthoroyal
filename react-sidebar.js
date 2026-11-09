(() => {
const topics = [
    ['Course Overview', 'react.html'],
    ['Get Started', 'react-get-started.html'],
    ['JSX and Rendering', 'react-jsx.html'],
    ['Components and Props', 'react-components.html'],
    ['Conditional UI', 'react-conditional-ui.html'],
    ['Lists and Keys', 'react-lists.html'],
    ['Events', 'react-events.html'],
    ['State with useState', 'react-state.html'],
    ['Forms and Controlled Inputs', 'react-forms.html'],
    ['Updating Arrays and Objects', 'react-updates.html'],
    ['Effects and Data Fetching', 'react-effects.html'],
    ['Composition and Accessibility', 'react-composition.html']
];
const sidebar = document.querySelector(".sidebar[aria-label='React tutorial chapters']");
if (!sidebar) return;
const heading = document.createElement("h3");
heading.className = "sidebar-title";
heading.innerHTML = '<i class="fa-brands fa-react"></i> React Tutorial';
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
