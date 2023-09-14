spa.UiPress = function(div, onPress)
{
	this.div = div;
	this.onPress = onPress;
	

	this.div.addEventListener('mousedown', (e) => {
		this.div.setAttribute('isPressed', 'true');

		let res = this.onPress && this.onPress(e);

		if (res == true){
			e.stopPropagation();			//prevent any parent handlers from being executed
		}
	}, false);


	this.div.addEventListener('mouseup', (e) => {
		this.div.setAttribute('isPressed', 'false');
	}, false);


	this.div.setAttribute('isPressed', 'false');
}
