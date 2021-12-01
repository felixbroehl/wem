import {html, css, LitElement} from 'https://cdn.skypack.dev/lit';

import {classMap} from 'https://cdn.skypack.dev/lit/directives/class-map.js';

export class Menu extends LitElement {
    static styles = css`
        nav {
            margin: 0px 8px 8px;
        }

        nav > a {
            color: #000;
            text-decoration: none;
            background-color: #686d99;
            padding: 3px 30px;
            border-radius: 1em;
            border: 3px solid;
            --left-half-border: #eee;
            --right-half-border: #939999;
            border-color:
                    var(--left-half-border)
                    var(--right-half-border)
                    var(--right-half-border)
                    var(--left-half-border);
            font-weight: bold;
            font-family: Arial;
            font-size: 14px;
            display: inline-block;
            margin: 0px 8px 8px;
        }

        nav > a.active {
            background-color: #d9d4d2;
        }
    `;

    static properties = {
        items: {type: Array},
        direction: {type: String},
        activeIndex: {type: Number}
    };

    constructor() {
        super();
        this.items = Array.from(this.children).map(child => {return {label: child.innerText, route: child.getAttribute('data-route')}});
        this.direction = this.getAttribute('data-direction');
        this.activeIndex = 0;
    }

    render() {
        return html`
            <nav class=${classMap({vertical: this.direction==='vertical'})}>
               ${this.renderItems()} 
            </nav>
        `;
    }

    renderItems() {
        return this.items.map((item, i) => html`
            <a href="#" @click=${(e)=>{e.preventDefault();this.open(item, i)}} class=${classMap({active: this.activeIndex === i})}>${item.label}</a>
        `);
    }

    open(item, i) {
        this.activeIndex = i;
        history.pushState({
            route: item.route
        }, item.route, "#");
    }
}
customElements.define('menu-component', Menu);