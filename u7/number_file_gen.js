const fs = require('fs');

const args = process.argv.slice(2);
const count = parseInt(args[0]);

if (count !== undefined && !isNaN(count)) {
    let text = '';
    for (let i = 1; i < count+1; i++) {
        text += i + '\n';
    }
    fs.writeFileSync('number_file_gen_result.txt', text.substr(0,text.length-1));
} else {
    console.log('Please provide a number as an argument!')
}