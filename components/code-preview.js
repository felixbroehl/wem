import {html, css, LitElement} from 'https://cdn.skypack.dev/lit@v2.1.2';

import Prism from 'https://cdn.skypack.dev/prismjs@v1.x/components/prism-core.min.js';

import { lang_dependencies, lang_aliases } from "./code-preview-languages.js";

export class CodePreview extends LitElement {
    static styles = css`
        .code-preview {
            position: relative;
            margin-bottom: 1em;
        }
        
        .extension {
            position: absolute;
            right: 18px;
            top: 5px;
            opacity: 0.5;
            color: #fff;
        }
        
        .code-preview {
            position:relative;
            width: 100%;
            height: 350px;
            border: none;
            background-color: #272822;
            box-sizing: border-box;
        }
        
        #code-wrapper {
            overflow: auto scroll;
            height: 100%;
            padding: 1em;
            box-sizing: border-box;
        }
        
        code {
            width: 100%;
            height: 100%;
            white-space: pre-wrap !important;
            font-size: 14px !important;
            font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;
            color: #fff;
        }
        
        /**
         * Loader
         */
        #loader {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%) scale(0.7);
        }
        .lds-ring {
            display: inline-block;
            position: relative;
            width: 80px;
            height: 80px;
        }
        .lds-ring div {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: 64px;
            height: 64px;
            margin: 8px;
            border: 8px solid #fff;
            border-radius: 50%;
            animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: #fff transparent transparent transparent;
        }
        .lds-ring div:nth-child(1) {
            animation-delay: -0.45s;
        }
        .lds-ring div:nth-child(2) {
            animation-delay: -0.3s;
        }
        .lds-ring div:nth-child(3) {
            animation-delay: -0.15s;
        }
        @keyframes lds-ring {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    `;

    static properties = {
        url: {type: String},
        _content: {type: String},
        _extension: {type: String}
    };

    modeMapping = {
        HTML: 'html',
        CSS: 'css',
        JS: 'javascript',
        JSON: 'json',
        C: 'c',
        VUE: 'html'
    }
    isSetup = false;

    constructor() {
        super();
        this.url = this.getAttribute('data-url');
    }

    async loadLanguages(languages) {
        if (typeof languages === 'string') {
            languages = [languages];
        }

        for (let lang of languages) {
            await this.loadLanguage(lang);
        }
    }

    async loadLanguage(lang) {
        let dependencies = lang_dependencies[lang];
        if (dependencies && dependencies.length) {
            await this.loadLanguages(dependencies);
        }
        if (Prism.languages[lang] === undefined) {
            await import('https://cdn.skypack.dev/prismjs@v1.x/components/prism-' + lang + '.min.js');
        }
    }

    render() {
        return html`
            <link rel="stylesheet" href="https://cdn.skypack.dev/prismjs@v1.x/themes/prism.min.css">
            <link rel="stylesheet" href="https://cdn.skypack.dev/prismjs@v1.x/themes/prism-okaidia.min.css">
            <div class="code-preview">
                <div id="loader"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
                <div id="code-wrapper"><code></code></div>
                ${this._extension?html`<div class="extension">${this._extension}</div>`:''}
            </div>
        `;
    }

    getContent() {
        return this._content;
    }

    updated() {
        if (this.url && !this._content) {
            if (!this.isSetup) {
                this.isSetup = true;
                const urlSplit = this.url.split('.');
                this._extension = urlSplit[urlSplit.length-1].toUpperCase();
                (async () => {
                    await this.setupBox();
                    this._content = await (await fetch(this.url)).text();
                    this.updateBox();
                })();
            }
        }
    }

    async setupBox() {
        await this.loadLanguage(this.getLang());
    }

    updateBox() {
        this.setContent().then();
    }

    getLang() {
        let lang = this.modeMapping[this._extension];
        return lang_aliases[lang] || lang || 'text';
    }

    async setContent() {
        const highlighted = Prism.highlight(this.getContent(), Prism.languages[this.getLang()], this.getLang());
        const codeElement = this.shadowRoot.querySelector('code');
        codeElement.classList.add('language-' + this.getLang());
        codeElement.innerHTML = highlighted;
        this.shadowRoot.querySelector('#loader').remove();
    }
}
customElements.define('code-preview', CodePreview);