spa.ListCellHeader = function(divId, divClass, text, callback)
{
	let html = '' +
		'<div id="' + divId + '" class="cell-header ' + divClass + '">' +
            '<div class="cell_text" data-string=""></div>' +
		'</div>' +
	'';

    spa.decorate(this, new spa.UiElement(html));
    spa.decorate(this, new spa.UiSelect(html));

	//add gestures
    this.uiClick = new spa.UiClick(this.div, this.onClick.bind(this));

    //save vars
	this.divText = this.div.querySelector('.cell-header_text');

	this.setText(text);

	this.setIsSelected(false);

    this.callback = callback;
}

spa.ListCellHeader.prototype.setText = function (text) 
{
    spa.Strings.setText(this.div, text);
}

spa.ListCellHeader.prototype.getText = function () 
{
    return spa.Strings.getText(this.div);
}

spa.ListCellHeader.prototype.setParentList = function (parentList) 
{
    this.parentList = parentList;
}

spa.ListCellHeader.prototype.onClick = function()
{
    if (this.div.getAttribute('isEnabled') == 'false')
    {
        return;
    }

    //invoke cell callback
    this.callback && this.callback();
}

