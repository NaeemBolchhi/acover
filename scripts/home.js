document.querySelector('#generate').addEventListener('click', () => {
    document.querySelector('form > input[type="submit"]').click();
});

document.addEventListener('mousedown', (e) => {
    if (e.button !== 0) {return;}
    if (e.target.closest('.swap')) {
        window.mouseDownTarget = e.target.closest('.swapper').getAttribute('data-id');
    } else {
        window.mouseDownTarget = '';
    }
});

function swapCell(swapper,locally) {
    let swapT = swapper.querySelector('.swaptarget'),
        swapL = swapper.querySelector('label'),
        dataSwap = JSON.parse(swapper.getAttribute('data-swap')),
        dataId = swapper.getAttribute('data-id'),
        dataValue = parseInt(localStorage.getItem(dataId));

    if (!locally) {
        if (dataValue < dataSwap.length - 1) {
            swapT.setAttribute('name', dataSwap[dataValue + 1].n);
            swapL.textContent = dataSwap[dataValue + 1].l;
            localStorage.setItem(dataId, dataValue + 1);
        } else {
            swapT.setAttribute('name', dataSwap[0].n);
            swapL.textContent = dataSwap[0].l;
            localStorage.setItem(dataId, 0);
        }
    } else {
        swapT.setAttribute('name', dataSwap[locally].n);
        swapL.textContent = dataSwap[locally].l;
    }
}

document.addEventListener('mouseup', (e) => {
    if (e.button !== 0) {return;}
    if (!e.target.closest('.swap')) {return;}
    if (window.mouseDownTarget !== e.target.closest('.swapper').getAttribute('data-id')) {return;}

    swapCell(e.target.closest('.swapper'));
});

function getCodeMemory() {
    let swappers = document.querySelectorAll('.swapper');

    for (let x = 0; x < swappers.length; x++) {
        let dataId = swappers[x].getAttribute('data-id'),
            localData = localStorage.getItem(dataId) || 0;
        
        swappers[x].setAttribute('data-value', localData);
        swapCell(swappers[x], localData);
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