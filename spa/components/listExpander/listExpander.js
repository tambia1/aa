spa.ListExpander = function(divId, divClass, text, onExpandedStateChanged)
{
	//call base constructor
	var str = '' +
		'<div id="' + divId + '" class="list_cell_expander ' + divClass + '">' +
		'</div>' +
	'';

    this.item = new spa.Item(str);

	//set vars
	this.onExpandedStateChanged = onExpandedStateChanged;

	this.header = new spa.ListCell('', '', text, this.onHeaderTap.bind(this));
	this.addItem(this.header);

	this.expander = new spa.Expander('');
	this.addItem(this.expander);

	this.list = new spa.List('', '', spa.List.SELECT_TYPE_NONE);
	this.expander.addItem(this.list);

	this.setIsExpanded(false, false);
}

spa.ListExpander.prototype.item = null;

spa.ListExpander.prototype.header = null;
spa.ListExpander.prototype.expander = null;
spa.ListExpander.prototype.list = null;

spa.ListExpander.prototype.onExpandedStateChanged = null;

spa.ListExpander.prototype.onHeaderTap = function()
{
	if (this.item.div.getAttribute('isEnabled') == 'false')
	{
		return;
	}

	this.setIsExpanded(! this.isExpanded, true);
}

spa.ListExpander.prototype.setIsExpanded = function(isExpanded, isAnimated)
{
	this.isExpanded = isExpanded;

	this.item.div.setAttribute('isExpanded', this.isExpanded);

	this.expander.setIsExpanded(this.isExpanded, isAnimated);

	//invoke cell onExpandedStateChanged
	this.onExpandedStateChanged && this.onExpandedStateChanged();
}

