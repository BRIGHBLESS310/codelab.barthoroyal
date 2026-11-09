(() => {
const topics = [['CSS Intro', 'css.html'], ['CSS Syntax and Rules', 'css-syntax.html'], ['Selectors', 'css-selectors.html'], ['Cascade and Specificity', 'css-cascade.html'], ['Colors and Units', 'css-colors-units.html'], ['The Box Model', 'css-box-model.html'], ['Typography', 'css-typography.html'], ['Backgrounds and Borders', 'css-backgrounds-borders.html'], ['Display and Positioning', 'css-display-position.html'], ['Flexbox', 'css-flexbox.html'], ['CSS Grid', 'css-grid.html'], ['Responsive Design', 'css-responsive.html'], ['Pseudo-classes and States', 'css-pseudo-classes.html'], ['Transitions and Motion', 'css-transitions.html'], ['CSS Custom Properties', 'css-custom-properties.html'], ['Organizing Stylesheets', 'css-organization.html']];
const sidebar = document.querySelector('.sidebar[aria-label="CSS tutorial chapters"]');
if (!sidebar) return;
const heading = document.createElement('h3');
heading.className = 'sidebar-title';
heading.innerHTML = '<i class="fa-brands fa-css3-alt"></i> CSS Tutorial';
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
