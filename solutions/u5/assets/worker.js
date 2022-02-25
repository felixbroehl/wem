// function from https://stackoverflow.com/a/40200710
const isPrime = num => {
    for(let i = 2n; i < num; i++)
        if(num % i === 0n) return false;
    return num > 1n;
}

self.onmessage = function handleMessageFromMain(msg) {
    if (msg.data === 'start') {
        let value = 0n;
        while (true) {
            if (isPrime(value)) {
                self.postMessage(value + "");
            }
            value++;
        }
    }
};