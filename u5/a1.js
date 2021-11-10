function getFile(path) {
    return new Promise((resolve, reject) => {
        fetch(path).then((response) => {
            response.text().then((text) => {
                resolve(text.split('\n'));
            }).catch(() => {
                reject();
            });
        }).catch(() => {
            reject();
        });
    });
}

document.addEventListener('readystatechange', () => {
    const content = document.querySelector('#content');
    const fileContents = [];
    Promise.all([
        getFile('assets/a.txt').then((split) => {fileContents[0] = split}),
        getFile('assets/b.txt').then((split) => {fileContents[1] = split})
    ]).then(() => {
        const maxLines = Math.max(fileContents[0].length, fileContents[1].length);
        for (let i = 0; i < maxLines; i++) {
            const getContents = (j) => fileContents[j][i]?fileContents[j][i]:'';
            const line = getContents(0) + getContents(1);
            const p = document.createElement('p');
            p.innerText = line;
            content.append(p);
        }
    })
});