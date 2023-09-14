spa.Regex = {};

/*
 * return an array with regex (including groups)
 * example:
 * spa.Utils.regex('{{.*?}}', text)
 * spa.Utils.regex((src=")(.*?)("), text);
 */
spa.Regex.exec = function(pattern, text)
{
	let result = [];
	let patt = new RegExp(pattern, 'g');

	while (match = patt.exec(text)){
		result.push(match);
	}

	return result;
}
