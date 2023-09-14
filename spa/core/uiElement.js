spa.UiElement = function(html) 
{
    if (typeof(html) == 'string') {
        //create temporary div to set it's innerHTML and create the whole element from string
        let elm = document.createElement('div');
        elm.innerHTML = html;

        //save innerHTML
        this.div = elm;

        if (elm.childElementCount == 1) {
            this.div = elm.firstChild;
        }

        //delete the temporary div
        elm = null;
    }
    else {
        // if innerHTML is DOMElement, skip all steps and save only element
        this.div = html;
    }
}

spa.UiElement.prototype.addItem = function(item) 
{
    this.div.appendChild(item.div);
}

spa.UiElement.prototype.removeItem = function(item) 
{
    this.div.removeChild(item.div);
}

spa.UiElement.prototype.removeAllItems = function() 
{
    this.div.innerHTML = '';
}

spa.UiElement.replace = function(oldDiv, newDiv) 
{
	if (oldDiv.parentNode != undefined){
		oldDiv.parentNode.replaceChild(newDiv, oldDiv);
	}
}

