app.appMessenger.ViewMessengerChat = function()
{
    spa.decorate(this, new spa.NavBarView('view_messenger_chat', ''));

	this.clientId = null;

	this.controllerWebSockets = app.appMessenger.ViewMessengerMain.instance.controllerWebSockets;
	this.controllerWebSockets.pubSubOnOpen.subscribe('ViewMessenger', this.onWebSocketOpen.bind(this));
	this.controllerWebSockets.pubSubOnError.subscribe('ViewMessenger', this.onWebSocketError.bind(this));
	this.controllerWebSockets.pubSubOnMessage.subscribe('ViewMessenger', this.onWebSocketMessage.bind(this));
	this.controllerWebSockets.pubSubOnClose.subscribe('ViewMessenger', this.onWebSocketClose.bind(this));

	this.initViews();
}

app.appMessenger.ViewMessengerChat.prototype.onViewWillShow = function()
{

}

app.appMessenger.ViewMessengerChat.prototype.onViewDidShow = function()
{

}

app.appMessenger.ViewMessengerChat.prototype.onViewWillHide = function()
{

}

app.appMessenger.ViewMessengerChat.prototype.onViewDidHide = function()
{

}

app.appMessenger.ViewMessengerChat.prototype.onViewBackPressed = function()
{
	return false;
}

app.appMessenger.ViewMessengerChat.prototype.initViews = function()
{
	//add panel
	this.panel = new spa.Panel('view_messenger_chat__panel', '', spa.Panel.DIRECTION_VER);
	this.addItem(this.panel);

	this.panel.div.addEventListener(spa.Device.mousedown, () => {
		this.itemMessageBar.setIsFocused(false);
	}, false);
	
	this.itemMessageBar = new spa.MessageBar('', 'view_messenger_chat__message', 'Send', this.onMessageChange.bind(this), this.onMessageSend.bind(this), this.onMessageFocus.bind(this), this.onMessageBlur.bind(this));
	this.addItem(this.itemMessageBar);

	this.itemConnectionStatus = new spa.Text('', 'view_messenger_chat__connection_status', 'IDLE');
	this.addItem(this.itemConnectionStatus);
}

app.appMessenger.ViewMessengerChat.prototype.addMessageMe = function(message)
{
	let status = 'P';

	let bubble = new spa.Item('<div class="view_messenger_chat__message_me"></div>');
	this.panel.addItem(bubble);

	let bubbleMessage = new spa.Item('<div class="view_messenger_chat__message_me_message">' + message + '</div>');
	bubble.addItem(bubbleMessage);

	let bubbleStatus = new spa.Item('<div class="view_messenger_chat__message_me_status">' + status + '</div>');
	bubble.addItem(bubbleStatus);
}

app.appMessenger.ViewMessengerChat.prototype.addMessageOther = function(message, clientName)
{
	let status = 'P';

	let bubble = new spa.Item('<div class="view_messenger_chat__message_other"></div>');
	this.panel.addItem(bubble);

	let bubbleName = new spa.Item('<div class="view_messenger_chat__message_other_name">' + clientName + '</div>');
	bubble.addItem(bubbleName);

	let bubbleMessage = new spa.Item('<div class="view_messenger_chat__message_other_message">' + message + '</div>');
	bubble.addItem(bubbleMessage);
}

app.appMessenger.ViewMessengerChat.prototype.onWebSocketOpen = function(e)
{
	this.itemConnectionStatus.setText('OPENED');
}

app.appMessenger.ViewMessengerChat.prototype.onWebSocketError = function(e)
{
	this.itemConnectionStatus.setText('ERROR');			
}

app.appMessenger.ViewMessengerChat.prototype.onWebSocketMessage = function(data)
{
	switch (data.action) {
		case 'CONNECTION': {
			this.addMessageOther((data.clientId == this.controllerWebSockets.clientId ? 'You' : data.clientName) + ' joined the chat.', '');
			break;
		}
		case 'NAME': {
			this.addMessageOther(data.clientId + ' changed his name to ' + data.clientName, data.clientName);
			break;
		}
		case 'MESSAGE': {
			this.addMessageOther(data.message, data.clientName);
			break;
		}
	}
}

app.appMessenger.ViewMessengerChat.prototype.onWebSocketClose = function(e)
{
	this.itemConnectionStatus.setText('CLOSED');
}

app.appMessenger.ViewMessengerChat.prototype.onMessageChange = function()
{

}

app.appMessenger.ViewMessengerChat.prototype.onMessageSend = function()
{
	let message = this.itemMessageBar.getValue();

	if (message == ''){
		return;
	}

	this.addMessageMe(message);
	this.controllerWebSockets.sendMessage(JSON.stringify({action: 'MESSAGE', message: message}));
	this.itemMessageBar.setValue('');

	this.panel.scrollTo(0, Number.MAX_VALUE, true);

	// this.sentMessagesQueue.push({message: message, status: status, bubble: bubble, bubbleMessage: bubbleMessage, bubbleStatus: bubbleStatus});
}

app.appMessenger.ViewMessengerChat.prototype.onMessageFocus = function()
{
	setTimeout(() => {
		this.panel.scrollTo(0, Number.MAX_VALUE, false);
	}, 100);
}

app.appMessenger.ViewMessengerChat.prototype.onMessageBlur = function()
{
	setTimeout(() => {
		this.panel.scrollTo(0, Number.MAX_VALUE, false);
	}, 100);
}

