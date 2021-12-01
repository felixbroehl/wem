import {html, css, LitElement} from 'https://cdn.skypack.dev/lit';

export class ExcelEditor extends LitElement {
    static styles = css`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap');

        body {
            font-family: 'Rubik', sans-serif;
        }
        
        table {
            border-spacing:0;
            border-collapse: collapse;
        }
        
        td {
            min-width: 150px;
            border: 1px solid #000;
        }
        
        input[type="text"] {
            width: 100%;
            height: 100%;
            display: block;
            margin: 0;
            border: 0;
            appearance: none;
            text-align: right;
            font-size: 1.5em;
        }
    `;

    static properties = {
        xSize: {type: Number},
        ySize: {type: Number},
        wasSetup: {type: Boolean},
        items: {type: Array},
        selectedX: {type: Number},
        selectedY: {type: Number}
    };

    handleXSizeInput(e) {
        this.xSize = e.target.value;
    }

    handleYSizeInput(e) {
        this.ySize = e.target.value;
    }

    handleCellInput(x, y, e) {
        this.items[y][x] = e.target.value;
    }

    constructor() {
        super();
        this.items = [];
        this.ySize = 2;
        this.xSize = 3;
        this.wasSetup = false;
    }

    render() {
        return html`
            <h1>Tabellenkalkulation mit contentEditable</h1>

            ${!this.wasSetup?html`<section id="setup">
                Setup:
                <input id="size-input-columns" type="number" min="0" value="2" required @input=${this.handleYSizeInput}>
                x
                <input id="size-input-rows" type="number" min="0" value="3" required @input=${this.handleXSizeInput}>
                <button id="setup-button" @click=${this.setup}>Create table</button>
            </section>`: html`<table id="table">
                <tbody>
                    ${this.items.map((row, i) => html`<tr>
                        ${row.map((cell, j) => html`<td>
                            <input type="text" .value=${this.getCellContent(j, i)} @focus=${() => this.focus(j, i)} @blur=${this.blur} @input=${(e) => this.handleCellInput(j, i, e)}>
                        </td>`)}
                    </tr>`)}
                </tbody>
            </table>`}
        `;
    }

    getCellContent(x, y) {
        if (this.selectedX !== undefined && this.selectedY !== undefined && this.selectedX === x && this.selectedY === y) {
            return this.items[y][x];
        }
        const match = this.items[y][x].match(/=SUM\(([A-Z]+)([0-9]+),([A-Z]+)([0-9]+)\)/i);
        if (match) {
            const begin = this.getRowColumnIndex(match[1], match[2]);
            const end = this.getRowColumnIndex(match[3], match[4]);
            return this.getSum(begin, end);
        }
        return this.items[y][x];
    }

    focus(x, y) {
        this.selectedX = x;
        this.selectedY = y;
    }

    blur() {
        this.selectedX = undefined;
        this.selectedY = undefined;
    }

    setup() {
        for (let i = 0; i < this.ySize; i++) {
            let row = [];
            for (let j = 0; j < this.xSize; j++) {
                row.push('');
            }
            this.items.push(row);
        }
        this.wasSetup = true;
    }


    getRowColumnIndex(rowString, columnString) {
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

    getSum(begin, end) {
        let sum = 0;
        for (let i = begin.row; i <= end.row; i++) {
            for (let j = begin.column; j <= end.column; j++) {
                try {
                    sum += parseInt(this.items[i][j], 10);
                } catch (e) {
                    return '!#WERT';
                }
            }
        }
        return sum;
    }
}
customElements.define('excel-editor', ExcelEditor);