function insertAfter(newElement, referenceElement) {
    referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
}

function initRunButtons() {
    document.querySelectorAll('.run-solution-button').forEach((button) => {
        // Retrieve urls
        const htmlUrl = button.getAttribute('data-run-html');
        const jsUrl = button.getAttribute('data-run-js');
        const cssUrl = button.getAttribute('data-run-css');

        // Add code preview
        const codePreview = document.createElement('div');
        codePreview.classList.add('.code-preview');
        button.parentElement.insertBefore(codePreview, button);
        const addPreviewContent = async (url, cssClass) => {
            const content = url?await (await fetch(url)).text():undefined;
            const pre = document.createElement('pre');
            pre.classList.add(cssClass);
            pre.textContent = content;
            codePreview.appendChild(pre);
        }
        if (htmlUrl) {
            addPreviewContent(htmlUrl, 'html');
        }
        if (jsUrl) {
            addPreviewContent(jsUrl, 'js');
        }
        if (cssUrl) {
            addPreviewContent(cssUrl, 'css');
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
                    style.text = css;
                    iframeHeadElement.appendChild(style);
                }
            });

        })
    })
}

window.addEventListener('load', initRunButtons);