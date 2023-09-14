spa.ListCellImage = function(divId, divClass, imageClass, text, callback)
{
    spa.decorate(this, new spa.ListCell(divId, divClass, text, callback));

    this.div.classList.add('cell-image');

    let itemImage = new spa.Item('<div class="cell-image_image ' + imageClass + '"></div>');
    this.div.appendChild(itemImage.div);

    let itemArrow = new spa.Item('<div class="cell-image_arrow"></div>');
    this.div.appendChild(itemArrow.div);
}

