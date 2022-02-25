function binarymf(fun, str) {
    return function (m1, m2) {
        return m(fun(!isNaN(m1)?m1:m1.value, !isNaN(m2)?m2:m2.value), "("+(!isNaN(m1)?m1:m1.source)+str+(!isNaN(m2)?m2:m2.source)+")");
    }
}

// Test setup
function add(x,y){return x+y}
function m(value, source) {return {value: value, source: source?source:""+value}}

// Test
addm = binarymf(add, "+");
console.log(JSON.stringify(addm(3, 4))) // {"value": 7, "source": "(3+4)"}