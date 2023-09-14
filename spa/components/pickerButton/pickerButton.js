spa.PickerButton = function(divId, divClass, text, callback)
{
	var str = '' +
		'<div id="' + divId + '" class="picker_button ' + divClass + '">' +
			'<div class="picker_button_text" data-string="">' +
			'</div>' +
		'</div>' +
	'';

    this.item = new spa.Item(str);

    //add gestures
    this.uiClick = new spa.UiClick(this.item.div, callback);

    //set vars
	this.setText(text);
}

spa.PickerButton.prototype.item = null;
spa.PickerButton.prototype.gestureClick = null;

spa.PickerButton.prototype.setText = function (text) {
    spa.Strings.setText(this.item.div, text);
}

