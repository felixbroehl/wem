(async () => {
    const contents = await (await fetch('assets/a4_contents.json')).json();

    const nav = document.querySelector('nav');
    const sideNavLeft = document.querySelector('#left');
    const sideNavRight = document.querySelector('#right');
    const content = document.querySelector('#content');
    const setActive = (a) => {
        a.parentElement.querySelectorAll('a').forEach((item) => item.classList.remove('active'));
        a.classList.add('active');
    }
    const createLeftNav = (outerKey) => {
        sideNavLeft.innerHTML = '';
        let i = 0;
        for (let key in contents[outerKey]) {
            const a = document.createElement('a');
            a.href = '#';
            a.innerText = key;
            a.addEventListener('click', (event) => {
                event.preventDefault();
                setContent(outerKey, key);
                setActive(a);
                history.pushState({
                    outerKey: outerKey,
                    innerKey: key,
                }, key, "#");
            });
            sideNavLeft.appendChild(a);
            if (i++ === 0) {
                setContent(outerKey, key);
                setActive(a);
            }
        }
    }
    const createRightNav = (outerKey, innerKey) => {
        sideNavRight.innerHTML = '<h3>References</h3>';
        for (let link of contents[outerKey][innerKey].references) {
            const a = document.createElement('a');
            a.innerText = link;
            a.href = link;
            sideNavRight.appendChild(a);
        }
    }
    const setContent = (outerKey, innerKey) => {
        console.log(outerKey, innerKey);
        content.innerText = contents[outerKey][innerKey].content;
        createRightNav(outerKey, innerKey);
    }
    let i = 0;
    for (let key in contents) {
        const a = document.createElement('a');
        a.href = '#';
        a.innerText = key;
        a.addEventListener('click', (event) => {
            event.preventDefault()
            createLeftNav(key);
            setActive(a);
            const firstKey = Object.keys(contents[key])[0];
            history.pushState({
                outerKey: key,
                innerKey: firstKey,
            }, firstKey, "#");
        });
        nav.appendChild(a);
        if (i++ === 0) {
            createLeftNav(key);
            setActive(a);
        }
    }
    window.addEventListener('popstate', (event) => {
        let outerKey = Object.keys(contents)[0];
        let innerKey = Object.keys(contents[outerKey])[0];
        if (event.state) {
            outerKey = event.state.outerKey;
            innerKey = event.state.innerKey;
        }
        createLeftNav(outerKey);
        setContent(outerKey, innerKey);
        setActive(nav.children[Object.keys(contents).indexOf(outerKey)]);
        setActive(sideNavLeft.children[Object.keys(contents[outerKey]).indexOf(innerKey)]);
    });
})();