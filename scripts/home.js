document.querySelector('#logo').addEventListener('click', () => {
    window.location.assign(window.location.origin + '/acover/');
});

document.querySelector('#generate').addEventListener('click', () => {
    document.querySelector('form > input[type="submit"]').click();
});

try {
    document.querySelector('#swap').addEventListener('click', () => {
        let swap = document.querySelector('#swap'),
            swapT = document.querySelector('#swaptarget');
    
        if (swap.textContent === 'Code') {
            swap.textContent = 'ID No.';
            swapT.setAttribute('placeholder','Student ID No.');
            swapT.setAttribute('name','si');
            localStorage.swapMemory = 'si';
        } else {
            swap.textContent = 'Code';
            swapT.setAttribute('placeholder','Student Code');
            swapT.setAttribute('name','sc');
            localStorage.swapMemory = 'sc';
        }
    });

    function getCodeMemory() {
        let swap = document.querySelector('#swap'),
            swapT = document.querySelector('#swaptarget');
        if (localStorage.swapMemory == 'si') {
            swap.textContent = 'ID No.';
            swapT.setAttribute('placeholder','Student ID No.');
            swapT.setAttribute('name','si');
        } else if (localStorage.swapMemory == 'sc') {
            swapT.setAttribute('placeholder','Student Code');
            swapT.setAttribute('name','sc');
            localStorage.swapMemory = 'sc';
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