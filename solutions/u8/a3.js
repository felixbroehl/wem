import {html, css, LitElement} from 'https://cdn.skypack.dev/lit@v2.1.2';

import {classMap} from 'https://cdn.skypack.dev/lit@v2.1.2/directives/class-map.js';

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
        
        nav.vertical {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
    `;

    static properties = {
        items: {type: Array},
        direction: {type: String},
        activeIndex: {type: Number}
    };

    constructor() {
        super();
        this.direction = this.getAttribute('data-direction');
        this.items = [];
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
        document.dispatchEvent(new CustomEvent('updateRoute', {
            route: item.route
        }));
    }
}
customElements.define('menu-component', Menu);

export class Navigator extends LitElement {
    static styles = css`
        :host {
            --site-border-radius: 1em;
            --header-background-color: #ba4e4f;
            --container-side-background-color: #bb7f7e;
            --container-content-background-color: #689ab7;
            --footer-background-color: #030303;
            --text-color: #fff;
        }

        :host {
            color: var(--text-color);
            display: flex;
            flex-direction: column;
            height: calc(100vh - 16px);
        }

        header {
            background-color: #c14f50;
            border-top-left-radius: var(--site-border-radius);
            border-top-right-radius: var(--site-border-radius);
        }

        h1 {
            margin: 0;
            text-align: center;
            font-weight: normal;
        }

        #container {
            flex-grow: 1;
            overflow: auto;
        }

        #wrapper {
            width: 100%;
            min-height: 100%;
            display: flex;
        }

        #left, #right {
            background-color: var(--container-side-background-color);
            width: 20vw;
        }

        #right {
            text-align: center;
            word-break: break-all;
        }

        #right a {
            display: block;
        }

        #content {
            background-color: var(--container-content-background-color);
            width: 60vw;
        }

        footer {
            background-color: var(--footer-background-color);
            text-align: center;
            border-bottom-left-radius: var(--site-border-radius);
            border-bottom-right-radius: var(--site-border-radius);
            padding-bottom: 1em;
        }

        footer > span {
            font-size: 2em;
        }

        footer > a {
            color: var(--text-color);
        }

        footer > * {
            margin: 0px 3px;
        }
    `;

    static properties = {
        content: {type: Array},
        outerKey: {type: String},
        innerKey: {type: String},
        setup: {type: Boolean}
    };

    constructor() {
        super();
        this.setup = false;
        (async () => {
            this.content = await (await fetch('assets/a3_contents.json')).json();
            this.outerKey = Object.keys(this.content)[0];
            this.innerKey = Object.keys(this.content[this.outerKey])[0];
            this.setup = true;
        })();
        window.addEventListener('popstate', () => this.onStateChange());
        document.addEventListener('updateRoute', () => this.onStateChange());
    }

    onStateChange() {
        if (history.state) {
            const route = history.state.route;
            const routeSplit = route.split('/');
            this.outerKey = routeSplit[0];
            this.innerKey = routeSplit[1]?routeSplit[1]:Object.keys(this.content[this.outerKey])[0];
        } else {
            this.outerKey = Object.keys(this.content)[0];
            this.innerKey = Object.keys(this.content[this.outerKey])[0];
        }
    }

    render() {
        if (!this.setup) {
            return '';
        }
        return html`
            <header>
                <h1>Header</h1>
                <menu-component
                    .activeIndex=${Object.keys(this.content).indexOf(this.outerKey)}
                    .items=${Object.keys(this.content).map(key => {return {route: key, label: key}})}>
                </menu-component>
            </header>
            <section id="container">
                <div id="wrapper">
                    <div id="left">
                        <menu-component
                            data-direction="vertical"
                            .activeIndex=${Object.keys(this.content[this.outerKey]).indexOf(this.innerKey)}
                            .items=${Object.keys(this.content[this.outerKey]).map(key => {return {route: this.outerKey + '/' + key, label: key}})}>
                        </menu-component>
                    </div>
                    <div id="content">
                        ${this.content[this.outerKey][this.innerKey].content}
                    </div>
                    <div id="right">
                        <h3>References</h3>
                        ${this.content[this.outerKey][this.innerKey].references.map(link => html`<a href=${link} target="_blank">${link}</a>`)}
                    </div>
                </div>
            </section>
            <footer>
                <span>Footer:</span>
                <a href="#">Sitemap</a>
                <a href="#">Home</a>
                <a href="#">News</a>
                <a href="#">Contact</a>
                <a href="#">About</a>
            </footer>
        `;
    }
}
customElements.define('navigator-component', Navigator);