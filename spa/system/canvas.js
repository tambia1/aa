spa.Canvas = {};

spa.Canvas.rectRound = function(ctx, x, y, width, height, radius) 
{
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + width - radius, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	ctx.lineTo(x + width, y + height - radius);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	ctx.lineTo(x + radius, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
	ctx.lineTo(x, y + radius);
	ctx.quadraticCurveTo(x, y, x + radius, y);
	ctx.closePath();
}

spa.Canvas.createImageData = function(ctx, width, height) 
{
    return ctx.createImageData(width, height);
}

spa.Canvas.drawImageData = function(ctx, imageData, x, y) 
{
	ctx.putImageData(imageData, x, y);
}

spa.Canvas.putPixel = function(ctx, image, x, y, r, g, b, a) 
{
	let index = 4 * (ctx.canvas.width * y + x);

	image.data[index + 0] = r;
	image.data[index + 1] = g;
	image.data[index + 2] = b;
	image.data[index + 3] = a;
}
