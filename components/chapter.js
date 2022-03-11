import { html, css, LitElement } from 'https://cdn.skypack.dev/lit@v2.1.2';
import {chapters} from "./chapters.js";
import {nameToUrlPart} from "./utils.js";

class Chapter extends LitElement {
    static styles = css`
        a, a:link, a:visited {
            color: var(--link-color);
        }
        
        a:hover, a:active {
            color: var(--secondary-color);
        }
        
        #content img {
            max-width: 100%;
            margin-left: 50%;
            transform: translateX(-50%);
        }
        
        .open-solution-button {
            padding: .5rem;
            text-decoration: none;
            color: white !important;
            background-color: var(--primary-color);
            border-radius: .3rem;
            transition: box-shadow .3s ease-in-out;
            box-shadow: none;
            display: inline-flex;
        }
        
        .open-solution-button:hover {
            box-shadow: 0px 1px 5px rgba(0,0,0,0.3);
        }
        
        .open-solution-button:before {
            display: block;
            content: ' ';
            background-size: 1rem 1rem;
            height: 1rem;
            width: 1rem;
            left: 0.5rem;
            filter: invert(100%);
            margin-right: .25rem;
        }
        
        .open-solution-button:before {
            background-image: url('/wem/components/assets/eye-icon.svg');
        }
        
        pre {
            font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;
            background-color: #272822;;
            padding: 1rem;
            position: relative;
            white-space: pre-wrap;
            font-size: 14px;
            color: #fff;
        }
        
        /**
         * Page footer
         */
        
        .page-end-menu {
            display: flex;
            justify-content: space-between;
            margin-top: 1.5em;
            padding-top: 1.5em;
            border-top: 1px solid #ddd;
        }
        
        .page-end-menu .item {
            text-decoration: none;
            color: var(--primary-color);
            display: flex;
            align-items: center;
        }
        
        .page-end-menu .item.backward > img {
            transform: rotate(180deg);
        }
    `;

    static get properties() {
        return {
            chapter: {type: Number}
        };
    }

    content = null;
    setup = undefined;

    constructor() {
        super();
    }
    render() {
        return html`
            <div id="content"></div>
            <div class="page-end-menu">
                ${chapters[this.chapter-2]!==undefined?html`
                    <wem-link href="/wem/${nameToUrlPart(chapters[this.chapter-2].name)}">
                        <div class="item backward">
                            <img src="/wem/components/assets/arrow.svg">
                            Vorherige Einheit
                        </div>
                    </wem-link>
                `:''}
                ${chapters[this.chapter]!==undefined?html`
                    <wem-link href="/wem/${nameToUrlPart(chapters[this.chapter].name)}">
                        <div class="item forward">
                            Nächste Einheit
                            <img src="/wem/components/assets/arrow.svg">
                        </div>
                    </wem-link>
                `:''}
            </div>
        `;
    }
    updated() {
        if (this.setup !== this.chapter) {
            this.setup = this.chapter;
            (async () => {
                fetch('/wem/solutions/u' + this.chapter + '/index.html').then(res => res.text()).then(text => {
                    this.content = text.replace(/(data-url|data-run-html|data-run-css|data-run-js)="/g, '$1="/wem/solutions/u' + (this.chapter) + '/')
                        .replace(/(<img .*src=")(?!https?:\/\/|\/)/g, '$1/wem/solutions/u' + (this.chapter) + '/')
                        .replace(/(<a .*href=")(?!https?:\/\/|\/)/g, '$1/wem/solutions/u' + (this.chapter) + '/');
                    this.shadowRoot.querySelector('#content').innerHTML = this.content;
                })
            })();
        }
    }
}

customElements.define('wem-chapter', Chapter);