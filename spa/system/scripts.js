spa.Scripts = {};

/**
 * Load JS and CSS files
 * @param {String[]} urls
 * @param {Function} onProgress - function(loads, errors, progress){}
 * @param {Function} onFinish - function(loads, errors, progress){}
 */
spa.Scripts.loadScripts = function(urls, onProgress, onFinish)
{
    let loads = [];
    let errors = [];

    let totalFiles = urls.length;

    let checkProgress = function() {
        let progress = ((loads.length + errors.length + 0.001) / (totalFiles + 0.001)).toFixed(2);
        onProgress && onProgress(loads, errors, progress);

        if (loads.length + errors.length >= totalFiles) {
            onFinish && onFinish(loads, errors, progress);
        }
    }

    let onLoad = function (fileIndex) {
        loads.push(urls[fileIndex]);
        checkProgress();
    }

    let onError = function (fileIndex) {
        errors.push(urls[fileIndex]);
        checkProgress();
    }

    let loadFiles = function() {
        let fragment = document.createDocumentFragment();

        for (let i = 0; i < urls.length; i++) {
            let url = urls[i];

            if (url.indexOf('.js') != -1){
                let script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = url;
                script.async = true;
                script.onload  = onLoad.bind(this, i);
                script.onerror  = onError.bind(this, i);

                fragment.appendChild(script);
            }
            else if (url.indexOf('.css') != -1){
                let link = document.createElement('link');
                link.type = 'text/css';
                link.rel = 'stylesheet';
                link.href = url;
                link.async = true;
                link.onload  = onLoad.bind(this, i);
                link.onerror  = onError.bind(this, i);

                fragment.appendChild(link);
            }
            else{
                errors.push(urls[i]);
            }
        }

        document.head.appendChild(fragment);
    }

    checkProgress();
    loadFiles();
}

/**
 * Load image files
 * @param {String[]} urls
 * @param {Function} onProgress - function(loads, errors, progress){}
 * @param {Function} onFinish - function(loads, errors, progress){}
 */
spa.Scripts.loadImages = function(urls, onProgress, onFinish)
{
    let loads = [];
    let errors = [];

    let totalFiles = urls.length;

    let checkProgress = function() {
        let progress = ((loads.length + errors.length + 0.001) / (totalFiles + 0.001)).toFixed(2);
        onProgress && onProgress(loads, errors, progress);

        if (loads.length + errors.length >= totalFiles) {
            onFinish && onFinish(loads, errors, progress);
        }
    }

    let onLoad = function (fileIndex) {
        loads.push(urls[fileIndex]);
        checkProgress();
    }

    let onError = function (fileIndex) {
        errors.push(urls[fileIndex]);
        checkProgress();
    }

    let loadFiles = function() {
        for (let i = 0; i < urls.length; i++) {
            let url = urls[i];

            let image = new Image();
            image.onload = onLoad.bind(this, i);
            image.onerror  = onError.bind(this, i);
            image.src = url;
        }
    }

    checkProgress();
    loadFiles();
}
