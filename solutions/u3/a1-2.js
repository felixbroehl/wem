function addf(x) {
    return function(y) {
        return x + y;
    }
}

// Test
console.log(addf(2)(3));