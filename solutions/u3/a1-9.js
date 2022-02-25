function composeu(fun1, fun2) {
    return function(x) {
        return fun2(fun1(x));
    }
}

// Test setup
function add(x,y){return x+y}
function mul(x,y){return x*y}
function twice(fun) {return function(x) {return fun(x, x);}}
const double = twice(add);
const square = twice(mul);

// Test
console.log(composeu(double, square)(3) );