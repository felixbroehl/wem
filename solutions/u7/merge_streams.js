const fs = require('fs');
const { pipeline } = require('stream');

const args = process.argv.slice(2);
const fileName1 = args[0];
const fileName2 = args[1];

if (fileName1 !== undefined && fileName2 !== undefined && fs.existsSync(fileName1) && fs.existsSync(fileName2)) {
    const begin = new Date();
    let writerStream = fs.createWriteStream('merge_streams_result.txt');
    let finished = 0;
    const finishedCallback = () => {
        if (finished++ === 1) {
            const end = new Date();
            const delta = end.getMilliseconds() - begin.getMilliseconds();
            console.log('Took ' + delta + 'ms');
        }
    }
    pipeline(fs.createReadStream(fileName1), writerStream, finishedCallback);
    pipeline(fs.createReadStream(fileName2), writerStream, finishedCallback);
} else {
    console.log('Please provide two existing files as arguments!')
}