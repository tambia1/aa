spa.UiLongPress = function(div, onLongPress)
{
	this.div = div;
	this.onLongPress = onLongPress;

	
	this.div.addEventListener('mousedown', function(e){
		this.div.setAttribute('isPressed', 'true');

		this.timerHold = setTimeout(function(){
			this.timerHold = clearTimeout(this.timerHold);

			let res = this.onLongPress && this.onLongPress(e);

			if (res == true){
				e.stopPropagation();			//prevent any parent handlers from being executed
			}
		}.bind(this), 600);
	}.bind(this), false);


	this.div.addEventListener('mousemove', function(e){
		this.div.setAttribute('isPressed', 'false');

		this.timerHold = clearTimeout(this.timerHold);
	}.bind(this), false);


	this.div.addEventListener('mouseup', function(e){
		this.div.setAttribute('isPressed', 'false');

		this.timerHold = clearTimeout(this.timerHold);
	}.bind(this), false);


	this.div.setAttribute('isPressed', 'false');
}
