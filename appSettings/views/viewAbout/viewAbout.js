app.appSettings.ViewAbout = function()
{
    spa.decorate(this, new spa.NavBarView('view-about', ''));
	
	//add panel
	this.panel = new spa.Panel('view-about__panel', '', spa.Panel.DIRECTION_VER);
	this.addItem(this.panel);

	//add text
	this.panel.addItem(new spa.Text('', 'view-about__title', spa.StrSettings.aboutTitle));
	this.panel.addItem(new spa.Text('', 'view-about__text', spa.StrSettings.aboutText));
	this.panel.addItem(new spa.Text('', 'view-about__text', spa.StrSettings.aboutVersion.value.replace('%%version%%', spa.StrSettings.version.value)));

	this.panel.addItem(new spa.Text('', 'view-about__text', '\n'));
	this.panel.addItem(new spa.Text('', 'view-about__text', spa.StrSettings.aboutDeviceDetails));
	this.panel.addItem(new spa.Text('', 'view-about__text', spa.Device.browserName));
	this.panel.addItem(new spa.Text('', 'view-about__text', spa.Device.browserVersion));
	this.panel.addItem(new spa.Text('', 'view-about__text', '\n'));
	this.panel.addItem(new spa.Text('', 'view-about__text', spa.Device.osName));
	this.panel.addItem(new spa.Text('', 'view-about__text', spa.Device.osVersion));
	this.panel.addItem(new spa.Text('', 'view-about__text', '\n'));
	this.panel.addItem(new spa.Text('', 'view-about__text', spa.Device.deviceName));
	this.panel.addItem(new spa.Text('', 'view-about__text', spa.Device.deviceVersion));
	this.panel.addItem(new spa.Text('', 'view-about__text', spa.Device.deviceType));
	this.panel.addItem(new spa.Text('', 'view-about__text', spa.Device.orientation));
	this.panel.addItem(new spa.Text('', 'view-about__text', '\n'));
}

app.appSettings.ViewAbout.prototype.onViewWillShow = function()
{
	this.panel.addItem(new spa.Text('', 'view-about__text', document.body.offsetWidth + 'x' + document.body.offsetHeight + ' @' + window.devicePixelRatio));
	this.panel.addItem(new spa.Text('', 'view-about__text', this.div.offsetWidth + 'x' + this.div.offsetHeight));
	this.panel.addItem(new spa.Text('', 'view-about__text', '\n'));
	this.panel.addItem(new spa.Text('', 'view-about__text', (document.body.offsetWidth * window.devicePixelRatio) + 'x' + (document.body.offsetHeight * window.devicePixelRatio)));
	this.panel.addItem(new spa.Text('', 'view-about__text', (this.div.offsetWidth * window.devicePixelRatio) + 'x' + (this.div.offsetHeight * window.devicePixelRatio)));
	this.panel.addItem(new spa.Text('', 'view-about__text', '\n'));
	this.panel.addItem(new spa.Text('', 'view-about__text', window.navigator.userAgent));
	this.panel.addItem(new spa.Text('', 'view-about__text', '\n'));
	this.panel.addItem(new spa.Text('', 'view-about__text', window.location.href));
}

app.appSettings.ViewAbout.prototype.onViewDidShow = function()
{

}

app.appSettings.ViewAbout.prototype.onViewWillHide = function()
{

}

app.appSettings.ViewAbout.prototype.onViewDidHide = function()
{

}

app.appSettings.ViewAbout.prototype.onViewBackPressed = function()
{
	return false;
}
