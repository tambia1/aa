spa.Switch = function(divId, divClass, onSwitchChange)
{
	var str = '' +
		'<div id="' + divId + '" class="switch ' + divClass + '">' +
			'<div class="switch_left_text">&#10004;</div>'+
			'<div class="switch_right_text">&#10008;</div>'+
			'<div class="switch_button"></div>'+
		'</div>' +
	'';

    this.item = new spa.Item(str);

    //add gestures
    this.uiClick = new spa.UiClick(this.item.div, this.onPress.bind(this));

	//save callback
	this.onSwitchChange = onSwitchChange;

	//set initial state to false
	this.setSwitchOn(false);
}

spa.Switch.prototype.item = null;

spa.Switch.prototype.gestureClick = null;
spa.Switch.prototype.isOn = null;
spa.Switch.prototype.onSwitchChange = null;

spa.Switch.prototype.onPress = function(e)
{
	this.isOn = ! this.isOn;

	this.setSwitchOn(this.isOn);

	//invoke callback
	if (this.onSwitchChange)
	{
		this.onSwitchChange(this.isOn);
	}
}

spa.Switch.prototype.setSwitchOn = function(isOn)
{
	this.isOn = isOn;

	this.item.div.setAttribute('state', (this.isOn)?'on':'off');
}

