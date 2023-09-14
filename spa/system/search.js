spa.Search = {};

spa.Search.fuzzySearch = function(search, text)
{
	let matches = [];

	for (let i = 0, j = 0; i < search.length; i++){
		for (; j < text.length; j++){
			if (search[i].toLowerCase() == text[j].toLowerCase()){
				matches.push(j);
				j++;

				break;
			}
		}
	}

	let result = (matches.length == search.length) ? matches : [];

	return result;
}

spa.Search.fuzzySearchLongestSequence = function(search, text)
{
	let matches1 = [];

	for (let i = 0, j = 0; i < search.length; i++){
		for (; j < text.length; j++){
			if (search[i].toLowerCase() == text[j].toLowerCase()){
				matches1.push(j);
				j++;

				break;
			}
		}
	}


	let matches2 = matches1.slice(0);

	for (let i = matches1.length - 1; i > 0; i--){
		if (Math.abs(matches2[i] - matches1[i - 1]) > 1 && text[matches2[i - 1]].toLowerCase() == text[matches2[i] - 1].toLowerCase()){
			matches2[i - 1] = matches2[i] - 1;
		}
	}


	let points1 = spa.Search.getFuzzySearchMatchesPoints(matches1);
	let points2 = spa.Search.getFuzzySearchMatchesPoints(matches2);

	let result = {
		matches: [],
		points: -1,
	};

	if (matches1.length > 0 && matches1.length == search.length && points1 >= points2){
		result = {
			matches: matches1,
			points: points1,
		};
	}
	else if (matches2.length > 0 && matches2.length == search.length && points1 < points2){
		result = {
			matches: matches2,
			points: points2,
		};
	}

	return result;
}

spa.Search.getFuzzySearchMatchesPoints = function(matches)
{
	let searchPoints = (matches.length > 0 ? 1 : 0);
	let sequenceCount = searchPoints;
	for (let k = 0; k < matches.length - 1; k++){
		if (Math.abs(matches[k] - matches[k + 1]) == 1){
			sequenceCount++;
		}
		else{
			sequenceCount = 1;
		}

		searchPoints = Math.max(searchPoints, sequenceCount);
	}

	return searchPoints;
}
