async function getFile(path) {
    return (await (await fetch(path)).text()).split('\n');
}

document.addEventListener('readystatechange', async () => {
    const content = document.querySelector('#content');
    const fileContents = [
        await getFile('assets/a.txt'),
        await getFile('assets/b.txt')
    ];
    const maxLines = Math.max(fileContents[0].length, fileContents[1].length);
    for (let i = 0; i < maxLines; i++) {
        const getContents = (j) => fileContents[j][i]?fileContents[j][i]:'';
        const line = getContents(0) + getContents(1);
        const p = document.createElement('p');
        p.innerText = line;
        content.append(p);
    }
});