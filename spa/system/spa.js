(function(){

    //spa
    window.spa = {};

    spa.decorate = function(target, source)
    {
        target.div = target.div || source.div;

        for (const key in source) {
            target[key] = target[key] || source[key];
        }

        for (const key in source.constructor) {
            target.constructor[key] = target.constructor[key] || source.constructor[key];
        }

        target.decorators = target.decorators || [];
        target.decorators.push(source);
    }

    spa.inherit = function(newClass, baseClass)
    {
        //clone baseClass.prototype and put it into newClass.prototype
        newClass.prototype = Object.create(baseClass.prototype);

        //save baseClass so we can access to it from newClass
        newClass.baseClass = baseClass.prototype;

        //save new class constructor
        newClass.prototype.constructor = newClass;

        //save baseClass in newClass instance as well
        newClass.prototype.baseClass = baseClass.prototype;
    }

    spa.implement = function(NewClass, BaseClass) {

        //check static functions implementation
        for (let key in BaseClass){
            if (typeof (BaseClass[key]) == "function" && NewClass[key] == undefined){
                throw new Error("missing - " + NewClass.name + "." + key + "()");
            }
        }

        //check prototype functions implementation
        for (let key in BaseClass.prototype) {
            if (typeof (BaseClass.prototype[key]) == "function" && NewClass.prototype[key] == undefined) {
                throw new Error("missing - " + NewClass.name + ".prototype." + key + "()");
            }
        }

        //check prototype functions implementation created inside function constructor
        if (typeof NewClass == "function" && typeof BaseClass == "function") {
            let n = new NewClass();
            let b = new BaseClass();

            for (let key in b) {
                if (typeof (b[key]) == "function" && n[key] == undefined) {
                    throw new Error("missing - " + NewClass.name + ".this." + key + "()");
                }
            }
        }

        //save implements
        NewClass.implements = NewClass.implements || [];
        NewClass.implements.push(BaseClass);
    }

    spa.log = function(text)
    {
        if (spa.consoleDiv == undefined){
            spa.consoleDiv = document.createElement('div');
            spa.consoleDiv.id = 'console';
            Object.assign(spa.consoleDiv.style, {'background-color': '#ffffffaa', 'color': '#ff0000', 'position': 'absolute', 'left': '0px', 'right': '0px', 'top': '0px', 'bottom': '0px', 'pointer-events': 'none', 'overflow': 'scroll', 'z-index': '1000', 'white-space': 'wrap'});
            document.body.appendChild(spa.consoleDiv);
        }
    
        if (spa.consoleCounter == undefined){
            spa.consoleCounter = 0;
        }
    
        let elm = document.createElement('div');
        Object.assign(elm.style, {'display': 'table', 'margin': '3px'});
        elm.innerHTML = '<span style="display: table-cell;">' + (spa.consoleCounter++) + ': </span><span style="display: table-cell; white-space: pre-wrap;">' + text + '</span>';
        spa.consoleDiv.appendChild(elm);
    
        spa.consoleDiv.scrollTop = spa.consoleDiv.scrollHeight;
    }

    /**
     * Load JS and CSS and ttf and image files
     * @param {String[]} urls
     * @param {Function} onProgress - function(loads, errors, progress){}
     * @param {Function} onFinish - function(loads, errors, progress){}
     */
    spa.loadFiles = function(urls, onProgress, onFinish)
    {
        let loads = [];
        let errors = [];

        let totalFiles = urls.length;

        let checkProgress = function(fileName, status, loadTime) {
            let progress = ((loads.length + errors.length + 0.001) / (totalFiles + 0.001)).toFixed(2);
            onProgress && onProgress(loads, errors, progress, fileName, status, loadTime);

            if (loads.length + errors.length >= totalFiles) {
                onFinish && onFinish(loads, errors, progress, fileName, status, loadTime);
            }
        }

        let onLoad = function (fileIndex, startTime) {
            let endTime = (new Date()).getTime();
            let loadTime = endTime - startTime;

            loads.push(urls[fileIndex]);
            checkProgress(urls[fileIndex], 'ok', loadTime);
        }

        let onError = function (fileIndex, startTime) {
            let endTime = (new Date()).getTime();
            let loadTime = endTime - startTime;

            errors.push(urls[fileIndex]);
            checkProgress(urls[fileIndex], 'error', loadTime);
        }

        let loadUrl = function() {
            let fragment = document.createDocumentFragment();

            for (let i = 0; i < urls.length; i++) {
                let url = urls[i];
                let startTime = (new Date()).getTime();

                if (url.indexOf('.js') != -1){
                    let script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.src = url;
                    script.async = true;
                    script.crossorigin = 'anonymous';
                    script.onload  = onLoad.bind(this, i, startTime);
                    script.onerror  = onError.bind(this, i, startTime);

                    fragment.appendChild(script);
                }
                else if (url.indexOf('.css') != -1){
                    let link = document.createElement('link');
                    link.type = 'text/css';
                    link.rel = 'stylesheet';
                    link.href = url;
                    link.async = true;
                    link.crossorigin = 'anonymous';
                    link.onload  = onLoad.bind(this, i, startTime);
                    link.onerror  = onError.bind(this, i, startTime);

                    fragment.appendChild(link);
                }
                else if (url.indexOf('.ttf') != -1){
                    let link = document.createElement('link');
                    link.type = 'font/ttf';
                    link.rel = 'preload';
                    link.href = url;
                    link.async = true;
                    link.crossorigin = 'anonymous';
                    link.as = 'font';
                    link.onload  = onLoad.bind(this, i, startTime);
                    link.onerror  = onError.bind(this, i, startTime);

                    fragment.appendChild(link);
                }
                else if (url.indexOf('.png') != -1 || url.indexOf('.jpeg') != -1 || url.indexOf('.webp') != -1 || url.indexOf('.jpg') != -1){
                    let image = new Image();
                    image.onload = onLoad.bind(this, i, startTime);
                    image.onerror  = onError.bind(this, i, startTime);
                    image.src = url;
                }
                else{
                    errors.push(urls[i]);
                }
            }

            document.head.appendChild(fragment);
        }

        loadUrl();
    }

    spa.promiseLoadFiles = function(scripts, onProgress)
    {
        return new Promise((resolve, reject) => {
            spa.loadFiles(scripts, onProgress, (loads, errors, progress) => {
                if (errors.length > 0){
                    reject(errors);
                }
                else{
                    resolve(loads);
                }
            });
        });
    }

    let waitForPageToLoad = function() {
        return new Promise(function (resolve, reject) {
            if (document.readyState != 'loading') {
                resolve(0);
            }
            else {
                document.addEventListener('DOMContentLoaded', function (e) { resolve(1); });
            }
        });
    }

    let initSettings = function () {
        //prevent iOS double click zooming
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function (e) {let now = (new Date()).getTime(); if (now - lastTouchEnd <= 300) { e.preventDefault(); } lastTouchEnd = now;}, false);

        //prevent iOS native behavior
        // document.addEventListener('touchmove', function(e){ e.preventDefault(); }, {capture: false, passive: false});

        //prevent right click button for desktop browsers
        document.addEventListener('mousedown', function(e){ if(e.which > 1) { e.stopPropagation(); }}, true);

        //prevent context menu in desktop only
        let deviceType = ((typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('Mobile') !== -1)) ? 'Mobile' : 'Desktop';

        if (deviceType == 'Desktop') {
            document.body.onselectstart = function () { return false };
            document.body.oncontextmenu = function () { return false };
        }
    }

    let runAppMain = function () {
        //create and run app.Main()
        spa.main = new spa.Main();
    }


    //we must implement new app.Main() and save instance to spa.main
    spa.main = null;

    spa.Main = function () {
        throw new Error('spa.Main() not implemented');
    }

    //start spa
    let start = function() {
        Promise.resolve()
        .then(function () {
            return waitForPageToLoad();
        })
        .then(function () {
            return initSettings();
        })
        .then(function () {
            return runAppMain();
        })
        ;
    }

    start();

})();
