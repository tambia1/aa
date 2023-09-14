app.appDesktop.ViewDesktop = function () {
	let html = '<div id="view_desktop"></div>';

	spa.decorate(this, new spa.UiElement(html));

	app.appDesktop.ViewDesktop.instance = this;

	this.initSession();
	this.initLanguage();
	this.initTheme();
	this.initViews();
};

app.appDesktop.ViewDesktop.instance = null;

app.appDesktop.ViewDesktop.prototype.initSession = function () {
	let currentTime = new Date().getTime();
	let session = window.localStorage.getItem("session") || currentTime;

	let session1 = session;
	let session0 = currentTime;

	window.localStorage.setItem("session", session);
};

app.appDesktop.ViewDesktop.prototype.initLanguage = function () {
	let lang = window.localStorage.getItem("language");

	if (app.appDesktop.Strings.langs[lang] == undefined) {
		lang = window.navigator.language.substr(0, 2);

		if (app.appDesktop.Strings.langs[lang] == undefined) {
			lang = "en";
		}
	}

	spa.Main.instance.setLanguage(lang);
};

app.appDesktop.ViewDesktop.prototype.initTheme = function () {
	let theme = window.localStorage.getItem("theme") || "theme1";

	this.changeTheme(theme);
};

app.appDesktop.ViewDesktop.prototype.changeTheme = function (theme) {
	window.localStorage.setItem("theme", theme);

	document.documentElement.setAttribute("theme", theme);
};

app.appDesktop.ViewDesktop.prototype.openApp = function (view, title, button) {
	let viewApp = new app.appDesktop.ViewApp(view, title, button);
	this.addItem(viewApp);

	app.appDesktop.ViewDesktop.viewAppInstance = viewApp;
};

app.appDesktop.ViewDesktop.prototype.initViews = function () {
	let pages = [
		[
			{
				appView: app.appSettings.ViewSettings,
				appName: spa.StrDesktop.appSettings,
				appIcon: "image__settings",
				apppButton: null,
			},
			{
				appView: app.appCalendar.ViewCalendar,
				appName: spa.StrDesktop.appCalendar,
				appIcon: "image__calendar",
				apppButton: null,
			},
			{
				appView: app.appCalculator.ViewCalculator,
				appName: spa.StrDesktop.appCalculators,
				appIcon: "image__calculator",
				apppButton: null,
			},
			{
				appView: null,
				appName: spa.StrDesktop.appCamera,
				appIcon: "image__camera",
				apppButton: null,
			},
			{
				appView: app.appMessenger.ViewMessengerMain,
				appName: spa.StrDesktop.appMessenger,
				appIcon: "image__messenger",
				apppButton: null,
			},
			{
				appView: null,
				appName: spa.StrDesktop.appContacts,
				appIcon: "image__contacts",
				apppButton: null,
			},
			{
				appView: app.appNinja.ViewNinja,
				appName: spa.StrDesktop.appNinja,
				appIcon: "image__ninja",
				apppButton: null,
			},
			{
				appView: app.appClashRoyale.ViewClashRoyale,
				appName: spa.StrDesktop.appClashRoyale,
				appIcon: "image__clash_royale",
				apppButton: null,
			},
			{
				appView: app.appSpeed.ViewSpeed,
				appName: spa.StrDesktop.appSpeed,
				appIcon: "image__speed",
				apppButton: null,
			},
			{
				appView: null,
				appName: "Tetris",
				appIcon: "image__tetris",
				apppButton: null,
				appUrl: "appTetris/index.html",
			},
		],
	];

	this.isButtonsShaking = false;

	this.paging = new spa.Paging(
		"view_desktop__paging",
		"",
		false,
		null,
		null,
		null,
		null
	);
	this.addItem(this.paging);

	for (let i = 0; i < pages.length; i++) {
		let itemPage = new spa.Item(
			'<div class="view_desktop__item" data-index="' + i + '"></div>'
		);
		this.paging.addItem(itemPage);

		for (let j = 0; j < pages[i].length; j++) {
			let itemUiButtonApp = new app.appDesktop.UiButtonApp(
				"",
				"",
				pages[i][j].appIcon,
				pages[i][j].appName,
				() => {
					if (pages[i][j].appUrl != null) {
						spa.Browser.goToURL(pages[i][j].appUrl, false);
					} else if (
						this.isButtonsShaking == false &&
						pages[i][j].appView != null
					) {
						this.openApp(new pages[i][j].appView(), pages[i][j].appName);
					}
				},
				() => {
					if (this.isButtonsShaking == false) {
						this.shakeButtons(pages, true);
						itemDone.setIsVisible(true);

						spa.Dom.fireEvent(itemUiButtonApp.divCover, spa.Device.mousecancel);
					}
				}
			);

			itemPage.addItem(itemUiButtonApp);

			pages[i][j].appButton = itemUiButtonApp;
		}
	}

	let itemDone = new spa.ButtonText("", "view_desktop__done", "Done", () => {
		this.shakeButtons(pages, false);
		itemDone.setIsVisible(false);
	});
	this.addItem(itemDone);
	spa.decorate(itemDone, new spa.UiVisible());
	itemDone.setIsVisible(false);
};

app.appDesktop.ViewDesktop.prototype.shakeButtons = function (
	pages,
	isButtonsShaking
) {
	this.isButtonsShaking = isButtonsShaking;

	for (let i = 0; i < pages.length; i++) {
		for (let j = 0; j < pages[i].length; j++) {
			if (this.isButtonsShaking == true) {
				pages[i][j].appButton.setAttribute("shake", j % 4);
			} else {
				pages[i][j].appButton.setAttribute("shake", -1);
			}
		}
	}
};
