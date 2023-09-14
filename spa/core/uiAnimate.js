spa.UiAnimate = {};

spa.UiAnimate.decorate = function(target)
{
    target.setIsAnimate = target.setIsAnimate || function(isAnimate) 
    {
        this.div.setAttribute('isAnimate', isAnimate);
    }
    
    target.getIsAnimate = target.getIsAnimate || function() 
    {
        return (this.div.getAttribute('isAnimate') === 'true');
    }
}

