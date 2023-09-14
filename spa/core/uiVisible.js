spa.UiVisible = function()
{

}

spa.UiVisible.prototype.setIsVisible = function(isVisible) 
{
    this.div.setAttribute('isVisible', isVisible);
}

spa.UiVisible.prototype.getIsVisible = function() 
{
    return (this.div.getAttribute('isVisible') === 'true');
}


