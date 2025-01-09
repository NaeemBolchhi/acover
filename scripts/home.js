document.querySelector('#logo').addEventListener('click', () => {
    window.location.assign(window.location.origin + '/acover/');
});

document.querySelector('#generate').addEventListener('click', () => {
    document.querySelector('form > input[type="submit"]').click();
});

try {
    document.querySelector('#swap').addEventListener('click', () => {
        let swap = document.querySelector('#swap'),
            swapT = document.querySelector('#swaptarget'),
            swapL = swapT.closest('i').querySelector('label');
    
        if (swap.textContent === 'Roll') {
            swap.textContent = 'Code';
            swapT.setAttribute('name','sc');
            localStorage.swapMemory = 'sc';
            swapL.textContent = 'Student Code';
        } else if (swap.textContent === 'Code') {
            swap.textContent = 'ID';
            swapT.setAttribute('name','si');
            localStorage.swapMemory = 'si';
            swapL.textContent = 'Student ID No.';
        } else if (swap.textContent === 'ID') {
            swap.textContent = 'Roll';
            swapT.setAttribute('name','sr');
            localStorage.swapMemory = 'sr';
            swapL.textContent = 'Student Roll No.';
        }
    });

    function getCodeMemory() {
        let swap = document.querySelector('#swap'),
            swapT = document.querySelector('#swaptarget'),
            swapL = swapT.closest('i').querySelector('label');
        if (localStorage.swapMemory == 'sr') {
            swap.textContent = 'Roll';
            swapT.setAttribute('name','sr');
            swapL.textContent = 'Student Roll No.';
        } else if (localStorage.swapMemory == 'si') {
            swap.textContent = 'ID';
            swapT.setAttribute('name','si');
            swapL.textContent = 'Student ID No.';
        } else if (localStorage.swapMemory == 'sc') {
            swap.textContent = 'Code';
            swapT.setAttribute('name','sc');
            swapL.textContent = 'Student Code';
        }
    }
    
    getCodeMemory();
} catch {}

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
        string = window.location.origin + '/acover/?';

    for (let x = 0; x < fields.length; x++) {
        string += fields[x].getAttribute('name') + '=' + fields[x].value;
        if (x !== (fields.length - 1)) {
            string += '&';
        }
    }

    copyString(string, document.querySelector('#share'));
});

document.addEventListener('click', (e) => {
    if (!e.target.tagName.match(/label/i)) {return;}

    e.target.closest('i').querySelector('input').focus();
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