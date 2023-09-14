spa.ProgressBar = function(divId, divClass, minValue, maxValue)
{
	this.minValue = minValue;
	this.maxValue = maxValue;

	var str = '' +
		'<div id="' + divId + '" class="progressbar ' + divClass + '">' +
			'<div class="progressbar_value"></div>' +
		'</div>' +
	'';

    this.item = new spa.Item(str);

	this.divValue = this.item.div.querySelector('.progressbar_value');

	this.setValue(0);
}

spa.ProgressBar.prototype.item = null;

spa.ProgressBar.prototype.setValue = function(value, isAnimated)
{
	this.value = value;

	//take percentage
	var percent = (this.value / (this.maxValue - this.minValue)) * 100;

	//keep value between 0 - 100
	percent = Math.min(percent, 100);
	percent = Math.max(percent, 0);

	//set value
	this.divValue.setAttribute('isAnimated', isAnimated);
	this.divValue.style.width = percent + '%';
}
