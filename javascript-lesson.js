(() => {
const currentPage = window.location.pathname.split("/").pop();
const currentIndex = window.javascriptTopics.findIndex(([, href]) => href === currentPage);
const navigation = document.querySelector(".chapter-navigation");

if (navigation && currentIndex >= 0) {
    const previous = window.javascriptTopics[currentIndex - 1];
    const next = window.javascriptTopics[currentIndex + 1];

    if (previous) {
        const link = document.createElement("a");
        link.className = "nav-btn prev-btn";
        link.href = previous[1];
        link.textContent = `← ${previous[0]}`;
        navigation.append(link);
    }

    if (next) {
        const link = document.createElement("a");
        link.className = "nav-btn next-btn";
        link.href = next[1];
        link.textContent = `${next[0]} →`;
        navigation.append(link);
    }
}
})();
