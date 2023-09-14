app.appDesktop.ViewApp = function(viewApp, title, button)
{
	let html = '<div id="view_app"></div>';

    spa.decorate(this, new spa.UiElement(html));
    spa.decorate(this, new spa.UiAttribute());

    this.navbar = new spa.NavBar('', '');
	this.addItem(this.navbar);

	this.setAttribute('state', 'hideWithoutAnimation');

	setTimeout(() => {
		this.setAttribute('state', 'showWithAnimation');

		setTimeout(() => {
			this.navbar.addItem(viewApp, title, spa.NavBar.ANIMATTION_TYPE_APPEAR, true, null);
		}, 300);
	}, 100);
	

	this.navbar.onClickClose = () => {
		this.navbar.removeItems(0, spa.NavBar.ANIMATTION_TYPE_APPEAR, null);

		this.setAttribute('state', 'hideWithAnimation');

		setTimeout(() => {
			app.appDesktop.ViewDesktop.instance.removeItem(this);
		}, 300);
	}
}
