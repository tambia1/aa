spa.AlertPicker = function(divId, listSelectType, items, selectedItems, title, subTitle, buttonSelectText, buttonCancelText, onSelect, onCancel)
{
	let str = '' +
		'<div id="' + divId + '" class="alertPicker"></div>' +
	'';

    spa.Text.baseClass.constructor.call(this, str);

	//background
	let dropDownBackground = new spa.Item('<div class="alertPicker_background"></div>');
	this.addItem(dropDownBackground);

	spa.UiClick.decorate(dropDownBackground.div, function(){
		this.hide();
	}.bind(this, this));


	//list
	let popup = new spa.Item('<div class="alertPicker_popup"></div>');
	this.addItem(popup);

	let popupTitle = new spa.Text('', 'alertPicker_popup_title', title);
	popup.addItem(popupTitle);

	let popupSubTitle = new spa.Text('', 'alertPicker_popup_subtitle', subTitle);
	popupSubTitle.setIsVisible(subTitle != null);
	popup.addItem(popupSubTitle);

	let panel = new spa.Panel('', 'alertPicker_panel', spa.Panel.DIRECTION_VER);
	popup.addItem(panel);

	let list = new spa.List('', 'alertPicker_list', listSelectType);
	list.setAttribute('type', listSelectType)

	list.onSelectChanged = function(){
		let selectedCell = list.selectedCells[0];
		let item = selectedCell.item;
	}.bind(this);
	panel.addItem(list);


	for (let i = 0; i < items.length; i++){
		let cell = new spa.ListCellImage('', '', '', items[i].text, null);

		cell.item = items[i];
		list.addItem(cell);
	}


	for (let i = 0; i < selectedItems.length; i++){
		list.setSelectedCellIndex(selectedItems[i]);
	}


	//footer buttons
	let buttonsActions = new spa.Item('<div class="alertPicker_buttons"></div>');
	popup.addItem(buttonsActions);

	let buttonCancel = new spa.ButtonText('', 'alertPicker_button_cancel', buttonCancelText, function(){
		this.setIsVisible(false);
		onCancel && onCancel();
	}.bind(this));
	buttonsActions.addItem(buttonCancel);

	let buttonSelect = new spa.ButtonText('', 'alertPicker_button_select', buttonSelectText, function(){
		this.setIsVisible(false);

		let selectedItems = [];

		for (let i = 0; i < list.selectedCells.length; i++){
			selectedItems.push(list.selectedCells[i].item);
		}

		onSelect && onSelect(selectedItems);
	}.bind(this));
	buttonsActions.addItem(buttonSelect);


	//set initial state
	this.setIsVisible(false);

	//save items
	this.list = list;
}

spa.inherit(spa.AlertPicker, spa.Item);

spa.AlertPicker.prototype.show = function()
{
	setTimeout(function() {
		this.setIsVisible(true);
	}.bind(this), 100);
}

spa.AlertPicker.prototype.hide = function()
{
	this.setIsVisible(false);

	setTimeout(function() {
		this.div.parentNode.removeChild(this.div);
	}.bind(this), 300);
}
