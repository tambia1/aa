spa.Camera = function(type)
{
	let str = '' +
        '<input id="file_input_camera" type="file" accept="image/*" style="display: none;"></input>' +
	'';

    this.item = new spa.Item(str);

    switch (type){
        case spa.Camera.TYPE_FRONT_CAMERA:
            this.setAttribute('capture', 'user');
            break;

        case spa.Camera.TYPE_REAR_CAMERA:
            this.setAttribute('capture', 'environment');
            break;

        case spa.Camera.TYPE_FILE:
            break;

        case spa.Camera.TYPE_SELECT:
            break;
    }
}

spa.Camera.prototype.item = null;

spa.Camera.TYPE_FRONT_CAMERA = 'TYPE_FRONT_CAMERA';
spa.Camera.TYPE_REAR_CAMERA = 'TYPE_REAR_CAMERA';
spa.Camera.TYPE_FILE = 'TYPE_FILE';
spa.Camera.TYPE_SELECT = 'TYPE_SELECT';

spa.Camera.prototype.takePicture = function (onTakePictureFinished)
{
    this.item.div.onchange = function(e) {
        let file = e.target.files[0];

        if (file != null) {
            onTakePictureFinished && onTakePictureFinished(file);
        }
    }

    this.item.div.click();
}

spa.Camera.getFileDetails = function(file, onFinish)
{
    let base64 = null;
    let orientation = null;

    let onFinishAll = function(){
        if (base64 != null && orientation != null){
            onFinish && onFinish(base64, orientation);
        }
    }


    //for base64
    let fileReaderBase64 = new FileReader();

    fileReaderBase64.onload = function(e) {
        base64 = e.target.result || '';

        onFinishAll();
    };

    fileReaderBase64.readAsDataURL(file);



    //for orientation
    let fileReaderOrientation = new FileReader();

    fileReaderOrientation.onloadend = function(e) {
        let scanner = new DataView(fileReaderOrientation.result);
        let idx = 0;

        if(scanner.getUint16(idx) == 0xFFD8) {
            let maxBytes = scanner.byteLength;
            let littleEndian = false;

            while(idx < maxBytes - 2) {
                let uint16 = scanner.getUint16(idx, littleEndian);
                idx += 2;

                switch(uint16) {
                    case 0xFFE1: // Start of EXIF
                        let endianNess = scanner.getUint16(idx + 8);
                        // II (0x4949) Indicates Intel format - Little Endian
                        // MM (0x4D4D) Indicates Motorola format - Big Endian
                        if (endianNess === 0x4949) {
                            littleEndian = true;
                        }
                        break;

                    case 0x0112: // Orientation tag
                        // Read the orientation, its 6 bytes further out
                        orientation = scanner.getUint16(idx + 6, littleEndian);
                        maxBytes = 0; // Stop scanning
                        break;
                }
            }
        }

        orientation = orientation || 1;

        onFinishAll();
    }

    fileReaderOrientation.readAsArrayBuffer(file);
}

spa.Camera.drawFileOnImage = function(img, file, onFinish)
{
    let imgURL = URL.createObjectURL(file);

    img.onload = function(e) {
        onFinish && onFinish(e);
    }

    img.src = imgURL;
}

spa.Camera.drawFileOnCanvas = function(canvas, file, onFinish)
{
    let img = new Image();
    let imgURL = URL.createObjectURL(file);

    img.onload = function(e) {
        canvas.width = img.width;
        canvas.height = img.height;

        let context = canvas.getContext('2d');
        context.translate(canvas.width / 2, canvas.height / 2);
        context.drawImage(img, -img.width/2, -img.height/2);
        context.translate(-canvas.width / 2, -canvas.height / 2);

        onFinish && onFinish(e);
    }

    img.src = imgURL;
}

spa.Camera.drawBase64OnCanvas = function(canvas, base64, onFinish)
{
    let img = new Image();

    img.onload = function(e) {
        canvas.width = img.width;
        canvas.height = img.height;

        let context = canvas.getContext('2d');
        context.translate(canvas.width / 2, canvas.height / 2);
        context.drawImage(img, -img.width/2, -img.height/2);
        context.translate(-canvas.width / 2, -canvas.height / 2);

        onFinish && onFinish(e);
    }

    img.src = base64;
}

spa.Camera.drawBase64OnCanvasWithAngel = function(canvas, base64, angle, onFinish)
{
    let img = new Image();

    img.onload = function(e) {
        angle = angle * Math.PI/180;    //to radians

        canvas.width = img.width;
        canvas.height = img.height;

        let context = canvas.getContext('2d');
        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate(angle);
        context.drawImage(img, -img.width/2, -img.height/2);
        context.rotate(-angle);
        context.translate(-canvas.width / 2, -canvas.height / 2);

        onFinish && onFinish(e);
    }

    img.src = base64;
}

spa.Camera.drawBase64OnCanvasWithOrientation = function(canvas, base64, orientation, onFinish)
{
    let angle = 0;

    switch (orientation) {
        case 1: angle = 0; break;
        case 3: angle = 180; break;
        case 6: angle = 90; break;
        case 8: angle = 270; break;
    }

    spa.Camera.drawBase64OnCanvasWithAngel(canvas, base64, angle, onFinish);
}

spa.Camera.getBase64FromCanvas = function(canvas, type, quality)
{
    let base64Oriented = canvas.toDataURL(type, quality);

    return base64Oriented;
}

