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

    let timers = [];

    function addItem() {
        const timer = createTimer();
        timers.push(timer);
        stopAll();
        timer.start();
    }

    function createTimer() {
        let interval = 0;
        let seconds = 0;
        let running = false;

        let timer = {
            start: null,
            stop: null
        };

        const li = document.createElement('li');
        const span = document.createElement('span');
        span.innerText = nameInput.value;
        span.contentEditable = true; //For editing
        span.addEventListener('blur', () => { // Remove item when left empty
            if (span.innerText === '') {
                deleteItem(timer, li);
            }
        })
        li.appendChild(span);

        const time = document.createElement('span');
        const updateSeconds = () => {
            time.innerText = new Date(seconds * 1000).toISOString().substr(11, 8);
        };
        updateSeconds();
        li.appendChild(time);

        const toggleButton = document.createElement('button');
        toggleButton.innerText = 'Start!';

        timer.start = () => {
            running = true;
            interval = setInterval(() => {
                seconds++;
                updateSeconds();
            }, 1000);
            toggleButton.innerText = 'Stop!';
        }

        timer.stop = () => {
            clearInterval(interval);
            running = false;
            toggleButton.innerText = 'Start!';
        }

        toggleButton.addEventListener('click', () => {
            if (running) {
                timer.stop();
            } else {
                stopAll();
                timer.start();
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => deleteItem(timer, li));

        li.appendChild(toggleButton);
        li.appendChild(deleteButton);
        list.appendChild(li);

        nameInput.value = '';

        return timer;
    }

    function stopAll() {
        for (let timer of timers) {
            timer.stop();
        }
    }

    function deleteItem(timer, li) {
        timer.stop();
        li.remove();
        timers.splice(timers.indexOf(timer), 1);
    }
});