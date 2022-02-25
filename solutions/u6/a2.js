const getRandomColor = () => { // from https://stackoverflow.com/a/1484514
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const insertFirst = (parent, child) => {
    if (parent.children.length === 0) {
        parent.appendChild(child);
    } else {
        parent.insertBefore(child, parent.children[0]);
    }
}

window.addEventListener('load', (() => {
    const addPoint = (svg, x, y) => {
        let point = svg.createSVGPoint();
        point.x = x;
        point.y = y;
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', point.x);
        circle.setAttribute('cy', point.y);
        circle.setAttribute('r', '5');
        circle.setAttribute('fill', getRandomColor());
        insertFirst(svg, circle);

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

    const getPointString = (svgPoint) => {
        return svgPoint.svgPoint.x + " " + svgPoint.svgPoint.y
    }

    const addCurve = (svg, points) => {
        const re = {
            draw: () => {
                let d = 'M' + getPointString(points[0]) + ' ' + (points.length <= 3 ? 'Q' : 'C');
                for (let i = 1; i < points.length; i++) {
                    d += ' ' + getPointString(points[i]);
                }
                path.setAttribute('d', d);
            }
        };
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        for (let point of points) {
            point.partOf.push(re);
        }
        re.draw();
        insertFirst(svg, path);
        return re;
    }

    const addLine = (svg, point1, point2) => {
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
        insertFirst(svg, line);
    };

    const svg1 = document.querySelector('#svg-1');
    let points = [
        addPoint(svg1, 220, 60),
        addPoint(svg1, 20, 110),
        addPoint(svg1, 70, 250)
    ];
    addCurve(svg1, points);
    addLine(svg1, points[0], points[1]);
    addLine(svg1, points[1], points[2]);

    const svg2 = document.querySelector('#svg-2');
    let points2 = [
        addPoint(svg2, 210, 30),
        addPoint(svg2, 210, 250),
        addPoint(svg2, 25, 190),
        addPoint(svg2, 110, 150),
    ];
    addCurve(svg2, points2);
    addLine(svg2, points2[0], points2[1]);
    addLine(svg2, points2[1], points2[2]);
    addLine(svg2, points2[2], points2[3]);
}));