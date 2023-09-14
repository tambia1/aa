spa.Clipboard = {};

spa.Clipboard.copyStringToClipboard = function(str) {
    let input = document.createElement('textarea');
	input.innerText = str;
	input.contentEditable = true;
	input.readOnly = false;
	input.style.position = 'absolute';
	input.style.left = '-9999px';

	document.body.appendChild(input);

	input.focus();
	input.select();

	let isCopySuccess = false

	if (isCopySuccess == false){
		isCopySuccess = document.execCommand('copy');
	}

	if (isCopySuccess == false){
		input.setSelectionRange(0, 999999);
		isCopySuccess = document.execCommand('copy');
	}

    document.body.removeChild(input);

	return isCopySuccess;
}
