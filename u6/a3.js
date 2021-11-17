function Point(x,y){
    this.x = x;
    this.y = y;
}

function getPointOffset(a,b, delta){
    const angle = Math.atan2(b.y - a.y, b.x - a.x);

    const calc = (r, x, y, angle) => {
        return new Point(r * Math.cos(angle) + x, r * Math.sin(angle) + y);
    }

    let point1 = calc(delta, b.x, b.y, angle - (Math.PI/2));
    let point2 = calc(delta, b.x, b.y, angle + (Math.PI/2));

    if (isNaN(point1.x) || isNaN(point1.y) || isNaN(point2.x) || isNaN(point2.y)) {
        return null;
    }

    return [point1, point2];
}

function getPointsString(arr) {
    return 'M' + arr.map(item => item.x + ',' + item.y).join(' ') + ' Z';
}

window.addEventListener('load', () => {
    const svg = document.querySelector('svg');
    let lastPoint;
    let pointsOffset1 = [];
    let pointsOffset2 = [];
    let lastTime;

    let path;

    svg.addEventListener('mousedown', () => {
        path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        svg.appendChild(path);
        svg.addEventListener("mousemove", draw);
    });

    svg.addEventListener('mouseup', () => {
        svg.removeEventListener('mousemove', draw);
        lastPoint = undefined;
        pointsOffset1 = [];
        pointsOffset2 = [];
        lastTime = undefined;
    });

    const draw = (e) => {
        const point = new Point(e.offsetX, e.offsetY);
        const time = (new Date()).getMilliseconds();

        if (lastPoint) {
            const length = Math.sqrt(Math.pow(point.x - lastPoint.x, 2) + Math.pow(point.y - lastPoint.y, 2));
            const timeTraveled = time - lastTime;
            const width = Math.min(Math.max(timeTraveled/length*3, 1), 15);

            if (length > 3) {
                const calcPoints = getPointOffset(lastPoint, point, width);

                if (calcPoints) {
                    pointsOffset1.push(calcPoints[0]);
                    pointsOffset2.unshift(calcPoints[1]);

                    path.setAttribute('d', getPointsString(pointsOffset1.concat(pointsOffset2)) + ' Z');
                }

                lastPoint = point;
            }
        } else {
            lastPoint = point;
        }

        lastTime = time;
    }
});