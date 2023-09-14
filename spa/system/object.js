spa.Object = {};

spa.Object.deepClone = function(value)
{
	let obj = {};

	if (value && value.constructor === obj.constructor){
		for (let key in value) {
			obj[key] = spa.Object.deepClone(value[key]);
		}

		return obj;
	}


	let arr = [];

	if (value && value.constructor === arr.constructor){
		for (let key in value) {
			arr[key] = spa.Object.deepClone(value[key]);
		}

		return arr;
	}


	return value;
}

spa.Object.getValue = function(obj, defaultValue, ...keys)
{
	for (let i = 0; i < keys.length; i++){
		obj = obj[keys[i]];

		if (obj == undefined){
			return defaultValue;
		}
	}

	return obj;
}

spa.Object.isEqual = function(obj1, obj2)
{
	let result = true;

	if ((obj1 && obj1.constructor === {}.constructor || obj1 && obj1.constructor === [].constructor) && Object.keys(obj1 || {}).length == Object.keys(obj2 || {}).length)
	{
		for (const key in obj1)
		{
			result &&= spa.Object.isEqual(obj1[key], obj2[key]);
		}
	}
	else
	{
		result = (obj1 === obj2);
	}

	return result;
}

