document.querySelector('#logo').addEventListener('click', () => {
    window.location.assign(window.location.origin);
});

document.querySelector('#swap').addEventListener('click', () => {
    let swap = document.querySelector('#swap'),
        swapT = document.querySelector('#swaptarget');

    if (swap.textContent === 'Code') {
        swap.textContent = 'ID No.';
        swapT.setAttribute('placeholder','Student ID No.');
        swapT.setAttribute('name','si');
        sessionStorage.swapMemory = 'si';
    } else {
        swap.textContent = 'Code';
        swapT.setAttribute('placeholder','Student Code');
        swapT.setAttribute('name','sc');
        sessionStorage.swapMemory = 'sc';
    }
});

function getCodeMemory() {
    if (sessionStorage.swapMemory == 'si') {
        swap.textContent = 'ID No.';
        swapT.setAttribute('placeholder','Student ID No.');
        swapT.setAttribute('name','si');
    } else if (sessionStorage.swapMemory == 'sc') {
        swapT.setAttribute('placeholder','Student Code');
        swapT.setAttribute('name','sc');
        sessionStorage.swapMemory = 'sc';
    }
}

getCodeMemory();