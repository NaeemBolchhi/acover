document.querySelector('#generate').addEventListener('click', () => {
    document.querySelector('form > input[type="submit"]').click();
});

document.addEventListener('mousedown', (e) => {
    if (e.button !== 0) {return;}
    if (e.target.closest('.swap')) {
        // e.preventDefault();
        window.mouseDownTarget = e.target.closest('.swapper').getAttribute('data-id');
    } else {
        window.mouseDownTarget = '';
    }
});

document.addEventListener('mouseup', (e) => {
    if (e.button !== 0) {return;}
    if (!e.target.closest('.swap')) {return;}
    if (window.mouseDownTarget !== e.target.closest('.swapper').getAttribute('data-id')) {return;}

    let swapper = e.target.closest('.swapper'),
        swapVis = swapper.querySelectorAll('i:has(>.swaptarget)'),
        childNum = '';

    for (let x = 0; x < swapVis.length; x++) {
        if (swapVis[x].classList.contains('visible')) {
            childNum = x;
            swapVis[x].classList.remove('visible');
        }
    }

    if (childNum === (swapVis.length - 1)) {
        swapVis[0].classList.add('visible');
        localStorage.setItem(swapper.getAttribute('data-id'), swapVis[0].querySelector('input[type="text"]').getAttribute('name'));
    } else {
        swapVis[childNum + 1].classList.add('visible');
        localStorage.setItem(swapper.getAttribute('data-id'), swapVis[childNum + 1].querySelector('input[type="text"]').getAttribute('name'));
    }
});

function getCodeMemory() {
    let swapVis = document.querySelectorAll('.swapper .visible'),
        swapper = document.querySelectorAll('.swapper'),
        swapCounter = 0;

    for (let x = 0; x < swapVis.length; x++) {
        swapVis[x].classList.add('og-visible');
    }

    for (let x = 0; x < swapper.length; x++) {
        let localValue = localStorage.getItem(swapper[x].getAttribute('data-id')),
            iTarget = '';
        if (localValue !== null) {
            iTarget = document.querySelector(`input[name="${localValue}"]`).closest('i');
            iTarget.classList.add('visible');
            iTarget.classList.remove('og-visible');
        } else {
            swapCounter++;
        }
    }

    if (swapCounter === swapper.length) {return;}

    let swapVisHas = document.querySelectorAll('.swapper:has(.og-visible)');

    for (let x = 0; x < swapVisHas.length; x++) {
        swapVisHas[x].querySelector('.og-visible').classList.remove('og-visible','visible');
    }
}

getCodeMemory();

function copyString(text,elem) {
    navigator.clipboard.writeText(text)
        .then(() => {
            elem.classList.add('success');
            elem.classList.remove('failure');
            setTimeout(() => {
                elem.classList.remove('success');
            }, 750);
        })
        .catch((err) => {
            elem.classList.add('failure');
            elem.classList.remove('success');
            setTimeout(() => {
                elem.classList.remove('failure');
            }, 750);
        });
}

document.querySelector('#share').addEventListener('click', () => {
    let fields = document.querySelectorAll('input[name]'),
        string = document.querySelector('head > link[rel="canonical"]').getAttribute('href') + '?';

    for (let x = 0; x < fields.length; x++) {
        string += fields[x].getAttribute('name') + '=' + encodeURIComponent(fields[x].value);
        if (x !== (fields.length - 1)) {
            string += '&';
        }
    }

    copyString(string, document.querySelector('#share'));
});

function updateLabelPos() {
    let fields = document.querySelectorAll('input[name]');
    
    for (let x = 0; x < fields.length; x++) {
        if (fields[x].value !== '') {
            fields[x].closest('i').classList.add('keepabove');
        } else {
            fields[x].closest('i').classList.remove('keepabove');
        }
    }
}

updateLabelPos();
document.addEventListener('keydown', updateLabelPos);
document.addEventListener('input', updateLabelPos);
document.addEventListener('click', updateLabelPos);