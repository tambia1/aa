spa.Normalize = {};

spa.Normalize.getNormalizedArabic = function(text)
{
	let result = text;

	//remove special characters
	result = result.replace(/([\u064B-\u065F])/g, '');

	//replace special chars
	let map = [
		{str: 'أ', replacer: 'ا'},
		{str: 'إ', replacer: 'ا'},
		{str: 'آ', replacer: 'ا'},
		{str: 'ة', replacer: 'ه'},
		{str: 'ؤ', replacer: 'ء'},
		{str: 'ئ', replacer: 'ء'},
		{str: 'ى', replacer: 'ي'},
	];

	for (let i = 0; i < map.length; i++){
		result = result.replace(new RegExp(map[i].str, 'g'), map[i].replacer);
	}

	return result;
}
