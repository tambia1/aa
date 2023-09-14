app.appSettings.ViewTheme = function()
{
    spa.decorate(this, new spa.NavBarView('view_theme', ''));
	
	this.prepareView();
}

app.appSettings.ViewTheme.prototype.onViewWillShow = function()
{

}

app.appSettings.ViewTheme.prototype.onViewDidShow = function()
{

}

app.appSettings.ViewTheme.prototype.onViewWillHide = function()
{

}

app.appSettings.ViewTheme.prototype.onViewDidHide = function()
{

}

app.appSettings.ViewTheme.prototype.onViewBackPressed = function()
{
	return false;
}

app.appSettings.ViewTheme.prototype.prepareView = function()
{
	let themes = [
		{name: 'theme1', text: spa.StrSettings.themeTheme1},
		{name: 'theme2', text: spa.StrSettings.themeTheme2},
		{name: 'theme3', text: spa.StrSettings.themeTheme3},
		{name: 'theme4', text: spa.StrSettings.themeTheme4},
		{name: 'theme5', text: spa.StrSettings.themeTheme5},
		{name: 'theme6', text: spa.StrSettings.themeTheme6},
		{name: 'theme7', text: spa.StrSettings.themeTheme7},
		{name: 'theme8', text: spa.StrSettings.themeTheme8},
	];

	this.removeAllItems();


	//phone
	let itemPhoneBox = new spa.Item('<div class="view_theme__phone__box"></div>');
	this.addItem(itemPhoneBox);

	let itemPhone = new spa.Item('<div id="view_desktop" class="view_theme__phone"></div>');
	itemPhoneBox.addItem(itemPhone);

    let itemUiButtonApp1 = new app.appDesktop.UiButtonApp('', '', 'image__settings', spa.StrDesktop.appSettings, null);
    itemPhone.addItem(itemUiButtonApp1);

	let itemDownlowdingImage = new spa.Text('', 'view_theme__downloading', spa.StrSettings.settingsDownloading);
	itemPhoneBox.addItem(itemDownlowdingImage);

	spa.decorate(itemDownlowdingImage, new spa.UiVisible());

	itemDownlowdingImage.setIsVisible(false);


	//list
	this.panel = new spa.Panel('view_theme__panel', '', spa.Panel.DIRECTION_VER);
	this.addItem(this.panel);

	this.panel.onScrollStarted = () => {
		list.onScroll();
	}

	let list = new spa.List('', '', spa.List.SELECT_TYPE_SINGLE);
	this.panel.addItem(list);

    let theme = window.localStorage.getItem('theme') || 'theme1';

	for (let i = 0; i < themes.length; i++) {
		list.addItem(new spa.ListCellV('', '', themes[i].text, function(){
			list.setSelectedCellIndex(i);
			app.appDesktop.ViewDesktop.instance.changeTheme(themes[i].name);

			let url =  window.getComputedStyle(itemPhone.div, null);
			url = url.getPropertyValue('background-image');
			url = url.substring(0, url.indexOf(','));
			url = url.replace(new RegExp('url\\(\\"', 'g'), '');
			url = url.replace(new RegExp('\\"\\)', 'g'), '');

			itemDownlowdingImage.setIsVisible(true);

			spa.Images.getImage(url, (imageUrl, imageElement, imageCanvas, imageContext, imageData, imageBase64) => {
				window.localStorage.setItem('themeBgImage', imageBase64);
				itemDownlowdingImage.setIsVisible(false);
			}, () => {
				itemDownlowdingImage.setIsVisible(false);
			});


		}.bind(this)));

		if (themes[i].name == theme){
			list.setSelectedCellIndex(i);
		}
	}
}
