function binaryc(fun) {
    return function(x, y, store) {
        store(fun(x, y));
    }
}

// Test setup
var variable;
function store(x) {variable = x;}
function add(x,y){return x+y}
function mul(x,y){return x*y}

// Test
addc = binaryc(add);
addc(4, 5, store);
console.log(variable) // variable === 9
mulc = binaryc(mul);
mulc(2, 3, store);
console.log(variable) // variable === 6