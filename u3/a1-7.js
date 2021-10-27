function demethodize(fun) {
    return function () {
        const args = Array.from(arguments);
        return fun.apply(args[0], args.slice(1));
    }
}

// Test setup
function add(x,y){return x+y}
function methodize(fun) {return function(x) {return fun(this, x);}}
Number.prototype.add = methodize(add);

// Test
console.log(demethodize(Number.prototype.add)(5, 6));