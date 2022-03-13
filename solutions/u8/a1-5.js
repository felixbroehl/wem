import {html, css, LitElement} from 'https://cdn.skypack.dev/lit@v2.1.2';

export class BezierAnimation extends LitElement {
    static styles = css`
        circle {
            stroke: #000;
            stroke-width: 1px;
            cursor: move;
        }
        
        path, line {
            fill: transparent;
            stroke: #000;
        }
        
        svg {
            background-color: #ccc;
            margin: 0.8em;
        }
    `;

    static properties = {};

    constructor() {
        super();
    }

    render() {
        return html`
            <svg id="svg-1" viewBox="0 0 270 270" width="270" height="270"></svg>
            <svg id="svg-2" viewBox="0 0 270 270" width="270" height="270"></svg>
        `;
    }

    updated() {
        const svg1 = this.renderRoot.querySelector('#svg-1');
        let points = [
            this.addPoint(svg1, 220, 60),
            this.addPoint(svg1, 20, 110),
            this.addPoint(svg1, 70, 250)
        ];
        this.addCurve(svg1, points);
        this.addLine(svg1, points[0], points[1]);
        this.addLine(svg1, points[1], points[2]);

        const svg2 = this.renderRoot.querySelector('#svg-2');
        let points2 = [
            this.addPoint(svg2, 210, 30),
            this.addPoint(svg2, 210, 250),
            this.addPoint(svg2, 25, 190),
            this.addPoint(svg2, 110, 150),
        ];
        this.addCurve(svg2, points2);
        this.addLine(svg2, points2[0], points2[1]);
        this.addLine(svg2, points2[1], points2[2]);
        this.addLine(svg2, points2[2], points2[3]);
    }

    insertFirst(parent, child) {
        if (parent.children.length === 0) {
            parent.appendChild(child);
        } else {
            parent.insertBefore(child, parent.children[0]);
        }
    }

    getRandomColor() { // from https://stackoverflow.com/a/1484514
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    addPoint(svg, x, y) {
        let point = svg.createSVGPoint();
        point.x = x;
        point.y = y;
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', point.x);
        circle.setAttribute('cy', point.y);
        circle.setAttribute('r', '5');
        circle.setAttribute('fill', this.getRandomColor());
        this.insertFirst(svg, circle);

        circle.addEventListener('mousedown', () => {
            svg.addEventListener('mousemove', drag);
        });
        document.body.addEventListener('mouseup', () => {
            svg.removeEventListener('mousemove', drag)
        });

        let re = {
            svgPoint: point,
            element: circle,
            partOf: []
        };

        const drag = (e) => {
            point.x = e.offsetX;
            point.y = e.offsetY;
            circle.setAttribute('cx', point.x);
            circle.setAttribute('cy', point.y);
            for (let item of re.partOf) {
                item.draw();
            }
        }

        return re;
    }

    getPointString(svgPoint) {
        return svgPoint.svgPoint.x + " " + svgPoint.svgPoint.y
    }

    addCurve(svg, points) {
        const re = {
            draw: () => {
                let d = 'M' + this.getPointString(points[0]) + ' ' + (points.length <= 3 ? 'Q' : 'C');
                for (let i = 1; i < points.length; i++) {
                    d += ' ' + this.getPointString(points[i]);
                }
                path.setAttribute('d', d);
            }
        };
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        for (let point of points) {
            point.partOf.push(re);
        }
        re.draw();
        this.insertFirst(svg, path);
        return re;
    }

    addLine(svg, point1, point2) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        let re = {
            draw: () => {
                line.setAttribute('x1', point1.svgPoint.x);
                line.setAttribute('y1', point1.svgPoint.y);
                line.setAttribute('x2', point2.svgPoint.x);
                line.setAttribute('y2', point2.svgPoint.y);
            }
        }
        point1.partOf.push(re);
        point2.partOf.push(re);
        re.draw();
        this.insertFirst(svg, line);
    };
}
customElements.define('bezier-animation', BezierAnimation);