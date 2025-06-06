function getHome() {
    if (window.location.search === "" || !window.location.href.match(/\?/)) {
        window.location.assign(window.location.origin);
    }
}
getHome();

document.querySelector('#print').addEventListener('click', () => {
    window.print();
});

function hideBlankCodeIDRoll() {
    if (typeof getVar(window.location.href).sc == 'undefined') {
        document.querySelector('span[name="sc"]').classList.add('none');
    }
    if (typeof getVar(window.location.href).si == 'undefined') {
        document.querySelector('span[name="si"]').classList.add('none');
    }
    if (typeof getVar(window.location.href).sr == 'undefined') {
        document.querySelector('span[name="sr"]').classList.add('none');
    }
}

function hideBlankBatchIntake() {
    if (typeof getVar(window.location.href).sb == 'undefined') {
        document.querySelector('span[name="sb"]').classList.add('none');
    }
    if (typeof getVar(window.location.href).in == 'undefined') {
        document.querySelector('span[name="in"]').classList.add('none');
    }
}

hideBlankCodeIDRoll();
hideBlankBatchIntake();

// Get values or return blank
function getRight(key, before, after) {
    let gotIT = getVar(window.location.href)[key] || '',
        gotFixed = decodeURIComponent(gotIT.replace(/\+/g,'%20'));

    if (gotFixed === '') {
        return gotFixed;
    } else {
        if (!before) {
            before = '';
        }
        if (!after) {
            after = '';
        }
        return before + gotFixed + after;
    }
}

// Dynamically generate pdf with pdfmake.js
function downloadPDF() {
    // Font Size Multiplier
    // Vertical centering needs to be manually adjusted if this is changed.
    let fm = 9.04;

    // Values if no table is found
    let conditonalTable = {},
        conditionalMargin = fm*11.4;

    // Values if table is found
    if (getRight('at') !== '') {
        conditionalMargin = fm*8;
        conditonalTable = {
            table: {
                widths: ['*',fm*46,'*'],
                body: [
                    ['',{
                        table: {
                            widths: ['*'],
                            body: [
                                [getRight('at')]
                        ]
                        },
                        layout: {
                            paddingTop: function(i, node) {
                                return fm*1.45;
                            },
                            paddingBottom: function(i, node) {
                                return fm*1.55;
                            },
                            hLineWidth: function(i, node) {
                                return 0.75;
                            },
                            vLineWidth: function(i, node) {
                                return 0.75;
                            },
                            hLineColor: function(i, node) {
                                return '#cccccc';
                            },
                            vLineColor: function(i, node) {
                                return '#cccccc';
                            }
                        }
                    },'']
                ]
            },
            layout: {
                paddingTop: function(i, node) {
                    return 0;
                },
                paddingBottom: function(i, node) {
                    return 0;
                },
                hLineColor: function(i, node) {
                    return '#ffffff';
                },
                vLineColor: function(i, node) {
                    return '#ffffff';
                }
            },
            margin: [0, 0, 0, fm*1.4]
        };
    }

    let docDefinition = {
        pageSize: {
            width: 210/25.4*72,
            height: 297/25.4*72
        },
        pageOrientation: 'portrait',
        pageMargins: [0, 109, 0, 0],
        defaultStyle: {
              font: 'PT_Serif',
              fontSize: fm*1.5,
              alignment: 'center'
        },
        content: [
            {
                text: getRight('cc','',': ') + getRight('cn'),
                style: ['title','bold'],
                margin: [0, 0, 0, fm*1.45]
            },
            {
                text: getRight('tn') + getRight('tc',' (',')'),
                margin: [0, 0, 0, fm*1.55]
            },
            {
                text: getRight('td'),
                margin: [0, 0, 0, fm*1.6]
            },
            {
                text: getRight('ah'),
                style: ['title','bold'],
                margin: [0, conditionalMargin, 0, fm*1.4]
            },
            conditonalTable,
            {
                text: getRight('sn'),
                style: ['subtitle','bold'],
                margin: [0, conditionalMargin, 0, fm*1.5]
            },
            {
                text: getRight('sc','Code: ','') + getRight('si','ID No.: ','') + getRight('sr','Roll No.: ',''),
                margin: [0, 0, 0, fm*1.55]
            },
            {
                text: getRight('sb','Batch: ') + getRight('ss',', Section: '),
                margin: [0, 0, 0, fm*1.45]
            },
            {
                text: getRight('sd','Date of Submission: '),
                margin: [0, fm*5, 0, fm*1.6]
            },
            {
                text: getRight('dn'),
                margin: [0, fm*5, 0, fm*1.5]
            },
            {
                text: getRight('un')
            }
        ],
        styles: {
            bold: {
                bold: true
            },
            title: {
                fontSize: fm*2.4
            },
            subtitle: {
                fontSize: fm*1.8
            }
        }
    };

    pdfMake.fonts = {
        PT_Serif: {
            normal: '400',
            bold: '700'
        }
    };

    pdfMake.createPdf(docDefinition).download(`${document.title}.pdf`);
}

document.querySelector('#download').addEventListener('click', () => {
    downloadPDF();
});

// Obtain Visible Page Size
function visPageSize() {
    let content = document.querySelector('body > content');

    document.documentElement.setAttribute('style',`--vH:${content.offsetHeight}px;--vW:${content.offsetWidth}px`);
}
visPageSize();

window.addEventListener('resize', () => {
    visPageSize();
});