function applyg(funIn) {
    count = 0;
    let fun = function(y) {
        if (y !== undefined) {
            count=funIn(count, y);
            return fun;
        }
        return count;
    }
    return fun;
}

// Test setup
function add(x,y){return x+y}

// Test
console.log(applyg(add)(3)(4)(5)()) // 12
console.log(applyg(add)(1)(2)(4)(8)()) // 15