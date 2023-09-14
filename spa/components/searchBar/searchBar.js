spa.SearchBar = function(divId, divClass, onChange, onChangeSlow, onClickSearch, onClickClear, onFocus, onBlur)
{
	//call base constructor
	var html = ''+
        '<div id="' + divId + '" class="searchbar ' + divClass + '">'+
            '<div class="searchbar_container">'+
                '<input class="searchbar_input" type="search" maxlength="50">'+
				'<div class="searchbar_clear"></div>'+
                '<div class="searchbar_search"></div>'+
            '</div>'+
        '</div>'+
	'';

    spa.decorate(this, new spa.UiElement(html));

    //add listeners
	this.input = this.div.querySelector('.searchbar_input');
    this.input.onchange = this.input.oninput = this.input.onkeyup = function(e) {
        onChange && onChange(this.input, e);

        this.updateClearVisibility();

        clearTimeout(this.timerOnChangeSlow);

        this.timerOnChangeSlow = setTimeout(function() {
            onChangeSlow && onChangeSlow(this.input, e);
        }.bind(this), this.ON_CHANGE_TIMEOUT);
    }.bind(this);


    this.input.onfocus = function(e) {
        onFocus && onFocus(this.input, e);
    }.bind(this);


    this.input.onblur = function(e) {
        onBlur && onBlur(this.input, e);
    }.bind(this);


    this.clear = this.div.querySelector('.searchbar_clear');
    this.uiClickClear = new spa.UiClick(this.clear, function (e) {
        this.input.value = '';

        onClickClear && onClickClear(this.input, e);

        onChange && onChange(this.input, e);
        onChangeSlow && onChangeSlow(this.input, e);

        this.updateClearVisibility();

        clearTimeout(this.timerOnChangeSlow);
    }.bind(this));

    this.search = this.div.querySelector('.searchbar_search');
    this.uiClickSearch = new spa.UiClick(this.search, function (e) {
        clearTimeout(this.timerOnChangeSlow);

        onClickSearch && onClickSearch(this.input, e);

        this.updateClearVisibility();
    }.bind(this));

    //set vars
	this.onChange = onChange;

	//update clear
    this.updateClearVisibility();
}

spa.SearchBar.prototype.item = null;

spa.SearchBar.prototype.ON_CHANGE_TIMEOUT = 1000;

spa.SearchBar.prototype.onChange = null;
spa.SearchBar.prototype.onChangeSlow = null;

spa.SearchBar.prototype.timerOnChangeSlow = null;

spa.SearchBar.prototype.updateClearVisibility = function()
{
    if (this.input.value == ''){
        this.clear.setAttribute('isVisible', false);
    }
    else{
        this.clear.setAttribute('isVisible', true);
    }
}

spa.SearchBar.prototype.fuzzySearch = function(search, text)
{
    let result = [];

    for (let i = 0, j = 0; i < search.length; i++){
        for (; j < text.length; j++){
            if (search[i].toLowerCase() == text[j].toLowerCase()){
                result.push(j);
                j++;

                break;
            }
        }
    }

    return (result.length == search.length) ? result : [];
}

spa.SearchBar.prototype.setIsFocused = function(isFocused)
{
    if (isFocused == true){
        this.input.focus();
    }
    else {
        this.input.blur();
    }
}

spa.SearchBar.prototype.getValue = function()
{
    return this.input.value;
}

spa.SearchBar.prototype.setValue = function(value)
{
    this.input.value = value;
    this.updateClearVisibility();
}

spa.SearchBar.prototype.cancelPendingChangeSlow = function()
{
    clearTimeout(this.timerOnChangeSlow);
}

