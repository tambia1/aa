spa.Toast = function(divId, divClass)
{
    //call base constructor
    let str = ''+
        '<div id="' + divId + '" class="toast ' + divClass + '">'+
        '</div>'+
    '';

    this.item = new spa.Item(str);

    this.setIsVisible(false);
}

spa.Toast.prototype.item = null;

spa.Toast.prototype.timeout = null

spa.Toast.prototype.show = function(timeout)
{
    this.setIsVisible(true);

    this.timeout = setTimeout(function () {
        this.timeout = null;
        this.setIsVisible(false);
    }.bind(this), timeout);
}

spa.Toast.prototype.hide = function()
{
    this.setIsVisible(false);

    clearTimeout(this.timeout);
    this.timeout = null;
}


