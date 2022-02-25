function vector() {
    let array = [];
    return {
        get: function(i) {
            return array[i];
        },
        store: function(i, x) {
            array[i] = x;
        },
        append: function(x) {
            array.push(x);
        }
    }
}

// Test
my_vector = vector();
my_vector.append(7);
my_vector.store(1, 8);
console.log(my_vector.get(0)) // 7
console.log(my_vector.get(1)) // 8