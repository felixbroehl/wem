document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
        const burgerButton = document.querySelector('#burger-button > div');
        const nav = document.querySelector('nav');
        burgerButton.addEventListener('click', () => {
            nav.classList.toggle('active');
        })
    }
})