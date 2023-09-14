spa.Pick = function(divId, divClass, onSelectionChanged)
{

	//call base constructor
	let str = ''+
		'<div id="' + divId + '" class="pick ' + divClass + '">'+
		'</div>'+
	'';

    this.item = new spa.Item(str);

    //save lets
    this.onSelectionChanged = onSelectionChanged;

    //create panel
	this.panel = new spa.Panel('picker_panel', '', spa.Panel.DIRECTION_VER);
	this.addItem(this.panel);

	this.panel.onScrollEnded = this.onScrollEnded.bind(this);

	//items
	this.items = [];

	this.selectedItemIndex = 0;
}

spa.Pick.prototype.item = null;

spa.Pick.prototype.items = null;
spa.Pick.prototype.selectedItemIndex = null;

spa.Pick.prototype.addTextItem = function(datum)
{
	let text = datum.text || datum;

    let item = new spa.Text('', 'pick_item', text);
	item.datum = datum;

    this.addPickItem(item);
}

spa.Pick.prototype.addTextItems = function(data)
{
    for (let i=0; i < data.length; i++){
        this.addTextItem(data[i]);
    }
}

spa.Pick.prototype.addPickItem = function(item)
{
	this.panel.addItem(item);
	this.items.push(item);

	//attach button onTap
	let button = spa.ButtonClick(item.div, this.setSelectedItemIndex.bind(this, this.items.length - 1, true));
}

spa.Pick.prototype.removePickItem = function(item)
{
	this.panel.removeItem(item);
}

spa.Pick.prototype.removeAllPickItems = function()
{
	this.panel.removeAllItems();
}

spa.Pick.prototype.onScrollEnded = function()
{
    //fix destination if position is not accurate according to item
	let itemIndex = 0;
    let panelItems = this.panel.div.querySelectorAll('.container > *');

	for (let i=0; i < panelItems.length; i++){
		let itemY1 = panelItems[i].offsetTop - this.panel.div.scrollTop;
		let itemY2 = panelItems[i].offsetTop - this.panel.div.scrollTop + panelItems[i].offsetHeight;
		let itemYMiddle = (itemY1 + itemY2) / 2

		let panelY1 = this.panel.div.offsetHeight / 2 - panelItems[i].offsetHeight / 2;
		let panelY2 = this.panel.div.offsetHeight / 2 + panelItems[i].offsetHeight / 2;


		if (itemYMiddle >= panelY1 && itemYMiddle <= panelY2){
			itemIndex = i;
			break;
		}
	}

    this.panel.onScrollEnded = null;
    this.setSelectedItemIndex(itemIndex, true);
    this.panel.onScrollEnded = this.onScrollEnded.bind(this);
}

spa.Pick.prototype.setSelectedItemIndex = function(itemIndex, isSmooth)
{
	this.selectedItemIndex = itemIndex;

	let panelItems = this.item.div.querySelectorAll('.container > *');
	let itemX = 0;
	let itemY = 0;

	let paddingTop = parseFloat(window.getComputedStyle(this.panel.container)['padding-top']);
	itemY = panelItems[itemIndex].offsetTop - paddingTop;

	//scroll
	this.panel.scrollTo(itemX, itemY, isSmooth);

	this.onSelectionChanged && this.onSelectionChanged(itemIndex, this.items[itemIndex], this.items[itemIndex].item);
}

spa.Pick.prototype.setSelectedItemValue = function(itemValue, isSmooth)
{
	for (let i = 0; i < this.items.length; i++){
		if (this.items[i].div.innerText == itemValue){
			this.setSelectedItemIndex(i, isSmooth);
			break;
		}
	}
}

spa.Pick.prototype.getItems = function()
{
	return this.items;
}

spa.Pick.prototype.getSelectedItemIndex = function()
{
	return this.selectedItemIndex;
}

spa.Pick.prototype.getSelectedItemValue = function()
{
	return this.items[this.selectedItemIndex].div.innerText;
}

