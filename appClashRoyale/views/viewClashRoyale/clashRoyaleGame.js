app.appClashRoyale.Game = function(board, goodPlayerName, badPlayerName, arena, onGameOver)
{
	//save vars
	this.board = board;
	this.onGameOver = onGameOver;
	this.goodPlayerName = goodPlayerName;
	this.badPlayerName = badPlayerName;

	this.arena = new app.appClashRoyale.Arena(arena);
	this.timeLeft = 2.5 * 60;

	this.winner = -1;

	this.init();
}

app.appClashRoyale.Game.prototype.board = null;
app.appClashRoyale.Game.prototype.players = null;
app.appClashRoyale.Game.prototype.timeLeft = null;

app.appClashRoyale.Game.prototype.STACK_SCALE_SELECTED = 0.7;
app.appClashRoyale.Game.prototype.STACK_SCALE_UNSELECTED = 0.5;

app.appClashRoyale.Game.prototype.init = function()
{
	this.loadImages();
	
	this.initCanvas();
	this.initTouches();
	this.initGrid();
	this.initPlayers();
	this.initAdapter();
}

app.appClashRoyale.Game.prototype.loadImages = function()
{
	app.appClashRoyale.Game.imageElixir = new Image();
	app.appClashRoyale.Game.imageElixir.src = 'appClashRoyale/views/viewClashRoyale/images/misc/elixir.png';

	app.appClashRoyale.Game.imageElixirBg = new Image();
	app.appClashRoyale.Game.imageElixirBg.src = 'appClashRoyale/views/viewClashRoyale/images/misc/elixirBg.png';

	for (const k in app.appClashRoyale.Game.arenas) {
        app.appClashRoyale.Game.arenas[k].image = new Image();
        app.appClashRoyale.Game.arenas[k].image.src = app.appClashRoyale.Game.arenas[k].imageName;
	}

	for (const k in app.appClashRoyale.Arena.types) {
		app.appClashRoyale.Arena.types[k].image = new Image();
		app.appClashRoyale.Arena.types[k].image.src = app.appClashRoyale.Arena.types[k].imageName;
	}

	for (const k in app.appClashRoyale.Castle.types) {
        app.appClashRoyale.Castle.types[k].image = new Image();
        app.appClashRoyale.Castle.types[k].image.src = app.appClashRoyale.Castle.types[k].imageName;
	}

	for (const k in app.appClashRoyale.Unit.types) {
		app.appClashRoyale.Unit.types[k].image = new Image();
		app.appClashRoyale.Unit.types[k].image.src = app.appClashRoyale.Unit.types[k].imageName;
	}

	for (const k in app.appClashRoyale.Explosion.types) {
        app.appClashRoyale.Explosion.types[k].image = new Image();
        app.appClashRoyale.Explosion.types[k].image.src = app.appClashRoyale.Explosion.types[k].imageName;
	}

	for (const k in app.appClashRoyale.Shoot.types) {
        app.appClashRoyale.Shoot.types[k].image = new Image();
        app.appClashRoyale.Shoot.types[k].image.src = app.appClashRoyale.Shoot.types[k].imageName;
	}
}

app.appClashRoyale.Game.prototype.initCanvas = function()
{
	let itemCanvas = new spa.Item('<canvas class="view_clash_royale__canvas" width="0" height="0"></canvas>');
	this.board.addItem(itemCanvas);

	this.canvas = itemCanvas.div;

	let dpr = window.devicePixelRatio || 1;

  	this.canvas.width = this.board.div.offsetWidth * dpr;
  	this.canvas.height = this.board.div.offsetHeight * dpr;
}

app.appClashRoyale.Game.prototype.initGrid = function()
{
	this.grid = {x1: 125, y1: 170, x2: 430, y2: 585};
}

app.appClashRoyale.Game.prototype.initAdapter = function()
{
	this.adapter = [];

	for (let y = 0; y < 20; y++) {
		this.adapter[y] = [];

		for (let x = 0; x < 20; x++) {		
			this.adapter[y][x] = 0;
		}
	}


	let gh = (this.grid.y2 - this.grid.y1) / this.adapter[0].length;
	let gw = (this.grid.x2 - this.grid.x1) / this.adapter.length;

	//add castles
	let castlesType = {
		[app.appClashRoyale.Player.TYPE_GOOD]: 1,
		[app.appClashRoyale.Player.TYPE_BAD]: 2,
	};

	for (let i = 0; i < this.players.length; i++) {
		for (let j = 0; j < this.players[i].castles.length; j++) {
			if (this.players[i].castles[j].life > 0){
				let castleX = Math.floor((this.players[i].castles[j].x - this.grid.x1) / gw);
				let castleY = Math.floor((this.players[i].castles[j].y - this.grid.y1) / gh);
				let castleType = castlesType[this.players[i].type];
	
				this.adapter[castleY][castleX] = castleType;
			}
		}
	}


	//add obstacles
	for (let i = 0; i < this.adapter[9].length; i++) {
		for (let j = 0; j < 2; j++) {
			this.adapter[9 + j][i] = 3;
		}
	}

	for (let i = 0; i < 2; i++) {
		for (let j = 0; j < 1; j++) {
			this.adapter[9 + i][4 + j] = 0;
			this.adapter[9 + i][15 + j] = 0;
		}
	}


	// let castle = spa.PathFinder.find(0, 20, 2, this.adapter);
	// let path = spa.PathFinder.path(0, 20, castle.x, castle.y, this.adapter);

	// for (let i = 0; i < path.length; i++) {
	// 	this.adapter[path[i].y][path[i].x] = 4;
	// }
}

app.appClashRoyale.Game.prototype.initPlayers = function()
{
	this.players = [];
	this.players.push(new app.appClashRoyale.Player(this.goodPlayerName, app.appClashRoyale.Player.TYPE_GOOD, ['tank', 'knight', 'paladin', 'goblin', 'wolf', 'golem', 'orc', 'sorcerer','ninja','snake', 'giant', 'musketeer', 'hogRider', 'amazon', ]));
	this.players.push(new app.appClashRoyale.Player(this.badPlayerName, app.appClashRoyale.Player.TYPE_BAD, ['tank', 'knight', 'paladin', 'goblin', 'wolf', 'golem', 'orc', 'sorcerer','ninja','snake', 'musketeer', 'hogRider', 'amazon', ]));
}

app.appClashRoyale.Game.prototype.initTouches = function()
{
	this.touch = new spa.UiTouch(this.canvas, (e, x, y, xx, yy, time) => {
		//down						
		console.log('d ' + x + ' ' + y + ' ' + xx + ' ' + yy);
	}, (e, x, y, xx, yy, time) => {
		//move
	}, (e, x, y, xx, yy, time) => {
		//up
		if (this.isXYInsideGrid(xx, yy) == false){
			this.selectStack(xx, yy);
		}
		else if (this.isXYInsideSafeArea(xx, yy) == true){
			this.putSelectedStackOnGrid(xx, yy);
		}
	}, (e, x, y, xx, yy, time) => {
		//cancel
	});
}

app.appClashRoyale.Game.prototype.selectStack = function(x, y)
{
	let isStackSelected = false;

	for (let i = 0; i < this.players.length; i++) {
		if (this.players[i].type == app.appClashRoyale.Player.TYPE_GOOD){
			this.players[i].stackSelected = -1;

			for (let j = 1; j < this.players[i].stack.length; j++) {
				if (this.players[i].stack[j] == null){
					continue;
				}
	
				let isStackPressed = this.players[i].stack[j].isXYInsideUnit(x, y);

				if (isStackPressed == true){
					isStackSelected = true;
	
					this.players[i].stackSelected = j;
					this.players[i].stack[j].setScale(this.players[i].stack[j].scale, app.appClashRoyale.Player.STACK_SCALE_SELECTED, 300);
				}
				else{
					this.players[i].stack[j].setScale(this.players[i].stack[j].scale, app.appClashRoyale.Player.STACK_SCALE_UNSELECTED, 300);
				}
			}
		}
	}



	for (let i = 0; i < this.players.length; i++) {
		if (this.players[i].type == app.appClashRoyale.Player.TYPE_BAD){
			for (let j = 0; j < this.players[i].castles.length; j++) {
				if (isStackSelected == true){
					this.players[i].castles[j].setWeaponRangeOpacity(this.players[i].castles[j].getWeaponRangeOpacity(), 1, 300);
				}
				else{
					this.players[i].castles[j].setWeaponRangeOpacity(this.players[i].castles[j].getWeaponRangeOpacity(), 0, 300);
				}
			}
		}
	}
}

app.appClashRoyale.Game.prototype.putSelectedStackOnGrid = function(x, y)
{
	for (let i = 0; i < this.players.length; i++) {
		if (this.players[i].type == app.appClashRoyale.Player.TYPE_GOOD){
			this.players[i].putSelectedStackOnGrid(x, y);
		}
	}
}

app.appClashRoyale.Game.prototype.start = function()
{
    this.requestAnimationFrameId = window.requestAnimationFrame(this.start.bind(this));

	this.timeOld = this.timeOld || performance.now();
	this.timeNow = performance.now();
	this.timeDif = this.timeNow - this.timeOld;

	let fps = 60;

	if (this.timeDif < 1000/fps){
		return;
	}

	this.timeOld = this.timeNow;

	this.update(this.timeDif)
	this.draw();
}

app.appClashRoyale.Game.prototype.stop = function()
{
    window.cancelAnimationFrame(this.requestAnimationFrameId);
}

app.appClashRoyale.Game.prototype.draw = function()
{
    let ctx = this.canvas.getContext('2d');

    ctx.save();

	this.drawInit(ctx);
	this.drawArena(ctx);
	this.drawTimeLeft(ctx);
	this.drawPlayersNames(ctx);
	this.drawPlayers(ctx);
	this.drawGameOver(ctx);
	//this.drawGrid(ctx);

    ctx.restore();
}

app.appClashRoyale.Game.prototype.drawInit = function(ctx)
{
	let dpr = window.devicePixelRatio || 1;
	ctx.scale(dpr, dpr);

	ctx.clearRect (0, 0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight);
    ctx.scale(1, 1);
    ctx.translate(0.5, 0.5);

    ctx.beginPath();
    ctx.rect(0, 0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight);
    ctx.clip();
}

app.appClashRoyale.Game.prototype.drawArena = function(ctx)
{
	this.arena.drawImage(ctx);
}

app.appClashRoyale.Game.prototype.drawGrid = function(ctx)
{
	ctx.save();

	let gh = (this.grid.y2 - this.grid.y1) / this.adapter[0].length;
	let gw = (this.grid.x2 - this.grid.x1) / this.adapter.length;

	ctx.lineWidth = 1.0;

	for (let y = 0; y < this.adapter.length; y++) {
		for (let x = 0; x < this.adapter[y].length; x++) {
			ctx.beginPath();
			ctx.rect(this.grid.x1 + x * gw, this.grid.y1 + y * gh, gw, gh);

			switch(this.adapter[y][x]){
				case 0: {
					ctx.strokeStyle = '#0000ff88';
					ctx.stroke();
					break;
				}

				case 1: {
					ctx.fillStyle = '#00ff0088';
					ctx.fill();
					break;
				}

				case 2: {
					ctx.fillStyle = '#ff000088';
					ctx.fill();
					break;
				}

				case 3: {
					ctx.fillStyle = '#0000ff88';
					ctx.fill();
					break;
				}

				case 4: {
					ctx.fillStyle = '#00ffff88';
					ctx.fill();
					break;
				}
			}
		}
	}
	
	ctx.restore();
}

app.appClashRoyale.Game.prototype.drawTimeLeft = function(ctx)
{
	ctx.save();

	ctx.fillStyle = '#00000088';
	ctx.beginPath();    
	spa.Canvas.rectRound(ctx, 380, 140, 80, 40, 5);
	ctx.fill(); 

	ctx.restore();


	ctx.save();

	ctx.font = 'bold 12px Helvetica';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#000000';
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 2;
    ctx.textAlign = 'center';
	ctx.textBaseline = "middle";

	let minutes = parseInt(this.timeLeft / 60);
	let seconds = parseInt(this.timeLeft % 60);

    ctx.fillText(minutes + ':' + ((seconds < 10) ? '0' : '') + seconds, 420, 170);

	ctx.font = 'bold 8px clashRoyaleFont';
    ctx.fillStyle = '#FFFDBC';
	ctx.fillText('Time Left:', 420, 155);

	ctx.restore();
}

app.appClashRoyale.Game.prototype.drawPlayersNames = function(ctx)
{
	ctx.save();

	ctx.font = 'bold 10px Helvetica';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#000000';
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 2;
    ctx.textAlign = 'center';
	

	for (let i = 0; i < this.players.length; i++) {
		switch(this.players[i].type){
			case app.appClashRoyale.Player.TYPE_BAD:
				ctx.fillText(this.players[i].playerName, 420, 130);
				break;

			case app.appClashRoyale.Player.TYPE_GOOD:
				ctx.fillText(this.players[i].playerName, 420, 620);
				break;
		}
	}


	ctx.restore();
}

app.appClashRoyale.Game.prototype.drawPlayers = function(ctx)
{
	//draw elixir and stack
	for (let i = 0; i < this.players.length; i++) {
		this.players[i].drawElixir(ctx);
		this.players[i].drawStack(ctx);
	}


	//clip grid area
	ctx.save();

	ctx.beginPath();
	ctx.rect(this.grid.x1, this.grid.y1, this.grid.x2 - this.grid.x1, this.grid.y2 - this.grid.y1);
	ctx.clip();

	//draw castles in higher zIndex
	for (let i = 0; i < this.players.length; i++) {
		this.players[i].drawCastles(ctx);
	}

	//draw units in higher zIndex
	for (let i = 0; i < this.players.length; i++) {
		this.players[i].drawUnits(ctx);
	}

	//draw attacks in higher zIndex
	for (let i = 0; i < this.players.length; i++) {
		this.players[i].drawAttacks(ctx);
	}

	ctx.restore();
}

app.appClashRoyale.Game.prototype.drawGameOver = function(ctx)
{
	if (this.winner != -1){
		ctx.save();

		ctx.font = 'bold 16px clashRoyaleFont';
		ctx.fillStyle = '#ffffff';
		ctx.shadowColor = '#000000';
		ctx.shadowOffsetX = 3;
		ctx.shadowOffsetY = 3;
		ctx.shadowBlur = 3;
		ctx.textAlign = 'center';
		ctx.textBaseline = "middle";
	
		ctx.fillText('Game Over', 270, 250);
		ctx.fillText(this.players[this.winner].playerName + ' Wins !', 270, 280);
	
		ctx.restore();
	}
}

app.appClashRoyale.Game.prototype.isXYInsideGrid = function(x, y)
{
	return x >= this.grid.x1 && y >= this.grid.y1 && x <= this.grid.x2 && y <= this.grid.y2;
}

app.appClashRoyale.Game.prototype.isXYInsideSafeArea = function(x, y)
{
	let isSafe = true;

	a: for (let i = 0; i < this.players.length; i++) {
		b: for (let j = 0; j < this.players[i].castles.length; j++) {
			if (this.players[i].type == app.appClashRoyale.Player.TYPE_BAD && this.players[i].castles[j].isXYInsideWeaponRange(x, y) == true && this.players[i].castles[j].life > 0){
				isSafe = false;
				break a;
			}
		}
	}
	
	return isSafe;
}

app.appClashRoyale.Game.prototype.update = function(timeDif)
{
	//if gameOver then do not update anything
	if (this.winner != -1){
		return;
	}

	this.updatePlayerBadAi(timeDif);

	this.updateTimeLeft(timeDif);
	this.updatePlayers(timeDif);
	this.updateUnitsMove(timeDif);
	this.updateAttacks(timeDif);
	this.updateGameOver(timeDif);
}

app.appClashRoyale.Game.prototype.updateTimeLeft = function(timeDif)
{
	this.timeLeft = Math.max(0, this.timeLeft - (timeDif / 1000));
}


app.appClashRoyale.Game.prototype.updatePlayers = function(timeDif)
{
	for (let i = 0; i < this.players.length; i++) {
		this.players[i].update(timeDif);
	}
}

app.appClashRoyale.Game.prototype.updateUnitsMove = function(timeDif)
{
	let castlesToAttack = {
		[app.appClashRoyale.Player.TYPE_GOOD]: 2,
		[app.appClashRoyale.Player.TYPE_BAD]: 1,
	};

	let gh = (this.grid.y2 - this.grid.y1) / this.adapter[0].length;
	let gw = (this.grid.x2 - this.grid.x1) / this.adapter.length;

	for (let i = 0; i < this.players.length; i++) {
		for (let j = 0; j < this.players[i].units.length; j++) {
			if (this.players[i].units[j].isAttacking == false){
				let m = timeDif / this.players[i].units[j].moveSpeed;

				let oldX = this.players[i].units[j].x;
				let oldY = this.players[i].units[j].y;

				let x = Math.round((this.players[i].units[j].x - this.grid.x1) / gw);
				let y = Math.round((this.players[i].units[j].y - this.grid.y1) / gh);

				let castleToAttack = castlesToAttack[this.players[i].type];
				let castle = spa.PathFinder.find(x, y, castleToAttack, this.adapter);
				let path = spa.PathFinder.path(x, y, castle.x, castle.y, this.adapter);

				x = (path[2]?.x || path[1].x) * gw + this.grid.x1;
				y = (path[2]?.y || path[1].x) * gh + this.grid.y1;						
				
				this.players[i].units[j].x = this.players[i].units[j].x + (x - this.players[i].units[j].x) * m;
				this.players[i].units[j].y = this.players[i].units[j].y + (y - this.players[i].units[j].y) * m;

				if (oldY >= this.players[i].units[j].y){
					this.players[i].units[j].direction = 'up';
				}
				else{
					this.players[i].units[j].direction = 'down';
				}
			}


			if (this.players[i].units[j].direction == 'up'){
				if (this.players[i].units[j].isAttacking == false && this.players[i].units[j].state != 'walkUp'){
					this.players[i].units[j].setState('walkUp');
				}

				if (this.players[i].units[j].isAttacking == true && this.players[i].units[j].state != 'attackUp'){
					this.players[i].units[j].setState('attackUp');
				}
			}
			else{
				if (this.players[i].units[j].isAttacking == false && this.players[i].units[j].state != 'walkDown'){
					this.players[i].units[j].setState('walkDown');
				}

				if (this.players[i].units[j].isAttacking == true && this.players[i].units[j].state != 'attackDown'){
					this.players[i].units[j].setState('attackDown');
				}
			}
		}
	}
}

app.appClashRoyale.Game.prototype.updateAttacks = function(timeDif)
{
	//update attacks
	for (let a = 0; a < this.players.length; a++) {
		for (let b = 0; b < this.players.length; b++) {

			if (this.players[a].type == this.players[b].type){
				continue;
			}

			let playerAUnitsAndCastles = [...this.players[a].units, ...this.players[a].castles];
			let playerBUnitsAndCastles = [...this.players[b].units, ...this.players[b].castles];

			for (let i = 0; i < playerAUnitsAndCastles.length; i++) {
				for (let j = 0; j < playerBUnitsAndCastles.length; j++) {
					if (playerAUnitsAndCastles[i].life > 0 && playerAUnitsAndCastles[i].isXYInsideWeaponRange(playerBUnitsAndCastles[j].x, playerBUnitsAndCastles[j].y) == true){
						playerAUnitsAndCastles[i].startAttacking(playerBUnitsAndCastles[j].x, playerBUnitsAndCastles[j].y);

						let weaponSpeed = timeDif / playerAUnitsAndCastles[i].weaponSpeed;
						let weaponDamage = weaponSpeed * playerAUnitsAndCastles[i].weaponDamage;
				
						playerBUnitsAndCastles[j].life = Math.max(playerBUnitsAndCastles[j].life - weaponDamage, 0);

						break;
					}
				}
			}
		}
	}

	//remove dead units and castles from players
	for (let i = 0; i < this.players.length; i++) {

		//dead units
		for (let j = 0; j < this.players[i].units.length; j++) {
			if (this.players[i].units[j].life == 0){
				for (let a = 0; a < this.players.length; a++) {
					for (let b = 0; b < this.players[a].units.length; b++) {
						if (this.players[a].units[b].isXYInsideWeaponRange(this.players[i].units[j].x, this.players[i].units[j].y) == true){
							this.players[a].units[b].stopAttacking();
						}					
					}

					for (let b = 0; b < this.players[a].castles.length; b++) {
						if (this.players[a].castles[b].isXYInsideWeaponRange(this.players[i].units[j].x, this.players[i].units[j].y) == true){
							this.players[a].castles[b].stopAttacking();
						}					
					}
				}

				this.players[i].units[j].stopAttacking();
				this.players[i].units.splice(j, 1);
			}
		}


		//dead castles
		for (let j = 0; j < this.players[i].castles.length; j++) {
			if (this.players[i].castles[j].life == 0){
				for (let a = 0; a < this.players.length; a++) {
					for (let b = 0; b < this.players[a].units.length; b++) {
						if (this.players[a].units[b].isXYInsideWeaponRange(this.players[i].castles[j].x, this.players[i].castles[j].y) == true){
							this.players[a].units[b].stopAttacking();
						}					
					}
				}

				this.players[i].castles[j].stopAttacking();
				this.players[i].castles[j].type = 'castleRuin';

				this.initAdapter();
			}
		}
	}
}

app.appClashRoyale.Game.prototype.updateGameOver = function(timeDif)
{
	//get winner
	let playersStillAlive = [];

	for (let i = 0; i < this.players.length; i++) {
		let isAllCastlesRuined = true;

		for (let j = 0; j < this.players[i].castles.length; j++) {
			if (this.players[i].castles[j].life > 0){
				isAllCastlesRuined = false;
				break;
			}
		}

		if (isAllCastlesRuined == false){
			playersStillAlive.push(i);
		}
	}

	if (playersStillAlive.length == 1){
		this.winner = playersStillAlive[0];

		this.onGameOver?.();
	}
}

app.appClashRoyale.Game.prototype.updatePlayerBadAi = function(timeDif)
{
	for (let i = 0; i < this.players.length; i++) {
		if (this.players[i].type == app.appClashRoyale.Player.TYPE_BAD){
			if (this.players[i].stackSelected == -1){
				let j = spa.Math.getRandomNumber(1, this.players[i].stack.length - 1);

				if (this.players[i].stack[j] != null){
					this.players[i].stackSelected = j;
					this.players[i].stack[j].setScale(this.players[i].stack[j].scale, app.appClashRoyale.Player.STACK_SCALE_SELECTED, 300);
				}
			}
			else{
				let x = spa.Math.getRandomNumber(this.grid.x1, this.grid.x2);
				let y = spa.Math.getRandomNumber(this.grid.y1, this.grid.y2 / 2.2);

				this.players[i].putSelectedStackOnGrid(x, y);
			}
		}
	}
}