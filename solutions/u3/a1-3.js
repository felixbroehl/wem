function applyf(fun) {
    return function(x) {
        return function(y) {
            return fun(x, y);
        }
    }
}

// Test
function mul(x,y){return x*y}
console.log(applyf(mul)(5)(6));

