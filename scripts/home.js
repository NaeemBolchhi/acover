document.querySelector('#logo').addEventListener('click', () => {
    window.location.assign(window.location.origin + '/acover/');
});

document.querySelector('#generate').addEventListener('click', () => {
    document.querySelector('form > input[type="submit"]').click();
});

try {
    document.addEventListener('mousedown', (e) => {
        if (e.target.closest('#swap1')) {
            e.preventDefault();
            window.mouseDownTarget = '#swap1';
        } else if (e.target.closest('#swap2')) {
            e.preventDefault();
            window.mouseDownTarget = '#swap2';
        } else {
            window.mouseDownTarget = '';
        }
    });
    document.querySelector('#swap1').addEventListener('mouseup', (e) => {
        e.preventDefault();
        if (window.mouseDownTarget !== '#swap1') {return;}

        let swap = document.querySelector('#swap1'),
            swapT = document.querySelector('#swaptarget1'),
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

    document.querySelector('#swap2').addEventListener('mouseup', (e) => {
        e.preventDefault();
        if (window.mouseDownTarget !== '#swap2') {return;}

        let swap = document.querySelector('#swap2'),
            swapT = document.querySelector('#swaptarget2'),
            swapL = swapT.closest('i').querySelector('label');
    
        if (swap.textContent === 'Batch') {
            swap.textContent = 'Intake';
            swapT.setAttribute('name','in');
            localStorage.swapMemory = 'in';
            swapL.textContent = 'Student Intake';
        } else if (swap.textContent === 'Intake') {
            swap.textContent = 'Batch';
            swapT.setAttribute('name','sb');
            localStorage.swapMemory = 'sb';
            swapL.textContent = 'Student Batch';
        }
    });

    function getCodeMemory() {
        let swap = document.querySelector('#swap1'),
            swapT = document.querySelector('#swaptarget1'),
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

        swap = document.querySelector('#swap2');
        swapT = document.querySelector('#swaptarget2');
        swapL = swapT.closest('i').querySelector('label');
        if (localStorage.swapMemory == 'in') {
            swap.textContent = 'Intake';
            swapT.setAttribute('name','in');
            swapL.textContent = 'Student Intake';
        } else if (localStorage.swapMemory == 'sb') {
            swap.textContent = 'Batch';
            swapT.setAttribute('name','sb');
            swapL.textContent = 'Student Batch';
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

// document.addEventListener('click', (e) => {
//     if (!e.target.tagName.match(/label/i)) {return;}

//     e.target.closest('i').querySelector('input').focus();
// });

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