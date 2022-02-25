function curry(fun, x) {
    return function(y) {
        return fun(x, y);
    }
}

// Test setup
function add(x,y){return x+y}
function mul(x,y){return x*y}

// Test
add3 = curry(add, 3);
console.log(add3(4));
console.log(curry(mul, 5)(6));