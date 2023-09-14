spa.DataGrid = function(divId, divClass)
{
	//call base constructor
	var str = ''+
		'<div id="' + divId + '" class="datagrid ' + divClass + '">'+
		'</div>'+
	'';

    this.item = new spa.Item(str);

	//header
	this.itemHeader = new spa.Item('<div id="datagrid_header"></div>');
	this.addItem(this.itemHeader);

	//rows
	this.panelRows = new spa.Panel('datagrid_panel', '', spa.Panel.DIRECTION_VER);
	this.addItem(this.panelRows);

	//create array of panels
	this.header = null;
	this.headerCells = [];
	this.rows = [];
	this.classes = [];

	this.isMultiSelect = false;
}

spa.DataGrid.prototype.item = null;

spa.DataGrid.prototype.header = null;
spa.DataGrid.prototype.rows = null;

spa.DataGrid.prototype.classes = null;

spa.DataGrid.prototype.isMultiSelect = null;

spa.DataGrid.prototype.onHeaderSelectionChanged = null;
spa.DataGrid.prototype.onRowSelectionChanged = null;

spa.DataGrid.prototype.removeHeader = function()
{
	this.itemHeader.removeItem(this.header);

	this.header = null;
    this.headerCells = [];
}

spa.DataGrid.prototype.removeRow = function(row)
{
	this.panelRows.removeItem(row);

	var rowIndex = this.rows.indexOf(row);

	if (rowIndex != -1){
		this.rows.splice(rowIndex, 1);
	}
}

spa.DataGrid.prototype.removeRowAtIndex = function(rowIndex)
{
	this.removeRow(this.rows[rowIndex]);
}

spa.DataGrid.prototype.removeAllRows = function()
{
	while (this.rows.length){
		this.removeRow(this.rows[0]);
	}
}

spa.DataGrid.prototype.doActionHeader = function(headerIndex)
{
	this.onHeaderSelectionChanged && this.onHeaderSelectionChanged(headerIndex);
}

spa.DataGrid.prototype.doActionRow = function(rowIndex)
{
	if (this.isMultiSelect == false){
		for (var i=0; i < this.rows.length; i++){
			this.rows[i].setIsSelected(false);
		}

		this.rows[rowIndex].setIsSelected(true);
	}
	else{
		if (this.rows[rowIndex].div.getAttribute('isSelected') == 'true'){
			this.rows[rowIndex].setIsSelected(false);
		}
		else{
			this.rows[rowIndex].setIsSelected(true);
		}
	}

	this.onRowSelectionChanged && this.onRowSelectionChanged(rowIndex);
}

spa.DataGrid.prototype.setCols = function(cols)
{
	let row = new spa.Item('<div class="datagrid_row"></div>');
    row.setIsSelected(false);

    this.itemHeader.addItem(row);
    this.header = row;
    this.headerCells = [];

    //put cells to row
	for (var i=0; i < cols.length; i++){
		var item = new spa.Item('<div class="datagrid_cell ' + (this.classes[i] || '') + '"><div data-string="">' + cols[i] + '</div></div>');
		row.addItem(item);

        this.headerCells.push(item);

        //attach button onTap to row cells
        let button = spa.ButtonClick(item.div, this.doActionHeader.bind(this, i));
        item.setIsSelected(false);
	}
}

spa.DataGrid.prototype.addRows = function(rows)
{
	for (var i=0; i < rows.length; i++){
		let row = new spa.Item('<div class="datagrid_row"></div>');
        row.setIsSelected(false);

        this.panelRows.addItem(row);
        this.rows.push(row);

        //attach button onTap
        let button = spa.ButtonClick(row.div, this.doActionRow.bind(this, this.rows.length - 1));

        //put cells to row
        for (var j=0; j < rows[i].length; j++){
			var item = new spa.Item('<div class="datagrid_cell ' + (this.classes[j] || '') + '"><div data-string="">' + rows[i][j] + '</div></div>');
			row.addItem(item);
		}
	}
}

spa.DataGrid.prototype.setCellClass = function(classes)
{
	this.classes = classes;
}


