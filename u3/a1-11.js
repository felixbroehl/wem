function once(fun) {
    let called = false;
    return function() {
        if (!called) {
            called = true;
            return fun.apply(this, arguments);
        }
        throw new Error('Could only be called once!!!');
    }
}

// Test setup
function add(x,y){return x+y}

// Test
add_once = once(add);
console.log(add_once(3, 4));
console.log(add_once(3, 4));