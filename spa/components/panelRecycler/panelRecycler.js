spa.PanelRecycler = function(divId, divClass, direction, getItemTypeCount, getItemType, getItemViewCount, getItemViewSize, getItemView)
{
	this.direction = direction;

	this.getItemTypeCount = getItemTypeCount;
	this.getItemType = getItemType;
	this.getItemViewCount = getItemViewCount;
	this.getItemViewSize = getItemViewSize;
	this.getItemView = getItemView;

	//call base constructor
	var str = ''+
		'<div id="' + divId + '" class="panelRecycler ' + divClass + '" direction="' + ((direction == spa.PanelRecycler.DIRECTION_HOR) ? 'hor' : 'ver') + '">'+
			'<div class="container ' + ((direction == spa.PanelRecycler.DIRECTION_HOR) ? 'panelRecycler_container_hor' : 'panelRecycler_container_ver') + '">'+
			'</div>'+
		'</div>'+
	'';

    this.item = new spa.Item(str);

	//create div 'container'
	this.container = this.item.div.querySelector('.container');

	// add gestureSwipe
	this.gestureSwipe = new spa.GestureSwipe(
		this.item.div,
		(direction == spa.PanelRecycler.DIRECTION_HOR) ? spa.GestureSwipe.DIRECTION_HOR : spa.GestureSwipe.DIRECTION_VER,
		this.actionStart.bind(this),
		this.actionMove.bind(this),
		this.actionEnd.bind(this)
	);

	//listen to div scroll event
	this.item.div.onscroll = this.onScroll.bind(this);

	spa.Utils.onElementVisible(this.item.div, function(){
		this.recycleItems();
	}.bind(this));
}

spa.PanelRecycler.DIRECTION_HOR = 'DIRECTION_HOR';
spa.PanelRecycler.DIRECTION_VER = 'DIRECTION_VER';

spa.PanelRecycler.prototype.item = null;

spa.PanelRecycler.prototype.container = null;

spa.PanelRecycler.prototype.touchState = null;
spa.PanelRecycler.prototype.scrollState = null;
spa.PanelRecycler.prototype.scrollTimer = null;
spa.PanelRecycler.prototype.scrollTop = null;
spa.PanelRecycler.prototype.scrollLeft = null;

spa.PanelRecycler.prototype.onScrollStarted = null;
spa.PanelRecycler.prototype.onScrollMoving = null;
spa.PanelRecycler.prototype.onScrollEnded = null;

spa.PanelRecycler.prototype.addItem = function(item)
{
	this.container.appendChild(item.div);


	/*fix bug with chrome touch scrolling in wrong direction when RTL*/
	if (this.direction == spa.PanelRecycler.DIRECTION_HOR){

		this.container.setAttribute('isVisible', 'false');

		clearTimeout(this.timeoutHandler);

		this.timeoutHandler = setTimeout(function() {
			let dir = document.documentElement.dir;
			let x = (dir == 'rtl') ? 999999 : 0;

			this.item.div.scrollLeft = x;
			this.scrollTo(x, 0, false);

			this.container.setAttribute('isVisible', 'true');
		}.bind(this), 100);
	}
}

spa.PanelRecycler.prototype.addItems = function(items)
{
	for (var i=0; i < items.length; i++)
	{
		this.addItem(items[i]);
	}
}

spa.PanelRecycler.prototype.removeItem = function(item)
{
	this.container.removeChild(item.div);
}

spa.PanelRecycler.prototype.removeAllItems = function()
{
	while (this.container.firstChild) {
		this.container.removeChild(this.container.lastChild);
	}
}

spa.PanelRecycler.prototype.insertItem = function(item, index)
{
	this.container.insertBefore(item.div, this.container.childNodes[index]);
}

spa.PanelRecycler.prototype.actionStart = function()
{
	this.touchState = 'touchStart';
	this.scrollState = 'scrollStart';

	clearInterval(this.scrollTimer);
}

spa.PanelRecycler.prototype.actionMove = function(gap)
{
	this.touchState = 'touchMove';
}

spa.PanelRecycler.prototype.actionEnd = function(swipe, gap, pinch)
{
	this.touchState = 'touchEnd';
}

spa.PanelRecycler.prototype.onScroll = function(e)
{
	//scroll start
	if (this.scrollState != 'scrollMove') {
		this.scrollState = 'scrollMove'
		this.onScrollStarted && this.onScrollStarted(e);
	}

	//scroll move
	this.onScrollMoving && this.onScrollMoving(e);

	//scroll end
	clearInterval(this.scrollTimer);

	this.scrollTimer = setInterval(function(){
		let oldTop = this.scrollTop;
		let oldLeft = this.scrollLeft;

		this.scrollTop = this.item.div.scrollTop;
		this.scrollLeft = this.item.div.scrollLeft;

		if (oldTop == this.scrollTop && oldLeft == this.scrollLeft) {
			this.scrollState = 'scrollEnd'
			clearInterval(this.scrollTimer);
			this.onScrollEnded && this.onScrollEnded(e);
		}
	}.bind(this), 100);

	//refresh items
	this.recycleItems();
}

spa.PanelRecycler.prototype.scrollTo = function(x, y, isSmooth)
{
	this.item.div.scrollTo({left: x, top: y, behavior: isSmooth ? 'smooth' : 'auto'});
}

spa.PanelRecycler.prototype.items = [];

spa.PanelRecycler.prototype.recycleItems = function()
{
	let topItemsToSave = 2;
	let bottomItemsToSave = 2;

	let panelHeight = this.item.div.offsetHeight;
	let scrollTop = this.item.div.scrollTop;

	let index = 0;
	let indexY = 0;

	for (let i = 0; i < this.getItemViewCount(); i++){
		let itemViewSize = this.getItemViewSize(this, i);

		if (indexY + itemViewSize.height > scrollTop){
			index = i;
			break;
		}

		indexY += itemViewSize.height;
	}


	let itemSize = this.getItemViewSize(this, index);
	let y = indexY;

	for (let i = 0; i + index < this.getItemViewCount() && y - scrollTop < panelHeight + itemSize.height; i++){
		let oldItemView = this.items[i];
		let newItemView = this.getItemView(this, index + i, oldItemView);

		if (oldItemView == null){
			this.addItem(newItemView);
			this.items.push(newItemView);
		}

		newItemView.div.style.top = y + 'px';

		let itemViewSize = this.getItemViewSize(this, index + i);

		y += itemViewSize.height;
	}

	this.container.style.height = y + 'px';

}