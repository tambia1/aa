spa.Legend = function(divId, divClass, text)
{
	var str = ''+
		'<div id="' + divId + '" class="legend ' + divClass + '">'+
			'<span class="legend_text" data-string="">'+
			'</span>'+

			'<div class="legend_line">'+
				'<hr/>'+
			'</div>'+
		'</div>'+
	'';

    this.item = new spa.Item(str);

	this.setText(text);
}

spa.Legend.prototype.item = null;

spa.Legend.prototype.setText = function (text) {
    spa.Strings.setText(this.item.div, text);
}
