spa.Csv = {};

spa.Csv.escapeCell = function (cellData)
{
	if (typeof cellData === 'string'){
		return '"' + cellData.replace(/\"/g, '""') + '"';
	}

	return cellData;
};

spa.Csv.getRowData = function(row)
{
	return row.map(spa.Csv.escapeCell).join(',');
}

spa.Csv.build = function(columns, rows)
{
	let dataArray = [];

	if (columns && columns.length > 0){
		dataArray.push(spa.Csv.getRowData(columns));
	}

	rows.forEach(function (row) {
		dataArray.push(spa.Csv.getRowData(row));
	});

	let csvContent = dataArray.join('\r\n');

	return csvContent;
}

spa.Dom.exportToFile = function(fileName, data)
{
	let charBom = "\uFEFF";
	let encodedData = encodeURIComponent(data);
	let content = "data:text/csv;charset=utf-8," + charBom + encodedData;
	let link = document.createElement('a');
	link.setAttribute('href', content);
	link.setAttribute('download', fileName);
	link.setAttribute('target', '_system');
	document.body.appendChild(link);
	link.click();
}
