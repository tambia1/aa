spa.Confetti = function(divId, divClass)
{
	let str = ''+
		'<div id="' + divId + '" class="' + divClass + ' confetti">'+
			'<canvas width="100" height="100"></canvas>'+
		'</div>'+
	'';

    this.item = new spa.Item(str);

	//save canvas
	this.canvas = this.item.div.querySelector('canvas');

	//set vars
	this.isLooping = false;
	this.pieces = [];
}

spa.Confetti.prototype.item = null;

spa.Confetti.prototype.requestAnimationFrameId = null;
spa.Confetti.prototype.requestAnimationFrameFunction = null;
spa.Confetti.prototype.requestAnimationFrameTime = null;
spa.Confetti.prototype.isLooping = null;
spa.Confetti.prototype.pieces = null;

spa.Confetti.prototype.paint = function ()
{
	let canvas = this.canvas;
	let ctx = canvas.getContext('2d');

	ctx.imageSmoothingEnabled = true;

	//update size maintaining device pixel ratio
	let w = this.item.div.offsetWidth;
	let h = this.item.div.offsetHeight;

	canvas.width = w * window.devicePixelRatio;
	canvas.height = h * window.devicePixelRatio;
	canvas.style.width = w + 'px';
	canvas.style.height = h + 'px';

	//draw
	ctx.save();

	ctx.clearRect (0, 0, canvas.width, canvas.height);
	ctx.scale(1, 1);
	ctx.translate(0.5, 0.5);

	for (let i = 0; i < this.pieces.length; i++){
		let p = this.pieces[i];

		ctx.save();

		// ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
		// ctx.rotate(p.zAngle * Math.PI / 180);
		// ctx.translate(-p.x - p.w / 2, -p.y - p.h / 2);
		//
		// ctx.fillStyle = p.color;
		// ctx.fillRect(p.x, p.y, p.w, p.h);


		let ax = p.xAngle;
		let ay = p.yAngle;
		let az = p.zAngle;
		let xy1 = this.rotate3D(-p.w/2, -p.h/2, 0, ax, ay, az);
		let xy2 = this.rotate3D(-p.w/2 + p.w, -p.h/2, 0, ax, ay, az);
		let xy3 = this.rotate3D(-p.w/2 + p.w, -p.h/2 + p.h, 0, ax, ay, az);
		let xy4 = this.rotate3D(-p.w/2, -p.h/2 + p.h, 0, ax, ay, az);


		ctx.fillStyle = p.color;
		ctx.shadowColor = '#00000055';
		ctx.shadowBlur = 20;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 5;

		ctx.beginPath();
		ctx.moveTo(p.x + p.w/2 + xy1.x, p.y + p.h/2 + xy1.y);
		ctx.lineTo(p.x + p.w/2 + xy2.x, p.y + p.h/2 + xy2.y);
		ctx.lineTo(p.x + p.w/2 + xy3.x, p.y + p.h/2 + xy3.y);
		ctx.lineTo(p.x + p.w/2 + xy4.x, p.y + p.h/2 + xy4.y);
		ctx.fill();

		ctx.restore();
	};


	//restore
	ctx.restore();
}

spa.Confetti.prototype.update = function (dt)
{
	for (let i = this.pieces.length - 1; i >= 0; i--){
		let piece = this.pieces[i];

		if (piece.y > this.canvas.height){
			this.removePiece(i);
			this.addRandomPieces(1);
		}
		else{
			piece.y += piece.gravity * dt;
			piece.x += piece.swing * dt;
			piece.xAngle += piece.xRotation * dt;
			piece.yAngle += piece.yRotation * dt;
			piece.zAngle += piece.zRotation * dt;
		}
	}

	if (this.pieces.length == 0){
		this.onDropFinish && this.onDropFinish(this);
	}
}

spa.Confetti.prototype.addPiece = function (color, x, y, w, h, gravity, swing, xRotation, yRotation, zRotation)
{
	this.pieces.push({color: color, x: x, y: y, w: w, h: h, gravity: gravity, swing: swing, xAngle: 0, xRotation: xRotation, yAngle: 0, yRotation: yRotation, zAngle: 0, zRotation: zRotation, });
}

spa.Confetti.prototype.removePiece = function (pieceIndex)
{
	this.pieces.splice(pieceIndex, 1);
}

spa.Confetti.prototype.getRandomNumber = function(minIncluded, maxIncluded)
{
	return minIncluded + Math.floor(Math.random() * (maxIncluded - minIncluded + 1));
}

spa.Confetti.prototype.getRandomFrom = function(...items)
{
	return items[this.getRandomNumber(0, items.length - 1)];
}

spa.Confetti.prototype.addRandomPieces = function(numberOfPieces)
{
	let cw = this.canvas.width;
	let ch = this.canvas.height;

	for (let i = 0; i < numberOfPieces; i++){
		this.addPiece(
			'rgba(' + this.getRandomNumber(0, 255) + ', ' + this.getRandomNumber(0, 255) + ', ' + this.getRandomNumber(0, 255) + ', ' + this.getRandomNumber(50, 100) / 100 + ')',
			this.getRandomNumber(0, cw),
			this.getRandomNumber(0, -ch),
			this.getRandomNumber(cw / 100, cw / 100 * 5),
			this.getRandomNumber(cw / 100, cw / 100 * 5),
			this.getRandomNumber(50, 60)/100,
			this.getRandomNumber(-cw/100, cw/100)/100,
			this.getRandomNumber(0, 10)/100 * this.getRandomFrom(-1, 1),
			this.getRandomNumber(0, 10)/100 * this.getRandomFrom(-1, 1),
			this.getRandomNumber(0, 10)/100 * this.getRandomFrom(-1, 1),
		);
	}
}

spa.Confetti.prototype.startLoop = function()
{
	this.requestAnimationFrameFunction = function() {
		let currentTime = new Date().getTime();
		let deltaTime = currentTime - this.requestAnimationFrameTime;

		this.requestAnimationFrameTime = currentTime;

		this.paint();
		this.update(deltaTime);

		if (this.isLooping == true){
			this.requestAnimationFrameId = window.requestAnimationFrame(this.requestAnimationFrameFunction);
		}
	}.bind(this);

	this.isLooping = true;
	this.requestAnimationFrameFunction();
}

spa.Confetti.prototype.stopLoop = function()
{
	this.isLooping = false;
	this.requestAnimationFrameId = window.cancelAnimationFrame(this.requestAnimationFrameId);
}



spa.Confetti.prototype.rotateX3D = function(x, y, z, a)
{
	a = a * Math.PI / 180;

	return {x: x, y: y * Math.cos(a) - z * Math.sin(a), z: y * Math.sin(a) + z * Math.cos(a)};
}

spa.Confetti.prototype.rotateY3D = function(x, y, z, a)
{
	a = a * Math.PI / 180;

	return {x: z * Math.sin(a) + x * Math.cos(a), y: y, z: z * Math.cos(a) - x * Math.sin(a)};
}

spa.Confetti.prototype.rotateZ3D = function(x, y, z, a)
{
	a = a * Math.PI / 180;

	return {x: x * Math.cos(a) - y * Math.sin(a), y: x * Math.sin(a) + y * Math.cos(a), z: z};
}

spa.Confetti.prototype.rotate3D = function(x, y, z, a, b, c)
{
	let arr = {x: x, y: y, z: z};

	arr = this.rotateZ3D(arr.x, arr.y, arr.z, c);
	arr = this.rotateY3D(arr.x, arr.y, arr.z, b);
	arr = this.rotateX3D(arr.x, arr.y, arr.z, a);

	return arr;
}
