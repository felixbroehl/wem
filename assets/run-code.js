import {html, css, LitElement} from 'https://cdn.skypack.dev/lit';

export class CodePreview extends LitElement {
    static styles = css`
        .code-preview {
            position: relative;
        }
         
        pre {
            font-family: 'Noto Sans Mono', monospace;
            border: 1px solid #aaa;
            background-color: #ddd;
            padding: 1rem;
            position: relative;
            white-space: pre-wrap;
        }
        
        .extension {
            position: absolute;
            right: 5px;
            top: 5px;
            opacity: 0.5;
        }
    `;

    static properties = {
        url: {type: String},
        _content: {type: String},
        _extension: {type: String}
    };

    constructor() {
        super();
        this.url = this.getAttribute('data-url');
    }

    render() {
        return html`
            <div class="code-preview">
                <pre>${this.renderContent()}</pre>
                ${this._extension?html`<div class="extension">${this._extension}</div>`:''}
            </div>
        `;
    }

    renderContent() {
        if (!this.url) {
            return html`<slot></slot>`;
        }
        if (!this._content) {
            return 'Loading...';
        }
        return this._content;
    }

    updated() {
        if (this.url && !this._content) {
            (async () => {
                this._content = await (await fetch(this.url)).text();
            })();
            const urlSplit = this.url.split('.');
            this._extension = urlSplit[urlSplit.length-1].toUpperCase();
        }
    }
}
customElements.define('code-preview', CodePreview);

export class RunCode extends LitElement {
    static styles = css`
        .run-iframe {
            width: 100%;
            border: 1px solid #ddd;
            margin-top: 5px;
            height: 150px;
        }
        
        .run-iframe.size-middle {
            height: 300px;
        }
        
        .run-iframe.size-large {
            height: 500px;
        }
        
        .run-solution-button {
            padding: .5rem;
            text-decoration: none;
            color: white !important;
            background-color: var(--primary-color);
            border-radius: .3rem;
            transition: box-shadow .3s ease-in-out;
            box-shadow: none;
            display: inline-flex;
        }
        
        .run-solution-button:hover {
            box-shadow: 0px 1px 5px rgba(0,0,0,0.3);
        }
        
        .run-solution-button:before {
            display: block;
            content: ' ';
            background-size: 1rem 1rem;
            height: 1rem;
            width: 1rem;
            left: 0.5rem;
            filter: invert(100%);
            margin-right: .25rem;
        }
        
        .run-solution-button:before {
            background-image: url('../assets/play-icon.svg');
        }
    `;

    static properties = {
        _htmlUrl: {type: String},
        _jsUrl: {type: String},
        _cssUrl: {type: String},
        _size: {type: String},
        _jsType: {type: String}
    };

    constructor() {
        super();
        this._htmlUrl = this.getAttribute('data-run-html');
        this._jsUrl = this.getAttribute('data-run-js');
        this._cssUrl = this.getAttribute('data-run-css');
        this._size = this.getAttribute('data-run-size');
        this._jsType = this.getAttribute('data-run-js-type');
    }

    render() {
        return html`
            ${this._htmlUrl?html`<code-preview .url=${this._htmlUrl}></code-preview>`:''}
            ${this._cssUrl?html`<code-preview .url=${this._cssUrl}></code-preview>`:''}
            ${this._jsUrl?html`<code-preview .url=${this._jsUrl}></code-preview>`:''}
            <a href="#" class="run-solution-button" @click=${e=>{e.preventDefault();this.run()}}>Lösung ausführen</a>
            <div id="iframe-wrapper"></div>
        `;
    }

    run() {
        this.createIframe();
    }

    async createIframe() {
        const iframe = document.createElement('iframe');
        iframe.classList.add('run-iframe');
        iframe.src = this._htmlUrl?this._htmlUrl:'../assets/console.html';
        if (this._size === 'middle') {
            iframe.classList.add('size-middle');
        } else if (this._size === 'large') {
            iframe.classList.add('size-large');
        }

        // fetch js and css
        const js = this._jsUrl?await (await fetch(this._jsUrl)).text():undefined;
        const css = this._cssUrl?await (await fetch(this._cssUrl)).text():undefined;

        const wrapper = this.renderRoot.querySelector('#iframe-wrapper');
        wrapper.innerHTML = '';
        wrapper.appendChild(iframe);

        iframe.contentWindow.addEventListener('DOMContentLoaded', () => {
            const iframeDocument = iframe.contentWindow.document;
            const iframeHeadElement = iframeDocument.head;

            if (js) {
                const script = document.createElement('script');
                script.text = js;
                if (this._jsType) {
                    script.type = this._jsType;
                }
                iframeHeadElement.appendChild(script);
            }
            if (css) {
                const style = document.createElement('style');
                style.innerText = css;
                iframeHeadElement.appendChild(style);
            }
        });
    }
}
customElements.define('run-code', RunCode);