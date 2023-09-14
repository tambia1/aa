spa.NavBarButton = function(divId, divClass, text, onClick, onLongPress)
{
	let html = '' +
		'<div id="' + divId + '" class="navbar_button ' + divClass + '">' +
			'<div class="navbar_button_text" data-string=""></div>' +
			'<div class="navbar_button_badge"></div>' +
		'</div>' +
	'';

	spa.decorate(this, new spa.UiElement(html));

    //add gestures
    this.uiClick = new spa.UiClick(this.div, onClick);
    this.uiLongPress = new spa.UiLongPress(this.div, onLongPress);

    //save div
	this.text = this.div.querySelector('.navbar_button_text');
	this.badge = this.div.querySelector('.navbar_button_badge');

    //set text
	this.setText(text);
	this.setBadge('');
}

spa.NavBarButton.prototype.setText = function (text) 
{
    spa.Strings.setText(this.text, text);
}

spa.NavBarButton.prototype.setBadge = function (text) 
{
	spa.Strings.setText(this.badge, text);
	this.badge.setAttribute('isVisible', text != '');
}

