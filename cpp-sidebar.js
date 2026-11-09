(() => {
const topics = [
    ['Course Overview', 'c++.html'],
    ['Get Started', 'cpp-get-started.html'],
    ['Program Structure and Output', 'cpp-structure.html'],
    ['Variables and Types', 'cpp-types.html'],
    ['Input and Expressions', 'cpp-input.html'],
    ['Conditions and Switch', 'cpp-conditions.html'],
    ['Loops', 'cpp-loops.html'],
    ['Functions', 'cpp-functions.html'],
    ['Strings and Vectors', 'cpp-containers.html'],
    ['References and const', 'cpp-references.html'],
    ['Classes and Encapsulation', 'cpp-classes.html'],
    ['Standard Algorithms and Practice', 'cpp-algorithms.html']
];
const sidebar = document.querySelector(".sidebar[aria-label='C++ tutorial chapters']");
if (!sidebar) return;
const heading = document.createElement("h3");
heading.className = "sidebar-title";
heading.innerHTML = '<i class="fa-solid fa-code"></i> C++ Tutorial';
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
