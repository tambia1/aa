app.appMessenger.ViewMessengerDetails = function()
{
    spa.decorate(this, new spa.NavBarView('view_messenger_details', ''));

	this.controllerWebSockets = app.appMessenger.ViewMessengerMain.instance.controllerWebSockets;
	this.controllerWebSockets.pubSubOnMessage.subscribe('ViewMessenger', this.onWebSocketMessage.bind(this));

	this.clientName = this.controllerWebSockets.clientId || '';

	this.initViews();
}

app.appMessenger.ViewMessengerDetails.prototype.onViewWillShow = function()
{

}

app.appMessenger.ViewMessengerDetails.prototype.onViewDidShow = function()
{

}

app.appMessenger.ViewMessengerDetails.prototype.onViewWillHide = function()
{

}

app.appMessenger.ViewMessengerDetails.prototype.onViewDidHide = function()
{

}

app.appMessenger.ViewMessengerDetails.prototype.onViewBackPressed = function()
{
	return false;
}

app.appMessenger.ViewMessengerDetails.prototype.initViews = function()
{
	this.removeAllItems();
	
	this.panel = new spa.Panel('view_messenger_details__panel', '', spa.Panel.DIRECTION_VER);
	this.addItem(this.panel);

	this.itemClientName = new spa.Text('', 'view_messenger_details__text', spa.StrMessenger.messengerName.value + ' ' + this.clientName);
	this.panel.addItem(this.itemClientName);

	this.itemMessageBar = new spa.MessageBar('', 'view_messenger_details__message', 'Send', this.onMessageChange.bind(this), this.onMessageSend.bind(this),);
	this.panel.addItem(this.itemMessageBar);
}

app.appMessenger.ViewMessengerDetails.prototype.onMessageChange = function()
{

}

app.appMessenger.ViewMessengerDetails.prototype.onMessageSend = function()
{
	this.clientName = this.itemMessageBar.getValue();

	this.controllerWebSockets.sendMessage(JSON.stringify({action: 'NAME', clientName: this.clientName}));
}

app.appMessenger.ViewMessengerDetails.prototype.onWebSocketMessage = function(data)
{
	switch (data.action) {
		case 'NAME': 
		case 'CONNECTION': {
			this.panel.removeAllItems();

			for (const k in data.clients) {
				let clientId = k;
				let clientName = data.clients[k];

				if (this.controllerWebSockets.clientId == clientId){
					this.clientName = clientName;

					this.initViews();
				}
			}
				
			break;
		}
	}
}
