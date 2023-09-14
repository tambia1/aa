spa.Panel = function(divId, divClass, direction)
{
	var html = ''+
		'<div id="' + divId + '" class="panel ' + divClass + '" direction="' + ((direction == spa.Panel.DIRECTION_HOR) ? 'hor' : 'ver') + '">'+
			'<div class="container ' + ((direction == spa.Panel.DIRECTION_HOR) ? 'panel_container_hor' : 'panel_container_ver') + '">'+
			'</div>'+
		'</div>'+
	'';

	spa.decorate(this, new spa.UiElement(html));

	//save args
	this.direction = direction;

	//create div 'container'
	this.container = this.div.querySelector('.container');

	//listen to div scroll event
	this.div.onscroll = this.onScroll.bind(this);
}

spa.Panel.DIRECTION_HOR = 'DIRECTION_HOR';
spa.Panel.DIRECTION_VER = 'DIRECTION_VER';

spa.Panel.prototype.container = null;

spa.Panel.prototype.touchState = null;
spa.Panel.prototype.scrollState = null;
spa.Panel.prototype.scrollTimer = null;
spa.Panel.prototype.scrollTop = null;
spa.Panel.prototype.scrollLeft = null;

spa.Panel.prototype.onScrollStarted = null;
spa.Panel.prototype.onScrollMoving = null;
spa.Panel.prototype.onScrollEnded = null;

spa.Panel.prototype.addItem = function(item)
{
	this.container.appendChild(item.div);


	/*fix bug with chrome touch scrolling in wrong direction when RTL*/
	if (this.direction == spa.Panel.DIRECTION_HOR){

		this.container.setAttribute('isVisible', 'false');

		clearTimeout(this.timeoutHandler);

		this.timeoutHandler = setTimeout(function() {
			let dir = document.documentElement.dir;
			let x = (dir == 'rtl') ? 999999 : 0;

			this.div.scrollLeft = x;
			this.scrollTo(x, 0, false);

			this.container.setAttribute('isVisible', 'true');
		}.bind(this), 100);
	}
}

spa.Panel.prototype.addItems = function(items)
{
	for (var i=0; i < items.length; i++)
	{
		this.addItem(items[i]);
	}
}

spa.Panel.prototype.removeItem = function(item)
{
	this.container.removeChild(div);
}

spa.Panel.prototype.removeAllItems = function()
{
	while (this.container.firstChild) {
		this.container.removeChild(this.container.lastChild);
	}
}

spa.Panel.prototype.insertItem = function(item, index)
{
	this.container.insertBefore(div, this.container.childNodes[index]);
}

spa.Panel.prototype.onScroll = function(e)
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

		this.scrollTop = this.div.scrollTop;
		this.scrollLeft = this.div.scrollLeft;

		if (oldTop == this.scrollTop && oldLeft == this.scrollLeft) {
			this.scrollState = 'scrollEnd'
			clearInterval(this.scrollTimer);
			this.onScrollEnded && this.onScrollEnded(e);
		}
	}.bind(this), 100);
}

spa.Panel.prototype.scrollTo = function(x, y, isSmooth)
{
	this.div.scrollTo({left: x, top: y, behavior: isSmooth ? 'smooth' : 'auto'});
}