function unarymf(fun, str) {
    return function (m1) {
        return m(fun(!isNaN(m1)?m1:m1.value, !isNaN(m1)?m1:m1.value), "("+str+" "+(!isNaN(m1)?m1:m1.source)+")");
    }
}

// Test setup
function mul(x,y){return x*y}
function twice(fun) {return function(x) {return fun(x, x);}}
const square = twice(mul);
function m(value, source) {return {value: value, source: source?source:""+value}}

// Test
squarem = unarymf(square, "square");
console.log(JSON.stringify(squarem(4))) // {"value": 16, "source": "(square 4)"}