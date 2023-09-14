app.appClashRoyale.ViewClashRoyale = function()
{
    spa.decorate(this, new spa.NavBarView('view_clash_royale', ''));
	
	this.initViews();
}

app.appClashRoyale.ViewClashRoyale.prototype.onViewWillShow = function()
{

}

app.appClashRoyale.ViewClashRoyale.prototype.onViewDidShow = function()
{
}

app.appClashRoyale.ViewClashRoyale.prototype.onViewWillHide = function()
{
	this.game?.stop();
}

app.appClashRoyale.ViewClashRoyale.prototype.onViewDidHide = function()
{

}

app.appClashRoyale.ViewClashRoyale.prototype.onViewBackPressed = function()
{
	return false;
}

app.appClashRoyale.ViewClashRoyale.prototype.initViews = function()
{
	this.itemMenu = new spa.Item('<div class="view_clash_royale__page"></div>');
    spa.decorate(this.itemMenu, new spa.UiVisible());
    this.addItem(this.itemMenu);

	let itemBg = new spa.Item('<div class="view_clash_royale__bg"></div>');
    this.itemMenu.addItem(itemBg);

	let itemSplash = new spa.Item('<div class="view_clash_royale__splash"></div>');
    this.itemMenu.addItem(itemSplash);

	let itemButton = new spa.ButtonText('', 'view_clash_royale__button_yellow', spa.StrClashRoyale.start, this.onClickButtonStartGame.bind(this));
    itemSplash.addItem(itemButton);
	spa.decorate(itemButton, new spa.UiVisible());
	
	let itemLoading = new spa.ButtonText('', 'view_clash_royale__loading', spa.StrClashRoyale.loading, this.onClickButtonStartGame.bind(this));
    itemSplash.addItem(itemLoading);
	spa.decorate(itemLoading, new spa.UiVisible());
	

	itemButton.setIsVisible(false);
	itemLoading.setIsVisible(true);



    this.paging = new spa.Paging('', 'view_clash_royale__paging', false, null, null, null, null);
    itemSplash.addItem(this.paging);
	spa.decorate(this.paging, new spa.UiVisible());

	for (let i = 1; i <= 11; i++) {
		let itemArenaIcon = new spa.Item('<div class="view_clash_royale__paging_item view_clash_royale_arena_icon_' + i + '"></div>');
		this.paging.addItem(itemArenaIcon);
	}

	this.paging.setIsVisible(false);


	//load images
	let files = [];

	files.push('appClashRoyale/views/viewClashRoyale/fonts/SupercellMagicFont.ttf');

	files.push('appClashRoyale/views/viewClashRoyale/images/misc/button_yellow.png');

	files.push('appClashRoyale/views/viewClashRoyale/images/misc/elixir.png');
	files.push('appClashRoyale/views/viewClashRoyale/images/misc/elixirBg.png');

	for (let i = 1; i <= 11; i++) {
		files.push('appClashRoyale/views/viewClashRoyale/images/arenas/arenaIcon' + i + '.png');
	}

	for (const k in app.appClashRoyale.Game.arenas) {
		files.push(app.appClashRoyale.Game.arenas[k].imageName);
	}

	for (const k in app.appClashRoyale.Arena.types) {
		files.push(app.appClashRoyale.Arena.types[k].imageName);
	}

	for (const k in app.appClashRoyale.Castle.types) {
		files.push(app.appClashRoyale.Castle.types[k].imageName);
	}

	for (const k in app.appClashRoyale.Unit.types) {
		files.push(app.appClashRoyale.Unit.types[k].imageName);
	}

	for (const k in app.appClashRoyale.Explosion.types) {
		files.push(app.appClashRoyale.Explosion.types[k].imageName);
	}

	for (const k in app.appClashRoyale.Shoot.types) {
		files.push(app.appClashRoyale.Shoot.types[k].imageName);
	}


	Promise.resolve()
	.then(() => {
		return spa.promiseLoadFiles(files, (loads, errors, progress, fileName, status, loadTime) => {
			itemLoading.setText(spa.StrClashRoyale.loading.value + ' ' + parseInt(progress * 100) + '%');
			// console.log(fileName + ' ' + status + ' ' + loadTime + ' ' + progress + '%');
		});
	})
	.then(() => {
		this.paging.setIsVisible(true);
		itemButton.setIsVisible(true);
		itemLoading.setIsVisible(false);
	});
	

	// setTimeout(() => {
	// 	this.onClickButtonStartGame();
	// }, 100);
}

app.appClashRoyale.ViewClashRoyale.prototype.onClickButtonStartGame = function()
{
	this.itemMenu.setIsVisible(false);

	this.itemGame = new spa.Item('<div class="view_clash_royale__page"></div>');
    spa.decorate(this.itemGame, new spa.UiVisible());
    this.addItem(this.itemGame);

	let itemBg = new spa.Item('<div class="view_clash_royale__bg_game"></div>');
    this.itemGame.addItem(itemBg);
	spa.decorate(itemBg, new spa.UiAttribute());

	let itemBoard = new spa.Item('<div class="view_clash_royale__board"></div>');
    this.itemGame.addItem(itemBoard);
	
	let itemButton = new spa.ButtonText('', 'view_clash_royale__button_yellow', spa.StrClashRoyale.back, this.onClickButtonBackFromGame.bind(this));
    spa.decorate(itemButton, new spa.UiVisible());
    itemBoard.addItem(itemButton);
	itemButton.setIsVisible(false);

	let arena = 'arena' + (this.paging.selectedPageIndex + 1);
	itemBg.setAttribute('arena', arena);

	this.game = new app.appClashRoyale.Game(itemBoard, 'Player Good', 'Player Bad', arena, () => {
		itemButton.setIsVisible(true);
	});

	this.game.start();
}


app.appClashRoyale.ViewClashRoyale.prototype.onClickButtonBackFromGame = function()
{
	this.itemMenu.setIsVisible(true);
    this.removeItem(this.itemGame);
	this.itemGame = null;
}