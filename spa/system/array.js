spa.Array = {};


spa.Array.shuffleArray = function(arr)
{
	let arrClone = [...arr];
	let result = [];

	while(arrClone.length > 0){
		let min = 0;
		let max = arrClone.length - 1;
		let n = min + Math.floor(Math.random() * (max - min + 1));

		result.push(arrClone[n]);
		arrClone.splice(n, 1);
	}

	return result;
}

/**
 * @example
 * spa.Array.setItemValueByKey(items, null, null, 'isSelected', false);		//set all items[*].isSelected = false
 * spa.Array.setItemValueByKey(items, 'key', '123, 'isSelected', true); 	//sel if items[*].key == '123' then items[*].isSelected = true
 */
spa.Array.setItemValueByKey = function(arr, keyNameToFind, keyValueToFind, keyNameToSet, keyValueToSet)
{
	for (let i = 0; i < arr.length; i++){
		if (arr[i][keyNameToFind] == keyValueToFind || keyNameToFind == null){
			arr[i][keyNameToSet] = keyValueToSet;
		}
	}
}

/**
 * @example
 * let result = spa.Array.getItemIndexByKey(items, 'isSelected', true);
 */
spa.Array.getItemIndexByKey = function(arr, keyName, keyValue)
{
	let result = [];

	for (let i = 0; i < arr.length; i++){
		if (arr[i][keyName] == keyValue){
			result.push(i);
		}
	}

	return result;
}

