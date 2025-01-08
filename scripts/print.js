function getHome() {
    if (window.location.search === "" || !window.location.href.match(/\?/)) {
        window.location.assign(window.location.origin);
    }
}

getHome();

document.querySelector('#print').addEventListener('click', () => {
    window.print();
});