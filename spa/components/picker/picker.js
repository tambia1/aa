spa.Picker = function(divId, divClass, onOk, onCancel)
{
	//call base constructor
	let str = ''+
		'<div id="' + divId + '" class="picker ' + divClass + '">'+
			'<div class="picker_background">'+
			'</div>'+

			'<div class="picker_box">'+
				'<div class="picker_header">'+
				'</div>'+

				'<div class="picker_body">'+
					'<div class="picker_container">'+
						'<div class="picker_cover_top">'+
						'</div>'+

						'<div class="picker_cover_center">'+
						'</div>'+

						'<div class="picker_cover_bottom">'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>'+
	'';

    this.item = new spa.Item(str);

    this.onOk = onOk;
    this.onCancel = onCancel;


	//set visible false
	this.item.div.setAttribute('isVisible', 'false');

	//background
	this.background = new spa.Item(this.item.div.querySelector('.picker_background'));
	spa.UiClick.decorate(this.background.div, this.actionButtonCancel.bind(this));

	//header
	this.header = new spa.Item(this.item.div.querySelector('.picker_header'));

	//container
	this.container = new spa.Item(this.item.div.querySelector('.picker_container'));

	//center cover
	this.coverCenter = new spa.Item(this.item.div.querySelector('.picker_cover_center'));

	//create back button
	this.buttonCancel = new spa.PickerButton('picker_button_cancel', '', '', this.actionButtonCancel.bind(this));
	this.header.addItem(this.buttonCancel);

	//add ok button
	this.buttonOk = new spa.PickerButton('picker_button_ok', '', '', this.actionButtonOk.bind(this));
	this.header.addItem(this.buttonOk);

	//create array of panels
	this.picks = [];
	this.picksOldSelections = [];
}

spa.Picker.prototype.item = null;

spa.Picker.prototype.picks = null;
spa.Picker.prototype.picksOldSelections = null;

spa.Picker.prototype.onOk = null;
spa.Picker.prototype.onCancel = null;

spa.Picker.prototype.picks = null;

spa.Picker.prototype.addPick = function(data, onSelectionChanged)
{
	let pick = new spa.Pick('', 'picker_pick', onSelectionChanged);
	pick.addTextItems(data);
	pick.setSelectedItemIndex(0);
	this.addItem(pick);

	//add pick
	this.container.addItem(pick);

	//save pick
	this.picks.push(pick);

	//fix positions
	let pickWidth = 100 / this.picks.length;

	for (let i=0; i < this.picks.length; i++){
		this.picks[i].div.style.width = 'calc( ' + pickWidth + '%)';
		this.picks[i].div.style.left = 'calc( ' + (pickWidth * i) + '%)';
	}
}

spa.Picker.prototype.setSelectedItemIndex = function(pickIndex, itemIndex, isSmooth)
{
	this.picks[pickIndex].setSelectedItemIndex(itemIndex, isSmooth);
}

spa.Picker.prototype.setSelectedItemValue = function(pickIndex, itemValue, isSmooth)
{
	this.picks[pickIndex].setSelectedItemValue(itemValue, isSmooth);
}

spa.Picker.prototype.getSelectedItemsIndexes = function()
{
	let selections = [];

	for (let i = 0; i < this.picks.length; i++){
		selections.push(this.picks.getSelectedItemIndex());
	}

	return selections;
}

spa.Picker.prototype.getSelectedItemsValues = function()
{
	let selections = [];

	for (let i = 0; i < this.picks.length; i++){
		selections.push(this.picks.getSelectedItemValue());
	}

	return selections;
}

spa.Picker.prototype.actionButtonCancel = function()
{
	for (let i=0; i < this.picks.length; i++){
		this.picks[i].setSelectedItemIndex(this.picksOldSelections[i], true);
	}

	this.setIsVisible(false);

	let selections = [];
	let values = [];
	let data = [];

	for (let i=0; i < this.picks.length; i++){
		selections.push(this.picks[i].selectedItemIndex);
		values.push(this.picks[i].items[this.picks[i].selectedItemIndex].div.innerHTML);
		data.push(this.picks[i].items[this.picks[i].selectedItemIndex].datum);
	}

	this.onCancel && this.onCancel(selections, values, data);
}

spa.Picker.prototype.actionButtonOk = function()
{
	this.setIsVisible(false);

	let indexes = [];
	let values = [];
	let data = [];

	for (let i=0; i < this.picks.length; i++){
		indexes.push(this.picks[i].selectedItemIndex);
		values.push(this.picks[i].items[this.picks[i].selectedItemIndex].div.innerHTML);
		data.push(this.picks[i].items[this.picks[i].selectedItemIndex].datum);
	}

	this.onOk && this.onOk(indexes, values, data);
}

spa.Picker.prototype.setIsVisible = function(isVisible)
{
	this.baseClass.setIsVisible.call(this, isVisible);

	//save all selection in case of cancel button pressed
	this.picksOldSelections.length = 0;

	for (let i=0; i < this.picks.length; i++){
		this.picksOldSelections.push(this.picks[i].selectedItemIndex);
	}
}


