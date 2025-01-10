function getHome() {
    if (window.location.search === "" || !window.location.href.match(/\?/)) {
        window.location.assign(window.location.origin);
    }
}

getHome();

document.querySelector('#print').addEventListener('click', () => {
    window.print();
});

function hideBlankCodeIDRoll() {
    if (typeof getVar(window.location.href).sc == 'undefined') {
        document.querySelector('span[name="sc"]').classList.add('none');
    }
    if (typeof getVar(window.location.href).si == 'undefined') {
        document.querySelector('span[name="si"]').classList.add('none');
    }
    if (typeof getVar(window.location.href).sr == 'undefined') {
        document.querySelector('span[name="sr"]').classList.add('none');
    }
}

function hideBlankBatchIntake() {
    if (typeof getVar(window.location.href).sb == 'undefined') {
        document.querySelector('span[name="sb"]').classList.add('none');
    }
    if (typeof getVar(window.location.href).in == 'undefined') {
        document.querySelector('span[name="in"]').classList.add('none');
    }
}

hideBlankCodeIDRoll();
hideBlankBatchIntake();