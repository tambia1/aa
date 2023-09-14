spa.TabBar = function(divId, divClass, onTabWillChange, onTabDidChange)
{
	//call base constructor
	var html = ''+
		'<div id="' + divId + '" class="tabbar ' + divClass + '">'+
			'<div class="tabbar_tabs">'+
			'</div>'+
			'<div class="tabbar_buttons">'+
			'</div>'+
		'</div>'+
	'';

	spa.decorate(this, new spa.UiElement(html));

	this.itemTabs = new spa.Item(this.div.querySelector('.tabbar_tabs'));
	this.itemButtons = new spa.Item(this.div.querySelector('.tabbar_buttons'));

	//save vars
    this.onTabWillChange = onTabWillChange;
    this.onTabDidChange = onTabDidChange;

	//set vars
	this.items = [];
}

spa.TabBar.TIMER_ANIMATION = 100;

spa.TabBar.prototype.items = null;
spa.TabBar.prototype.timeoutSelectionChange = null;

spa.TabBar.prototype.addItem = function(item, itemId, buttonDivId, buttonDivClass, buttonImageClass, buttonText)
{
	//save pointer to tabbar in view (navbarView or view)
	item.tabbar = this;

	let itemTab = new spa.Item('<div class="tabbar_tab" id="' + itemId + '"></div>');
	spa.decorate(itemTab, new spa.UiSelect());
	itemTab.addItem(item);
	this.itemTabs.addItem(itemTab);

	let itemButton = new spa.TabBarButton(buttonDivId, buttonDivClass, buttonImageClass, buttonText, this.onClickButton.bind(this, this.items.length));
	spa.decorate(itemButton, new spa.UiSelect());
	this.itemButtons.addItem(itemButton);

	this.items.push({itemId: itemId, itemTab: itemTab, itemButton: itemButton, item: item});

	// if (this.items.length == 1){
		// itemTab.setIsSelected(true);
		// itemButton.setIsSelected(true);
	// }
	// else{
		itemTab.setIsSelected(false);
		itemButton.setIsSelected(false);
	// }
}

spa.TabBar.prototype.getItem = function(index)
{
	return this.items[index];
}

spa.TabBar.prototype.getItemIndexByItem = function(item)
{
	let itemIndex = -1;

	for (let i = 0; i < this.items.length; i++){
		if (this.items[i].item == item){
			itemIndex = i;
			break;
		}
	}

	return itemIndex;
}

spa.TabBar.prototype.getItemIndexById = function(itemId)
{
	let itemIndex = -1;

	for (let i = 0; i < this.items.length; i++){
		if (this.items[i].itemId == itemId){
			itemIndex = i;
			break;
		}
	}

	return itemIndex;
}

spa.TabBar.prototype.getItemIdByItemIndex = function(itemIndex)
{
	let itemId = null;

	if (itemIndex < this.items.length){
		itemId = this.items[itemIndex].itemId;
	}

	return itemId;
}

spa.TabBar.prototype.setSelectedItemIndex = function(itemIndex, isInvokeOnTabSelectionChange, isInvokeOnViewShowHide)
{
	let oldItemIndex = this.getSelectedItemIndex();

	//deselect all items and select only one
	for (let i = 0; i < this.items.length; i++){
		this.items[i].itemTab.setIsSelected(false);
		this.items[i].itemButton.setIsSelected(false);
	}

	this.items[itemIndex].itemTab.setIsSelected(true);
	this.items[itemIndex].itemButton.setIsSelected(true);

	//if items are navbarView then invoke functions
	let oldView = this.items[oldItemIndex]?.item;
	let newView = this.items[itemIndex].item;

	if (oldView instanceof spa.NavBar){
		oldView = oldView.getCurrentView();
	}

	if (newView instanceof spa.NavBar){
		newView = newView.getCurrentView();
	}

	//invoke callbacks
	if (isInvokeOnTabSelectionChange == true && oldItemIndex != itemIndex){
		this.onTabWillChange?.(itemIndex, oldItemIndex);
	}

	if (isInvokeOnViewShowHide == true && oldItemIndex != itemIndex){
		oldView?.onViewWillHide?.();
		newView?.onViewWillShow?.();
	}

	if (isInvokeOnTabSelectionChange == true && oldItemIndex != itemIndex){
		this.onTabDidChange && this.onTabDidChange(itemIndex, oldItemIndex);
	}

	if (isInvokeOnViewShowHide == true && oldItemIndex != itemIndex){
		oldView?.onViewDidHide?.();
		newView?.onViewDidShow?.();
	}

	//if same tab index pressed and first item was instance of navbar then go back to first view
	let firstView = this.items[itemIndex].item;

	if (oldItemIndex == itemIndex && firstView instanceof spa.NavBar && isInvokeOnTabSelectionChange == true){
		firstView.goHome();
	}
}

spa.TabBar.prototype.getSelectedItemIndex = function()
{
	for (let i = 0; i < this.items.length; i++){
		if (this.items[i].itemTab.getIsSelected() == true){
			return i;
		}
	}

	return -1;
}

spa.TabBar.prototype.getSelectedItemId = function()
{
	return this.getItemIdByItemIndex(this.getSelectedItemIndex());
}

spa.TabBar.prototype.setButtonBadge = function(itemIndex, badgeText)
{
	this.items[itemIndex].itemButton.setBadge(badgeText);
}

spa.TabBar.prototype.onClickButton = function(itemIndex)
{
	this.setSelectedItemIndex(itemIndex, true, true);
}

