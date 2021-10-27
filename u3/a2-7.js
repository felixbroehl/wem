function addm(m1, m2) {
    return m(m1.value+m2.value, "("+m1.source+"+"+m2.source+")");
}

// Test setup
function m(value, source) {return {value: value, source: source?source:""+value}}

// Test
console.log(JSON.stringify(addm(m(3), m(4)))) // {"value": 7, "source": "(3+4)"}