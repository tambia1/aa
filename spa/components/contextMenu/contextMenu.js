spa.ContextMenu = function(divId, divClass, title, texts, callback)
{
	//call base constructor
	var str = ''+
		'<div id="' + divId + '" class="context_menu_cover ' + divClass + '">'+
		'</div>'+
	'';

    this.item = new spa.Item(str);

    //add gestures
    this.uiClick = new spa.UiClick(this.item.div, this.onClickContextMenuCover.bind(this));

    //set vars
	this.callback = callback;

    //set visible false
	this.setIsVisible(false);

	//add panel and list
    this.panel = new spa.Panel('context_menu_panel', '', spa.Panel.DIRECTION_VER);
    this.addItem(this.panel);

    this.title = new spa.Text('context_menu_title', '', title);
    this.panel.addItem(this.title);

    this.list = new spa.List('', '', spa.List.SELECT_TYPE_NONE);
    this.panel.addItem(this.list);

    for (let i = 0; i < texts.length; i++) {
        this.list.addItem(new spa.ListCell('', '', texts[i], this.onClickListCell.bind(this, i)));
    }
}

spa.ContextMenu.prototype.item = null;

spa.ContextMenu.prototype.callback = null;

spa.ContextMenu.prototype.onClickContextMenuCover = function () {
	this.setIsVisible(false);
}

spa.ContextMenu.prototype.setXY = function (e) {
    let x = e.pageX || e.touches[0].pageX;
    let y = e.pageY || e.touches[0].pageY;

    let boundingCover = this.item.div.getBoundingClientRect();

    let left = x - boundingCover.left;
    let top = y - boundingCover.top;
    let width = this.panel.div.offsetWidth;
    let height = this.panel.div.offsetHeight;

    left = left - width;
    top = top - height;

    top = top - Math.min(0, top);
    left = left - Math.min(0, left);

    this.panel.div.style.top = top + 'px';
    this.panel.div.style.left = left + 'px';
}

spa.ContextMenu.prototype.onClickListCell = function (index) {
	this.callback && this.callback(index);
}



