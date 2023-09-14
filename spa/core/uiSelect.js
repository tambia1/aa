spa.UiSelect = function()
{

}

spa.UiSelect.prototype.setIsSelected = function(isSelected) 
{
    this.div.setAttribute('isSelected', isSelected);
}

spa.UiSelect.prototype.getIsSelected = function() 
{
    return (this.div.getAttribute('isSelected') === 'true');
}


