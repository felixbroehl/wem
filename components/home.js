import { html, css, LitElement } from 'https://cdn.skypack.dev/lit@v2.1.2';

import {nameToUrlPart} from "./utils.js";
import {chapters} from './chapters.js';

class Home extends LitElement {
    static styles = css`
        #card-menu {
            display: flex;
            flex-wrap: wrap;
        }

        #card-menu > wem-link {
            width: calc(50% - 2em);
            box-sizing: border-box;
            margin: 1em;
            padding:1em;
            border: 1px solid #ddd;
            box-shadow: 0px 5px 5px rgba(0,0,0,0.1);
            border-radius: 5px;
            overflow: hidden;
            background-color: rgba(var(--primary-color-rgb), 0);
            transition: background-color .3s ease-in-out, box-shadow .3s ease-in-out;
        }
        
        #card-menu > wem-link {
            --color: var(--text-color);
            --text-decoration: none;
        }

        #card-menu > wem-link:hover {
            background-color: rgba(var(--primary-color-rgb), 0.1);
            box-shadow: 0px 5px 5px rgba(0,0,0,0.2);
        }

        #card-menu > wem-link h3 {
            margin-top: 0px;
        }

        #card-menu > wem-link img {
            width: 100%;
            height: 150px;
            background-color: var(--primary-color);
            padding: 1em;
            margin-left: -1em;
            margin-top: -1em;
            margin-bottom: 1em;
        }

        @media (max-width: 400px) {
            #card-menu > wem-link {
                width: calc(100% - 2em);
            }
        }

        @media (max-width: 600px) {
            #card-menu > wem-link img {
                height: 80px;
            }
        }
    `;

    static get properties() {
        return {};
    }
    constructor() {
        super();
    }
    render() {
        return html`
            <wem-logo-animation></wem-logo-animation>
            <p>Willkommen bei meiner Webapp zum Fach Web Engineering im Master of Computer Science der Hochschule Bonn-Rhein-Sieg.</p>
            <p>Wählen Sie einer der Übungseinheiten aus:</p>
            <div id="card-menu">
                ${chapters.map((chapter, i) => html`
                    <wem-link href="/wem/${nameToUrlPart(chapter.name)}" class="block">
                        <img src="assets/img/u${i+1}.svg">
                        <h3>${chapter.name}</h3>
                        <p>Übung ${i+1}</p>
                    </wem-link>
                `)}
            </div>
        `;
    }
}

customElements.define('wem-home', Home);