import {html, css, LitElement} from 'https://cdn.skypack.dev/lit@v2.1.2';

export class SpeakersList extends LitElement {
    static styles = css`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap');

        :host {
            font-family: 'Rubik', sans-serif;
        }
        
        #item-list > li {
            margin-bottom: 0.3em;
        }
        
        #item-list > li > span {
            margin-right: 1em;
        }
    `;

    static properties = {
        items: {type: Array},
        times: {type: Array},
        value: {type: String},
        timer: {type: Number},
        running: {type: Number}
    };

    handleInput(e) {
        this.value = e.target.value;
    }

    constructor() {
        super();
        this.items = [];
        this.times = [];
        this.value = '';
    }

    render() {
        return html`
            <h1>Rednerliste</h1>
            Neuer Redner:
            <input type="text" id="item-name-input"
                .value=${this.value}
                @input=${this.handleInput}
                @keyup=${this.keyup}
            />
            <button id="item-add-button" @click=${this.addItem}>Add item</button>
            <ul id="item-list">
                ${this.items.map((item, i) => html`<li>
                    <span contenteditable="true">${item}</span>
                    <span>${this.getSecondsString(this.times[i])}</span>
                    ${this.running===i?html`<button @click="${()=>this.stop()}">Stop</button>`:html`<button @click="${()=>this.start(i)}">Start</button>`}
                    <button @click="${()=>this.removeItem(i)}">Delete</button>
                </li>`)}
            </ul>
        `;
    }

    getSecondsString(seconds) {
        return new Date(seconds * 1000).toISOString().substr(11, 8)
    }

    keyup(e) {
        if(e.code === 'Enter'){
            this.addItem();
        }
    }

    addItem() {
        this.items = [...this.items, this.value];
        this.times = [...this.times, 0];
        this.value = '';
        this.start(this.times.length-1);
    }

    removeItem(index) {
        this.stop();
        this.items = this.items.filter((item, i) => i !== index);
        this.times = this.times.filter((item, i) => i !== index);
    }

    start(i) {
        this.stop();
        this.running = i;
        this.timer = setInterval(() => {
            this.times[i]++;
            this.times = [...this.times];
        }, 1000)
    }

    stop() {
        this.running = undefined;
        if (this.timer !== undefined) {
            clearInterval(this.timer);
        }
    }
}
customElements.define('speakers-list', SpeakersList);