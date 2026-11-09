(() => {
const topics = [['Tailwind CSS Intro', 'tailwind.html'], ['Get Started', 'tailwind-get-started.html'], ['Utility Fundamentals', 'tailwind-utility-fundamentals.html'], ['Colors & Backgrounds', 'tailwind-colors-backgrounds.html'], ['Spacing & Sizing', 'tailwind-spacing-sizing.html'], ['Typography', 'tailwind-typography.html'], ['Flexbox', 'tailwind-flexbox.html'], ['Grid', 'tailwind-grid.html'], ['Responsive Design', 'tailwind-responsive-design.html'], ['Hover & Focus States', 'tailwind-hover-focus-states.html'], ['Borders & Shadows', 'tailwind-borders-shadows.html'], ['Dark Mode', 'tailwind-dark-mode.html'], ['Arbitrary Values', 'tailwind-arbitrary-values.html'], ['Reusable Components', 'tailwind-reusable-components.html'], ['Theme & Production Build', 'tailwind-theme-build.html']];
const sidebar = document.querySelector(".sidebar");
if (!sidebar) return;
const heading = document.createElement("h3");
heading.className = "sidebar-title";
heading.innerHTML = '<i class="fa-solid fa-wind"></i> Tailwind CSS Tutorial';
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