spa.ButtonPress = function(html, callback) 
{
    spa.decorate(this, new spa.UiElement(html));

	thi.uiPress = new spa.UiPress(this.div, callback);
}

spa.ButtonPress.prototype.gesturePress = null;
