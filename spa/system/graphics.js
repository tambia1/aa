spa.Graphics = {};

spa.Graphics.recolor = function (canvas, color1, color2, tolerance) {
    let context = canvas.getContext('2d');

    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let pixels = imageData.data;

    for (let i = 0; i < pixels.length; i += 4) {

        let color3 = pixels[i+0] << 24 | pixels[i+1] << 16 | pixels[i+2] << 8 | pixels[i+3] << 0;

        if (spa.Graphics.isSameColor(color1, color3, tolerance) == true)
        {
            pixels[i+0] = (color2 & 0xff000000) >>> 24;
            pixels[i+1] = (color2 & 0x00ff0000) >>> 16;
            pixels[i+2] = (color2 & 0x0000ff00) >>>  8;
            pixels[i+3] = (color2 & 0x000000ff) >>>  0;
        }
    }

    context.putImageData(imageData, 0, 0);
}

spa.Graphics.isSameColor = function(color1, color2, tolerance)
{
    let isSameColor = true;

    let r1 = (color1 & 0xff000000) >>> 24;
    let g1 = (color1 & 0x00ff0000) >>> 16;
    let b1 = (color1 & 0x0000ff00) >>>  8;
    let a1 = (color1 & 0x000000ff) >>>  0;

    let r2 = (color2 & 0xff000000) >>> 24;
    let g2 = (color2 & 0x00ff0000) >>> 16;
    let b2 = (color2 & 0x0000ff00) >>>  8;
    let a2 = (color2 & 0x000000ff) >>>  0;

    let d = Math.sqrt(Math.pow(r2 - r1, 2) + Math.pow(g2 - g1, 2) + Math.pow(b2 - b1, 2) + Math.pow(a2 - a1, 2));

    if (d > tolerance)
    {
        isSameColor = false;
    }

    return isSameColor;
}

spa.Graphics.getPixelRGBA = function (canvas, x, y) {
    let context = canvas.getContext('2d');

    let imageData = context.getImageData(x, y, 1, 1);
    return imageData.data;
}

spa.Graphics.getPixelsRGBA = function (canvas) {
    let context = canvas.getContext('2d');

    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    return imageData.data;
}

spa.Graphics.setPixelsRGBA = function (canvas, pixelsRGBA) {
    let context = canvas.getContext('2d');

    let s = Math.pow(pixelsRGBA.length / 4, 0.5);
    let imageData = context.createImageData(s, s);

    for (let i = 0; i < pixelsRGBA.length; i++) {
        imageData.data[i] = pixelsRGBA[i];
    }

    context.putImageData(imageData, 0, 0);
}

spa.Graphics.getBase64 = function (canvas, type, quality) {
    let base64 = canvas.toDataURL(type, quality);

    return base64;
}

spa.Graphics.getCanvas = function (w, h) {
    let newCanvas = document.createElement('canvas');

    newCanvas.width = w;
    newCanvas.height = h;

    return newCanvas;
}

spa.Graphics.getCanvasCloned = function (canvas) {
    let newCanvas = document.createElement('canvas');
    let context = newCanvas.getContext('2d');

    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;

    context.drawImage(canvas, 0, 0);

    return newCanvas;
}

spa.Graphics.getCanvasReSized = function (canvas, w, h) {
    let newCanvas = document.createElement('canvas');
    let context = newCanvas.getContext('2d');

    newCanvas.width = w;
    newCanvas.height = h;

    context.drawImage(canvas, 0, 0, w, h);

    return newCanvas;
}

spa.Graphics.drawCanvasOnCanvas = function (canvasSrc, canvasTrg) {
    let contextTrg = canvasTrg.getContext('2d');
    canvasTrg.width = canvasSrc.width;
    canvasTrg.height = canvasSrc.height;
    contextTrg.drawImage(canvasSrc, 0, 0);
}

spa.Graphics.getCanvasInBlackAndWhite = function (canvas) {
    let newCanvas = this.getCanvasCloned(canvas);
    let context = newCanvas.getContext('2d');

    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    for(let y = 0; y < imageData.height; y++){
        for(let x = 0; x < imageData.width; x++){
            let i = (y * 4) * imageData.width + x * 4;
            let avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;

            imageData.data[i + 0] = avg;
            imageData.data[i + 1] = avg;
            imageData.data[i + 2] = avg;
        }
    }

    context.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);

    return newCanvas;
}




