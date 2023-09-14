spa.QueryString = {};

spa.QueryString.updateQueryString = function(queryString)
{
    window.history.replaceState({someData: 'some data'}, '', window.location.origin + window.location.pathname + '?' + queryString);
}

spa.QueryString.getQueryString = function()
{
	let result = {
		search: {},
		hash: {},
	};

	for (let key in result) {
		let arr = window.location[key].substring(1).split('&');

		for (let i = 0; i < arr.length; i++) {
			if (arr[i] != ''){
				arr[i] = arr[i].split('=');
				result[key][arr[i][0]] = arr[i][1];
			}
		}
	}

	return result;
}

spa.QueryString.getQueryStringFromUrl = function(url)
{
	url = url || '';

	let indexSearch = url.indexOf('?');
	let indexHash = url.indexOf('#');

	let location = {
		search: '',
		hash: '',
	};

	if (indexSearch != -1 && indexHash != -1){
		location.search = url.substring(indexSearch, indexHash);
		location.hash = url.substr(indexHash);
	}
	else if (indexSearch != -1 && indexHash == -1){
		location.search = url.substr(indexSearch);
	}
	else if (indexSearch == -1 && indexHash != -1){
		location.hash = url.substr(indexHash);
	}


	let result = {
		search: {},
		hash: {},
	};

	for (let key in result) {
		let arr = location[key].substring(1).split('&');

		for (let i = 0; i < arr.length; i++) {
			if (arr[i] != ''){
				arr[i] = arr[i].split('=');
				result[key][arr[i][0]] = arr[i][1];
			}
		}
	}


	return result;
}

spa.QueryString.queryStringToJson = function(queryString)
{
	let result = {};

	if (!queryString)
	{
		return result;
	}

	if(queryString.indexOf('?') > -1)
	{
		queryString = queryString.split('?')[1];
	}

	let pairs = queryString.split('&');

	pairs.forEach(function(pair)
	{
		pair = pair.split('=');

		result[pair[0]] = decodeURIComponent(pair[1] || '');
	});

	return JSON.parse(JSON.stringify(result));
}
