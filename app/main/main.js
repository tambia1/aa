spa.Main = function ()
{
    spa.Main.instance = this;

	window.app = {};

	let apps = [
		[
			'app',
		],

		[
			'appDesktop',
			'appSettings',
			'appCalculator',
			'appMessenger',
			'appNinja',
			'appClashRoyale',
			'appCalendar',
			'appSpeed',
		],
	];

	Promise.resolve()
	.then(() => {
		this.initVars();
	})
	.then(() => {
		this.startSplashTime();
	})
	.then(() => {
		this.prepareViewSplash();
	})
	.then(() => {
		this.showSplash();
	})
	.then(() => {
		return this.promiseWait(300);
	})
	.then(() => {
		return this.promiseDownloadAppsFiles(apps);
	})
	.then(() => {
		return this.promiseDownloadAppsAllFiles(apps);
	})
	.then(() => {
		return this.promiseWait(300);
	})
	.then(() => {
		this.checkStrings();
	})
	.then(() => {
		this.endSplashTime();
	})
	.then(() => {
		let delay = Math.max(this.splashMinTime - (this.splashEndTime - this.splashStartTime), 0);

		return this.promiseWait(delay);
	})
	.then(() => {
		this.initLanguage();
	})
	.then(() => {
		this.goToViewDesktop();
	})
	.then(() => {
		this.hideSplash();
	})
	.catch((err) => {
		console.log('Error: ', err);
	})
}

spa.Main.instance = null;

spa.Main.prototype.initVars = function()
{
	this.splashStartTime = null;
	this.splashEndTime = null;
	this.splashMinTime = 1000;
}

spa.Main.prototype.startSplashTime = function()
{
	this.splashStartTime = performance.now();
}

spa.Main.prototype.endSplashTime = function()
{
	this.splashEndTime = performance.now();
}

spa.Main.prototype.prepareViewSplash = function()
{
	let appVersion = '1.0.0';

	let html = ''+
	'<div class="view_splash">'+
		'<div class="view_splash_text">'+
			'Apps Area'+
		'</div>'+

		'<div class="view_splash_progressbar">' +
			'<div class="view_splash_progressbar_value"></div>' +
		'</div>' +

		'<div class="view_splash_version">'+
			appVersion + 
		'</div>'+

	'</div>'+
	'';


	let elm = document.createElement('div');
	elm.innerHTML = html;
	elm = elm.firstChild;
	
	document.body.appendChild(elm);

	this.divSplash = elm;

	this.divSplashText = elm.querySelector('.view_splash_text');
	this.divSplashProgressBar = elm.querySelector('.view_splash_progressbar');
	this.divSplashProgressBarValue = elm.querySelector('.view_splash_progressbar_value');
	this.divSplashVersion = elm.querySelector('.view_splash_version');

	this.divSplashText.setAttribute('state', 'hideWithoutAnimation');
	this.divSplashProgressBar.setAttribute('state', 'hideWithoutAnimation');
	this.divSplashVersion.setAttribute('state', 'hideWithoutAnimation');

	let themeBgImage = window.localStorage.getItem('themeBgImage');

	if (themeBgImage != undefined){
		this.divSplash.style['background-image'] = 'url("' + themeBgImage + '")';		
	}
}

spa.Main.prototype.showSplash = function()
{
	setTimeout(() => {
		this.divSplashText.setAttribute('state', 'showWithAnimation');
		this.divSplashProgressBar.setAttribute('state', 'showWithAnimation');
		this.divSplashVersion.setAttribute('state', 'showWithAnimation');
	}, 300);
}

spa.Main.prototype.hideSplash = function()
{
	this.divSplashProgressBar.setAttribute('state', 'hideWithAnimation');
	this.divSplashVersion.setAttribute('state', 'hideWithAnimation');

	setTimeout(() => {
		this.divSplash.setAttribute('state', 'hideWithAnimation');

		setTimeout(() => {
			document.body.removeChild(this.divSplash);
		}, 300);
	}, 300);
}

spa.Main.prototype.setProgressbarValue = function(value, minValue, maxValue, isAnimated)
{
	//take percentage
	var percent = (value / (maxValue - minValue)) * 100;

	//keep value between 0 - 100
	percent = Math.min(percent, 100);
	percent = Math.max(percent, 0);

	//set value
	this.divSplashProgressBarValue.setAttribute('isAnimated', isAnimated);
	this.divSplashProgressBarValue.style.width = percent + '%';
}

spa.Main.prototype.promiseDownloadAppsFiles = function(apps)
{
	let files = [];

	for (let i = 0; i < apps.length; i++) {
		for (let j = 0; j < apps[i].length; j++) {
			window.app[apps[i][j]] = {};
			files.push(apps[i][j] + '/data/files.js');
		}
	}

	return spa.promiseLoadFiles(files, (loads, errors, progress, fileName, status, loadTime) => {
		// console.log(progress + ' ' + fileName + ' ' + loadTime + ' ' + status);
	});
}

spa.Main.prototype.promiseDownloadAppsAllFiles = function(apps)
{
	let files = [];

	for (let i = 0; i < apps.length; i++) {
		files[i] = [];

		for (let j = 0; j < apps[i].length; j++) {
			files[i].push(window.app[apps[i][j]].files);
		}
	}


	let groups = [];
	let totalFiles = 0;
	let loadedFiles = 0;

	for (let i = 0; i < files.length; i++) {
		for (let j = 0; j < files[i].length; j++) {
			totalFiles += files[i][j].length;
		}
	}

	for (let i = 0; i < files.length; i++) {
		let scripts = Object.keys(files[i]).map((v) => {
			return spa.promiseLoadFiles(files[i][v], (loads, errors, progress, fileName, status, loadTime) => {
				loadedFiles++;
				this.setProgressbarValue(loadedFiles/totalFiles, 0, 1, true);
			});
		});

		groups.push(Promise.all(scripts));
	}

	return Promise.all(groups);
}

spa.Main.prototype.checkStrings = function()
{
	for (const k in window.app) {
		if (window.app[k].Strings != undefined){
			spa.Strings.checkStrings(k);
		}
	}
}

spa.Main.prototype.promiseWait = function(delay)
{
	return new Promise((resolve, reject) => {
		setTimeout(() => { 
			resolve(); 
		}, delay);
	});
}

spa.Main.prototype.goToViewDesktop = function()
{
	this.viewMain = new app.appDesktop.ViewDesktop();
	document.body.appendChild(this.viewMain.div);
}

spa.Main.prototype.initLanguage = function ()
{
	this.pubSubChangeLanguage = new spa.PubSub();

	this.setLanguage('en');
}

spa.Main.prototype.setLanguage = function (language)
{
    window.localStorage.setItem('language', language);

    document.documentElement.lang = language;
    document.documentElement.dir = 'ltr';

    switch(document.documentElement.lang){
        case 'he':
        case 'ar':
            document.documentElement.dir = 'rtl';
            break;
    }

    spa.Strings.clear();

	'appDesktop',
	'appSettings',
	'appCalculator',
	'appMessenger',
	'appNinja',
	'appClashRoyale',
	'appCalendar',
	'appSpeed',


    spa.Strings.add('StrDesktop', app.appDesktop.Strings.all);
    spa.Strings.add('StrDesktop', app.appDesktop.Strings.langs[language]);

    spa.Strings.add('StrSettings', app.appSettings.Strings.all);
    spa.Strings.add('StrSettings', app.appSettings.Strings.langs[language]);

    spa.Strings.add('StrNinja', app.appNinja.Strings.all);
    spa.Strings.add('StrNinja', app.appNinja.Strings.langs[language]);

    spa.Strings.add('StrCalculator', app.appCalculator.Strings.all);
    spa.Strings.add('StrCalculator', app.appCalculator.Strings.langs[language]);

    spa.Strings.add('StrClashRoyale', app.appClashRoyale.Strings.all);
    spa.Strings.add('StrClashRoyale', app.appClashRoyale.Strings.langs[language]);

    spa.Strings.add('StrMessenger', app.appMessenger.Strings.all);
    spa.Strings.add('StrMessenger', app.appMessenger.Strings.langs[language]);

    spa.Strings.add('StrCalendar', app.appCalendar.Strings.all);
    spa.Strings.add('StrCalendar', app.appCalendar.Strings.langs[language]);

    spa.Strings.add('StrSpeed', app.appSpeed.Strings.all);
    spa.Strings.add('StrSpeed', app.appSpeed.Strings.langs[language]);

    spa.Strings.refresh();

    this.pubSubChangeLanguage.publish(language);
}

