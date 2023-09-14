spa.ButtonText = function(divId, divClass, text, callback) {
	let html = '' +
		'<div id="' + divId + '" class="button_text ' + divClass + '">' +
			'<span class="button_text_string" data-string-key="">'
			'</span>' +
		'</div>' +
	'';

    spa.decorate(this, new spa.UiElement(html));

    //add gestures
    this.uiClick = new spa.UiClick(this.div, callback);

    //set vars
    this.setText(text);
}

spa.ButtonText.prototype.gestureClick = null;

spa.ButtonText.prototype.setText = function (text) {
    spa.Strings.setText(this.div, text);
}

spa.ButtonText.prototype.getText = function () {
    return spa.Strings.getText(this.div);
}
