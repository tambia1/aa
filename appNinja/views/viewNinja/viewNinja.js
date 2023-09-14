app.appNinja.ViewNinja = function()
{
    spa.decorate(this, new spa.NavBarView('view_ninja', ''));

    this.initViews();
}

app.appNinja.ViewNinja.prototype.onViewWillShow = function()
{

}

app.appNinja.ViewNinja.prototype.onViewDidShow = function()
{
  	this.canvas.width = this.div.offsetWidth;
  	this.canvas.height = this.div.offsetHeight; 

    this.gameNinja.startGame();
}

app.appNinja.ViewNinja.prototype.onViewWillHide = function()
{
    this.gameNinja.stopGame();
}

app.appNinja.ViewNinja.prototype.onViewDidHide = function()
{

}

app.appNinja.ViewNinja.prototype.onViewBackPressed = function()
{
	return false;
}

app.appNinja.ViewNinja.prototype.initViews = function()
{
    //create canvas
    let board = new spa.Item('<div id="view_ninja_board"></div>');
    this.addItem(board);

    let grass = new spa.Item('<div id="view_ninja_grass"></div>');
    this.addItem(grass);

    let canvas = new spa.Item('<canvas id="view_ninja_canvas" width="0" height="0"></canvas>');
    this.addItem(canvas);

	this.canvas = canvas.div;

    this.gameNinja = new app.appNinja.gameNinja(this.canvas);
}
