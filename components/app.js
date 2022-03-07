import { html, css, LitElement } from 'https://cdn.skypack.dev/lit@v2.1.2';
import { router } from 'https://cdn.skypack.dev/lit-element-router';

import './link.js';
import './home.js';
import './chapter.js';
import './logo-animation.js';
import './code-preview.js';
import './run-code.js';
import './inline-code-preview.js';
import {nameToUrlPart} from "./utils.js";
import {chapters} from "./chapters.js";

class App extends router(LitElement) {
    static styles = css`
        main {
            max-width: 800px;
            margin: 0 auto;
            padding: 1em;
            min-height: 100%;
            transform: translateX(100px);
            background-color: #fff;
        }
        
        /**
         * Menu
         */
        
        nav {
            position: fixed;
            width: 200px;
            left: 0;
            top: 0;
            display: flex;
            flex-direction: column;
            height: 100vh;
            background-color: #fff;
            overflow: auto;
            box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
        }
        
        nav .item {
            padding: 0.8em;
            color: #505050 !important;
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
            text-decoration: none;
        }
        
        nav .item.active {
            color: #000 !important;
            font-weight: bold;
        }
        
        #burger-button, #burger-button:before, #burger-button:after {
            width: 30px;
            height: 3px;
            background-color: #000;
            position: fixed;
            right: 1em;
            top: 29px;
            transition: background-color .3s ease-in-out, transform .3s ease-in-out;
            display: none;
            z-index: 1999;
        }
        
        #burger-button:before, #burger-button:after {
            content: "";
        }
        
        #burger-button:before {
            transform: translateY(-7px);
        }
        
        #burger-button:after {
            transform: translateY(7px);
        }
        
        #burger-button > div {
            position: absolute;
            margin-left: -5px;
            width: 40px;
            margin-top: -19px;
            height: 40px;
            cursor: pointer;
            z-index: 2000;
        }
        
        nav.active > #burger-button {
            background-color: transparent;
        }
        
        nav.active > #burger-button:before {
            transform: rotate(45deg) scale(0.9);
        }
        
        nav.active > #burger-button:after {
            transform: rotate(-45deg) scale(0.9);
        }
        
        #logo img {
            width: 100%;
        }
        
        @media (max-width: 1050px) {
            #logo img {
                height: 60px;
            }
        
            nav {
                width: 100%;
                height: 60px;
                overflow: hidden;
                transition: height 1s ease-in-out;
            }
        
            nav.active {
                height: 100vh;
                overflow: auto;
            }
        
            main {
                margin-top: 60px;
                transform: none;
            }
        
            #burger-button, #burger-button:before, #burger-button:after {
                display: block;
            }
        }
        
        #logo {
            border-top: none;
        }
        
        /**
         * Footer
         */
        footer {
            text-align: center;
            border-top: 1px solid #ddd;
            padding-top: 1em;
            margin-top: 1.5em;
        }
    `;

    static get properties() {
        return {
            route: { type: String },
            params: { type: Object },
            query: { type: Object }
        };
    }

    static get routes() {
        let re = chapters.map((chapter, i) => {
            return {
                name: 'u' + (i+1),
                pattern: 'wem/' + nameToUrlPart(chapter.name),
                data: { component: 'chapter', attributes: {chapter: i+1} }
            };
        });
        return [{
            name: 'home',
            pattern: 'wem/',
            data: { component: 'home' }
        },
        {
            name: 'not-found',
            pattern: '*',
            data: { component: 'not-found' }
        }, ...re];
    }

    constructor() {
        super();
        this.route = '';
        this.params = {};
        this.menuIsShown = false;
    }

    router(route, params, query, data) {
        this.route = route;
        this.params = params;
        this.query = query;
        this.routeData = data;
        window.scrollTo(0,0);
        this.update();
    }

    renderOutlet() {
        if (this.routeData && this.routeData.component === 'home') {
            return html`<wem-home></wem-home>`;
        } else if (this.routeData && this.routeData.component === 'chapter') {
            return html`<wem-chapter .chapter=${this.routeData.attributes.chapter}></wem-chapter>`;
        }
    }

    render() {
        return html`
            <main>
                ${this.renderOutlet()}
                <footer>
                    &copy; Felix Bröhl 2022
                </footer>
            </main>
            <nav class="${this.menuIsShown?'active':''}">
                <div id="burger-button" @click="${this.toggleMenu}"><div></div></div>
                <wem-link href="/wem/" id="logo" @click="${this.hideMenu}"><img src="assets/img/logo.svg"></wem-link>
                <wem-link href="/wem/" @click="${this.hideMenu}"><div class="item ${this.route === App.routes[0].name ? 'active' : ''}">0. Übersicht</div></wem-link>
                ${chapters.map((chapter, i) => html`
                    <wem-link href="/wem/${nameToUrlPart(chapter.name)}" @click="${this.toggleMenu}"><div class="item ${this.route === 'u'+(i+1) ? 'active' : ''}">${i+1}. ${chapter.name}</div></wem-link>
                `)}
            </nav>
        `;
    }

    toggleMenu() {
        this.menuIsShown = !this.menuIsShown;
        this.update();
    }

    hideMenu() {
        this.menuIsShown = false;
        this.update();
    }
}

customElements.define('wem-app', App);