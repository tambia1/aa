spa.ButtonTextImage = function(divId, divClass, imageClass, text, callback)
{
    let str = ''+
        '<div id="' + divId + '" class="button_text_image ' + divClass + '">'+
	        '<div class="button_text_image_image ' + imageClass + '"></div>'+
    	    '<div class="button_text_image_text" data-string=""></div>'+
        '</div>'+
    '';

    this.item = new spa.Item(str);

    //add gestures
    this.uiClick = new spa.UiClick(this.item.div, callback);

    //set vars
    this.setText(text);
}

spa.ButtonTextImage.prototype.item = null;
spa.ButtonTextImage.prototype.gestureClick = null;

spa.ButtonTextImage.prototype.setText = function (text) {
    spa.Strings.setText(this.item.div, text);
}
