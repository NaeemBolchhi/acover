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
        localStorage.swapMemory = 'si';
    } else {
        swap.textContent = 'Code';
        swapT.setAttribute('placeholder','Student Code');
        swapT.setAttribute('name','sc');
        localStorage.swapMemory = 'sc';
    }
});

function getCodeMemory() {
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