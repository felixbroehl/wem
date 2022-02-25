function quatre(fun, op1, op2, store) {
    store(fun(op1, op2));
}

// Test setup
var variable;
function store(x) {variable = x;}
function add(x,y){return x+y}
function identityf(x){return x}

// Test
quatre( add, identityf(3), identityf(4), store );
console.log(variable) // variable === 7