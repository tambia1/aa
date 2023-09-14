spa.Debug = {};

spa.Debug.measure = {};

spa.Debug.measureStart = function(name)
{
	if (spa.Debug.measure[name] != undefined){
		throw new Error('measure name already exist');
	}

	spa.Debug.measureStart[name] = new Date().getTime();
}

spa.Debug.measureEnd = function(name)
{
	if (spa.Debug.measure[name] == undefined){
		throw new Error('measure name doesn\'t exist');
	}

	let t = new Date().getTime() - spa.Debug.measureStart[name];

	delete spa.Debug.measureStart[name];

	return t;
}

