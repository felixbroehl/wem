const fs = require('fs');

const args = process.argv.slice(2);
const count = parseInt(args[0]);

function numberToLetters(number) {
    let re = '';
    while (number >= 0) {
        re = String.fromCharCode(number % 26 + 65) + re;
        number = Math.floor(number / 26) - 1;
    }
    return re;
}

if (count !== undefined && !isNaN(count)) {
    let text = '';
    for (let i = 0; i < count; i++) {
        text += numberToLetters(i) + '.\n';
    }
    fs.writeFileSync('alpha_file_gen_result.txt', text.substr(0,text.length-1));
} else {
    console.log('Please provide a number as an argument!')
}