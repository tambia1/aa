Promise.allObj = function(obj){
	let keys = Object.keys(obj);
	let values = Object.values(obj);

	return Promise.all(values).then(function(results){
		let res = {};

		for (let k in keys){
			res[keys[k]] = results[k];
		}

		return res;
	});
}

Promise.wait = function(delay){
	return new Promise(function(resolve, reject){
		setTimeout(function() {
			resolve();
		}.bind(this), delay);
	});
}

Promise.create = function () {
	let resolvePromise, rejectPromise;

	let promise = new Promise(function(resolve, reject) {
		resolvePromise = resolve;
		rejectPromise = reject;
	});

	promise.resolve = resolvePromise;
	promise.reject = rejectPromise;

	return promise;
}
