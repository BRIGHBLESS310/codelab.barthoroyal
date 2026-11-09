(() => {
const topics = [['Bootstrap Intro', 'bootstrap.html'], ['Getting Started', 'bootstrap-getting-started.html'], ['Containers and Breakpoints', 'bootstrap-containers-breakpoints.html'], ['The Grid System', 'bootstrap-grid.html'], ['Grid Gutters', 'bootstrap-gutters.html'], ['Spacing and Display Utilities', 'bootstrap-utilities.html'], ['Typography and Colors', 'bootstrap-typography-colors.html'], ['Buttons', 'bootstrap-buttons.html'], ['Cards', 'bootstrap-cards.html'], ['Navigation Bar', 'bootstrap-navbar.html'], ['Forms', 'bootstrap-forms.html'], ['Alerts and Feedback', 'bootstrap-alerts.html'], ['Responsive Images and Tables', 'bootstrap-images-tables.html'], ['Interactive Components', 'bootstrap-interactive-components.html'], ['Customization and Theming', 'bootstrap-customization.html'], ['Accessibility and Responsive Checks', 'bootstrap-accessibility.html']];
const sidebar = document.querySelector('.sidebar[aria-label="Bootstrap tutorial chapters"]');
if (!sidebar) return;
const heading = document.createElement('h3');
heading.className = 'sidebar-title';
heading.innerHTML = '<i class="fa-brands fa-bootstrap"></i> Bootstrap Tutorial';
sidebar.append(heading);
const currentPage = window.location.pathname.split('/').pop();
for (const [label, href] of topics) {
  const link = document.createElement('a');
  link.href = href;
  link.textContent = label;
  if (currentPage === href) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
  sidebar.append(link);
}
})();
