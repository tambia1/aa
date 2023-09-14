spa.ChartLineSvg = function(divId, divClass)
{
    this.x1 = 5;
    this.x2 = 100;
    this.y1 = 5;
    this.y2 = 90;
    this.strokeWidth = 1;
    this.axisLinesColor = '#000000';
    this.gridLinesColor = '#999999';
    this.fontSize = '3px';
    this.fontFamily = 'Arial';
    this.fontColor = '#0000ff';
    this.circleSize = 0.5;

    this.axisXData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    this.axisYData = [0, 10, 20, 30, 40];
    this.datas = [
        {
            color: '#F29AD2',
            data: [[0, 10], [1, 25], [2, 16], [3, 11], [4, 14], [5, 16], [6, 23], [7, 35], [8, 35], [9, 25], [10, 12], [11, 10]],
        },
        {
            color: '#9AD2F2',
            data: [[0, 20], [1, 15], [2, 26], [3, 21], [4, 24], [5, 26], [6, 33], [7, 25], [8, 15], [9, 25], [10, 22], [11, 30]],
        },
    ];

    this.gapX = (this.x2 - this.x1) / (this.axisXData.length - 1);
    this.gapY = (this.y2 - this.y1) / (this.axisYData.length - 1);

	let str = '';
	
    str += '<svg  id="' + divId + '" class="' + divClass + '" viewBox="0 0 100 100" preserveAspectRatio="none">';
    str += '   <rect x="0" y="0" width="100" height="100" fill="#ff00ff11" stroke="none" stroke-width="0"></rect>';

    str += '   <g class="char_line_svg_grid_x">';
    for (let i = 0; i < this.axisXData.length; i++){
        str += '       <line x1="' + (this.x1 + i * this.gapX) + '" y1="' + (this.y1) + '" x2="' + (this.x1 + i * this.gapX) + '" y2="' + (this.y2) + '" stroke="' + this.gridLinesColor + '" stroke-width="' + this.strokeWidth + '" stroke-dasharray="1" fill="none" shape-rendering="crispEdges" vector-effect="non-scaling-stroke"></line>';
    }
    str += '   </g>';

    str += '   <g class="char_line_svg_grid_y">';
    for (let i = 0; i < this.axisYData.length; i++){
        str += '       <line x1="' + (this.x1) + '" y1="' + (this.y2 - i * this.gapY) + '" x2="' + (this.x2) + '" y2="' + (this.y2 - i * this.gapY) + '" stroke="' + this.gridLinesColor + '" stroke-width="' + this.strokeWidth + '" stroke-dasharray="1" fill="none" shape-rendering="crispEdges" vector-effect="non-scaling-stroke"></line>';
    }
    str += '   </g>';

    str += '   <g class="char_line_svg_axis_x">';
    str += '       <line x1="' + (this.x1) + '" y1="' + (this.y1) + '" x2="' + (this.x1) + '" y2="' + (this.y2) + '" stroke="' + this.axisLinesColor + '" stroke-width="' + this.strokeWidth + '" fill="none" shape-rendering="crispEdges" vector-effect="non-scaling-stroke"></line>';
    str += '   </g>';

    str += '   <g class="char_line_svg_axis_y">';
    str += '       <line x1="' + (this.x1) + '" y1="' + (this.y2) + '" x2="' + (this.x2) + '" y2="' + (this.y2) + '" stroke="' + this.axisLinesColor + '" stroke-width="' + this.strokeWidth + '" fill="none" shape-rendering="crispEdges" vector-effect="non-scaling-stroke"></line>';
    str += '   </g>';

    str += '   <g class="char_line_svg_labels_x">';
    for (let i = 0; i < this.axisXData.length; i++){
        str += '       <text x="' + (this.x1 + i * this.gapX) + '" y="' + (5 + this.y2) + '" fill="' + this.fontColor + '"  font-size="' + this.fontSize + '" font-family="' + this.fontFamily + '" text-anchor="end" vector-effect="non-scaling-stroke">';
        str += '           <tspan alignment-baseline="middle">' + (this.axisXData[i]) + '</tspan>';
        str += '       </text>';
    }
    str += '   </g>';

    str += '   <g class="char_line_svg_labels_y">';
    for (let i = 0; i < this.axisYData.length; i++){
        str += '       <text x="' + (this.x1) + '" y="' + (this.y2 - i * this.gapY) + '" fill="' + this.fontColor + '"  font-size="' + this.fontSize + '" font-family="' + this.fontFamily + '" text-anchor="end" vector-effect="non-scaling-stroke" >';
        str += '           <tspan alignment-baseline="middle">' + (this.axisYData[i]) + '</tspan>';
        str += '       </text>';
    }
    str += '   </g>';

    str += '   <g class="char_line_svg_axis">';
    for (let i = 0; i < this.datas.length; i++){
        let strData = '';

        for (let j = 0; j < this.datas[i].data.length; j++){
            let x = this.x1 + this.gapX * this.datas[i].data[j][0];
            let y = this.y2 - this.gapY * this.datas[i].data[j][1] * 0.1;

            strData += x + ',' + y + ' ';

            str += '       <circle cx="' + x + '" cy="' + y + '" r="' + this.circleSize + '" fill="' + this.datas[i].color + '" stroke="#ffffff" stroke-width="0.1" shape-rendering="geometricPrecision" tooltip="Miami Heat"></circle>';
        }

        str += '       <polyline points="' + strData + '" vector-effect="non-scaling-stroke" fill="none" shape-rendering="geometricPrecision" stroke="' + this.datas[i].color + '" stroke-width="' + this.strokeWidth + '"></polyline>';
    }
    str += '   </g>';


    str += '</svg>';

    this.item = new spa.Item(str);
}

spa.ChartLineSvg.prototype.item = null;

/**
 * @example this.chart.setAxisXValues([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
 */
spa.ChartLineSvg.prototype.setAxisXValues = function (arrXValues) {

}

/**
 * @example this.chart.setAxisYValues([0, 10, 20, 30, 40]);
 */
spa.ChartLineSvg.prototype.setAxisYValues = function (arrYValues) {

}

/**
 * @example this.chart.addData('#F29AD2', [[0, 10], [1, 25], [2, 16], [3, 11], [4, 14], [5, 16], [6, 23], [7, 35], [8, 35], [9, 25], [10, 12], [11, 10]]);
 * @example this.chart.addData('#9AD2F2', [[0, 20], [1, 15], [2, 26], [3, 21], [4, 24], [5, 26], [6, 33], [7, 25], [8, 15], [9, 25], [10, 22], [11, 30]]);
 */
spa.ChartLineSvg.prototype.addData = function (color, data) {

}
