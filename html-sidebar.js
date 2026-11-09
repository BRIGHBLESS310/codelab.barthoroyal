(() => {
const topics = [['HTML Intro', 'html.html'], ['Document Structure', 'html-document-structure.html'], ['Elements and Attributes', 'html-elements.html'], ['Text and Headings', 'html-text-headings.html'], ['Links and Navigation', 'html-links.html'], ['Images and Alternative Text', 'html-images.html'], ['Lists', 'html-lists.html'], ['Tables', 'html-tables.html'], ['Semantic Page Layout', 'html-semantic-layout.html'], ['Forms and Labels', 'html-forms.html'], ['Input Types', 'html-input-types.html'], ['Form Validation', 'html-form-validation.html'], ['Audio and Video', 'html-audio-video.html'], ['Embedding Content', 'html-embedding.html'], ['Accessibility Essentials', 'html-accessibility.html'], ['Metadata and the Head', 'html-metadata.html']];
const sidebar = document.querySelector('.sidebar[aria-label="HTML tutorial chapters"]');
if (!sidebar) return;
const heading = document.createElement('h3');
heading.className = 'sidebar-title';
heading.innerHTML = '<i class="fa-brands fa-html5"></i> HTML Tutorial';
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
