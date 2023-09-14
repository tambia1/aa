spa.CheckBox = function(divId, divClass, text, onChange)
{
	//call base constructor
	let randomNumber = parseInt(Math.random() * 1000);

	let str = ''+
		'<div id="' + divId + '" class="checkbox ' + divClass + '">'+
			'<input id="input_' + randomNumber + '" type="checkbox"/>'+
			'<label for="input_' + randomNumber + '"></label>'+
			'<div class="checkbox_text" data-string=""></div>' +
		'</div>'+
	'';

    this.item = new spa.Item(str);

    this.input = this.item.div.querySelector('input');
	this.text = this.item.div.querySelector('.checkbox_text');

	this.input.checked = false;

    this.onChange = onChange;

	this.setText(text);

	this.input.addEventListener('change', function(e) {
		this.onChange && this.onChange(this.input.checked);
	}.bind(this));

	spa.UiClick.decorate(this.text, function() {
		this.setIsChecked(! this.input.checked);
	}.bind(this));
}

spa.CheckBox.prototype.item = null;

spa.CheckBox.prototype.onChange = null;

spa.CheckBox.prototype.setIsChecked = function (isChecked) {
	this.input.checked = isChecked;
	this.onChange && this.onChange(isChecked);
}

spa.CheckBox.prototype.getIsChecked = function () {
	return this.input.checked;
}

spa.CheckBox.prototype.setText = function (text) {
	spa.Strings.setText(this.text, text);
}

spa.CheckBox.prototype.getText = function () {
	return spa.Strings.getText(this.text);
}

