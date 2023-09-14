spa.Http = {};

spa.Http.isLogEnabled = false;

spa.Http.method = {
    POST: 'POST',
    GET: 'GET',
};

spa.Http.contentType = {
	TEXT_PLAIN: 'text/plain; charset=utf-8',
	TEXT_HTML: 'text/html; charset=utf-8',
	TEXT_CSS: 'text/css; charset=utf-8',

	APLLICATION_JSON: 'application/json; charset=utf-8',
	APLLICATION_XML: 'application/xml; charset=utf-8',
	APLLICATION_OGG: 'application/ogg',

	IMAGE_GIF: 'image/gif',
	IMAGE_JPEG: 'image/jpeg',
	IMAGE_PNG: 'image/png',

	AUDIO_MPEG: 'audio/mpeg',
	AUDIO_WAVE: 'audio/x-wav',

	VIDEO_MPEG: 'video/mpeg',
	VIDEO_MP4: 'video/mp4',
};


/**
 * send
 * @param {String} params.url
 * @param {Object} params.data
 * @param {Function} params.callback
 * @param {spa.Http.method} params.method
 * @param {{key, value}} params.headers
 * @param {Number} params.delay
 * @param {Object} params.fakeResponse
 *
 * @returns XMLHttpRequest
 */

spa.Http.send = function(params)
{
	//set default  values
    params.data = params.data || {};
    params.callback = params.callback || function () {};
    params.method = params.method || spa.Http.method.GET;
    params.delay = params.delay || 0;
    params.fakeResponse = params.fakeResponse || null;
    params.headers = params.headers || {};

	//check if request is fake or not
	let xmlhttp = new XMLHttpRequest();

    xmlhttp.onerror = null;
	xmlhttp.onabort = null;
	xmlhttp.onload = null;
	xmlhttp.onloadstart = null;
	xmlhttp.onprogress = null;

    xmlhttp.onreadystatechange = function(e) {
		if (xmlhttp.readyState == 4) {
			let response = xmlhttp.responseText;

			if (params.isParseResponseToJson == true) {
                try {
                    response = JSON.parse(xmlhttp.responseText);
                }
                catch (e) {
					response = {responseText: xmlhttp.responseText};
                }
            }

            sendResponse(params, response);
		}
	}

    //override the abort function, invoking xmlhttp.abort() will cause the xmlhttp.onreadystatechange() to invoke and we don't want that
    xmlhttp.cancel = function() {
        xmlhttp.timer = clearTimeout(xmlhttp.timer);
        xmlhttp.onreadystatechange = null;
        xmlhttp.abort();
    }

    //temporary function that will be used to send the request after delay is finished
	let sendRequest = function(){
        if (spa.Http.isLogEnabled == true){
            console.log('spa.Http.send(' + JSON.stringify(params) + ')');
        }


        if (params.fakeResponse != null) {
            params.callback(params, params.fakeResponse);

            if (spa.Http.isLogEnabled == true){
                console.log('spa.Http.responseFake({"params": ' + JSON.stringify(params) + ', "response": ' + JSON.stringify(params.fakeResponse) + '})');
            }
        }
   		else if (params.method == spa.Http.method.POST)
		{
            xmlhttp.open('POST', params.url, true);

            for (let key in params.headers) {
                let value = params.headers[key];

                xmlhttp.setRequestHeader(key, value);
            }

            xmlhttp.send(JSON.stringify(params.data));
		}
		else {

			for (let k in params.data) {
				let v = params.data[k];
				let s = params.url.indexOf('?') == -1 ? '?' : '&';

				params.url = params.url + s + k + '=' + v;
			}

            xmlhttp.open('GET', params.url, true);

			for (let key in params.headers) {
				let value = params.headers[key];

				xmlhttp.setRequestHeader(key, value);
			}

			xmlhttp.send();
		}
	}

    //temporary function that will be used to send the response from the request
	let sendResponse = function(params, response){
        params.callback(params, response);


        if (spa.Http.isLogEnabled == true){
            console.log('spa.Http.response({"params": ' + JSON.stringify(params) + ', "response": ' + JSON.stringify(response) + '})');
        }
    }

	//send request after a delay
	xmlhttp.timer = setTimeout(sendRequest.bind(this), params.delay);

	//return ajax
	return xmlhttp;
}

spa.Http.sendPost = function(url, callback){
	let params = {
		method: spa.Http.method.POST,
		url: url,
		callback: callback,
		headers: {
			'Content-Type': spa.Http.contentType.APLLICATION_JSON,
			'Accept': '*/*',
		},
		isParseResponseToJson: true,
	}

    return spa.Http.send(params);
}

spa.Http.sendGet = function(url, callback){
	let params = {
		method: spa.Http.method.GET,
		url: url,
		callback: callback,
		headers: {
			'access-control-allow-credentials': 'true',
			'access-control-allow-origin': '*',
			// 'Accept': 'application/json',
			// 'Origin': 'http://localhost',
		}
	};

	return spa.Http.send(params);
}

