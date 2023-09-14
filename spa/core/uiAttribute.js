spa.UiAttribute = function()
{

}

spa.UiAttribute.prototype.setAttribute = function(key, value) 
{
    this.div.setAttribute(key, value);
}

spa.UiAttribute.prototype.getAttribute = function(key) 
{
    return this.div.getAttribute(key);
}


