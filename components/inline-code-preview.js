import {html, css, LitElement} from 'https://cdn.skypack.dev/lit@v2.1.2';

export class InlineCodePreview extends LitElement {
    static styles = css`
        pre {
            display: inline;
            font-family: "Noto Sans Mono", monospace;
            background-color: rgba(var(--primary-color-rgb),0.2);
            border-radius: 3px;
            border: 1px solid var(--primary-color);
            color: #000;
            word-break: break-all;
            white-space: normal;
            font-size: 0.89em;
        }
    `;

    static properties = {};

    constructor() {
        super();
    }

    render() {
        return html`
            <pre><slot></slot></pre>
        `;
    }
}
customElements.define('inline-code-preview', InlineCodePreview);