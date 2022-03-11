import {html, css, LitElement} from 'https://cdn.skypack.dev/lit@v2.1.2';

export class AnswerBlock extends LitElement {
    static styles = css`
        pre {
            font-family: 'Rubik';
            background-color: rgba(var(--primary-color-rgb), 0.4);
            border-left: 5px solid var(--primary-color);
            padding: 1rem;
            position: relative;
            white-space: pre-wrap;
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

    run() {
        this.createIframe();
    }

}
customElements.define('answer-block', AnswerBlock);