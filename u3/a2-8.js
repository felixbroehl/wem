function binarymf(fun, str) {
    return function (m1, m2) {
        return m(fun(m1.value, m2.value), "("+m1.source+str+m2.source+")");
    }
}

// Test setup
function add(x,y){return x+y}
function m(value, source) {return {value: value, source: source?source:""+value}}

// Test
addm = binarymf(add, "+");
console.log(JSON.stringify(addm(m(3), m(4)))) // {"value": 7, "source": "(3+4)"}