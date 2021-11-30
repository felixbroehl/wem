function insertAfter(newElement, referenceElement) {
    referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
}

async function getPreviewBox(url, cssClass) {
    const content = url?await (await fetch(url)).text():undefined;
    const pre = document.createElement('pre');
    pre.classList.add(cssClass);
    pre.textContent = content;
    return pre;
}

function initRunButtons() {
    document.querySelectorAll('.run-solution-button').forEach(async (button) => {
        // Retrieve urls
        const htmlUrl = button.getAttribute('data-run-html');
        const jsUrl = button.getAttribute('data-run-js');
        const cssUrl = button.getAttribute('data-run-css');

        const size = button.getAttribute('data-run-size');

        // Add code preview
        const codePreview = document.createElement('div');
        codePreview.classList.add('code-preview');
        button.parentElement.insertBefore(codePreview, button);
        const addPreviewContent = async (url, cssClass) => {
            codePreview.appendChild(await getPreviewBox(url, cssClass));
        }

        if (htmlUrl) {
            await addPreviewContent(htmlUrl, 'html');
        }
        if (cssUrl) {
            await addPreviewContent(cssUrl, 'css');
        }
        if (jsUrl) {
            await addPreviewContent(jsUrl, 'js');
        }

        // Add click event
        button.addEventListener('click', async (event) => {
            event.preventDefault();

            // Remove old iframe
            if (button.nextElementSibling && button.nextElementSibling.classList.contains('run-iframe')) {
                button.nextElementSibling.remove();
            }

            // fetch js and css
            const js = jsUrl?await (await fetch(jsUrl)).text():undefined;
            const css = cssUrl?await (await fetch(cssUrl)).text():undefined;

            // Create run iframe
            const iframe = document.createElement('iframe');
            iframe.classList.add('run-iframe');
            iframe.src = htmlUrl?htmlUrl:'../assets/console.html';
            if (size === 'middle') {
                iframe.classList.add('size-middle');
            } else if (size === 'large') {
                iframe.classList.add('size-large');
            }

            insertAfter(iframe, button);

            iframe.contentWindow.addEventListener('DOMContentLoaded', () => {
                const iframeDocument = iframe.contentWindow.document;
                const iframeHeadElement = iframeDocument.head;

                if (js) {
                    const script = document.createElement('script');
                    script.type = "text/javascript";
                    script.text = js;
                    iframeHeadElement.appendChild(script);
                }
                if (css) {
                    const style = document.createElement('style');
                    style.innerText = css;
                    iframeHeadElement.appendChild(style);
                }
            });

        })
    })
}

window.addEventListener('load', initRunButtons);

function initCodePreviews() {
    document.querySelectorAll('.code-preview-box').forEach(async (div) => {
        // Retrieve url
        const url = div.getAttribute('data-url');
        const urlSplit = url.split('.');
        const extension = urlSplit[urlSplit.length-1].toLowerCase();

        // Add code preview
        const codePreview = document.createElement('div');
        codePreview.classList.add('code-preview');
        codePreview.appendChild(await getPreviewBox(url, extension));

        insertAfter(codePreview, div);
    })
}

window.addEventListener('load', initCodePreviews);