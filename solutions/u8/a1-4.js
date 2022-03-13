import {html, css, LitElement} from 'https://cdn.skypack.dev/lit@v2.1.2';

export class BarGraph extends LitElement {
    static styles = css`
        svg {
            font-family: 'Rubik', sans-serif;
            max-width: 750px;
        }
        
        @keyframes rect-rise {
            from { transform: scale(0,1); }
            to { transform: scale(1,1); }
        }
        
        svg rect {
            animation: rect-rise 2s ease-in-out;
        }
    `;

    static properties = {
        data: {type: Array}
    };

    constructor() {
        super();
        this.data = [
            {
                label: 'SPD',
                color: '#f00',
                value: 206
            },
            {
                label: 'CDU/CSU',
                color: '#000',
                value: 197
            },
            {
                label: 'Bündnis 90/Die Grünen',
                color: '#65A129',
                value: 118
            },
            {
                label: 'FDP',
                color: '#FFE300',
                value: 92
            },
            {
                label: 'AfD',
                color: '#00ACD3',
                value: 82
            },
            {
                label: 'Die Linke',
                color: '#E60E98',
                value: 39
            },
            {
                label: 'fraktionslos',
                color: '#999999',
                value: 2
            }
        ]; // This is for demo purposes
    }

    render() {
        return html`
            <svg viewBox="0 0 800 500"></svg>
        `;
    }

    updated() {
        const svg = this.renderRoot.querySelector('svg');
        let i = 0;
        let valueMax = Math.max(...this.data.map(item=>item.value));
        let itemHeight = (500 / this.data.length) - 24;
        for (let item of this.data) {
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', '0');
            rect.setAttribute('y', '' + i*(itemHeight + 24));
            rect.setAttribute('width', '' + ((item.value/valueMax) * 800));
            rect.setAttribute('height', '' + itemHeight);
            rect.setAttribute('fill', item.color)
            svg.appendChild(rect);
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.innerHTML = item.label + ' | ' + item.value;
            text.setAttribute('x', '0');
            text.setAttribute('y', '' + ((i+1)*(itemHeight + 24) - 8));
            svg.appendChild(text);
            i++;
        }
    }
}
customElements.define('bar-graph', BarGraph);