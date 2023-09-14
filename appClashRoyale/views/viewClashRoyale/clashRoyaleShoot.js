app.appClashRoyale.Shoot = function(type)
{
	this.type = type;

	for (const k in app.appClashRoyale.Shoot.types[type]) {
		this[k] = app.appClashRoyale.Shoot.types[type][k];
	}

	this.isShooting = false;

	this.animationFire = new spa.Animation();
	this.animationFire.setRoute(this.fireTime, [[this.fireFrameStart, this.fireFrameEnd]], spa.Animation.TIMING_LINEAR, spa.Animation.DIRECTION_FORWARD, 0, false, 0, false, null, [{position: this.fireTime, direction: spa.Animation.DIRECTION_FORWARD, callback: this.onFireEnd.bind(this)}]);
	this.animationFire.pause();

	this.animationFly = new spa.Animation();
	this.animationFly.setRoute(this.flyTime, [[this.flyFramesStart, this.flyFramesEnd]], spa.Animation.TIMING_LINEAR, spa.Animation.DIRECTION_FORWARD, 0, false, 999, true, null, [{position: this.flyTime, direction: spa.Animation.DIRECTION_FORWARD, callback: this.onFlyEnd.bind(this)}]);
	this.animationFly.pause();

	this.animationExplode = new spa.Animation();
	this.animationExplode.setRoute(this.explodeTime, [[this.explodeFramesStart, this.explodeFramesEnd]], spa.Animation.TIMING_LINEAR, spa.Animation.DIRECTION_FORWARD, 0, false, 0, false, null, [{position: this.explodeTime, direction: spa.Animation.DIRECTION_FORWARD, callback: this.onExplodeEnd.bind(this)}]);
	this.animationExplode.pause();

	this.moveTime = this.flyTime;
	this.animationMove = new spa.Animation();
	this.animationMove.setRoute(this.moveTime, [[0, 0], [0, 0]], spa.Animation.TIMING_LINEAR, spa.Animation.DIRECTION_FORWARD, this.fireTime, false, 0, false, null, [{position: this.moveTime, direction: spa.Animation.DIRECTION_FORWARD, callback: this.onMoveEnd.bind(this)}]);
	this.animationMove.pause();

	this.animation = this.animationFire;
	this.sprite = parseInt(this.animation.arrayResults[0]);

	this.setWH(40, 40);
	this.setXY(0, 0, 0, 0);
}

app.appClashRoyale.Shoot.types = {
	'shoot1': {imageName: 'appClashRoyale/views/viewClashRoyale/images/shoot/shoot_1_38_128.webp', image: null, size: 128, cols: 8, fireFrameStart: 0, fireFrameEnd: 10, fireTime: 100, flyFramesStart: 11, flyFramesEnd: 13, flyTime: 500, explodeFramesStart: 14, explodeFramesEnd: 38, explodeTime: 500, },
	'shoot2': {imageName: 'appClashRoyale/views/viewClashRoyale/images/shoot/shoot_2_7_128.webp', image: null, size: 128, cols: 5, fireFrameStart: 0, fireFrameEnd: 0, fireTime: 100, flyFramesStart: 1, flyFramesEnd: 1, flyTime: 500, explodeFramesStart: 2, explodeFramesEnd: 6, explodeTime: 500, },
}

app.appClashRoyale.Shoot.prototype.x1 = null;
app.appClashRoyale.Shoot.prototype.y1 = null;
app.appClashRoyale.Shoot.prototype.x2 = null;
app.appClashRoyale.Shoot.prototype.y2 = null;
app.appClashRoyale.Shoot.prototype.w = null;
app.appClashRoyale.Shoot.prototype.h = null;

app.appClashRoyale.Shoot.prototype.draw = function(ctx) 
{
	if (this.isShooting == true && this.type != null){
		ctx.save();

		let col = parseInt(this.sprite%this.cols);
		let row = parseInt(this.sprite/this.cols);

		ctx.drawImage(app.appClashRoyale.Shoot.types[this.type].image, col * this.size, row * this.size, this.size, this.size, this.cx, this.cy, this.w, this.h);
	
		ctx.restore();
	}
}

app.appClashRoyale.Shoot.prototype.setWH = function(w, h)
{
	this.w = w;
	this.h = h;
}

app.appClashRoyale.Shoot.prototype.setXY = function(x1, y1, x2, y2)
{
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
}

app.appClashRoyale.Shoot.prototype.start = function(x1, y1, x2, y2, onFireEnd, onFlyEnd, onExplodeEnd)
{
	this.setXY(x1, y1, x2, y2);

	this.onFireEnd = onFireEnd;
	this.onFlyEnd = onFlyEnd;
	this.onExplodeEnd = onExplodeEnd;

	this.isShooting = true;

	this.animationFire.reset();
	this.animationFly.reset();
	this.animationExplode.reset();
	this.animationMove.reset();

	this.animation = this.animationFire;
	this.animation.resume();

	this.animationMove.setRoute(this.moveTime, [[x1, x2], [y1, y2]], spa.Animation.TIMING_LINEAR, spa.Animation.DIRECTION_FORWARD, this.fireTime, false, 0, false, null, [{position: this.moveTime, direction: spa.Animation.DIRECTION_FORWARD, callback: this.onMoveEnd.bind(this)}]);
	this.animationMove.reset();
	this.animationMove.resume();
}

app.appClashRoyale.Shoot.prototype.stop = function()
{
	this.isShooting = false;

	this.animationFire.reset();
	this.animationFly.reset();
	this.animationExplode.reset();
	this.animationMove.reset();
}

app.appClashRoyale.Shoot.prototype.onFireEnd = function()
{
	this.animationFire.pause();

	this.animation = this.animationFly;
	this.animation.reset();
	this.animation.resume();

	this.onFireEnd?.();
}

app.appClashRoyale.Shoot.prototype.onFlyEnd = function()
{
	this.animationFly.pause();

	this.animation = this.animationExplode;
	this.animation.reset();
	this.animation.resume();

	this.onFlyEnd?.();
}

app.appClashRoyale.Shoot.prototype.onExplodeEnd = function()
{
	this.isShooting = false;

	this.animationExplode.pause();

	this.onExplodeEnd?.();


	this.start(this.x1, this.y1, this.x2, this.y2, this.onFireEnd, this.onFlyEnd, this.onExplodeEnd);
}

app.appClashRoyale.Shoot.prototype.onMoveEnd = function()
{
	this.animationMove.pause();
}

app.appClashRoyale.Shoot.prototype.update = function(timeDif) 
{
	this.animation.calculate();
	this.animationMove.calculate();

	this.sprite = Math.round(this.animation.arrayResults[0]);

	this.cx = this.animationMove.arrayResults[0] - this.w/2;
	this.cy = this.animationMove.arrayResults[1] - this.h/2;
}

