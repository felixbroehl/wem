function m(value, source) {
    return {value: value, source: source?source:""+value}
}

// Test
console.log(JSON.stringify(m(1))) // {"value": 1, "source": "1"}
console.log(JSON.stringify(m(Math.PI, "pi"))) // {"value": 3.14159..., "source": "pi"}