spa.Spinner = function(divId, divClass)
{
	//call base constructor
	var str = ''+
		'<div id="' + divId + '" class="spinner_container ' + divClass + '">'+
			'<div class="spinner">'+
			'</div>'+
		'</div>'+
	'';

    this.item = new spa.Item(str);

	//set visible false
	this.item.setIsVisible(false);
}

spa.Spinner.prototype.item = null;

