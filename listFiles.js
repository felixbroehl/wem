const path = require('path');
const fs = require('fs');

const basePath = __dirname;

let files = recursiveFiles(basePath);
fs.writeFileSync('files.json', JSON.stringify(files, null, 2), {encoding: "utf8"});

function recursiveFiles(start) {
    let files = fs.readdirSync(start);
    files.forEach((file) => {
        let filePath = path.join(start, file);
        if (file.indexOf('.') !== 0 && file !== 'node_modules' && fs.lstatSync(filePath).isDirectory()) {
            let subFiles = recursiveFiles(filePath);
            subFiles.forEach((file2) => {
                files.push(path.join(file, file2));
            });
        }
    });
    return files.filter(file => fs.lstatSync(path.join(start, file)).isFile());
}