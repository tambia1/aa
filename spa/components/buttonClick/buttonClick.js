spa.ButtonClick = function(html, callback) 
{
    spa.decorate(this, new spa.UiElement(html));

    this.uiClick = new spa.UiClick(this.div, callback);
}

spa.ButtonClick.prototype.gestureClick = null;
