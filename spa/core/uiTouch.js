spa.UiTouch = function(div, onTouchStart, onTouchMove, onTouchEnd, onTouchCancel)
{
	this.div = div;
	this.onTouchStart = onTouchStart;
	this.onTouchMove = onTouchMove;
	this.onTouchEnd = onTouchEnd;
	this.onTouchCancel = onTouchCancel;

	this.divX = this.div.offsetLeft;
	this.divY = this.div.offsetTop;


	this.div.addEventListener(spa.Device.mousedown, (e) => {
		//mouse down
		// e.preventDefault();

		this.status = 'down';
		this.div.setAttribute('isPressed', 'true');

		this.boundingX = this.div.getBoundingClientRect().left + window.scrollX + 0.5;
		this.boundingY = this.div.getBoundingClientRect().top + window.scrollY + 0.5;

		let x = parseInt((e.pageX || e.touches?.[0]?.pageX || e.changedTouches?.[0]?.pageX || 0) - this.boundingX);
		let y = parseInt((e.pageY || e.touches?.[0]?.pageY || e.changedTouches?.[0]?.pageY || 0) - this.boundingY);

		this.x = x;
		this.y = y;

		this.timeStart = new Date().getTime();

		this.onTouchStart?.(e, this.x, this.y, x, y, 0);


		//mouse move
		let mouseMoveListener = (e) => {
			// e.preventDefault();

			if (this.status == 'down' || this.status == 'move'){
				this.status = 'move';
				this.div.setAttribute('isPressed', 'true');
		
				let x = parseInt((e.pageX || e.touches?.[0]?.pageX || e.changedTouches?.[0]?.pageX || 0) - this.boundingX);
				let y = parseInt((e.pageY || e.touches?.[0]?.pageY || e.changedTouches?.[0]?.pageY || 0) - this.boundingY);
																		
				this.timeEnd = new Date().getTime();
		
				let time = this.timeEnd - this.timeStart;
		
				this.onTouchMove?.(e, this.x, this.y, x, y, time);
			}
		};

		document.addEventListener(spa.Device.mousemove, mouseMoveListener, {passive:false});


		//mouse up
		let mouseUpListener = (e) => {
			// e.preventDefault();

			let x = parseInt((e.pageX || e.touches?.[0]?.pageX || e.changedTouches?.[0]?.pageX || 0) - this.boundingX);
			let y = parseInt((e.pageY || e.touches?.[0]?.pageY || e.changedTouches?.[0]?.pageY || 0) - this.boundingY);
									
			this.timeEnd = new Date().getTime();
	
			let time = this.timeEnd - this.timeStart;
	
			if (this.status == 'down' || this.status == 'move'){
				this.status = 'up';
				this.div.setAttribute('isPressed', 'false');
		
				this.onTouchEnd?.(e, this.x, this.y, x, y, time);
			}		
			
			if (this.status == 'out'){
				this.status = '';
				this.onTouchCancel?.(e, this.x, this.y, x, y, time);
			}
		};

		document.addEventListener(spa.Device.mouseup, mouseUpListener, {passive:false});


		//mouse out
		let mouseOutListener = (e) => {
			// e.preventDefault();

			if (this.status == 'down'){
				this.status = 'out';
				this.div.setAttribute('isPressed', 'false');
			}
		};
	
		document.addEventListener(spa.Device.mouseout, mouseOutListener, {passive:false});


		//mouse enter
		let mouseEnterListener = (e) => {
			// e.preventDefault();

			if (this.status == 'out'){
				this.status = 'down';
				this.div.setAttribute('isPressed', 'true');
			}
		};
	
		document.addEventListener(spa.Device.mouseenter, mouseEnterListener, {passive:false});
	});



	this.status = '';
	this.div.setAttribute('isPressed', 'false');
}
