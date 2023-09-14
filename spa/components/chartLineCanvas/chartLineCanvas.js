spa.ChartLineCanvas = function(divId, divClass)
{
	let str = ''+
        '<div id="' + divId + '" class="' + divClass + ' chart_line_canvas">'+
            '<canvas width="0" height="0"></canvas>'+
        '</div>'+
	'';

    this.item = new spa.Item(str);

    //save canvas
    this.canvas = this.item.div.querySelector('canvas');

    //set vars
	this.axisXValues = [];
	this.axisXValuesMax = 0;
	this.axisYValues = [];
	this.axisYValuesMax = 0;
	this.linesValues = [];
	this.startX = 30 * window.devicePixelRatio;
	this.startY = 30 * window.devicePixelRatio;
	this.endX = 10 * window.devicePixelRatio;
	this.endY = 10 * window.devicePixelRatio;
	this.fontName = 'Helvetica';
	this.fontSize = (100 * window.devicePixelRatio) + '%';     //30px
	this.fontStyle = 'normal';  //italic
	this.fontWeight = 'normal'; //bold


    let observer = new MutationObserver(function(mutationsList, observer) {
        this.paint();
        observer.disconnect();
    }.bind(this));

    observer.observe(this.item.div.parentElement, { attributes: true, childList: true, subtree: true });


    window.addEventListener('resize', function() {
        this.paint();
    }.bind(this), false);
}

spa.ChartLineCanvas.prototype.item = null;

spa.ChartLineCanvas.prototype.axisXValues = null;
spa.ChartLineCanvas.prototype.axisXValuesMax = null;
spa.ChartLineCanvas.prototype.axisYValues = null;
spa.ChartLineCanvas.prototype.axisYValuesMax = null;
spa.ChartLineCanvas.prototype.linesValues = null;

spa.ChartLineCanvas.prototype.axisXFirstLineColor = null;
spa.ChartLineCanvas.prototype.axisXLinesColor = null;
spa.ChartLineCanvas.prototype.axisXTextColor = null;
spa.ChartLineCanvas.prototype.axisXLineWidth = null;
spa.ChartLineCanvas.prototype.axisYFirstLineColor = null;
spa.ChartLineCanvas.prototype.axisYLinesColor = null;
spa.ChartLineCanvas.prototype.axisYTextColor = null;
spa.ChartLineCanvas.prototype.axisYLineWidth = null;

spa.ChartLineCanvas.prototype.fontName = null;
spa.ChartLineCanvas.prototype.fontSize = null;
spa.ChartLineCanvas.prototype.fontStyle = null;

spa.ChartLineCanvas.prototype.axisLinesWidth = null;

spa.ChartLineCanvas.prototype.paint = function ()
{
    let canvas = this.canvas;
    let ctx = canvas.getContext('2d');

    //update size maintaining device pixel ratio
    let w = this.item.div.offsetWidth;
    let h = this.item.div.offsetHeight;

	canvas.width = w * window.devicePixelRatio;
	canvas.height = h * window.devicePixelRatio;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';

	//set ratio
	let rx = (canvas.width - this.startX - this.endX) / this.axisXValuesMax;
	let ry = (canvas.height - this.startY - this.endY) / this.axisYValuesMax;

	//set text
    ctx.font = this.fontStyle + ' ' + this.fontWeight + ' ' + this.fontSize + ' ' + this.fontName;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'right';
    ctx.fillStyle = this.axisXTextColor;

    let fontSize = ctx.measureText('m').width;


    //draw chart
    ctx.save();

    ctx.clearRect (0, 0, canvas.width, canvas.height);
    ctx.scale(1, 1);
    ctx.translate(0.5, 0.5);

    ctx.lineCap = 'round';



    //draw axis x
    ctx.lineWidth = this.axisXLineWidth;
    ctx.strokeStyle = this.axisXFirstLineColor;

    ctx.beginPath();
    ctx.moveTo(this.startX, canvas.height - this.startY);
    ctx.lineTo(canvas.width - this.endX, canvas.height - this.startY);
    ctx.stroke();

    ctx.strokeStyle = this.axisXLinesColor;

    for (let i = 1; i < this.axisYValues.length; i++){
        ctx.beginPath();
        ctx.moveTo(this.startX, canvas.height - this.startY - this.axisYValues[i][0] * ry);
        ctx.lineTo(canvas.width - this.endX, canvas.height - this.startY - this.axisYValues[i][0] * ry);
        ctx.stroke();
    }



    //draw axis y
    ctx.lineWidth = this.axisYLineWidth;
    ctx.strokeStyle = this.axisYFirstLineColor;

    ctx.beginPath();
    ctx.moveTo(this.startX, this.endY);
    ctx.lineTo(this.startX, canvas.height - this.startY);
    ctx.stroke();

    ctx.strokeStyle = this.axisYLinesColor;

    for (let i = 1; i < this.axisXValues.length; i++){
        ctx.beginPath();
        ctx.moveTo(this.startX + this.axisXValues[i][0] * rx, this.endY);
        ctx.lineTo(this.startX + this.axisXValues[i][0] * rx, canvas.height - this.startY);
        ctx.stroke();
    }



    //draw axis x text
    // ctx.shadowColor = this.axisXTextColor;
    ctx.fillStyle = this.axisXTextColor;

    for (let i = 0; i < this.axisXValues.length ; i++) {
        ctx.textAlign = this.axisXValues[i][2];
        ctx.fillText(this.axisXValues[i][1], this.startX + this.axisXValues[i][0] * rx, canvas.height - this.startY + fontSize);
    }



    //draw axis y text
    // ctx.shadowColor = this.axisYTextColor;
    ctx.fillStyle = this.axisYTextColor;

    for (let i = 0; i < this.axisYValues.length; i++) {
        ctx.textAlign = this.axisYValues[i][2];
        ctx.fillText(this.axisYValues[i][1], this.startX - fontSize/2, canvas.height - this.startY - this.axisYValues[i][0] * ry - fontSize/2);
    }


    //draw lines values
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    for (let i = 0; i < this.linesValues.length; i++) {
        let lineColor = this.linesValues[i].lineColor;
        let circleStrokeColor = this.linesValues[i].circleStrokeColor;
        let circleFillColor = this.linesValues[i].circleFillColor;
        let lineValues = this.linesValues[i].lineValues;
        let lineWidth = this.linesValues[i].lineWidth;


        //draw next line
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = lineColor;

        ctx.beginPath();
        for (let j = 0; j < lineValues.length ; j++){
            ctx.lineTo(this.startX + lineValues[j][0] * rx, canvas.height - this.startY - lineValues[j][1] * ry);
        }
        ctx.stroke();


        //draw circle
        for (let j = 0; j < lineValues.length ; j++){
            ctx.beginPath();
            ctx.arc(this.startX + lineValues[j][0] * rx, canvas.height - this.startY - lineValues[j][1] * ry, fontSize / 3, 0, 2 * Math.PI, false);
            ctx.fillStyle = circleFillColor;
            ctx.fill();

            ctx.strokeStyle = circleStrokeColor;
            ctx.stroke();
        }
    }

    //restore
    ctx.restore();
}

/**
 * @example this.chartCanvas.setAxisXValues('#cccccc', '#cccccc', '#000000', 1, [[0, 'Mar 0', 'center'], [1, 'Mar 1', 'center'], 2, [3, 'Mar 3', 'center'], 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
 */
spa.ChartLineCanvas.prototype.setAxisXValues = function (firstLineColor, linesColor, textColor, lineWidth, values) {
	this.axisXFirstLineColor = firstLineColor;
	this.axisXLinesColor = linesColor;
	this.axisXTextColor = textColor;
    this.axisXLineWidth = lineWidth;
    this.axisXValues = values.length > 0 ? values : [[0, 0]];

    for (let i = 0; i < this.axisXValues.length; i++){
        if (this.axisXValues[i] instanceof Array == false){
            this.axisXValues[i] = [this.axisXValues[i]];
        }

        if (this.axisXValues[i][1] == undefined){
            this.axisXValues[i][1] = '' + this.axisXValues[i][0];
        }

        if (this.axisXValues[i][2] == undefined){
            this.axisXValues[i][2] = 'left';
        }
    }

    this.axisXValuesMax = this.axisXValues[0][0];
    for (let i = 0; i < values.length; i++){
        this.axisXValuesMax = Math.max(this.axisXValuesMax, this.axisXValues[i][0]);
    }
}

/**
 * @example this.chartCanvas.setAxisYValues('#cccccc', '#cccccc', '#000000', 1, [0, 10, 20, 30, [40000, '40k']]);
 */
spa.ChartLineCanvas.prototype.setAxisYValues = function (firstLineColor, linesColor, textColor, lineWidth, values) {
    this.axisYFirstLineColor = firstLineColor;
    this.axisYLinesColor = linesColor;
    this.axisYTextColor = textColor;
    this.axisYLineWidth = lineWidth;
    this.axisYValues = values.length > 0 ? values : [[0, 0]];


    for (let i = 0; i < this.axisYValues.length; i++){
        if (this.axisYValues[i] instanceof Array == false){
            this.axisYValues[i] = [this.axisYValues[i]];
        }

        if (this.axisYValues[i][1] == undefined){
            this.axisYValues[i][1] = '' + this.axisYValues[i][0];
        }

        if (this.axisYValues[i][2] == undefined){
            this.axisYValues[i][2] = 'right';
        }
    }

    this.axisYValuesMax = this.axisXValues[0][0];
    for (let i = 0; i < values.length; i++){
        this.axisYValuesMax = Math.max(this.axisYValuesMax, this.axisYValues[i][0]);
    }
}

/**
 * @example this.chartCanvas.addLineValues('#4DB147', 'transparent', 'transparent', 2, [[0, 10], [1, 25], [2, 16], [3, 11], [4, 14], [5, 16], [6, 23], [7, 35], [8, 35], [9, 25], [10, 12], [11, 10]]);
 * @example this.chartCanvas.addLineValues('#B163FF', 'transparent', 'transparent', 2, [[0, 15], [1, 10], [2, 6], [3, 2], [4, 4], [5, 26], [6, 33], [7, 25], [8, 15], [9, 25], [10, 22], [11, 30]]);
 */
spa.ChartLineCanvas.prototype.addLineValues = function (lineColor, circleStrokeColor, circleFillColor, lineWidth, lineValues) {
    this.linesValues.push({lineColor: lineColor, circleStrokeColor: circleStrokeColor, circleFillColor: circleFillColor, lineWidth: lineWidth, lineValues: lineValues});

    this.paint();
}

spa.ChartLineCanvas.prototype.removeAllLineValues = function () {
    this.linesValues = [];

    this.paint();
}

