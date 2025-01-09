/*
    cc  Course Code
    cn  Course Name

    tn  Teacher Name
    tc  Teacher Short Code
    td  Teacher Designation

    ah  Assignment Heading
    at  Assignment Topic

    sn  Student Name
    sc  Student Code
    si  Student ID No.
    sb  Student Batch
    ss  Student Section

    sd  Submission Date

    dn  Department Name
    un  University Name
*/

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
                fields[x].value = decodeURIComponent(getVar(window.location.href)[fields[x].getAttribute('name')]).replace(/\+/g,' ');
                if (fields[x].value !== '') {
                    fields[x].closest('i').classList.add('keepabove');
                } else {
                    fields[x].closest('i').classList.remove('keepabove');
                }
            } else {
                if (getVar(window.location.href)[fields[x].getAttribute('name')] === '') {
                    fields[x].classList.add('none');
                }
                fields[x].textContent = decodeURIComponent(getVar(window.location.href)[fields[x].getAttribute('name')]).replace(/\+/g,' ');
            }
        } else {
            if (!fields[x].tagName.match(/input/i)) {
                fields[x].classList.add('none');
            }
        }
    }
}

function setCodeID() {
    if (typeof getVar(window.location.href).sc == 'undefined' && typeof getVar(window.location.href).si == 'undefined') {
        return;
    }

    let swapT = document.querySelector('#swaptarget');

    if (typeof getVar(window.location.href).sc !== 'undefined') {
        swapT.setAttribute('placeholder', 'Student Code');
        swapT.setAttribute('name', 'sc');
        localStorage.swapMemory = 'sc';
    } else if (typeof getVar(window.location.href).si !== 'undefined') {
        swapT.setAttribute('placeholder', 'Student ID No.');
        swapT.setAttribute('name', 'si');
        localStorage.swapMemory = 'si';
    }

    swapT.removeAttribute('id');
    document.querySelector('#swap').remove();
}

function hideBlankCodeID() {
    if (typeof getVar(window.location.href).sc == 'undefined' && typeof getVar(window.location.href).si == 'undefined') {
        return;
    }

    if (typeof getVar(window.location.href).sc == 'undefined') {
        document.querySelector('span[name="sc"]').classList.add('none');
    } else if (typeof getVar(window.location.href).si == 'undefined') {
        document.querySelector('span[name="si"]').classList.add('none');
    }
}

try {setCodeID();} catch {}
try {hideBlankCodeID();} catch {}
fillGaps();