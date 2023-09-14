app.appMessenger.ViewMessengerOnline = function()
{
    spa.decorate(this, new spa.NavBarView('view_messenger_online', ''));

	this.controllerWebSockets = app.appMessenger.ViewMessengerMain.instance.controllerWebSockets;
	this.controllerWebSockets.pubSubOnMessage.subscribe('ViewMessenger', this.onWebSocketMessage.bind(this));

	this.initViews();
}

app.appMessenger.ViewMessengerOnline.prototype.onViewWillShow = function()
{

}

app.appMessenger.ViewMessengerOnline.prototype.onViewDidShow = function()
{

}

app.appMessenger.ViewMessengerOnline.prototype.onViewWillHide = function()
{

}

app.appMessenger.ViewMessengerOnline.prototype.onViewDidHide = function()
{

}

app.appMessenger.ViewMessengerOnline.prototype.onViewBackPressed = function()
{
	return false;
}

app.appMessenger.ViewMessengerOnline.prototype.initViews = function()
{
	//add panel
	this.panel = new spa.Panel('view_messenger_online__panel', '', spa.Panel.DIRECTION_VER);
	this.addItem(this.panel);
}

app.appMessenger.ViewMessengerOnline.prototype.addClient = function(clientId, clientName, isHighlight)
{
	let itemClient = new spa.Text('', 'view_messenger_online__text', clientId + ' ' + clientName);
	this.panel.addItem(itemClient);

	spa.decorate(itemClient, new spa.UiAttribute());
	itemClient.setAttribute('isHighlight', isHighlight);
}

app.appMessenger.ViewMessengerOnline.prototype.onWebSocketMessage = function(data)
{
	switch (data.action) {
		case 'NAME': 
		case 'CONNECTION': {
			this.panel.removeAllItems();

			for (const k in data.clients) {
				let clientId = k;
				let clientName = data.clients[k];
				let isHighlight = (this.controllerWebSockets.clientId == clientId);
	
				this.addClient(clientId, clientName, isHighlight);
			}
				
			break;
		}
	}
}
