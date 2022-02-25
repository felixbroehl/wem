function pubsub() {
    let callbacks = [];
    return {
        subscribe: function(fun) {
            callbacks.push(fun);
        },
        publish: function() {
            for (let fun of callbacks) {
                fun.apply(null, arguments);
            }
        }
    }
}

// Test
my_pubsub = pubsub();
my_pubsub.subscribe(alert);
my_pubsub.publish("It works!"); // alert("It works!")