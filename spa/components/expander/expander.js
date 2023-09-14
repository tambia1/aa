spa.Expander = function(innerHTML)
{
    this.item = new spa.Item(innerHTML);

	this.item.div.className = 'expander ' + this.item.div.className;

	this.item.div.setAttribute('status', spa.Expander.STATUS_COLLAPSED);
	this.item.div.setAttribute('isAnimated', false);
}

spa.Expander.prototype.item = null;

spa.Expander.STATUS_COLLAPSING = 'collapsing';
spa.Expander.STATUS_COLLAPSED = 'collapsed';
spa.Expander.STATUS_EXPANDING = 'expanding';
spa.Expander.STATUS_EXPANDED = 'expanded';

spa.Expander.prototype.onStautsChange = null;

spa.Expander.prototype.setIsExpanded = function(isExpanding, isAnimated)
{
	this.item.div.setAttribute('isAnimated', isAnimated);

    this.item.div.style['max-height'] = this.item.div.offsetHeight + 'px';

    setTimeout(this.expandingStarted.bind(this, isExpanding), 100);
}

spa.Expander.prototype.getIsExpanded = function()
{
	return 	this.item.div.getAttribute('status') == spa.Expander.STATUS_EXPANDED || this.item.div.getAttribute('status') == spa.Expander.STATUS_EXPANDING;
}

spa.Expander.prototype.getStatus = function()
{
	return this.item.div.getAttribute('status');
}

spa.Expander.prototype.expandingStarted = function(isExpanding)
{
	this.timerAnimation = clearTimeout(this.timerAnimation);

	if (isExpanding == true){
		this.item.div.setAttribute('status', spa.Expander.STATUS_EXPANDING);
		this.item.div.style['max-height'] = this.item.div.scrollHeight + 'px';
	}
	else{
		this.item.div.setAttribute('status', spa.Expander.STATUS_COLLAPSING);
		this.item.div.style['max-height'] = '';
	}

	var transitionDuration = parseFloat(window.getComputedStyle(this.item.div)['transition-duration'] || 0.3);
	this.timerAnimation = setTimeout(this.expandingFinished.bind(this, isExpanding), transitionDuration * 1000);

	//invoke callback if exist
	this.onStautsChange && this.onStautsChange(this.item.div.getAttribute('status'));
}

spa.Expander.prototype.expandingFinished = function(isExpanded)
{
	this.timerAnimation = clearTimeout(this.timerAnimation);
	this.timerAnimation = null;

	if (isExpanded == true){
		this.item.div.setAttribute('status', spa.Expander.STATUS_EXPANDED);
	}
	else{
		this.item.div.setAttribute('status', spa.Expander.STATUS_COLLAPSED);
	}

	this.item.div.style['max-height'] = null;

	//invoke callback if exist
	this.onStautsChange && this.onStautsChange(this.item.div.getAttribute('status'));

    // Report to Panel about collapse
    spa.Event.fire.bind(this, this.item.div, 'expander');
}
