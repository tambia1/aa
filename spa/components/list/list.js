spa.List = function(divId, divClass, selectType)
{
	var html = ''+
		'<div id="' + divId + '" class="list ' + divClass + '">'+
		'</div>'+
	'';

    spa.decorate(this, new spa.UiElement(html));
	
	//save vars
	this.selectType = selectType;

	this.cells = [];
	this.selectedCells = [];
}

spa.List.SELECT_TYPE_NONE = 'List.SELECT_NONE';
spa.List.SELECT_TYPE_SINGLE = 'List.SELECT_SINGLE';
spa.List.SELECT_TYPE_MULTIPLE = 'List.SELECT_MULTIPLE';


spa.List.prototype.cells = null;
spa.List.prototype.selectType = null;
spa.List.prototype.selectedCells = null;


spa.List.prototype.onSelectChanged = null;

spa.List.prototype.addItem = function(item)
{
	item.setParentList(this);

	this.div.appendChild(item.div);

	this.cells.push(item);

	if (this.selectType == spa.List.SELECT_TYPE_SINGLE && this.cells.length == 1){
		this.setSelectedCellIndex(0)
	}
}

spa.List.prototype.removeAllItems = function()
{
	this.div.innerHTML = '';

	this.cells.length = 0;
	this.selectedCells.length = 0;
}

spa.List.prototype.setSelectedCell = function(cell)
{
	//select cell according to this.selectType
	switch(this.selectType)
	{
		case spa.List.SELECT_TYPE_NONE: {
            break;
        }

		case spa.List.SELECT_TYPE_SINGLE: {
            if (this.selectedCells[0] != null && this.selectedCells[0] != cell) {
                this.selectedCells[0].setIsSelected(false);
                //notify that list select is changed
                this.onSelectChanged && this.onSelectChanged(this.selectedCells[0]);
            }

            cell.setIsSelected(true);
            this.selectedCells[0] = cell;
            //notify that list select is changed
            this.onSelectChanged && this.onSelectChanged(cell);

            break;
        }

		case spa.List.SELECT_TYPE_MULTIPLE: {
            var selectedCellIndex = this.selectedCells.indexOf(cell);

            if (cell.div.getAttribute('isSelected') == 'true') {
                cell.setIsSelected(false);

                if (selectedCellIndex > -1) {
                    this.selectedCells.splice(selectedCellIndex, 1);
                }

                //notify that list select is changed
                this.onSelectChanged && this.onSelectChanged(cell);
            }
            else {
                cell.setIsSelected(true);

                if (selectedCellIndex == -1) {
                    this.selectedCells.push(cell);
                }

                //notify that list select is changed
                this.onSelectChanged && this.onSelectChanged(cell);
            }

            break;
        }
	}
}

spa.List.prototype.setSelectedCellIndex = function(index)
{
	if (index < this.cells.length){
		this.setSelectedCell(this.cells[index]);
	}
}

spa.List.prototype.clearAllSelectedCells = function()
{
	for (var i=0; i < this.selectedCells.length; i++)
	{
		this.selectedCells[i].setIsSelected(false);
		//notify that list select is changed
		this.onSelectChanged && this.onSelectChanged(this.selectedCells[i]);
	}

	this.selectedCells.length = 0;
}

spa.List.prototype.getSelectedCells = function()
{
	return this.selectedCells;
}

spa.List.prototype.onScroll = function()
{
	for (let i = 0; i < this.div.children.length; i++) {
		spa.Dom.fireEvent(this.div.children[i], spa.Device.mousecancel);
	}
}

