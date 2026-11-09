const javaTopics = [
    ["More Java Topics", "java-more.html"],
    ["Java User Input", "java-more.html#user-input"],
    ["String Methods", "java-more.html#string-methods"],
    ["Java Scope", "java-more.html#scope"],
    ["Method Parameters", "java-more.html#method-parameters"],
    ["Method Overloading", "java-more.html#method-overloading"],
    ["Java Recursion", "java-more.html#recursion"],
    ["Java Constructors", "java-more.html#constructors"],
    ["The this Keyword", "java-more.html#this-keyword"],
    ["Access Modifiers", "java-more.html#access-modifiers"],
    ["Java Encapsulation", "java-more.html#encapsulation"],
    ["Java Packages", "java-more.html#packages"],
    ["Java Inheritance Details", "java-more.html#inheritance"],
    ["Java Polymorphism", "java-more.html#polymorphism"],
    ["Abstract Classes", "java-more.html#abstraction"],
    ["Java Interfaces", "java-more.html#interfaces"],
    ["Java Enums", "java-more.html#enums"],
    ["Java ArrayList", "java-more.html#arraylist"],
    ["Java HashMap", "java-more.html#hashmap"],
    ["Java Exceptions", "java-more.html#exceptions"],
    ["Java Files", "java-more.html#files"],
    ["Java Date and Time", "java-more.html#date-time"],
    ["Java Regular Expressions", "java-more.html#regex"],
    ["Java Lambda Expressions", "java-more.html#lambdas"],
    ["Java Threads", "java-more.html#threads"],
    ["Java Debugging", "java-more.html#debugging"],
    ["Java Exercises", "java-more.html#exercises"]
];

const sidebar = document.querySelector(".sidebar[aria-label='Java tutorial chapters']");

if (sidebar) {
    const links = document.createDocumentFragment();
    const currentPage = window.location.pathname.split("/").pop();
    const extraLinks = [];

    for (const [label, href] of javaTopics) {
        const link = document.createElement("a");
        link.href = href;
        link.textContent = label;
        link.classList.add("java-extra-topic");
        extraLinks.push({ link, href });
        links.append(link);
    }

    sidebar.append(links);

    const updateActiveTopic = () => {
        for (const { link, href } of extraLinks) {
            const [targetPage, targetHash] = href.split("#");
            const isActive = currentPage === targetPage &&
                (targetHash ? window.location.hash === `#${targetHash}` : !window.location.hash);

            link.classList.toggle("active", isActive);
            if (isActive) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        }
    };

    updateActiveTopic();
    window.addEventListener("hashchange", updateActiveTopic);
}
