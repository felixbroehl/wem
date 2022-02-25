import {html, css, LitElement} from 'https://cdn.skypack.dev/lit@v2.1.2';

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
        }
        
        iframe {
            width: 100%;
            height: 350px;
            border: none;
            background-color: #272822;
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
        C: 'c'
    }
    isSetup = false;
    isSetupUpdated = false;
    iframe;

    constructor() {
        super();
        this.url = this.getAttribute('data-url');
    }

    render() {
        return html`
            <div class="code-preview">
                <div id="iframe-wrapper"></div>
                ${this._extension?html`<div class="extension">${this._extension}</div>`:''}
            </div>
        `;
    }

    getContent() {
        return this._content;
    }

    updated() {
        if (this.url && !this._content) {
            (async () => {
                this.setupBox();
                this._content = await (await fetch(this.url)).text();
                this.updateBox();
            })();
            const urlSplit = this.url.split('.');
            this._extension = urlSplit[urlSplit.length-1].toUpperCase();
        }
    }

    setupBox() {
        if (!this.isSetup) {
            this.isSetup = true;
            this.createIframe().then();
        }
    }

    updateBox() {
        if (!this.isSetupUpdated) {
            this.isSetupUpdated = true;
            this.setContent().then();
        }
    }

    async createIframe() {
        this.iframe = document.createElement('iframe');
        this.iframe.src = '/wem/components/assets/code-viewer/code-viewer.html';

        const wrapper = this.shadowRoot.querySelector('#iframe-wrapper');
        wrapper.innerHTML = '';
        wrapper.appendChild(this.iframe);
    }

    async setContent() {
        this.iframe.contentWindow.addEventListener('load', () => {
            this.iframe.contentWindow.postMessage({
                code: this.getContent(),
                language: this.modeMapping[this._extension]
            }, '*');
        });
    }
}
customElements.define('code-preview', CodePreview);