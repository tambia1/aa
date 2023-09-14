spa.Math = {};

/*
 * Utils.getRandomNumber(0, 10);
 * will generate random number between 0 - 10, included
 */
spa.Math.getRandomNumber = function(minIncluded, maxIncluded)
{
	return minIncluded + Math.floor(Math.random() * (maxIncluded - minIncluded + 1));
}

spa.Math.formatNumber = function(number, arrSuffix)
{
	let result = "" + Math.abs(number);
	let suffix = arrSuffix || ["", "K", "M", "G", "T", "P", "E", "Z", "Y"];

	let i = parseInt((result.length - 1) / 3);
	let resultNumber = number / Math.pow(1000, i);

	resultNumber = parseInt(resultNumber * 10);
	resultNumber = resultNumber / 10;

	result = "" + resultNumber;
	result = result.replace(".0", "");
	result = result + suffix[i];

	return result;
}

spa.Math.getNumericVersion = function(strVersion)
{
	let str = strVersion + '.0.0';
	let arr = str.split('.');
	let num = 0;

	for (let i = 0; i < arr.length && i < 3; i++){
		let v = parseInt(arr[i]);

		num = num * 100;
		num = num + v;
	}

	return num;
}

spa.Math.distanceBetweenTwoPoints = function(x1, y1, x2, y2)
{
	return Math.sqrt((Math.pow(x1 - x2, 2))+(Math.pow(y1 - y2, 2)));
}

