/*
	var csvBuilder = new CsvBuilder("user_list.csv")
		.setColumns(["name", "surname"])
		.addRow(["Eve", "Holt"])
		.addRows([
			["Charles", "Morris"],
			["Tracey", "Ramos"]
		])
		.exportFile();
 */

function CsvBuilder(fileName) {
	this._FileName = '';
	this._Delimeter = ',';
	this._Columns = [];
	this._RowData = [];
	this._FileName = fileName;
	return this;
}

CsvBuilder.prototype.setColumns = function (columns) {
	this._Columns = columns;
	return this;
};
CsvBuilder.prototype.setDelimeter = function (delimeter) {
	this._Delimeter = delimeter;
	return this;
};
CsvBuilder.prototype.addRow = function (row) {
	this._RowData.push(row);
	return this;
};
CsvBuilder.prototype.addRows = function (rows) {
	this._RowData = this._RowData.concat(rows);
	return this;
};
CsvBuilder.prototype.escapeCell = function (cellData) {
	if (typeof cellData === 'string')
	{
		return '"' + cellData.replace(/\"/g, '""') + '"';
	}
	return cellData;
};
CsvBuilder.prototype.getRowData = function (row) {
	return row.map(this.escapeCell).join(this._Delimeter);
};
CsvBuilder.prototype.exportFile = function () {
	var _this = this;
	var dataArray = [];
	if (this._Columns && this._Columns.length > 0)
	{
		dataArray.push(this.getRowData(this._Columns));
	}
	this._RowData.forEach(function (row) {
		dataArray.push(_this.getRowData(row));
	});
	var csvContent = dataArray.join("\r\n");
	this.exportCsv('csv', this._FileName, csvContent);
};
CsvBuilder.prototype.exportCsv = function (dataType, fileName, data) {
	if (window.navigator.msSaveOrOpenBlob) {
		var blob = new Blob([data]);
		window.navigator.msSaveOrOpenBlob(blob, fileName);
	}
	else {
		var charBom = "\uFEFF";
		var encodedData = encodeURIComponent(data);
		var content = "data:text/" + dataType + ";charset=utf-8," + charBom + encodedData;
		var link = document.createElement("a");
		link.setAttribute("href", content);
		link.setAttribute("download", fileName);
		link.setAttribute("target", "_system");
		document.body.appendChild(link);
		link.click();
	}
};
