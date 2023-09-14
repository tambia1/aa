spa.PubSub = function()
{
	this.subscribers = {
		null: [],
	};
}

spa.PubSub.prototype.subscribers = null;

spa.PubSub.prototype.subscribe = function(group, subscriber)
{
	this.unsubscribe(group, subscriber);

	this.subscribers[group] = this.subscribers[group] || [];
	this.subscribers[group].push(subscriber);
}

spa.PubSub.prototype.unsubscribe = function(group, subscriber)
{
	this.subscribers[group] = this.subscribers[group] || [];

	for (let i = 0; i < this.subscribers[group].length; i++){
		if (this.subscribers[group][i] == subscriber || subscriber == null){
			this.subscribers[group].splice(i--, 1);
		}
	}
}

spa.PubSub.prototype.publish = function()
{
	for (const k in this.subscribers){
		for (let i=0; i < this.subscribers[k].length; i++){
			this.subscribers[k][i](...arguments);
		}
	}
}


