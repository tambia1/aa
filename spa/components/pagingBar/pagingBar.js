spa.PagingBar = function(divId, divClass)
{
	//call base constructor
	var str = ''+
		'<div id="' + divId + '" class="pagingbar ' + divClass + '">'+
		'</div>'+
	'';

    this.item = new spa.Item(str);

	//create paging
	this.paging = new spa.Paging('', false);
	this.item.div.appendChild(this.paging.div);

	this.paging.onSelectionChanged = this.onPagingSelectionChanged.bind(this);

	//create horizontal panel with buttons
	this.panelButtons = new spa.Panel('pagingbar_panel_buttons', '', spa.Panel.DIRECTION_HOR);
	this.item.div.appendChild(this.panelButtons.div);

	this.buttons = [];
}

spa.PagingBar.prototype.item = null;

spa.PagingBar.prototype.addItem = function(item, title)
{
	//add new button
	var button = new spa.ButtonClick('<div class="pagingbar_button">' + title + '</div>', this.actionButtonText.bind(this, this.buttons.length, true));
	this.panelButtons.addItem(button);

	button.setIsSelected(this.buttons.length == 0);

	//save button
	this.buttons.push(button);


	//add navbarView to paging
	this.paging.addItem(item);
}

spa.PagingBar.prototype.actionButtonText = function(index)
{
	this.setSelectedButton(index);
	this.paging.setSelectedPageIndex(index, true);
}

spa.PagingBar.prototype.onPagingSelectionChanged = function(index)
{
	this.setSelectedButton(index);
}

spa.PagingBar.prototype.setSelectedButton = function(index)
{
	//selected button
	for (var i = 0; i < this.buttons.length; i++)
	{
		this.buttons[i].setIsSelected(false);
	}

	this.buttons[index].setIsSelected(true);


	//check if button is inside visible area and scroll to it
	if (this.panelButtons.container.offsetWidth > this.panelButtons.div.offsetWidth)
	{
		var panelButtonsWidth = this.panelButtons.div.offsetWidth;
		var x = this.buttons[index].div.offsetLeft;

		if (index > 0 )
		{
			x = this.buttons[index - 1].div.offsetLeft;
		}

		if (-x < (this.panelButtons.div.offsetWidth - this.panelButtons.container.offsetWidth))
		{
			x = -(this.panelButtons.div.offsetWidth - this.panelButtons.container.offsetWidth);
		}

		this.panelButtons.scrollTo(-x, 0, 200, 'ease');
	}
}
