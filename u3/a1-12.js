function counterf(count) {
    return {
        inc: function() {return ++count;},
        dec: function() {return --count;},
        get: function() {return count;}
    }
}

// Test
counter = counterf(10);
console.log(counter.inc());
console.log(counter.dec());
console.log(counter.get());