function exp(arr) {
    let args = [];
    for (let i = 1; i <= arr.length; i++) {
        if (Array.isArray(arr[i])) {
            args.push(exp(arr[i]));
        } else {
            args.push(arr[i]);
        }
    }
    return arr[0].apply(null, args);
}

// Test setup
function add(x,y){return x+y}
function mul(x,y){return x*y}

// Test
hypa = [ Math.sqrt, [ add, [mul, 3, 3], [mul, 4, 4] ] ];
console.log(exp(hypa)) // 5