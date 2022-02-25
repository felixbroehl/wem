function revocable(fun) {
    let revoked = false;
    return {
        invoke: function() {
            if (!revoked) {
                return fun.apply(null, arguments)
            }
            throw new Error('Sorry but this function was revoked');
        },
        revoke: function() {revoked = true;}
    }
}

// Test
temp = revocable(alert);
temp.invoke(7); // führt zu alert(7);
temp.revoke();
temp.invoke(8); // Fehlerabbruch!