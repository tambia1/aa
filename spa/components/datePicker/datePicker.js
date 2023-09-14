spa.DatePicker = function(divId, divClass, onChange) {
	let str = '' +
		'<div id="' + divId + '" class="' + divClass + ' date_picker">'+
			'<select id="picker-m-0" class="picker-m"><option value="1">Jan</option><option value="2">Feb</option><option value="3">Mar</option><option value="4">Apr</option><option value="5">May</option><option value="6">Jun</option><option value="7">Jul</option><option value="8">Aug</option><option value="9">Sep</option><option value="10">Oct</option><option value="11">Nov</option><option value="12">Dec</option></select>'+
		'</div>' +
	'';

    this.item = new spa.Item(str);

	//save vars
	this.onChange = onChange;
}

spa.DatePicker.prototype.item = null;
spa.DatePicker.prototype.onChange = null;
