spa.Slider = function(divId, divClass, onPress, onChange, onRelease)
{
    let str = '' +
        '<div id="' + divId + '" class="slider' + divClass + '"></div>' +
    '';

	this.item = new spa.Item(str);

	//create div slider button
	this.item.divButton = document.createElement('div');
	this.item.divButton.className = 'slider_button';
	this.item.divButton[spa.Device.onmousedown] = this.onMouseDown.bind(this);
	this.item.div.appendChild(this.item.divButton);

	this.mouseMove = this.onMouseMove.bind(this);
	this.mouseUp = this.onMouseUp.bind(this);

	//set slider value
	this.value = 0;
	this.onPress = onPress;
	this.onChange = onChange;
	this.onRelease = onRelease;
}

spa.Slider.prototype.item = null;

spa.Slider.prototype.div = null;
spa.Slider.prototype.value = null;
spa.Slider.prototype.onPress = null;
spa.Slider.prototype.onChange = null;
spa.Slider.prototype.onRelease = null;
spa.Slider.prototype.timer = null;

spa.Slider.prototype.onMouseDown = function(e)
{
	var e = window.event;
	var x = e.pageX;
	var y = e.pageY;

	if (e.touches && e.touches.length > 0)
	{
		x = e.touches[0].pageX;
		y = e.touches[0].pageY;
	}

	event.stopPropagation();

	//invoke callback if we have one
	if (this.onPress)
	{
		this.onPress(this.value);
	}

	//set vars
	this.isMouseDown = true;
	this.item.divButton.setAttribute('isPressed', this.isMouseDown);

	this.mouseDownX = x;
	this.mouseDownY = y;

	//don't do callback onMouseMove, too many callback will invoke
	var f = function()
	{
		//invoke callback if we have one
		if (this.onChange)
		{
			this.onChange(this.value);
		}
	}

	this.timer = setInterval(f.bind(this), 100);


	//add listeners to document
	document.addEventListener(spa.Device.mousemove, this.mouseMove, false);
	document.addEventListener(spa.Device.mouseup, this.mouseUp, false);
}

spa.Slider.prototype.onMouseMove = function(e)
{
	var e = window.event;
	var x = e.pageX;
	var y = e.pageY;

	if (e.touches && e.touches.length > 0)
	{
		x = e.touches[0].pageX;
		y = e.touches[0].pageY;
	}


	if (this.isMouseDown == true)
	{
		var xx = x - this.item.div.offsetLeft;

		if (xx < 0)
		{
			xx = 0;
		}

		if (xx > this.item.div.offsetWidth)
		{
			xx = this.item.div.offsetWidth;
		}

		this.item.divButton.style.marginLeft = xx + "px";

		//update value
		this.value = xx/this.item.div.offsetWidth;
	}
}

spa.Slider.prototype.onMouseUp = function(e)
{
	var e = window.event;
	var x = e.pageX;
	var y = e.pageY;

	if (e.touches && e.touches.length > 0)
	{
		x = e.touches[0].pageX;
		y = e.touches[0].pageY;
	}

	if (this.isMouseDown == true)
	{
		this.isMouseDown = false;
		this.item.divButton.setAttribute('isPressed', this.isMouseDown);

		//invoke callback if we have one
		if (this.onRelease)
		{
			this.onRelease(this.value);
		}
	}

	//remove moving timer
	this.timer = clearInterval(this.timer);

	//remove listeners from document
	document.removeEventListener(spa.Device.mousemove, this.mouseMove, true);
	document.removeEventListener(spa.Device.mouseup, this.mouseUp, true);
}

