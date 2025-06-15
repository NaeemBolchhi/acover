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
                fields[x].value = decodeURIComponent(getVar(window.location.href)[fields[x].getAttribute('name')].replace(/\+/g,'%20')).replace(/\s+/g,' ').replace(/^\s/,'').replace(/\s$/,'');
                if (fields[x].value !== '') {
                    fields[x].closest('i').classList.add('keepabove');
                } else {
                    fields[x].closest('i').classList.remove('keepabove');
                }
            } else {
                if (getVar(window.location.href)[fields[x].getAttribute('name')] === '') {
                    fields[x].classList.add('none');
                }
                fields[x].textContent = decodeURIComponent(getVar(window.location.href)[fields[x].getAttribute('name')].replace(/\+/g,'%20')).replace(/\s+/g,' ').replace(/^\s/,'').replace(/\s$/,'');
            }
        } else {
            if (!fields[x].tagName.match(/input/i)) {
                fields[x].classList.add('none');
            }
        }
    }

    // Ensuring Code/ID/Roll is filled
    try {
        document.querySelector('input[name="si"],input[name="sc"],input[name="sr"]').value = getVar(window.location.href).si || getVar(window.location.href).sc || getVar(window.location.href).sr || "";
    } catch {}
}

function swapVarVis() {
    let swappers = document.querySelectorAll('.swapper');

    for (let x = 0; x < swappers.length; x++) {
        let swapList = JSON.parse(swappers[x].getAttribute('data-swap'));

        for (let y = 0; y < swapList.length; y++) {
            if (typeof getVar(window.location.href)[swapList[y].n] !== 'undefined') {
                localStorage.setItem(swappers[x].getAttribute('data-id'), y);
            }
        }
    }
}

function updateTitle() {
    let sn = getVar(window.location.href).sn;

    document.title = 'ACover - ' + decodeURIComponent(sn.replace(/\+/g,'%20'));
}

fillGaps();
if (window.dataPage === 'home') {
    swapVarVis();
} else {
    updateTitle();
}