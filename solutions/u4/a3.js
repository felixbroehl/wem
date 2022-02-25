document.addEventListener('readystatechange', () => {
    const sizeInputColumns = document.querySelector('#size-input-columns');
    const sizeInputRows = document.querySelector('#size-input-rows');
    const setupButton = document.querySelector('#setup-button');
    const setupSection = document.querySelector('#setup');
    const tableBody = document.querySelector('#table > tbody');

    const getRowColumnIndex = (rowString, columnString) => {
        const re = {
            row: 0,
            column: 0
        }
        for (let i = 0; i < rowString.length; i++) {
            re.row += rowString.toUpperCase().charCodeAt(i) - 65;
        }
        re.column = parseInt(columnString, 10) - 1;
        return re;
    }

    const getSum = (begin, end) => {
        let sum = 0;
        for (let i = begin.row; i <= end.row; i++) {
            for (let j = begin.column; j <= end.column; j++) {
                const elem = document.querySelector('#table tbody').children[i].children[j];
                try {
                    sum += parseInt(elem.innerText, 10);
                } catch (e) {
                    return '!#WERT';
                }
            }
        }
        return sum;
    }

    setupButton.addEventListener('click', () => {
        setupSection.style.display = 'none';
        for (let i = 0; i < sizeInputRows.value; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < sizeInputColumns.value; j++) {
                const td = document.createElement('td');
                td.contentEditable = true;
                td.setAttribute('data-formula', '');
                td.addEventListener('focus', () => {
                    td.innerText = td.getAttribute('data-formula');
                });
                td.addEventListener('blur', () => {
                    td.setAttribute('data-formula', td.innerText);
                    renderTd(td);
                    calcAll();
                });
                tr.appendChild(td);
            }
            tableBody.appendChild(tr);
        }
    });

    function renderTd(td) {
        const match = td.getAttribute('data-formula').match(/=SUM\(([A-Z]+)([0-9]+),([A-Z]+)([0-9]+)\)/i);
        if (match) {
            const begin = getRowColumnIndex(match[1], match[2]);
            const end = getRowColumnIndex(match[3], match[4]);
            td.innerText = getSum(begin, end);
        }
    }

    function calcAll() {
        const tds = tableBody.querySelectorAll('td');
        tds.forEach((td) => renderTd(td));
    }
})