import {html, css, LitElement} from 'https://cdn.skypack.dev/lit';

export class ShoppingList extends LitElement {
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
        value: {type: String}
    };

    handleInput(e) {
        this.value = e.target.value;
    }

    constructor() {
        super();
        this.items = [];
        this.value = '';
    }

    render() {
        return html`
            <h1>Einkaufsliste</h1>
            Enter a new item:
            <input type="text" id="item-name-input"
                .value=${this.value}
                @input=${this.handleInput}
                @keyup=${this.keyup}
            />
            <button id="item-add-button" @click=${this.addItem}>Add item</button>
            <ul id="item-list">
                ${this.items.map((item, i) => html`<li>
                    <span contenteditable="true">${item}</span>
                    <button @click="${()=>this.removeItem(i)}">Delete</button>
                </li>`)}
            </ul>
        `;
    }

    keyup(e) {
        if(e.code === 'Enter'){
            this.addItem();
        }
    }

    addItem() {
        this.items = [...this.items, this.value];
        this.value = '';
    }

    removeItem(index) {
        this.items = this.items.filter((item, i) => i !== index);
    }
}
customElements.define('shopping-list', ShoppingList);