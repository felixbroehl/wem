function fibonaccif(start, step) {
    let i = start<0?0:start;
    return function() {
        let re;
        if (i == 0) {
            re = 0;
        } else if (i == 1 || i == 2) {
            re = 1;
        } else {
            let f1 = fibonaccif(i - 1, 1);
            let f2 = fibonaccif(i - 2, 1);
            re = f1() + f2();
        }
        i+=step;
        return re;
    }
}

// Test
var fib = fibonaccif(0, 1);
console.log(fib()) // 0
console.log(fib()) // 1
console.log(fib()) // 1
console.log(fib()) // 2
console.log(fib()) // 3
console.log(fib()) // 5