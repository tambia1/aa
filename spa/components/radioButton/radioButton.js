spa.RadioButton = function(divId, divClass, groupName, text, onChange)
{
	//call base constructor
	this.groupName = groupName;
	this.onChange = onChange;

	let randomNumber = parseInt(Math.random() * 1000);

	let str = ''+
		'<div id="' + divId + '" class="radiobutton ' + divClass + '" isChecked="false">'+
			'<input id="input_' + randomNumber + '" type="radio" name="' + groupName + '"/>'+
			'<label for="input_' + randomNumber + '"></label>'+
			'<div class="radiobutton_text" data-string=""></div>' +
		'</div>'+
	'';

    this.item = new spa.Item(str);

	this.input = this.item.div.querySelector('#input_' + randomNumber);
	this.text = this.item.div.querySelector('.radiobutton_text');

	this.setText(text);

	this.input.addEventListener('change', function(e) {
		this.onChange && this.onChange(this.input.checked);
	}.bind(this));

	spa.UiClick.decorate(this.text, function() {
		this.setIsChecked(true, true);
	}.bind(this));

	spa.RadioButton.list[this.groupName] = spa.RadioButton.list[this.groupName] || [];
	spa.RadioButton.list[this.groupName].push(this);
}

spa.RadioButton.prototype.item = null;

spa.RadioButton.list = {};

spa.RadioButton.prototype.onChange = null;

spa.RadioButton.prototype.setIsChecked = function (isChecked, isInvokeOnChange) {
	for (let i = 0; i < spa.RadioButton.list[this.groupName].length; i++){
		spa.RadioButton.list[this.groupName][i].div.setAttribute('isChecked', false);
	}

	this.item.div.setAttribute('isChecked', isChecked);
	this.input.checked = isChecked;

	if (isInvokeOnChange == true){
		this.onChange && this.onChange(isChecked);
	}
}

spa.RadioButton.prototype.getIsChecked = function () {
	return this.input.checked;
}

spa.RadioButton.prototype.setText = function (text) {
	spa.Strings.setText(this.text, text);
}

spa.RadioButton.prototype.getText = function () {
	return spa.Strings.getText(this.text);
}

