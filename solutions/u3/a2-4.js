function addg(x) {
    count = x;
    let fun = function(y) {
        if (y !== undefined) {
            count+=y;
            return fun;
        }
        return count;
    }
    return fun;
}

// Test
console.log(addg(3)(4)(5)()) // 12
console.log(addg(1)(2)(4)(8)()) // 15