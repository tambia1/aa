spa.ButtonBar = function(divId, divClass)
{
	//call base constructor
	let str = ''+
        '<div id="' + divId + '" class="buttonbar ' + divClass + '">'+
            '<div id="buttonbar_buttons"></div>'+
        '</div>'+
	'';

    this.item = new spa.Item(str);

    this.buttons = new spa.Item(this.item.div.querySelector('#buttonbar_buttons'));
    this.buttonsList = [];
}

spa.ButtonBar.prototype.item = null;

spa.ButtonBar.prototype.buttonsList = null;

spa.ButtonBar.prototype.onClickButtonSend = function()
{
    this.onSend(this.input.value);
}

spa.ButtonBar.prototype.addButton = function(text, callback)
{
    //create buttons
    let button = new spa.ButtonText('buttonbar_button', '', text, callback);
    this.buttons.addItem(button);

    this.buttonsList.push(button);
}

spa.ButtonBar.prototype.removeButton = function(index)
{
    //create buttons
    this.buttons.removeItem(this.buttons[index]);
    this.buttonsList.splice(index, 1);
}

spa.ButtonBar.prototype.removeAllButtons = function()
{
    //create buttons
    this.buttons.div.innerHTML = '';
    this.buttonsList = [];
}
