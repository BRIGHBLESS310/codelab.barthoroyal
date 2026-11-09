(() => {
const javascriptTopics = [
    ["JavaScript Intro", "javascript.html"],
    ["JavaScript Get Started", "javascript-get-started.html"],
    ["JavaScript Syntax", "javascript-syntax.html"],
    ["JavaScript Statements", "javascript-statements.html"],
    ["JavaScript Variables", "javascript-variables.html"],
    ["JavaScript Let and Const", "javascript-let-const.html"],
    ["JavaScript Data Types", "javascript-data-types.html"],
    ["JavaScript Type Conversion", "javascript-type-conversion.html"],
    ["JavaScript Strings", "javascript-strings.html"],
    ["JavaScript String Methods", "javascript-string-methods.html"],
    ["JavaScript Numbers", "javascript-numbers.html"],
    ["JavaScript Math", "javascript-math.html"],
    ["JavaScript Operators", "javascript-operators.html"],
    ["JavaScript Comparisons", "javascript-comparisons.html"],
    ["JavaScript Conditions", "javascript-conditions.html"],
    ["JavaScript Switch", "javascript-switch.html"],
    ["JavaScript Loops", "javascript-loops.html"],
    ["JavaScript Functions", "javascript-functions.html"],
    ["JavaScript Scope", "javascript-scope.html"],
    ["JavaScript Arrays", "javascript-arrays.html"],
    ["JavaScript Array Methods", "javascript-array-methods.html"],
    ["JavaScript Objects", "javascript-objects.html"],
    ["Destructuring", "javascript-destructuring.html"],
    ["Spread and Rest", "javascript-spread-rest.html"],
    ["JavaScript Classes", "javascript-classes.html"],
    ["JavaScript Errors", "javascript-errors.html"],
    ["JavaScript JSON", "javascript-json.html"],
    ["JavaScript Dates", "javascript-dates.html"],
    ["JavaScript Sets and Maps", "javascript-sets-maps.html"],
    ["JavaScript Regular Expressions", "javascript-regular-expressions.html"],
    ["JavaScript DOM", "javascript-dom.html"],
    ["DOM Selectors", "javascript-dom-selectors.html"],
    ["JavaScript Events", "javascript-events.html"],
    ["JavaScript Forms", "javascript-forms.html"],
    ["Form Validation", "javascript-form-validation.html"],
    ["Browser Storage", "javascript-storage.html"],
    ["JavaScript Modules", "javascript-modules.html"],
    ["JavaScript Callbacks", "javascript-callbacks.html"],
    ["JavaScript Promises", "javascript-promises.html"],
    ["Async and Await", "javascript-async-await.html"],
    ["JavaScript Fetch", "javascript-fetch.html"],
    ["JavaScript Debugging", "javascript-debugging.html"],
    ["JavaScript Exercises", "javascript-exercises.html"]
];
window.javascriptTopics = javascriptTopics;

const sidebar = document.querySelector(".sidebar[aria-label='JavaScript tutorial chapters']");

if (sidebar) {
    const links = document.createDocumentFragment();
    const currentPage = window.location.pathname.split("/").pop();

    for (const [label, href] of javascriptTopics) {
        const link = document.createElement("a");
        link.href = href;
        link.textContent = label;

        if (currentPage === href) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }

        links.append(link);
    }

    sidebar.append(links);
}
})();
