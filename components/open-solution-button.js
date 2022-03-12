import {html, css, LitElement} from 'https://cdn.skypack.dev/lit@v2.1.2';

export class OpenSolutionButton extends LitElement {
    static styles = css`
        a {
            padding: .5rem;
            text-decoration: none;
            color: white !important;
            background-color: var(--primary-color);
            border-radius: .3rem;
            transition: box-shadow .3s ease-in-out;
            box-shadow: none;
            display: inline-flex;
        }
        
        a:hover {
            box-shadow: 0px 1px 5px rgba(0,0,0,0.3);
        }
        
        a:before {
            display: block;
            content: ' ';
            background-size: 1rem 1rem;
            height: 1rem;
            width: 1rem;
            left: 0.5rem;
            filter: invert(100%);
            margin-right: .25rem;
        }
        
        a:before {
            background-image: url('/wem/components/assets/eye-icon.svg');
        }
    `;

    static properties = {
        href: {type: String}
    };

    constructor() {
        super();
    }

    render() {
        return html`
            <a href=${this.href} target="_blank"><slot></slot></a>
        `;
    }
}
customElements.define('open-solution-button', OpenSolutionButton);