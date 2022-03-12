import { html, css, LitElement } from 'https://cdn.skypack.dev/lit@v2.1.2';
import { navigator } from 'https://cdn.skypack.dev/lit-element-router';

class Link extends navigator(LitElement) {
    static styles = css`
        a {
            color: var(--color);
            text-decoration: var(--text-decoration);
        }
    `;

    static get properties() {
        return {
            href: { type: String }
        };
    }
    constructor() {
        super();
        this.href = '';
    }
    render() {
        return html`
            <a href='${this.href}' @click='${this.linkClick}' target=${this.isExternalHref()?'_blank':''}>
                <slot></slot>
            </a>
        `;
    }
    linkClick(event) {
        if (!this.isExternalHref()) {
            event.preventDefault();
            this.navigate(this.href);
        }
    }

    isExternalHref() {
        return /^https?:\/\//.test(this.href);
    }
}

customElements.define('wem-link', Link);