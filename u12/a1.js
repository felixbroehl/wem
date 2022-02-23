function arrayWrapper() {
    const array = [...arguments];
    return {
        get: function(pos) {
            if (isNaN(pos)) {
                throw new Error('Position must be of type number');
            }
            return array[pos];
        },
        set: function(pos, value) {
            if (isNaN(pos)) {
                throw new Error('Position must be of type number');
            }
            array[pos] = value;
        },
        append: function(value) {
            array.push(value);
        }
    }
}

const wrappedArray = arrayWrapper("a", "b", "c");
wrappedArray.set(1, "B");
console.assert(wrappedArray.get(1)==="B");
wrappedArray.append("D");
console.assert(wrappedArray.get(3)==="D");

//Exploit
function exploit(vector) {
    let data;
    // 1. override `push` method and extract `this`
    vector.set('push', function() {
        data = this;
    });
    // 2. call `append` so `push` gets called and we get the data
    vector.append();
    // 3. return the hidden array from wrapped array
    return data;
}
console.log('Testing exploid. If an error is thrown the solution is correct.');
console.log(exploit(wrappedArray)); // correct if an error is thrown