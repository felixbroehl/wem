import {html, css, LitElement} from 'https://cdn.skypack.dev/lit@v2.1.2';

import Prism from 'https://cdn.skypack.dev/prismjs@v1.x/components/prism-core.min.js';

import { lang_dependencies, lang_aliases } from "./code-preview-languages.js";

export class CodePreview extends LitElement {
    static styles = css`
        .code-preview {
            position: relative;
            margin-bottom: 1em;
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
            overflow: auto;
            height: 100%;
            box-sizing: border-box;
            display: flex;
        }
        
        #line-numbers {
            white-space: pre-wrap;
            font-family: Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;
            font-size: 14px;
            line-height: 1.5;
            color: #bebebe;
            padding: 0.3em;
            background-color: rgba(0,0,0,0.25);
            text-align: right;
            height: fit-content;
            min-height: 350px;
            box-sizing: border-box;
        }
        
        code {
            width: 100%;
            height: 100%;
            white-space: pre !important;
            font-size: 14px !important;
            font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;
            color: #fff;
            padding: 0.3em !important;
            height: fit-content;
        }
        
        .token.operator {
            background: transparent !important;
        }
        
        /**
         * Head toolbar
         */
         #code-head-bar {
            background-color: #101010;
            color: #fff;
            padding: 0.3em;
            display: flex;
            justify-content: space-between;
            font-size: 0.9em;
         }
         
         #extension {
            opacity: 0.5;
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
        
        /**
         * Toolbar
         */
        ::-webkit-scrollbar {
            background: #000;
            width: 10px;
            height: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.5);
        }
        
        ::-webkit-scrollbar-corner {
            background: #000;
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
        const urlSplit = this.url && this.url.split('/')
        const fileName = urlSplit && urlSplit[urlSplit.length-1];
        return html`
            <link rel="stylesheet" href="https://cdn.skypack.dev/prismjs@v1.x/themes/prism-okaidia.min.css">
            <div id="code-head-bar">
                <span>${fileName}</span>
                <span id="extension">${this._extension}</span>
            </div>
            <div class="code-preview">
                <div id="loader"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
                <div id="code-wrapper">
                    <div id="line-numbers"></div>
                    <code></code>
                </div>
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
        const lineNumbers = highlighted.split('\n').map((item, i) => i+1).join('\n');
        const loader = this.shadowRoot.querySelector('#loader');
        const lineNumbersElement = this.shadowRoot.querySelector('#line-numbers');
        const codeElement = this.shadowRoot.querySelector('code');

        lineNumbersElement.innerHTML = lineNumbers;

        codeElement.classList.add('language-' + this.getLang());
        codeElement.innerHTML = highlighted;

        loader.remove();
    }
}
customElements.define('code-preview', CodePreview);