app.appSettings.ViewLanguage = function()
{
    spa.decorate(this, new spa.NavBarView('view_language', ''));
	
	spa.Main.instance.pubSubChangeLanguage.subscribe('viewLanguage', this.onChangeLanguage.bind(this));

	this.panel = new spa.Panel('view_language__panel', '', spa.Panel.DIRECTION_VER);
	this.addItem(this.panel);

	this.prepareView();
}

app.appSettings.ViewLanguage.prototype.onViewWillShow = function()
{

}

app.appSettings.ViewLanguage.prototype.onViewDidShow = function()
{

}

app.appSettings.ViewLanguage.prototype.onViewWillHide = function()
{

}

app.appSettings.ViewLanguage.prototype.onViewDidHide = function()
{

}

app.appSettings.ViewLanguage.prototype.onViewBackPressed = function()
{
	return false;
}

app.appSettings.ViewLanguage.prototype.prepareView = function()
{
	this.panel.removeAllItems();

	let list = new spa.List('', '', spa.List.SELECT_TYPE_SINGLE);
	this.panel.addItem(list);

    let lang = window.localStorage.getItem('language');

	let i = 0;
	for (let k in app.appSettings.Strings.langs) {
		list.addItem(new spa.ListCellImageV('', '', app.appSettings.Strings.langs[k].languageIcon, app.appSettings.Strings.langs[k].language, function(){
			list.setSelectedCellIndex(i);
			spa.Main.instance.setLanguage(k);
		}.bind(this)));

		if (k == lang){
			list.setSelectedCellIndex(i);
		}

		i++;
	}
}

app.appSettings.ViewLanguage.prototype.onChangeLanguage = function(language)
{
	this.prepareView();
}

