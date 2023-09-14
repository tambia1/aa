spa.Text = function(divId, divClass, text) {
	let html = '' +
		'<div id="' + divId + '" class="' + divClass + '" data-string-key=""></div>' +
	'';

    spa.decorate(this, new spa.UiElement(html));

    this.setText(text);
}

spa.Text.prototype.setText = function (text) {
    spa.Strings.setText(this.div, text);
}

spa.Text.prototype.getText = function () {
    return spa.Strings.getText(this.div);
}
