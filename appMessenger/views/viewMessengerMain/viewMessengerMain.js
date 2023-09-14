app.appMessenger.ViewMessengerMain = function()
{
    spa.decorate(this, new spa.NavBarView('view_messenger_main', ''));

    app.appMessenger.ViewMessengerMain.instance = this;

    this.controllerWebSockets = new app.appMessenger.ControllerWebSockets();

    this.initViews();
}

app.appMessenger.ViewMessengerMain.instance = null;

app.appMessenger.ViewMessengerMain.prototype.onViewWillShow = function()
{

}

app.appMessenger.ViewMessengerMain.prototype.onViewDidShow = function()
{

}

app.appMessenger.ViewMessengerMain.prototype.onViewWillHide = function()
{

}

app.appMessenger.ViewMessengerMain.prototype.onViewDidHide = function()
{

}

app.appMessenger.ViewMessengerMain.prototype.onViewBackPressed = function()
{
	return false;
}

app.appMessenger.ViewMessengerMain.prototype.initViews = function()
{
    this.viewMessengerChat = new app.appMessenger.ViewMessengerChat();
    this.viewMessengerOnline = new app.appMessenger.ViewMessengerOnline();
    this.viewMessengerDetails = new app.appMessenger.ViewMessengerDetails();

    this.tabbar = new spa.TabBar('', '', this.onTabBarSelectionChange.bind(this));
    this.addItem(this.tabbar);

    this.tabbar.addItem(this.viewMessengerChat, 'chat', '', '', 'view_messenger_main__image_coupons', spa.StrMessenger.messengerTabChat);
    this.tabbar.addItem(this.viewMessengerOnline, 'online', '', '', 'view_messenger_main__image_brands', spa.StrMessenger.messengerTabOnline);
    this.tabbar.addItem(this.viewMessengerDetails, 'details', '', '', 'view_messenger_main__image_more', spa.StrMessenger.messengerTabDetails);

    this.tabbar.setSelectedItemIndex(0, false);


	//fix visible window size when keyboard open
	window.visualViewport.addEventListener('resize', function() {
		document.body.style.height = window.visualViewport.height + 'px';

        setTimeout(() => {
            window.scroll({left: 0, top: 0, behavior : 'auto'});
        }, 100);
	}.bind(this));
}

app.appMessenger.ViewMessengerMain.prototype.onTabBarSelectionChange = function(newItemIndex, oldItemIndex)
{
    let itemId = this.tabbar.getItemIdByItemIndex(newItemIndex);
}
