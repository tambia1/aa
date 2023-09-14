spa.Validation = {};

spa.Validation.isEmailValid = function(email)
{
	let regexpEmail = new RegExp('^[a-zA-Z0-9.!#$%&\'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$');
	let isEmailValid = regexpEmail.test(email);

	return isEmailValid;
}
