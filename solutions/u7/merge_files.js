const fs = require('fs');

const args = process.argv.slice(2);
const fileName1 = args[0];
const fileName2 = args[1];

if (fileName1 !== undefined && fileName2 !== undefined && fs.existsSync(fileName1) && fs.existsSync(fileName2)) {
    const begin = new Date();
    fs.readFile(fileName1, 'utf8', (err, data1) => {
        fs.readFile(fileName2, 'utf8', (err, data2) => {
            const data1Split = data1.split('\n');
            const data2Split = data2.split('\n');
            let text = '';
            for (let i = 0; i < Math.max(data1Split.length, data2Split.length); i++) {
                text += (data1Split[i]?data1Split[i]:'') + (data2Split[i]?data2Split[i]:'') + '\n';
            }
            fs.writeFileSync('merge_files_result.txt', text);
            const end = new Date();
            const delta = end.getMilliseconds() - begin.getMilliseconds();
            console.log('Took ' + delta + 'ms');
        })
    })
} else {
    console.log('Please provide two existing files as arguments!')
}