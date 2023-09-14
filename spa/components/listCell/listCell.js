spa.ListCell = function(divId, divClass, text, callback)
{
	let html = '' +
		'<div id="' + divId + '" class="cell ' + divClass + '">' +
            '<div class="cell_text" data-string-group="" data-string-key=""></div>' +
            '<div class="cell_line"></div>' +
		'</div>' +
	'';

    spa.decorate(this, new spa.UiElement(html));
    spa.decorate(this, new spa.UiSelect(html));

	//add gestures
    this.uiClick = new spa.UiClick(this.div, this.onClick.bind(this));

    //save vars
	this.divText = this.div.querySelector('.cell_text');

	this.setText(text);

	this.setIsSelected(false);

    this.callback = callback;
}

spa.ListCell.prototype.setText = function (text) 
{
    spa.Strings.setText(this.div, text);
}

spa.ListCell.prototype.getText = function () 
{
    return spa.Strings.getText(this.div);
}

spa.ListCell.prototype.setParentList = function (parentList) 
{
    this.parentList = parentList;
}

spa.ListCell.prototype.onClick = function()
{
    if (this.div.getAttribute('isEnabled') == 'false')
    {
        return;
    }

    //invoke cell callback
    this.callback && this.callback();
}

