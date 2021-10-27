function composeb(fun1, fun2) {
    return function(x, y, z) {
        return fun2(fun1(x, y), z);
    }
}

// Test setup
function add(x,y){return x+y}
function mul(x,y){return x*y}

// Test
console.log(composeb(add, mul)(2, 3, 5));