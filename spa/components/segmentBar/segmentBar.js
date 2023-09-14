spa.SegmentBar = function(divId, divClass)
{
	let html = ''+
		'<div id="' + divId + '" class="segment ' + divClass + '">'+
			'<div class="segment_container">'+
				'<div class="segment_button_slider"></div>'
			'</div>'
		'</div>'+
	'';

	spa.decorate(this, new spa.UiElement(html));
	spa.decorate(this, new spa.UiAttribute());

	this.container = new spa.Item(this.div.querySelector('.segment_container'));

	this.slider = new spa.Item(this.div.querySelector('.segment_button_slider'));

	//set vars
	this.buttons = {};
}

spa.SegmentBar.prototype.buttons = null;

spa.SegmentBar.prototype.addButton = function(buttonId, divId, divClass, imageClass, text, onClick)
{
	let button = new spa.Item('<div buttonId="' + buttonId + '" id="' + divId + '" class="segment_button ' + divClass + '"></div>');
	this.container.addItem(button);

	spa.decorate(button, new spa.UiSelect());

	spa.decorate(button, new spa.UiClick(button.div, function(){
		onClick && onClick(buttonId);
	}.bind(this)));


	let buttonText = null;
	let buttonLine = null;
	let buttonImage = null;

	if (text != null){
		buttonText = new spa.Text('', 'segment_button_text', text);
		button.addItem(buttonText);
	}

	if (text != null && imageClass != null){
		buttonLine = new spa.Item('<div class="segment_button_line"></div>');
		button.addItem(buttonLine);
	}

	if (imageClass != null){
		buttonImage = new spa.Item('<div class="segment_button_image ' + imageClass + '"></div>');
		button.addItem(buttonImage);
		spa.decorate(buttonImage, new spa.UiSelect());
		buttonImage.setIsSelected(false);
	}

	this.buttons[buttonId] = {
		button: button,
		buttonId: buttonId,
		buttonText: buttonText,
		buttonLine: buttonLine,
		buttonImage: buttonImage,
		buttonPosition: Object.keys(this.buttons).length,
	};
}

spa.SegmentBar.prototype.clearAllSelectedButtons = function()
{
	for (const i in this.buttons){
		this.buttons[i].button.setIsSelected(false);
		this.buttons[i].buttonImage && this.buttons[i].buttonImage.setIsSelected(false);
	}
}

spa.SegmentBar.prototype.getSelectedButtonId = function(buttonId)
{
	return this.buttons[buttonId].button.getIsSelected();
}

spa.SegmentBar.prototype.setSelectedButtonId = function(buttonId, isSelected)
{
	this.clearAllSelectedButtons();

	this.buttons[buttonId].button.setIsSelected(isSelected);
	this.buttons[buttonId]?.buttonImage && this.buttons[buttonId].buttonImage.setIsSelected(isSelected);

	this.setAttribute('selectedIndex', this.buttons[buttonId].buttonPosition);
}

spa.SegmentBar.prototype.setButtonText = function (buttonId, text)
{
	this.buttons[buttonId].buttonText.setText(text);
}

spa.SegmentBar.prototype.getButton = function(buttonId)
{
	return this.buttons[buttonId];
}
