spa.Bubble = function(divId, divClass, side, text)
{
    //call base constructor
    let html = ''+
        '<div id="' + divId + '" class="bubble_box ' + divClass + '">'+
            '<div class="bubble">'+
                '<div class="bubble_text" data-string=""></div>'+
            '</div>'+
        '</div>'+
    '';

    spa.decorate(this, new spa.UiElement(html));

    this.bubble = this.div.querySelector('.bubble');
    this.text = this.div.querySelector('.bubble_text');

    this.setPointerSide(side);
    this.setText(text);
}

spa.Bubble.prototype.item = null;

spa.Bubble.POINTER_SIDE_BOTTOM = 'bottom';
spa.Bubble.POINTER_SIDE_TOP = 'top';
spa.Bubble.POINTER_SIDE_LEFT = 'left';
spa.Bubble.POINTER_SIDE_RIGHT = 'right';

spa.Bubble.prototype.setPointerSide = function(side)
{
    this.bubble.setAttribute('side', side);
}

spa.Bubble.prototype.setText = function (text)
{
    spa.Strings.setText(this.text, text);
}

spa.Bubble.prototype.setPointerPosition = function (left, top)
{
    let arrowStyle = window.getComputedStyle(this.bubble, ':after');
    let arrowLeft = parseFloat(arrowStyle.left);
    let arrowTop = parseFloat(arrowStyle.top);

    let side = this.bubble.getAttribute('side');

    switch (side){
        case spa.Bubble.POINTER_SIDE_BOTTOM:
            this.div.style.left = (left - arrowLeft) + 'px';
            this.div.style.top = (top - this.div.offsetHeight) + 'px';
            break;

        case spa.Bubble.POINTER_SIDE_TOP:
            this.div.style.left = (left - arrowLeft) + 'px';
            this.div.style.top = (top + 0) + 'px';
            break;
    }

    // this.div.style.left = (left - this.div.offsetWidth) + 'px';
    // this.div.style.top = (top - this.div.offsetHeight) + 'px';
}

