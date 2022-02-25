const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

const test = (async () => {
    const wasm = await fetch('a2/main.wasm');
    const wasmBytes = await wasm.arrayBuffer();
    const wasmInstance = (await WebAssembly.instantiate(wasmBytes)).instance;

// function from https://stackoverflow.com/a/40200710
    const isPrime = num => {
        for(let i = 2; i < num; i++)
            if(num % i === 0) return false;
        return num > 1;
    }

    function getPrimeNumbersCount() {
        let count = 0;
        for (let i = 0; i <= 100000; i++) {
            if (isPrime(i)) {
                count++;
            }
        }
        return count;
    }

    function getPrimeNumbersCountWasm() {
        return wasmInstance.exports.main();
    }

    function execTest(resultElement, times, func) {
        return new Promise((resolve) => {
            let i = 0;
            let deltas = [];
            const step = () => {
                const begin = (new Date()).getTime();
                const result = func();
                const end = (new Date()).getTime();
                const delta = end - begin;
                deltas.push(delta);
                const p = document.createElement('p');
                p.innerHTML = 'Result: ' + result + ' in ' + delta + 'ms';
                resultElement.appendChild(p);
                if (++i < times) {
                    window.requestAnimationFrame(step);
                } else {
                    //MIN AVG MAX
                    const min = Math.min(...deltas);
                    const max = Math.max(...deltas);
                    const avg = average(deltas);
                    const p = document.createElement('p');
                    p.innerHTML = 'min:' + min + 'ms max:' + max + 'ms avg:' + avg + 'ms';
                    p.style.color = 'red';
                    resultElement.appendChild(p);

                    resolve(deltas);
                }
            }
            window.requestAnimationFrame(step);
        });
    }

    const times = parseInt(document.getElementById('times-input').value, 10);
    const resultsJs = document.getElementById('results-js');
    const resultsWasm = document.getElementById('results-wasm');
    resultsJs.innerHTML = '';
    resultsWasm.innerHTML = '';
    const deltas1 = await execTest(resultsJs, times, getPrimeNumbersCount);
    const deltas2 = await execTest(resultsWasm, times, getPrimeNumbersCountWasm);

    //Draw Boxplot
    document.getElementById('chart').innerHTML = '';
    Plotly.newPlot('chart', [
        {
            y: deltas1,
            type:'box',
            name: 'JavaScript',
            marker: {color: '#e6d022'}
        },
        {
            y: deltas2,
            type:'box',
            name: 'WebAssembly',
            marker: {color: '#5e52dd'}
        }]);
});

const button = document.getElementById('button-start');
button.addEventListener('click', () => {
    button.setAttribute('disabled', 'true');
    test();
    button.removeAttribute('disabled');
});