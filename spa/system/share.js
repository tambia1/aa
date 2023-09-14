spa.Share = {};

spa.Share.sendEmail = function(to, cc, bcc, subject, body)
{
	let elm = document.createElement('div');
	elm.innerHTML = '<a href="mailto:' + to + '?cc=' + cc + '&bcc=' + bcc + '&subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body) + '"></a>';
	elm = elm.firstChild;

	elm.click.apply(elm);
}

spa.Share.sendSms = function(phoneNumber, body)
{
	let elm = document.createElement('div');
	elm.innerHTML = '<a href="sms:' + phoneNumber + '?&body=' + body + '"></a>';
	elm = elm.firstChild;

	elm.click.apply(elm);
}

spa.Share.sendWhatsApp = function(text)
{
	let elm = document.createElement('div');
	elm.innerHTML = '<a href="whatsapp://send?text=' +text + '"></a>';
	elm = elm.firstChild;

	elm.click.apply(elm);
}

spa.Share.sendTelegram = function(text)
{
	let elm = document.createElement('div');
	elm.innerHTML = '<a href="https://telegram.me/share/url?url=' +text + '"></a>';
	elm = elm.firstChild;

	elm.click.apply(elm);
}

/**
 * will work only in https
 * Can only be invoked in response to a user action, such as a button click
 */
spa.Share.nativeShare = function(title, text, url, files)
{
	let isSuccess = true;

	if (navigator.share) {
		navigator.share({
			title: title,
			text: text,
			url: url,
			files: files,
		})
		.then(function() {
			isSuccess = true;
		})
		.catch(function(error) {
			isSuccess = false;
		});
	}
	else {
		isSuccess = false;
	}

	return isSuccess;
}
