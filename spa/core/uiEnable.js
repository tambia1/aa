spa.UiEnable = function()
{
    
}

spa.UiEnable.prototype.setIsEnabled = function(isEnabled) 
{
    this.div.setAttribute('isEnabled', isEnabled);
}

spa.UiEnable.prototype.getIsEnabled = function() 
{
    return (this.div.getAttribute('isEnabled') === 'true');
}
