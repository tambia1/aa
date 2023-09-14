spa.Images = {};

spa.Images.getImage = function(imageUrl, onLoad, onError)
{
	let imageElement = new Image();
	imageElement.crossOrigin = 'anonymous';
	imageElement.src = imageUrl;

	imageElement.onload = function() {
		let imageCanvas = document.createElement('canvas');
		imageCanvas.width = imageElement.width;
		imageCanvas.height = imageElement.height;

		let imageContext = imageCanvas.getContext('2d');

		imageContext.drawImage(imageElement, 0, 0);

		let imageData = imageContext.getImageData(0, 0, imageElement.width, imageElement.height);
		let imageBase64 = imageCanvas.toDataURL('image/jpeg', 1.0);

		onLoad?.(imageUrl, imageElement, imageCanvas, imageContext, imageData, imageBase64);
	}

	imageElement.onerror = function() {
		onError?.(imageUrl);
	}
}

spa.Images.cloneCanvas = function(canvas)
{
	let canvasTemp = document.createElement('canvas');
	let ctxTemp = canvasTemp.getContext('2d');

	canvasTemp.width = canvas.width;
	canvasTemp.height = canvas.height;

	ctxTemp.imageSmoothingEnabled = false;
	ctxTemp.drawImage(canvas, 0, 0);

	return canvasTemp;
}

spa.Images.copyCanvas = function(sourceCanvas, destinationCanvas)
{
	let destinationContext = destinationCanvas.getContext('2d');

	destinationContext.drawImage(sourceCanvas, 0, 0);
}

spa.Images.resizeCanvas = function(canvas, w, h)
{
	let canvasTemp = document.createElement('canvas');
	let ctxTemp = canvasTemp.getContext('2d');

	canvasTemp.width = canvas.width;
	canvasTemp.height = canvas.height;

	ctxTemp.imageSmoothingEnabled = false;
	ctxTemp.drawImage(canvas, 0, 0);


	let ctx = canvas.getContext('2d');

	canvas.width = w;
	canvas.height = h;

	ctx.imageSmoothingEnabled = true;
	ctx.drawImage(canvasTemp, 0, 0, canvasTemp.width, canvasTemp.height, 0, 0, w, h);
}

spa.Images.changeCanvasColorsToInvert = function(canvas)
{
	let ctx = canvas.getContext('2d');

	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const data = imageData.data;

	for (let i = 0; i < data.length; i += 4) {
		data[i + 0] = 255 - data[i + 0];
		data[i + 1] = 255 - data[i + 1];
		data[i + 2] = 255 - data[i + 2];
	}

	ctx.putImageData(imageData, 0, 0);
}

spa.Images.changeCanvasColorsToGray = function(canvas)
{
	let ctx = canvas.getContext('2d');

	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const data = imageData.data;

	for (let i = 0; i < data.length; i += 4) {
		let avg = (data[i + 0] + data[i + 1] + data[i + 2]) / 3;

		data[i + 0] = avg;
		data[i + 1] = avg;
		data[i + 2] = avg;
	}

	ctx.putImageData(imageData, 0, 0);
}

spa.Images.removeCanvasBackground = function(canvas, tolerance)
{
	let ctx = canvas.getContext('2d');

	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const data = imageData.data;

	let bgr = data[0];
	let bgg = data[1];
	let bgb = data[2];

	for (let i = 0; i < data.length; i += 4) {
		let isRedInRange = data[i + 0] - tolerance <= bgr && data[i + 0] + tolerance >= bgr;
		let isGreenInRange = data[i + 1] - tolerance <= bgg && data[i + 1] + tolerance >= bgg;
		let isBlueInRange = data[i + 2] - tolerance <= bgb && data[i + 2] + tolerance >= bgb;

		if (isRedInRange == true && isGreenInRange == true && isBlueInRange == true){
			data[i + 3] = 0;
		}
	}

	ctx.putImageData(imageData, 0, 0);
}

spa.Images.smoothCanvasEdges = function(canvas, tolerance)
{
	let ctx = canvas.getContext('2d');

	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const data = imageData.data;

	for (let y = 1; y < canvas.height - 2; y++){
		for (let x = 1; x < canvas.width - 2; x++){
			let rgba0 = spa.Images.getPixel(data, canvas.width, canvas.height, x, y);

			let rgba1 = spa.Images.getPixel(data, canvas.width, canvas.height, x - 1, y - 1);
			let rgba2 = spa.Images.getPixel(data, canvas.width, canvas.height, x + 0, y - 1);
			let rgba3 = spa.Images.getPixel(data, canvas.width, canvas.height, x + 1, y - 1);
			let rgba4 = spa.Images.getPixel(data, canvas.width, canvas.height, x + 1, y + 0);
			let rgba5 = spa.Images.getPixel(data, canvas.width, canvas.height, x + 1, y + 1);
			let rgba6 = spa.Images.getPixel(data, canvas.width, canvas.height, x + 0, y + 1);
			let rgba7 = spa.Images.getPixel(data, canvas.width, canvas.height, x - 1, y + 1);
			let rgba8 = spa.Images.getPixel(data, canvas.width, canvas.height, x - 1, y + 0);

			if (rgba0[3] != 0 && (rgba2[3] == 0 || rgba4[3] == 0 || rgba6[3] == 0 || rgba8[3] == 0)){
				rgba0[3] = rgba0[3] / 2;
			}

			spa.Images.setPixel(data, canvas.width, canvas.height, x, y, rgba0);

		}
	}

	ctx.putImageData(imageData, 0, 0);
}

spa.Images.getPixel = function(imageData, width, height, x, y)
{
	return [imageData[y * 4 * width + x * 4 + 0], imageData[y * 4 * width + x * 4 + 1], imageData[y * 4 * width + x * 4 + 2], imageData[y * 4 * width + x * 4 + 3]];
}

spa.Images.setPixel = function(imageData, width, height, x, y, rgba)
{
	imageData[y * 4 * width + x * 4 + 0] = rgba[0];
	imageData[y * 4 * width + x * 4 + 1] = rgba[1];
	imageData[y * 4 * width + x * 4 + 2] = rgba[2];
	imageData[y * 4 * width + x * 4 + 3] = rgba[3];
}

spa.Images.getImageAverageColor = function(canvas)
{
	let ctx = canvas.getContext('2d');
	let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

	let blockSize = 5; // only visit every 5 pixels
	let r = 0;
	let g = 0;
	let b = 0;
	let a = 0;
	let count = 0;

	for (let i = 0; i < imageData.length; i += blockSize * 4) {
		//skip transparent
		if (imageData[i + 3] == 0){
			continue;
		}

		//skip white
		if (imageData[i + 0] > 250 && imageData[i + 1] > 250 && imageData[i + 2] > 250){
			continue
		}

		r += imageData[i + 0];
		g += imageData[i + 1];
		b += imageData[i + 2];
		a += imageData[i + 3];

		count++;
	}

	r = ~~(r / count);
	g = ~~(g / count);
	b = ~~(b / count);
	a = ~~(a / count);

	return {r: r, g: g, b: b, a: a};
}

spa.Images.hexToRgba = function(hex)
{
	hex = hex.replace('#', '');
	hex = hex.length == 6 ? hex + '00' : hex;

	let n = parseInt(hex, 16);

	let a = (n >> 0) & 255;
	let b = (n >> 8) & 255;
	let g = (n >> 16) & 255;
	let r = (n >> 24) & 255;

	return {r: r, g: g, b: b, a: a};
}

spa.Images.rgbaToHex = function(r, g, b, a)
{
	return '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0') + a.toString(16).padStart(2, '0');
}