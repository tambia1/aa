app.appSettings.ViewSettings = function()
{
    spa.decorate(this, new spa.NavBarView('view_settings', ''));

    this.initViews();
}

app.appSettings.ViewSettings.prototype.onViewWillShow = function()
{

}

app.appSettings.ViewSettings.prototype.onViewDidShow = function()
{

}

app.appSettings.ViewSettings.prototype.onViewWillHide = function()
{

}

app.appSettings.ViewSettings.prototype.onViewDidHide = function()
{

}

app.appSettings.ViewSettings.prototype.onViewBackPressed = function()
{
	return false;
}

app.appSettings.ViewSettings.prototype.initViews = function()
{
	//add title
	this.addItem(new spa.Text('', 'view_settings__title', spa.StrSettings.settingsGroupAppearance));

	//add panel
	this.panel = new spa.Panel('view_settings__panel', '', spa.Panel.DIRECTION_VER);
	this.addItem(this.panel);

	//add list
	let list = new spa.List('', '', spa.List.SELECT_TYPE_NONE);
	this.panel.addItem(list);

	list.addItem(new spa.ListCellImage('', '', 'view_settings__image-language', spa.StrSettings.settingsLanguage, this.onClickLanguage.bind(this)));
	list.addItem(new spa.ListCellImage('', '', 'view_settings__image-theme', spa.StrSettings.settingsTheme, this.onClickTheme.bind(this)));
	list.addItem(new spa.ListCell('', '', spa.StrSettings.settingsAbout, this.onClickAbout.bind(this)));
}

app.appSettings.ViewSettings.prototype.onClickAbout = function()
{
    this.navbar.addItem(new app.appSettings.ViewAbout(), spa.StrSettings.aboutTitle, spa.NavBar.ANIMATTION_TYPE_SLIDE, true, null);
}

app.appSettings.ViewSettings.prototype.onClickLanguage = function()
{
    this.navbar.addItem(new app.appSettings.ViewLanguage(), spa.StrSettings.languageTitle, spa.NavBar.ANIMATTION_TYPE_SLIDE, true, null);
}

app.appSettings.ViewSettings.prototype.onClickTheme = function()
{
    this.navbar.addItem(new app.appSettings.ViewTheme(), spa.StrSettings.themeTitle, spa.NavBar.ANIMATTION_TYPE_SLIDE, true, null);
}
