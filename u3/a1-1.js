function identity_function(arg1) {
    return function() {
        return arg1;
    };
}

// Test
console.log(identity_function(1)());