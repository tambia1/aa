spa.ListCellImageV = function(divId, divClass, imageClass, text, callback)
{
    spa.decorate(this, new spa.ListCell(divId, divClass, text, callback));

    this.div.classList.add('cell-image-v');

    let itemImage = new spa.Item('<div class="cell-image_image ' + imageClass + '"></div>');
    this.div.appendChild(itemImage.div);

    let itemCheck = new spa.Item('<div class="cell-image-v_check" data-image=""></div>');
    this.div.appendChild(itemCheck.div);
}