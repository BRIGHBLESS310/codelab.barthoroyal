(() => {
const topics = [
    ['Course Overview', 'sql.html'],
    ['Get Started', 'sql-get-started.html'],
    ['SELECT and FROM', 'sql-select.html'],
    ['Filtering and Sorting', 'sql-filtering.html'],
    ['INSERT, UPDATE, DELETE', 'sql-changes.html'],
    ['Functions and Aggregates', 'sql-aggregates.html'],
    ['Joins', 'sql-joins.html'],
    ['Subqueries and CTEs', 'sql-subqueries.html'],
    ['Table Design and Data Types', 'sql-schema.html'],
    ['Keys and Relationships', 'sql-keys.html'],
    ['Transactions', 'sql-transactions.html'],
    ['Indexes and Query Practice', 'sql-indexes.html']
];
const sidebar = document.querySelector(".sidebar[aria-label='SQL tutorial chapters']");
if (!sidebar) return;
const heading = document.createElement("h3");
heading.className = "sidebar-title";
heading.innerHTML = '<i class="fa-solid fa-database"></i> SQL Tutorial';
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
