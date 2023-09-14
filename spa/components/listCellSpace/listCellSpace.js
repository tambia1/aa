spa.ListCellSpace = function(divId, divClass)
{
	let html = '' +
		'<div id="' + divId + '" class="cell-space' + divClass + '">' +
		'</div>' +
	'';

    spa.decorate(this, new spa.UiElement(html));
}

spa.ListCellSpace.prototype.setParentList = function (parentList) 
{
    this.parentList = parentList;
}
