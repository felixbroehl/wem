window.addEventListener('load', () => {
    const button = document.querySelector('#item-add-button');
    const list = document.querySelector('#item-list');
    const nameInput = document.querySelector('#item-name-input');
    nameInput.addEventListener('keyup', (e) => {
        if(e.code === 'Enter'){
            addItem();
        }
    });
    button.addEventListener('click', () => addItem());

    function addItem() {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.innerText = nameInput.value;
        span.contentEditable = true; //For editing
        span.addEventListener('blur', () => { // Remove item when left empty
            if (span.innerText === '') {
                deleteItem(li);
            }
        })
        li.appendChild(span);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => deleteItem(li));

        li.appendChild(deleteButton);
        list.appendChild(li);

        nameInput.value = '';
    }

    function deleteItem(li) {
        li.remove();
    }
});