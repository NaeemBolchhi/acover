// Set page identity
window.dataPage = document.documentElement.getAttribute('data-page');

// Get URL variables
function getVar(link) {
    let vars = {};
    link.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function fillGaps() {
    let fields = document.querySelectorAll('input[name], span[name]');

    for (let x = 0; x < fields.length; x++) {
        if (typeof getVar(window.location.href)[fields[x].getAttribute('name')] !== 'undefined') {
            if (fields[x].tagName.match(/input/i)) {
                fields[x].value = decodeURIComponent(getVar(window.location.href)[fields[x].getAttribute('name')]).replace(/\+/g,' ').replace(/\s+/g,' ').replace(/^\s/,'').replace(/\s$/,'');
                if (fields[x].value !== '') {
                    fields[x].closest('i').classList.add('keepabove');
                } else {
                    fields[x].closest('i').classList.remove('keepabove');
                }
            } else {
                if (getVar(window.location.href)[fields[x].getAttribute('name')] === '') {
                    fields[x].classList.add('none');
                }
                fields[x].textContent = decodeURIComponent(getVar(window.location.href)[fields[x].getAttribute('name')]).replace(/\+/g,' ').replace(/\s+/g,' ').replace(/^\s/,'').replace(/\s$/,'');
            }
        } else {
            if (!fields[x].tagName.match(/input/i)) {
                fields[x].classList.add('none');
            }
        }
    }
}

function setCodeIDRoll() {
    if (typeof getVar(window.location.href).sc == 'undefined' && typeof getVar(window.location.href).si == 'undefined' && typeof getVar(window.location.href).sr == 'undefined') {
        return;
    }

    let swapT = document.querySelector('#swaptarget1'),
        swapL = swapT.closest('i').querySelector('label');

    if (typeof getVar(window.location.href).sc !== 'undefined') {
        swapL.textContent = 'Student Code';
        swapT.setAttribute('name', 'sc');
        localStorage.swapMemory = 'sc';
    } else if (typeof getVar(window.location.href).si !== 'undefined') {
        swapL.textContent = 'Student ID No.';
        swapT.setAttribute('name', 'si');
        localStorage.swapMemory = 'si';
    } else if (typeof getVar(window.location.href).sr !== 'undefined') {
        swapL.textContent = 'Student Roll No.';
        swapT.setAttribute('name', 'sr');
        localStorage.swapMemory = 'sr';
    }

    swapT.removeAttribute('id');
    document.querySelector('#swap1').remove();
}

function setBatchIntake() {
    if (typeof getVar(window.location.href).sb == 'undefined' && typeof getVar(window.location.href).in == 'undefined') {
        return;
    }

    let swapT = document.querySelector('#swaptarget2'),
        swapL = swapT.closest('i').querySelector('label');

    if (typeof getVar(window.location.href).sb !== 'undefined') {
        swapL.textContent = 'Student Batch';
        swapT.setAttribute('name', 'sb');
        localStorage.swapMemory = 'sb';
    } else if (typeof getVar(window.location.href).in !== 'undefined') {
        swapL.textContent = 'Student Intake';
        swapT.setAttribute('name', 'in');
        localStorage.swapMemory = 'in';
    }

    swapT.removeAttribute('id');
    document.querySelector('#swap2').remove();
}

if (window.dataPage === 'home') {
    setCodeIDRoll();
    setBatchIntake();
}

fillGaps();