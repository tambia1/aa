spa.Cookie = {};

spa.Cookie.set = function(cookieName, value, expireDays)
{
	var expireDate = new Date();
	expireDate.setDate(expireDate.getDate() + expireDays);

	var c_value = escape(value) + ((expireDays == null) ? '' : '; expires=' + expireDate.toUTCString()) + '; path=/';

	document.cookie = cookieName + "=" + c_value;
}

spa.Cookie.get = function(cookieName)
{
	var cookies = document.cookie.split(";");

	for (var i=0; i < cookies.length; i++)
	{
		var x = cookies[i].substr(0,cookies[i].indexOf('='));
		var y = cookies[i].substr(cookies[i].indexOf('=') + 1);
		x = x.replace(/^\s+|\s+$/g,'');

		if (x == cookieName)
		{
			return unescape(y);
		}
	}
}

spa.Cookie.remove = function(cookieName)
{
	document.cookie = cookieName + '=null; expires=Thu, 01-Jan-70 00:00:01 GMT';
}

spa.Cookie.removeAll = function()
{
	var cookies = document.cookie.split(";");

	for (var i=0; i < cookies.length; i++)
	{
		var cookie = cookies[i];
		var cookieName = cookies[i].split('=')[0];

        spa.Cookie.remove(cookieName);
	}
}

