function twice(fun) {
    return function(x) {
        return fun(x, x);
    }
}

// Test setup
function add(x,y){return x+y}
function mul(x,y){return x*y}

// Test
var double = twice(add);
console.log(double(11));
var square = twice(mul);
console.log(square(11));