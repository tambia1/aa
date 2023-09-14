spa.Alert = function(parent, id, divId, divClass)
{
	//call base constructor
	var str = '' +
	'<div id="' + divId + '" class="alert_main ' + divClass + '">'+
	'	<div id="alert_box">'+
	'		<div id="alert_icon"></div>'+
	'		<div id="alert_title"></div>'+
	'		<div id="alert_text"></div>'+
	'		<div id="alert_buttons"></div>'+
	'	</div>'+
	'</div>'+
	'';

    this.item = new spa.Item(str);

	this.alertIcon = this.item.div.querySelector('#alert_icon');
	this.alertIcon.setAttribute('isVisible', false);

	this.alertTitle = new spa.Text('alert_title', '', '');
	this.alertTitle.setIsVisible(false);
	spa.Item.replace(this.item.div.querySelector('#alert_title'), this.alertTitle.div);

	this.alertText = new spa.Text('alert_text', '', '');
	this.alertText.setIsVisible(false);
	spa.Item.replace(this.item.div.querySelector('#alert_text'), this.alertText.div);

	this.alertButtons = new spa.Item('<div id="alert_buttons"></div>');
	spa.Item.replace(this.item.div.querySelector('#alert_buttons'), this.alertButtons.div);


	//save args
	this.parent = parent;
	this.id = id;


	//save in list
	spa.Alert.alerts[id] = this;
}

spa.Alert.prototype.item = null;

spa.Alert.ICON_NONE = '';
spa.Alert.ICON_ERROR = 'image_icon_error';
spa.Alert.ICON_WARNING = 'image_icon_warning';
spa.Alert.ICON_INFO = 'image_icon_info';

spa.Alert.alerts = {};

spa.Alert.prototype.parent = null;
spa.Alert.prototype.id = null;

spa.Alert.prototype.alertIcon = null;
spa.Alert.prototype.alertTitle = null;
spa.Alert.prototype.alertText = null;
spa.Alert.prototype.alertButtons = null;

spa.Alert.prototype.setTitle = function(title)
{
	this.alertTitle.setText(title);
	this.alertTitle.setIsVisible(title != null);

	return this;
}

spa.Alert.prototype.setText = function(text)
{
	this.alertText.setText(text);
	this.alertText.setIsVisible(text != null);

	return this;
}

spa.Alert.prototype.setIcon = function(icon)
{
	this.alertIcon.className = icon;
	this.alertIcon.setAttribute('isVisible', icon != null);

	return this;
}

spa.Alert.prototype.addButton = function(name, text, callback)
{
	//create buttons
	let buttonCallback = function()	{
		callback && callback(this);
	}

	let button = new spa.ButtonText('alert_button', '', text, buttonCallback.bind(this));
	button.setAttribute('name', name);
	this.alertButtons.addItem(button);

	return this;
}

spa.Alert.prototype.show = function()
{
	this.parent.addItem(this);
	this.setIsVisible(true);

	return this;
}

spa.Alert.prototype.hide = function()
{
	this.setIsVisible(false);

	setTimeout(function() {
		this.parent.removeItem(this);
	}.bind(this), 200);

	return this;
}

spa.Alert.hide = function(id) {
	let alert = spa.Alert.alerts[id];

	if (alert != undefined){
		alert.hide();
		delete spa.Alert.alerts[id];
	}
}

spa.Alert.hideAll = function() {
	for (let key in spa.Alert.alerts){
		spa.Alert.hide(key);
	}
}

spa.Alert.create = function(parent, id, divId, divClass)
{
	return new spa.Alert(parent, id, divId, divClass);
}

spa.Alert.count = function()
{
	return Object.keys(spa.Alert.alerts);
}
