function unaryc(fun) {
    return function(x, store) {
        store(fun(x));
    }
}

// Test setup
var variable;
function store(x) {variable = x;}

// Test
sqrtc = unaryc(Math.sqrt);
sqrtc(81, store);
console.log(variable) // variable === 9