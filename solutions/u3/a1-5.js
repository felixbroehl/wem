// Setup
function add(x,y){return x+y}
function applyf(fun) {return function(x) {return function(y) {return fun(x, y);}}}
function addf(x) {return function(y) {return x + y;}}
function curry(fun, x) {return function(y) {return fun(x, y);}}

// Variante 1
inc = curry(add, 1);
console.log(inc(5));

// Variante 2
inc = applyf(add)(1);
console.log(inc(5));

// Variante 3
inc = addf(1);
console.log(inc(5));