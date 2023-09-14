app.appClashRoyale.Player = function(playerName, type, deck)
{
	this.playerName = playerName;
	this.type = type;

	this.deck = [];
	while(deck.length > 0){
		let j = spa.Math.getRandomNumber(0, deck.length - 1);
		this.deck.push(deck[j]);

		deck.splice(j, 1);
	}

	this.initCastles();
	this.initUnits();
	this.initStack();
	this.initElixir();
}

app.appClashRoyale.Player.TYPE_GOOD = 'TYPE_GOOD';
app.appClashRoyale.Player.TYPE_BAD = 'TYPE_BAD';

app.appClashRoyale.Player.styles = {
	[app.appClashRoyale.Player.TYPE_BAD]: {
		castles: [
			{x: 190, y: 244, type: 'castle1', },
			{x: 275, y: 200, type: 'castle2', },
			{x: 360, y: 244, type: 'castle1', },
		],

		stacks: [
			{x: 120, y: 145, },
			{x: 170, y: 145, },
			{x: 230, y: 145, },
			{x: 290, y: 145, },
			{x: 350, y: 145, },
		],

		lifeFillStyle: '#cc0000ff',
		lifeStrokeStyle: '#ff0000ff',
		
		weaponRangeFillStyle: '#aa000033',
	},

	[app.appClashRoyale.Player.TYPE_GOOD]: {
		castles: [
			{x: 190, y: 475, type: 'castle1', },
			{x: 275, y: 520, type: 'castle2', },
			{x: 360, y: 475, type: 'castle1', },
		],

		stacks: [
			{x: 120, y: 610, },
			{x: 170, y: 610, },
			{x: 230, y: 610, },
			{x: 290, y: 610, },
			{x: 350, y: 610, },
		],

		lifeFillStyle: '#00cc00ff',
		lifeStrokeStyle: '#00ff00ff',
		
		weaponRangeFillStyle: '#00aa0033',
	},
};

app.appClashRoyale.Player.STACK_SCALE_SELECTED = 1.2;
app.appClashRoyale.Player.STACK_SCALE_UNSELECTED = 1.0;
app.appClashRoyale.Player.STACK_SCALE_NEXT = 0.4;


app.appClashRoyale.Player.prototype.type = null;
app.appClashRoyale.Player.prototype.deck = null;
app.appClashRoyale.Player.prototype.castles = null;
app.appClashRoyale.Player.prototype.units = null;
app.appClashRoyale.Player.prototype.stack = null;

app.appClashRoyale.Player.prototype.initCastles = function()
{
	this.castles = new Array(app.appClashRoyale.Player.styles[this.type].castles.length);

	for (let i = 0; i < this.castles.length; i++) {
		this.castles[i] = new app.appClashRoyale.Castle(app.appClashRoyale.Player.styles[this.type].castles[i].type);
		this.castles[i].setXY(app.appClashRoyale.Player.styles[this.type].castles[i].x, app.appClashRoyale.Player.styles[this.type].castles[i].y);
		this.castles[i].setLifeColor(app.appClashRoyale.Player.styles[this.type].lifeStrokeStyle, app.appClashRoyale.Player.styles[this.type].lifeFillStyle);
		this.castles[i].setWeaponRangeColor(app.appClashRoyale.Player.styles[this.type].weaponRangeFillStyle);
	}
}

app.appClashRoyale.Player.prototype.initUnits = function()
{
	this.units = [];
}

app.appClashRoyale.Player.prototype.initStack = function()
{
	this.stack = new Array(5);
	this.stackSelected = -1;

	this.energy = 0;
	this.energyMin = 0;
	this.energyMax = 0.5;
	this.energyTiming = 1000;
}

app.appClashRoyale.Player.prototype.initElixir = function()
{
	this.elixir = 0;
	this.elixirMin = 0;
	this.elixirMax = 10;
	this.elixirTiming = 2000;
}

app.appClashRoyale.Player.prototype.drawElixir = function(ctx)
{
	ctx.save();

	let x = 125;
	let y = (this.type == app.appClashRoyale.Player.TYPE_GOOD) ? 650 : 95 ;
	let w = 430 - x;
	let h = 10;


	for (let i = 0; i < 10; i++) {
		ctx.drawImage(app.appClashRoyale.Game.imageElixirBg, 0, 0, 145, 31, x + i*parseInt(w/10), y, parseInt(w/10), h);
	}


    ctx.rect(x, y, parseInt(w/10 * this.elixir), h);
    ctx.clip();

	for (let i = 0; i < 10; i++) {
		ctx.drawImage(app.appClashRoyale.Game.imageElixir, 0, 0, 145, 31, x + i*parseInt(w/10) + 0, y, parseInt(w/10) - 0, h);
	}

	ctx.restore();
}

app.appClashRoyale.Player.prototype.drawStack = function(ctx)
{
	if (this.stack[0] != null){
		this.stack[0].drawImage(ctx);						
	}

	for (let i = 1; i < this.stack.length; i++) {
		if (this.stack[i] != null){
			this.stack[i].drawImage(ctx);						
			this.stack[i].drawLoading(ctx);						
		}
	}
}

app.appClashRoyale.Player.prototype.drawCastles = function(ctx)
{
	for (let i = 0; i < this.castles.length; i++) {
		this.castles[i].drawWeaponRange(ctx);						
	}

	for (let i = 0; i < this.castles.length; i++) {
		this.castles[i].drawImage(ctx);
		this.castles[i].drawLife(ctx);
	}
}

app.appClashRoyale.Player.prototype.drawUnits = function(ctx)
{
	for (let i = 0; i < this.units.length; i++) {
		// this.units[i].drawWeaponRange(ctx);						
	}

	for (let i = 0; i < this.units.length; i++) {
		this.units[i].drawImage(ctx);						
		this.units[i].drawLife(ctx);						
	}
}

app.appClashRoyale.Player.prototype.drawAttacks = function(ctx)
{
	for (let i = 0; i < this.units.length; i++) {
		this.units[i].drawAttack(ctx);						
	}

	for (let i = 0; i < this.castles.length; i++) {
		this.castles[i].drawAttack(ctx);						
	}
}

app.appClashRoyale.Player.prototype.getUnitFromDeck = function()
{
	let type = this.deck.shift();
	let unit = new app.appClashRoyale.Unit(type);

	unit.setLifeColor(app.appClashRoyale.Player.styles[this.type].lifeStrokeStyle, app.appClashRoyale.Player.styles[this.type].lifeFillStyle);
	unit.setWeaponRangeColor(app.appClashRoyale.Player.styles[this.type].weaponRangeFillStyle);
	
	this.deck.push(type);

	return unit;
}

app.appClashRoyale.Player.prototype.putSelectedStackOnGrid = function(x, y)
{
	if (this.stackSelected != -1){
		let unit = this.stack[this.stackSelected];

		if (this.elixir >= unit.elixirNeeded){
			this.stack[this.stackSelected] = null;
			this.stackSelected = -1;
			this.energy = 0;

			this.units.push(unit);

			unit.setXY(x, y);
			unit.setScale(1.0, 1.0, 0);
	
			this.elixir -= unit.elixirNeeded;
		}
	}
}

app.appClashRoyale.Player.prototype.update = function(timeDif)
{
	this.updateElixir(timeDif);
	this.updateStackNext(timeDif);
	this.updateStack(timeDif);
	this.updateStackLoading(timeDif);
	this.updateStacks(timeDif);
	this.updateCastles(timeDif);
	this.updateUnits(timeDif);
}

app.appClashRoyale.Player.prototype.updateElixir = function(timeDif)
{
	this.elixir += timeDif / this.elixirTiming;
	this.elixir = Math.min(this.elixir, this.elixirMax);
}

app.appClashRoyale.Player.prototype.updateStackNext = function(timeDif)
{
	if (this.stack[0] == null){
		let isNextStackUnique = null;

		do{
			this.stack[0] = this.getUnitFromDeck();
			this.stack[0].setLoading(1);
			isNextStackUnique = true;

			for (let i = 1; i < this.stack.length; i++) {
				if (this.stack[0].type == this.stack[i]?.type){
					isNextStackUnique = false;
					break;
				}
			}
		}while(isNextStackUnique == false);

		this.stack[0].setXY(app.appClashRoyale.Player.styles[this.type].stacks[0].x, app.appClashRoyale.Player.styles[this.type].stacks[0].y);
		this.stack[0].setOpacity(0, 1, 700);
		this.stack[0].setScale(app.appClashRoyale.Player.STACK_SCALE_NEXT, app.appClashRoyale.Player.STACK_SCALE_NEXT, 0);
	}
}

app.appClashRoyale.Player.prototype.updateStack = function(timeDif)
{
	this.energy += timeDif / this.energyTiming;
	this.energy = Math.min(this.energy, this.energyMax);

	for (let i = 1; i < this.stack.length; i++) {
		if (this.stack[i] == null && this.stack[0] != null && this.energy >= this.energyMax){
			this.energy = 0;

			this.stack[i] = this.stack[0];
			this.stack[0] = null;

			this.stack[i].setXY(app.appClashRoyale.Player.styles[this.type].stacks[i].x, app.appClashRoyale.Player.styles[this.type].stacks[i].y);
			this.stack[i].setOpacity(this.stack[i].alpha, 1, 300);
			this.stack[i].setScale(app.appClashRoyale.Player.STACK_SCALE_UNSELECTED, app.appClashRoyale.Player.STACK_SCALE_UNSELECTED, 0);
		}
	}
}

app.appClashRoyale.Player.prototype.updateStackLoading = function(timeDif)
{
	for (let i = 1; i < this.stack.length; i++) {
		if (this.stack[i] != null){
			let loading = this.elixir / this.stack[i].elixirNeeded;

			this.stack[i].setLoading(loading);
		}
	}
}

app.appClashRoyale.Player.prototype.updateStacks = function(timeDif)
{
	for (let i = 0; i < this.stack.length; i++) {
		this.stack[i]?.update(timeDif);
	}
}

app.appClashRoyale.Player.prototype.updateCastles = function(timeDif)
{
	for (let i = 0; i < this.castles.length; i++) {
		this.castles[i].update(timeDif);
	}
}

app.appClashRoyale.Player.prototype.updateUnits = function(timeDif)
{
	for (let i = 0; i < this.units.length; i++) {
		this.units[i].update(timeDif);
	}
}

