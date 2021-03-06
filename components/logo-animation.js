import { html, css, svg, LitElement } from 'https://cdn.skypack.dev/lit@v2.1.2';

class LogoAnimation extends LitElement {
    static styles = css`
        #logo-anim {
            height: 200px;
            width: 100%;
        }
        @keyframes char-slide-in {
            from {transform: translate(0,-100%); visibility: visible;}
            to {transform: translate(0,0%); visibility: visible;}
        }
        #logo-anim #wem path {
            animation: char-slide-in 2s ease-in-out forwards;
            visibility: hidden;
        }

        #logo-anim #wem path:nth-child(2) {
            animation-delay: 0.3s;
        }

        #logo-anim #wem path:nth-child(3) {
            animation-delay: 0.6s;
        }

        #wem-subtitle {
            font-weight: bold;
            font-size: 1.9em;
            text-align: center;
            margin: -43px auto 50px;
            opacity: 0;
            animation: blend-in 1.3s ease-in forwards 2.6s;
            visibility: hidden;
        }

        @keyframes blend-in {
            0% {opacity: 0;visibility: visible;}
            100% {opacity: 1; visibility: visible;}
        }
    `;

    static get properties() {
        return {};
    }
    constructor() {
        super();
    }
    render() {
        return html`
            ${this.renderSVG()}
            <h1 id="wem-subtitle">Web Engineering<br>Master Computer Science</h1>
        `;
    }
    renderSVG() {
        return svg`
            <svg viewBox="0 0 114.6 61" height="200px" id="logo-anim">
                <g fill="gray" transform="rotate(0 50 100) translate(-13 23) skewX(30) scale(1 0.5)">
                    <g id="wem">
                        <path d="M13.9,45.5c-0.3-0.3-0.5-0.6-0.6-1L8.6,16.2c0-0.1,0-0.1,0-0.3c0-0.2,0.1-0.4,0.3-0.6C9,15.1,9.2,15,9.5,15h5.8
                c0.9,0,1.3,0.3,1.4,1l2.7,16.7l3.1-9.7c0.2-0.8,0.7-1.2,1.5-1.2h3.3c0.7,0,1.2,0.4,1.5,1.2l3.1,9.6L34.5,16
                c0.1-0.4,0.2-0.6,0.4-0.8c0.2-0.2,0.5-0.2,1-0.2h5.8c0.3,0,0.5,0.1,0.7,0.3c0.2,0.2,0.3,0.4,0.3,0.6v0.3l-4.7,28.3
                c-0.1,0.4-0.3,0.8-0.6,1C36.9,45.8,36.5,46,36,46h-4.5c-0.5,0-0.8-0.1-1.1-0.4c-0.3-0.2-0.4-0.5-0.5-0.8l-4.4-12.3l-4.4,12.3
                c-0.1,0.3-0.3,0.6-0.6,0.8C20.3,45.9,20,46,19.5,46h-4.4C14.6,46,14.2,45.8,13.9,45.5z"/>
                        <path d="M47.3,45.6c-0.2-0.2-0.3-0.5-0.3-0.8V16.2c0-0.3,0.1-0.6,0.3-0.8s0.5-0.3,0.8-0.3H69c0.3,0,0.6,0.1,0.8,0.3
                s0.3,0.5,0.3,0.8v4.4c0,0.3-0.1,0.6-0.3,0.8c-0.2,0.2-0.5,0.3-0.8,0.3H55v5.6h13c0.3,0,0.6,0.1,0.8,0.3c0.2,0.2,0.3,0.5,0.3,0.8v4
                c0,0.3-0.1,0.6-0.3,0.8c-0.2,0.2-0.5,0.3-0.8,0.3H55v5.8h14.3c0.3,0,0.6,0.1,0.8,0.3s0.3,0.5,0.3,0.8v4.4c0,0.3-0.1,0.6-0.3,0.8
                c-0.2,0.2-0.5,0.3-0.8,0.3H48.1C47.8,46,47.5,45.9,47.3,45.6z"/>
                        <path d="M75.7,45.7c-0.2-0.2-0.3-0.5-0.3-0.8V16.2c0-0.3,0.1-0.6,0.3-0.8c0.2-0.2,0.5-0.3,0.8-0.3h5c0.7,0,1.3,0.3,1.6,1l7.6,13.6
                L98.4,16c0.3-0.6,0.9-1,1.6-1h5c0.3,0,0.6,0.1,0.8,0.3s0.3,0.5,0.3,0.8v28.7c0,0.3-0.1,0.6-0.3,0.8c-0.2,0.2-0.5,0.3-0.8,0.3h-5.6
                c-0.3,0-0.6-0.1-0.8-0.3s-0.3-0.5-0.3-0.8V28.8l-4.8,8.8c-0.4,0.7-0.9,1-1.5,1h-2.4c-0.6,0-1.1-0.3-1.5-1l-4.7-8.8v16.1
                c0,0.3-0.1,0.6-0.3,0.8c-0.2,0.2-0.5,0.3-0.8,0.3h-5.6C76.2,46,75.9,45.9,75.7,45.7z"/>
                    </g>
                </g>
                <use href="#wem" fill="var(--primary-color)" stroke="#000" />
            </svg>
        `;
    }
}

customElements.define('wem-logo-animation', LogoAnimation);