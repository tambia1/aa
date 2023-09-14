spa.Browser = {};

spa.Browser.reloadPage = function()
{
	window.location = window.location.href.split("?")[0];
}

//go to url with GET
spa.Browser.goToURL = function(url, isNewWindow)
{
	if (isNewWindow == true){
		window.open(url, '_blank', 'location=no,footer=no,closebuttoncaption=Done,closebuttoncolor=#ffffff');
	}
	else{
		window.location.assign(url);
	}
}

//go to url with POST
//params = {navstate: 'Games', lobbyMode: 'Login'}
spa.Browser.postForm = function(url, params)
{
	let iframe = document.createElement('iFrame');
	document.body.appendChild(iframe);

	let iFrameDoc = (iframe.contentWindow || iframe.contentDocument);
	iFrameDoc = iFrameDoc.document || iFrameDoc;

	// let iframeBody = document.createElement('body');
	// iFrameDoc.appendChild(iframeBody);

	let form = document.createElement('form');
	iFrameDoc.body.appendChild(form);

	form.target = '_self';
	form.setAttribute('method', 'post');
	form.setAttribute('action', url);
	form.setAttribute('style', 'display: none;');

	for(let k in params) {
		let hiddenField = document.createElement('input');

		hiddenField.setAttribute('type', 'hidden');
		hiddenField.setAttribute('name', k);
		hiddenField.setAttribute('value', params[k]);

		form.appendChild(hiddenField);
	}

	setTimeout(function() {
		form.submit();
	}, 1000)
}

spa.Browser.parseUrl = function(urlToParse)
{
	let result = {
		href: '',		//'https://user:pass@site:80/path1/path2/index.html?s1=a&s2=b#h1=c&h2=d',

		protocol: '',	//'https',
		username: '',	//'user',
		password: '',	//'pass',
		host: '',		//'site:80',
		hostname: '',	//'site',
		port: '',		//'80',
		pathName: '',	//'/path1/path2/index.html',
		path: '',		//'/path1/path2',
		file: '',		//'index.html',
		search: '',		//'s1=a&s2=b',
		searchParams: {},	//{'s1': 'a', 's2': 'b'},
		hash: '',			//'h1=c&h2=d',
		hashParams: {},		//{'h1': 'c', 'h2': 'd'},
	};

	try{
		let url = new URL(urlToParse);

		result.href = url.href;
		result.protocol = url.protocol;
		result.username = url.username;
		result.password = url.password;
		result.host = url.host;
		result.hostname = url.hostname;
		result.port = url.port;
		result.pathname = url.pathname;
		result.path = url.pathname.substring(0, result.pathname.lastIndexOf('/') + 1);
		result.file = url.pathname.substring(result.pathname.lastIndexOf('/') + 1);
		result.search = url.search.substring(1);
		result.hash = url.hash.substring(1);

		for (const [key, value] of url.searchParams){
			result.searchParams[key] = value;
		}

		url.hash.substring(1).split('&').forEach(function(v, i, a) {
			let arr = v.split('=');
			result.hashParams[arr[0]] = arr[1];
		});
	}
	catch (e){
		result = {};
	}

	return result;
}
