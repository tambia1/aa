spa.Paging = function(divId, divClass, isCyclic, onTouchStart, onTouchMove, onTouchEnd, onSelectionChanged)
{
	//call base constructor
	let html = ''+
		'<div id="' + divId + '" class="paging ' + divClass + '">'+
		'</div>'+
	'';

    spa.decorate(this, new spa.UiElement(html));

	//save args
	this.isCyclic = isCyclic;
	this.onTouchStart = onTouchStart;
	this.onTouchMove = onTouchMove;
	this.onTouchEnd = onTouchEnd;
	this.onSelectionChanged = onSelectionChanged;

	//set isCyclic
	this.div.setAttribute('isCyclic', this.isCyclic);

	//create pages div
	this.divPages = document.createElement('div');
	this.divPages.className = 'paging_pages';
	this.div.appendChild(this.divPages);

	//create dots
	this.divDots = document.createElement('div');
	this.divDots.className = 'paging_dots';
	this.div.appendChild(this.divDots);

	//set vars
	this.selectedPageIndex = -1;
	this.items = [];
	this.pages = [];
	this.dots = [];

	//add gestureSwipe
	this.uiTouch = new spa.UiTouch(this.divPages, this.actionStart.bind(this), this.actionMove.bind(this), this.actionEnd.bind(this), this.actionCancel.bind(this));

	//on resize we need to fix x position
	window.addEventListener('resize', this.onResize.bind(this), false);

	//moving background
	this.isBackgroundMoving = false;
	this.backgroundMovingRate = 0.1;
	this.backgroundIndex = 0;
	this.backgroundPositionX = 0;
}



spa.Paging.MAX_MOVE_GAP = 20;

spa.Paging.prototype.div = null;
spa.Paging.prototype.selectedPageIndex = null;
spa.Paging.prototype.items = null;
spa.Paging.prototype.pages = null;
spa.Paging.prototype.dots = null;
spa.Paging.prototype.isAnimating = null;

spa.Paging.prototype.isBackgroundMoving = null;
spa.Paging.prototype.backgroundMovingRate = null;
spa.Paging.prototype.backgroundIndex = null;
spa.Paging.prototype.backgroundPositionX = null;

spa.Paging.prototype.addItem = function(item)
{
	//save item
	this.items.push(item);

	//save page
	if (this.isCyclic == false)
	{
		//create item and add it to div
		this.createPage(item);
	}
	else
	{
		//save all items in array
		let oldItems = this.items.slice(0);

		//remove all pages from dom
		this.removeAllItems();

		//copy all pages back to array
		this.items = oldItems.slice(0);

		//create all pages again duplicating first and last item
		//if we have only one item then do not duplicate
		if (this.items.length > 1)
		{
			let firstItem = new spa.Item(this.items[this.items.length - 1].div.cloneNode(true));
			this.createPage(firstItem);
		}

		for (let i = 0; i < this.items.length; i++)
		{
			this.createPage(this.items[i]);
		}

		if (this.items.length > 1)
		{
			let lastItem = new spa.Item(this.items[0].div.cloneNode(true));
			this.createPage(lastItem);
		}
	}


	//set selected item
	if (this.selectedPageIndex == -1)
	{
		this.setSelectedPageIndex(0, false);
	}
}

spa.Paging.prototype.createPage = function(item)
{
	let page = document.createElement('div');
	page.className = 'paging_page';
	page.appendChild(item.div);
	this.divPages.appendChild(page);



	let dot =  document.createElement('div');
	dot.className = 'paging_dot';
	this.divDots.appendChild(dot);

	//add gesturePress to dot
	this.uiPress = new spa.UiPress(dot, this.actionDotPressed.bind(this, this.dots.length));

	//save new item
	this.pages.push(page);
	this.dots.push(dot);
}

spa.Paging.prototype.removeItem = function(item)
{
	for (let i=0; i < this.pages.length; i++)
	{
		if (this.pages[i] == item)
		{
			this.removeItemAtIndex(i);
			break;
		}
	}
}

spa.Paging.prototype.removeItemAtIndex = function(itemIndex)
{
	this.divPages.removeChild(this.pages[itemIndex]);
	this.divDots.removeChild(this.dots[itemIndex]);

	this.pages.splice(itemIndex, 1);
	this.dots.splice(itemIndex, 1);

	//update selected dot and selected page index
	this.setSelectedPageIndexHelper(this.selectedPageIndex, false);
}

spa.Paging.prototype.removeAllItems = function()
{
	this.divPages.innerHTML = '';
	this.divDots.innerHTML = '';

	this.items.length = 0;
	this.pages.length = 0;
	this.dots.length = 0;

	//update selected dot and selected page index
	this.setSelectedPageIndexHelper(this.selectedPageIndex, false);
}

spa.Paging.prototype.actionStart = function(e, x0, y0)
{
	this.backgroundPositionX = parseInt(this.div.style['background-position-x'] || 0);

	this.onTouchStart?.();
}

spa.Paging.prototype.actionMove = function(e, x0, y0, x1, y1, time)
{
	let gap = x1 - x0;

	//if no pages then do nothing
	if (this.items.length == 0)
	{
		return;
	}

	//check move
	if ((this.selectedPageIndex == 0 && gap > 0) || (this.selectedPageIndex == this.pages.length - 1 && gap < 0))
	{
		gap >>= 1;
	}

	//if we have only one item then move only half
	if (this.items.length == 1)
	{
		gap >>= 2;
	}

	//set state to go (prevent css animation while we are draging)
	this.divPages.setAttribute('state', 'go');


	//set transform/transition
	let gapInPercent = gap / this.divPages.clientWidth * 100;

	this.divPages.style.transform = 'translate3d(' + (-this.selectedPageIndex * 100 + gapInPercent) + '%, 0px, 0px)';



	//move background a little
	if (this.isBackgroundMoving == true)
	{
		this.div.setAttribute('state', 'go');

		this.div.style['background-position-x'] = (this.backgroundPositionX + gap * this.backgroundMovingRate) + 'px';
	}



	//is animating
	this.isAnimating = true;

	//invoke callback
	this.onTouchMove?.();
}

spa.Paging.prototype.actionEnd = function(e, x0, y0, x1, y1, time)
{
	let gap = x1 - x0;
	let direction = Math.abs(x1 - x0) < 100 ? 0 : (x1 - x0) / Math.abs(x1 - x0);

	if (direction == 0)
	{
		if(gap < -(this.divPages.clientWidth >> 1))
		{
			this.setSelectedPageIndexHelper(this.selectedPageIndex + 1, true);
		}
		else if(gap > (this.divPages.clientWidth >> 1))
		{
			this.setSelectedPageIndexHelper(this.selectedPageIndex - 1, true);
		}
		else
		{
			this.setSelectedPageIndexHelper(this.selectedPageIndex, true);
		}
	}
	else if(direction == -1)
	{
		this.setSelectedPageIndexHelper(this.selectedPageIndex + 1, true);
	}
	else if(direction == 1)
	{
		this.setSelectedPageIndexHelper(this.selectedPageIndex - 1, true);
	}

	//is animating
	this.isAnimating = false;

	//if we hav any callback then invoke it
	this.onTouchEnd?.();
}

spa.Paging.prototype.actionCancel = function(e, x0, y0, x1, y1, time)
{
	this.actionEnd(e, x0, y0, x1, y1, time);
}

spa.Paging.prototype.setSelectedPageIndex = function(selectedPageIndex, isAnimated)
{
	if (this.isCyclic == true && this.items.length > 1)
	{
		selectedPageIndex++;
	}

	this.setSelectedPageIndexHelper(selectedPageIndex, isAnimated);
}

spa.Paging.prototype.setSelectedPageIndexHelper = function(selectedPageIndex, isAnimated)
{
	//if no pages then do nothing
	if (this.items.length == 0)
	{
		this.selectedPageIndex = -1;
		this.div.setAttribute('index', this.selectedPageIndex);
		return;
	}

	//keep selected index inside boundaries of array size
	selectedPageIndex = Math.max(Math.min(selectedPageIndex, this.pages.length - 1), 0);


	//set direction
	let direction = 0;

	if (this.selectedPageIndex > selectedPageIndex)
	{
		direction = -1;
	}
	else if (this.selectedPageIndex < selectedPageIndex)
	{
		direction = 1;
	}

	if (isAnimated == false)
	{
		direction = 0;
	}


	//save value
	this.selectedPageIndex = selectedPageIndex;


	//set attributes
	this.isAnimating = true;
	this.divPages.setAttribute('state', (isAnimated == true) ? 'move' : 'go');


	//update selected dot
	for (let i=0; i < this.dots.length; i++)
	{
		this.dots[i].setAttribute('isSelected', 'false');
	}


	let selectedDotIndex = this.selectedPageIndex;

	if (this.isCyclic == true)
	{
		if(selectedDotIndex == 0 || selectedDotIndex == this.pages.length - 1)
		{
			if (direction == 1)
			{
				selectedDotIndex = 1;
			}
			else if (direction == -1)
			{
				selectedDotIndex = this.pages.length - 2;
			}
		}
	}

	this.dots[selectedDotIndex].setAttribute('isSelected', 'true');


	//set transform/transition
	this.divPages.style.transform = 'translate3d(' + (-this.selectedPageIndex * 100) + '%, 0px, 0px)';


	//move background a little
	if (this.isBackgroundMoving == true)
	{
		//save background index
		this.backgroundIndex += direction;

		if (isAnimated == false)
		{
			this.div.setAttribute('state', 'go');
		}
		else
		{
			this.div.setAttribute('state', 'move');
		}


		this.div.style['background-position-x'] = (-this.divPages.clientWidth * this.backgroundMovingRate * this.backgroundIndex) + 'px';
	}



	//invoke callback (after animation ends)
	let onAnimationEnd = function()
	{
		//if we are in last image then go to first image (the same image as the last one) with no animation
		if (this.isCyclic == true && this.pages.length > 1)
		{
			if (this.selectedPageIndex == this.pages.length - 1)
			{
				this.setSelectedPageIndexHelper(1, false);
				return;
			}
			else if (this.selectedPageIndex == 0)
			{
				this.setSelectedPageIndexHelper(this.pages.length - 2, false);
				return;
			}

			selectedDotIndex--;
		}

		//is animating
		this.isAnimating = false;

		//invoke callback
		this.div.setAttribute('index', this.selectedPageIndex);
		this.onSelectionChanged?.(this.selectedPageIndex);
	}


	if (isAnimated == false)
	{
		onAnimationEnd.bind(this)();
	}
	else
	{
		this.timerAnimation = clearTimeout(this.timerAnimation);
		let transitionDuration = parseFloat(window.getComputedStyle(this.divPages)['transition-duration'] || 0.3);
		this.timerAnimation = setTimeout(onAnimationEnd.bind(this), transitionDuration * 1000);
	}
}

spa.Paging.prototype.actionDotPressed = function(selectedPageIndex)
{
	this.setSelectedPageIndexHelper(selectedPageIndex, true);
}

spa.Paging.prototype.onResize = function()
{
	//fi background x position
	if (this.isBackgroundMoving == true)
	{
		//save background index
		this.backgroundIndex = 0;
		this.div.setAttribute('state', 'go');

		this.div.style['background-position-x'] = (-this.divPages.clientWidth * this.backgroundMovingRate * this.backgroundIndex) + 'px';
	}
}

