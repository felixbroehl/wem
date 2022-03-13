// Point "class"
function Point(x,y){
    this.x = x;
    this.y = y;
}

// Returns two points from point b which are delta away
// and are 90deg and -90deg positioned to the angle between points b and a
function getPointOffset(a,b, delta) {
    const angle = Math.atan2(b.y - a.y, b.x - a.x); // get the angle between points b and a

    const calc = (r, x, y, angle) => { // Creates a new point from x with a angle and a radius
        return new Point(r * Math.cos(angle) + x, r * Math.sin(angle) + y);
    }

    let point1 = calc(delta, b.x, b.y, angle - (Math.PI/2)); // point -90deg
    let point2 = calc(delta, b.x, b.y, angle + (Math.PI/2)); // point 90deg

    if (isNaN(point1.x) || isNaN(point1.y) || isNaN(point2.x) || isNaN(point2.y)) { // return null if calculation failed
        return null;
    }

    return [point1, point2]; //return the new offset points
}

// converts points array to string
function getPointsString(arr) {
    return 'M' + arr.map(item => item.x + ',' + item.y).join(' ') + ' Z';
}

window.addEventListener('load', () => {
    const svg = document.querySelector('svg');
    let lastPoint;
    let pointsOffset = [];
    let lastTime;

    let path;

    svg.addEventListener('mousedown', () => {
        // create a path everytime mouse is down
        path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        svg.appendChild(path);
        svg.addEventListener("mousemove", draw);
    });

    svg.addEventListener('mouseup', () => {
        // reset everytime mouse is up
        svg.removeEventListener('mousemove', draw);
        lastPoint = undefined;
        pointsOffset = [];
        lastTime = undefined;
    });

    const draw = (e) => {
        const point = new Point(e.offsetX, e.offsetY);
        const time = (new Date()).getMilliseconds();

        if (lastPoint) {
            const length = Math.sqrt(Math.pow(point.x - lastPoint.x, 2) + Math.pow(point.y - lastPoint.y, 2)); //√a²+b²
            const timeTraveled = time - lastTime;
            const width = Math.min(Math.max(timeTraveled/length*3, 1), 15); // calculate width

            if (length > 3) {
                const calcPoints = getPointOffset(lastPoint, point, width);

                if (calcPoints) {
                    pointsOffset.push(calcPoints[0]); // add -90deg point at arrays end
                    pointsOffset.unshift(calcPoints[1]); // add 90deg point at arrays start

                    // set path
                    path.setAttribute('d', getPointsString(pointsOffset) + ' Z');
                }

                lastPoint = point;
            }
        } else {
            lastPoint = point;
        }

        lastTime = time;
    }
});