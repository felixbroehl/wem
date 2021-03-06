import { html, css, LitElement } from 'https://cdn.skypack.dev/lit@v2.1.2';
import {chapters} from "./chapters.js";
import {nameToUrlPart} from "./utils.js";
import './inline-code-preview.js'
import './code-preview.js'
import './run-code.js'
import './open-solution-button.js'

class Chapter extends LitElement {
    static styles = css`
        a, a:link, a:visited {
            color: var(--link-color);
        }
        
        a:hover, a:active {
            color: var(--secondary-color);
        }
        
        #content img {
            max-width: min(100%, 800px);
            margin-left: 50% !important;
            transform: translateX(-50%);
            box-shadow: 0px 2px 7px rgb(0,0,0,0.3);
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
                `:html`<span></span>`}
                ${chapters[this.chapter]!==undefined?html`
                    <wem-link href="/wem/${nameToUrlPart(chapters[this.chapter].name)}">
                        <div class="item forward">
                            N??chste Einheit
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
                    const replacement = '$1/wem/solutions/u' + (this.chapter) + '/';
                    this.content = text.replace(/(<code-preview .*src=")/g, replacement)
                        .replace(/(<run-code .*htmlSrc=")/g, replacement)
                        .replace(/(<run-code .*cssSrc=")/g, replacement)
                        .replace(/(<run-code .*jsSrc=")/g, replacement)
                        .replace(/(<open-solution-button .*href=")/g, replacement)
                        .replace(/(<img .*src=")(?!https?:\/\/|\/)/g, replacement)
                        .replace(/(<a .*href=")(?!https?:\/\/|\/)/g, replacement);
                    this.shadowRoot.querySelector('#content').innerHTML = this.content;
                })
            })();
        }
    }
}

customElements.define('wem-chapter', Chapter);