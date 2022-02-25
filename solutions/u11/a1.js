fetch('/wem/solutions/u11/a1/main.wasm').then(response =>
    response.arrayBuffer()
).then(bytes => WebAssembly.instantiate(bytes)).then(results => {
    instance = results.instance;
    for (let a = 1; a <= 100; a++) {
        for (let b = 1; b <= 100; b++) {
            console.log('ggT for ' + a + ' and ' + b + ': ' + instance.exports.ggT(12,8));
        }
    }
}).catch(console.error);

