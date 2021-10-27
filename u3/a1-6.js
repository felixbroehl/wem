function methodize(fun) {
    return function(x) {
        return fun(this, x);
    }
}

// Test setup
function add(x,y){return x+y}

// Test
Number.prototype.add = methodize(add);
console.log((3).add(4));