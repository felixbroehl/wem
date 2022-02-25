function gensymf(prefix) {
    let counter = 0;
    return function() {
        return prefix + counter++;
    }
}

// Test
gensym = gensymf('G');
console.log(gensym()) // 'G0'
console.log(gensym()) // 'G1'
console.log(gensym()) // 'G2'
console.log(gensym()) // 'G3'