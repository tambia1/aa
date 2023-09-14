spa.MessageBar = function(divId, divClass, buttonText, onChange, onSend, onFocus, onBlur)
{
	//call base constructor
	let html = ''+
        '<div id="' + divId + '" class="messagebar ' + divClass + '">'+
            '<div class="messagebar_container">'+
                '<input class="messagebar_input" type="text" maxlength="50">'+
				'<div id="messagebar_send"></div>'+
            '</div>'+
        '</div>'+
	'';

    spa.decorate(this, new spa.UiElement(html));

    //add listeners
	this.input = this.div.querySelector('.messagebar_input');

    this.input.onchange = function(e) {
        this.onChange && this.onChange(e, this.input);
    }.bind(this);

    this.input.oninput = function(e) {
        this.onChange && this.onChange(e, this.input);
    }.bind(this);

    this.input.onkeyup = function(e) {
        if (e.keyCode == 13) {
            this.onClickButtonSend();
        }
    }.bind(this);

    this.input.onfocus = function(e) {
        onFocus && onFocus(this.input, e);
    }.bind(this);


    this.input.onblur = function(e) {
        onBlur && onBlur(this.input, e);
    }.bind(this);


    this.buttonSend = new spa.ButtonText('messagebar_send', '', buttonText, this.onClickButtonSend.bind(this));
    spa.Item.replace(this.div.querySelector("#messagebar_send"), this.buttonSend.div);

    //set vars
	this.onSend = onSend;
	this.onChange = onChange;
}

spa.MessageBar.prototype.item = null;

spa.MessageBar.prototype.onChange = null;
spa.MessageBar.prototype.onSend = null;

spa.MessageBar.prototype.onClickButtonSend = function()
{
    this.onSend?.(this.input.value);
}

spa.MessageBar.prototype.setIsFocused = function(isFocused)
{
    if (isFocused == true){
        this.input.focus();
    }
    else {
        this.input.blur();
    }
}

spa.MessageBar.prototype.getValue = function()
{
    return this.input.value;
}

spa.MessageBar.prototype.setValue = function(value)
{
    this.input.value = value;
}
