spa.UiClick = function(div, onClick)
{
	this.div = div;
	this.onClick = onClick;


	this.div.addEventListener(spa.Device.mousedown, (e) => {
		this.status = 'down';
		this.div.setAttribute('isPressed', 'true');
	}, true);


	document.addEventListener(spa.Device.mouseup, (e) => {
		if (this.status == 'down'){
			this.status = 'up';
			this.div.setAttribute('isPressed', 'false');
	
			let res = this.onClick && this.onClick(e);
		
			if (res == true){
				e.stopPropagation();			//prevent any parent handlers from being executed
			}
		}
	}, true);


	this.div.addEventListener(spa.Device.mouseout, (e) => {
		if (this.status == 'down'){
			this.status = 'out';
			this.div.setAttribute('isPressed', 'false');
		}
	}, true);


	this.div.addEventListener(spa.Device.mouseenter, (e) => {
		if (this.status == 'out'){
			this.status = 'down';
			this.div.setAttribute('isPressed', 'true');
		}
	}, true);


	this.div.addEventListener(spa.Device.mousecancel, (e) => {
		this.status = '';
		this.div.setAttribute('isPressed', 'false');
	}, true);


	this.status = '';
	this.div.setAttribute('isPressed', 'false');
}
