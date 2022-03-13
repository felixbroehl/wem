import { html, css, LitElement } from 'https://cdn.skypack.dev/lit@v2.1.2';

class About extends LitElement {
    static styles = css`
        a, a:link, a:visited {
            color: var(--link-color);
        }
        
        a:hover, a:active {
            color: var(--secondary-color);
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
    `;

    static get properties() {
        return {};
    }
    constructor() {
        super();
    }
    render() {
        return html`
            <h1>Über dies App</h1>
            <p>Diese App ist im Rahmen des Fachs Web Engineering im Master of Computer Science der Hochschule Bonn-Rhein-Sieg entstanden.</p>
            <h2>git-Statistik</h2>
            <p><inline-code-preview>git fame</inline-code-preview></p>
            <p><pre>Total commits: 55
Total ctimes: 862
Total files: 267
Total loc: 104292
| Author      |    loc |   coms |   fils |  distribution    |
|:------------|-------:|-------:|-------:|:-----------------|
| Felix Bröhl | 104292 |     55 |    267 | 100.0/ 100/100.0 |
</pre></p>
            <h2>Fremdinhalte</h2>
            <h3>Frameworks</h3>
            <p>Zur Erstellung der Webseite wurde das "Framework" <a href="https://lit.dev" target="_blank">lit</a> verwendet.</p>
            <p>Zur Erstellung einiger Übungen wurde <a href="https://vuejs.org" target="_blank">vue.js</a> verwendet.</p>
            <h3>Libraries</h3>
            <p><a href="https://github.com/hamedasemi/lit-element-router" target="_blank">lit-element-router</a> für Routing</p>
            <p><a href="https://github.com/rafgraph/spa-github-pages" target="_blank">spa-github-pages</a> für Github Pages Routing</p>
            <p><a href="https://prismjs.com" target="_blank">prismJS</a> für Code Highlighting</p>
            <h3>CDN für Bibliotheken</h3>
            <p><a href="https://skypack.dev" target="_blank">skypack</a></p>
            <h3>Icons</h3>
            <p><a href="https://www.svgrepo.com/svg/336657/align-text-center" target="_blank">Align Text Center SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/336660/align-text-left" target="_blank">Align Text Left SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/336662/align-text-right" target="_blank">Align Text Right SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/347681/bold" target="_blank">Bold SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/335078/heading-h1" target="_blank">Heading H1 SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/335079/heading-h2" target="_blank">Heading H2 SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/335081/heading-h3" target="_blank">Heading H3 SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/335082/heading-h4" target="_blank">Heading H4 SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/335080/heading-h5" target="_blank">Heading H5 SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/1400/image-file" target="_blank">Image File SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/334022/italic" target="_blank">Italic SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/51864/link" target="_blank">Link SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/335187/text-color" target="_blank">Text Color SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/364921/text-strikethrough-fill" target="_blank">Text Strikethrough Fill SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/394532/underline" target="_blank">Underline SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/238325/undo" target="_blank">Undo SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/341244/unlink" target="_blank">Unlink SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/341847/github" target="_blank">Github SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/56347/rocket-launch" target="_blank">Rocket Launch SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/213906/responsive" target="_blank">Responsive SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/368775/javascript" target="_blank">Javascript SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/365836/tree-structure-thin" target="_blank">Tree Structure Thin SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/34982/clock" target="_blank">Clock SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/341101/svg" target="_blank">Svg SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/394314/nodejs" target="_blank">Nodejs SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/38722/cube" target="_blank">Cube SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/354234/pwa" target="_blank">Pwa SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/369644/vue" target="_blank">Vue SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/306952/webassembly" target="_blank">Webassembly SVG Vector</a></p>
            <p><a href="https://www.svgrepo.com/svg/314886/security" target="_blank">Security SVG Vector</a></p>
            <h3>Third-party code</h3>
            <p>Sofern fremder Code kopiert wurde für Lösungen z.B. von StackOverflow, wurde dies explizit im Code der Lösung über einen Kommentar ausgewiesen.</p>
            <h2>Rechtlich Verantwortlicher</h2>
            <p>Felix Bröhl</p>
            <p>Clemensstrasse 36</p>
            <p>53225 Bonn</p>
        `;
    }
}

customElements.define('wem-about', About);