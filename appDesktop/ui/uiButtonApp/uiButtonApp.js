app.appDesktop.UiButtonApp = function(divId, divClass, imageClass, text, onClick, onLongPress)
{
	let html = '' +
		'<div id="' + divId + '" class="ui_button_app ' + divClass + '">' +
			'<div class="ui_button_app__image ' + imageClass + '" data-image=""></div>' +
			'<div class="ui_button_app__text" data-string=""></div>' +
			'<div class="ui_button_app__cover"></div>' +
		'</div>' +
	'';

    spa.decorate(this, new spa.UiElement(html));

	this.divImage = this.div.querySelector('.ui_button_app__image');
	this.divText = this.div.querySelector('.ui_button_app__text');
	this.divCover = this.div.querySelector('.ui_button_app__cover');

    //add gestures
	spa.decorate(this, new spa.UiAttribute());

	this.uiClick = new spa.UiClick(this.divCover, onClick);
    this.uiLongPress = new spa.UiLongPress(this.divCover, () => {
		onLongPress();
	});

	this.setText(text);
}

app.appDesktop.UiButtonApp.prototype.setText = function (text) 
{
    spa.Strings.setText(this.divText, text);
}

app.appDesktop.UiButtonApp.prototype.getText = function () 
{
    return spa.Strings.getText(this.divText);
}
