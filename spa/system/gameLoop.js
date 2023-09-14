spa.GameLoop = function(update, draw)
{
	this.update = update;
	this.draw = draw;

	this.fps = 60;
}

spa.GameLoop.prototype.fps = null;
spa.GameLoop.prototype.timeOld = null;

spa.GameLoop.prototype.start = function()
{
    this.requestAnimationFrameId = window.requestAnimationFrame(this.start.bind(this));

	this.timeOld = this.timeOld || performance.now();
	this.timeNow = performance.now();
	this.timeDif = this.timeNow - this.timeOld;

	if (this.timeDif < 1000 / this.fps){
		return;
	}

	this.timeOld = this.timeNow;

	this.update(this.timeDif)
	this.draw();  
}

spa.GameLoop.prototype.stop = function()
{
    window.cancelAnimationFrame(this.requestAnimationFrameId);
}

