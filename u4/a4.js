const colorPalette = ['000000', 'FF9966', '6699FF', '99FF66', 'CC0000', '00CC00', '0000CC', '333333', '0066FF', 'FFFFFF'];

const forePalette = document.querySelector('.fore-palette');

for (let i = 0; i < colorPalette.length; i++) {
    const color = '#' + colorPalette[i];
    forePalette.innerHTML += '<a href="#" data-command="foreColor" data-value="' + color + '" style="background-color:' + color + ';" class="palette-item"></a>';
}

document.querySelectorAll('.toolbar a').forEach((a) => a.addEventListener('click', function(e) {
    const command = a.getAttribute('data-command');

    if (command === 'h1' || command === 'h2' || command === 'p') {
        document.execCommand('formatBlock', false, command);
    }
    if (command === 'foreColor' || command === 'formatBlock') {
        document.execCommand(a.getAttribute('data-command'), false, a.getAttribute('data-value'));
    }
    if (command === 'createLink' || command === 'insertImage') {
        const url = prompt('Enter the link here: ','http:\/\/');
        document.execCommand(a.getAttribute('data-command'), false, url);
    } else {
        document.execCommand(a.getAttribute('data-command'), false, null);
    }
}));