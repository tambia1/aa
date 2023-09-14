spa.TabBarButton = function(divId, divClass, imageClass, text, callback)
{
	let html = ''+
		'<div id="' + divId + '" class="tabbar_button ' + divClass + '">'+
			'<div class="tabbar_button_image ' + imageClass + '" data-image=""></div>'+
			'<div class="tabbar_button_text" data-string=""></div>'+
			'<div class="tabbar_button_badge"></div>' +
		'</div>'+
	'';

	spa.decorate(this, new spa.UiElement(html));

    //add gestures
    this.uiClick = new spa.UiClick(this.div, callback);

    //save div
	this.text = this.div.querySelector('.tabbar_button_text');
	this.badge = this.div.querySelector('.tabbar_button_badge');

    //set text
	this.setText(text);
	this.setBadge('');
}

spa.TabBarButton.prototype.item = null;

spa.TabBarButton.prototype.gestureClick = null;

spa.TabBarButton.prototype.setText = function (text) {
    spa.Strings.setText(this.text, text);
}

spa.TabBarButton.prototype.setBadge = function (text) {
	spa.Strings.setText(this.badge, text);
	this.badge.setAttribute('isVisible', text != '');
}

