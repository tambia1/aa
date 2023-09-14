spa.ListCellV = function(divId, divClass, text, callback)
{
    spa.decorate(this, new spa.ListCell(divId, divClass, text, callback));

    this.div.classList.add('cell-v');

    let itemCheck = new spa.Item('<div class="cell-v_check" data-image=""></div>');
    this.div.appendChild(itemCheck.div);
}