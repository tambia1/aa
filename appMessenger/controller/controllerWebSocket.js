app.appMessenger.ControllerWebSockets = function() 
{
	this.init();

	this.clientId = null;

	this.messagesQueue = [];
	
	this.pubSubMessagesQueueChanged = new spa.PubSub();
	this.pubSubMessagesQueueChanged.subscribe('ViewMessenger', this.onMessagesQueueChanged.bind(this));

	this.pubSubOnOpen = new spa.PubSub();
	this.pubSubOnError = new spa.PubSub();
	this.pubSubOnMessage = new spa.PubSub();
	this.pubSubOnClose = new spa.PubSub();
}

app.appMessenger.ControllerWebSockets.prototype.init = function()
{
	this.webSocket = null;
	
	try{
		// this.webSocket = new WebSocket('ws://localhost:80', ['soap', 'wamp']);
		this.webSocket = new WebSocket('ws://192.168.1.15:80', ['soap', 'wamp']);

		this.webSocket.onopen = (e) => {
			this.pubSubOnOpen.publish(e);
		}
	
		this.webSocket.onerror = (e) => {
			this.pubSubOnError.publish(e);
		}
	
		this.webSocket.onmessage = (e) => {
			let data = JSON.parse(e.data);

			if (data.action == 'CONNECTED'){
				this.clientId = data.clientId;
			}
			
			this.pubSubOnMessage.publish(data);
		}
	
		this.webSocket.onclose = (e) => {
			this.pubSubOnClose.publish();
		}
	}
	catch(err){
		console.log(err);
	}
}

app.appMessenger.ControllerWebSockets.prototype.sendMessage = function(message)
{
	this.messagesQueue.push(message);

	this.pubSubMessagesQueueChanged.publish();

}

app.appMessenger.ControllerWebSockets.prototype.onMessagesQueueChanged = function()
{
	if (this.webSocket?.readyState === WebSocket.OPEN){
		for (let i = 0; i < this.messagesQueue.length; i++) {
			this.webSocket.send(this.messagesQueue[i]);
			this.messagesQueue.splice(i--, 1);
		}
	}
}