import {html, css, LitElement} from 'https://cdn.skypack.dev/lit@v2.1.2';

export class CalligraphyEditor extends LitElement {
    static styles = css`
        svg {
            width: 100%;
            height: 100%;
            background-color: #ddd;
        }
        
        path {
            fill: #000;
        }
    `;

    static properties = {
        lastPoint: {type: Object},
        pointsOffset1: {type: Array},
        pointsOffset2: {type: Array},
        lastTime: {type: Number},
        drawing: {type: Boolean},
        path: {type: Object}
    };

    constructor() {
        super();
        this.pointsOffset1 = [];
        this.pointsOffset2 = [];
        this.drawing = false;
    }

    render() {
        return html`<svg @mousedown=${this.mouseDown} @mousemove=${this.mouseMove} @mouseup=${this.mouseUp}></svg>`;
    }

    mouseDown() {
        this.path = this.addPath();
        this.drawing = true;
    }

    mouseMove(e) {
        if (this.drawing) {
            this.draw(e);
        }
    }

    //Workaround
    addPath() {
        const svg = this.renderRoot.querySelector('svg');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        svg.appendChild(path);
        return path;
    }

    mouseUp() {
        this.drawing = false;
        this.lastPoint = undefined;
        this.pointsOffset1 = [];
        this.pointsOffset2 = [];
        this.lastTime = undefined;
    }

    draw(e) {
        const point = this.point(e.offsetX, e.offsetY);
        const time = (new Date()).getMilliseconds();

        if (this.lastPoint) {
            const length = Math.sqrt(Math.pow(point.x - this.lastPoint.x, 2) + Math.pow(point.y - this.lastPoint.y, 2));
            const timeTraveled = time - this.lastTime;
            const width = Math.min(Math.max(timeTraveled/length*3, 1), 15);

            if (length > 3) {
                const calcPoints = this.getPointOffset(this.lastPoint, point, width);

                if (calcPoints) {
                    this.pointsOffset1.push(calcPoints[0]);
                    this.pointsOffset2.unshift(calcPoints[1]);

                    this.path.setAttribute('d', this.getPointsString(this.pointsOffset1.concat(this.pointsOffset2)));
                }

                this.lastPoint = point;
            }
        } else {
            this.lastPoint = point;
        }

        this.lastTime = time;
    }

    point(x,y) {
        return {
            x: x,
            y: y
        };
    }

    getPointOffset(a, b, delta) {
        const angle = Math.atan2(b.y - a.y, b.x - a.x);

        const calc = (r, x, y, angle) => {
            return this.point(r * Math.cos(angle) + x, r * Math.sin(angle) + y);
        }

        let point1 = calc(delta, b.x, b.y, angle - (Math.PI/2));
        let point2 = calc(delta, b.x, b.y, angle + (Math.PI/2));

        if (isNaN(point1.x) || isNaN(point1.y) || isNaN(point2.x) || isNaN(point2.y)) {
            return null;
        }

        return [point1, point2];
    }

    getPointsString(arr) {
        return 'M' + arr.map(item => item.x + ',' + item.y).join(' ') + ' Z';
    }
}
customElements.define('calligraphy-editor', CalligraphyEditor);