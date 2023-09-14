spa.Animation = function(timeLength, arrayPoints, arrayTiming, direction, delayBeforeStart, isDelayBeforeStartOnRepeat, numberOfRepeats, isCyclic, calculateCallback, callbacks)
{
	//default values
	this.arrayPoints = [[0, 100], [0, 100]];
	this.arrayTiming = spa.Animation.TIMING_LINEAR;
	this.timeLength = 1000;
	this.direction = spa.Animation.DIRECTION_FORWARD;
	this.saveDirection = this.direction;

	this.position = 0;
	this.actualPosition = 0;
	this.time = 0;

	this.isStarted = false;
	this.isFinished = true;

	this.calculateCallback = null;

	this.callbacks = [];
	this.callbacksCounters = [];

	this.delayBeforeStart = 0;
	this.currentDelayBeforeStart = 0;

	this.isDelayBeforeStartOnRepeat = false;

	this.numberOfRepeats = 1;
	this.currentNumberOfRepeats = 1;

	this.isCyclic = false;

	this.isLooping = false;
	this.requestAnimationFrameId = null;
	this.requestAnimationFrameFunction = null;

	if (arrayPoints != null)
	{
		this.setRoute(timeLength, arrayPoints, arrayTiming, direction, delayBeforeStart, isDelayBeforeStartOnRepeat, numberOfRepeats, isCyclic, calculateCallback, callbacks);
	}
}

spa.Animation.bezier_2 = function (t, p0, p1) {return p0 + t*(p1-p0);}
spa.Animation.bezier_3 = function (t, p0, p1, p2) {return (1-t)*(1-t)*p0 + 2*(1-t)*t*p1 + t*t*p2;}
spa.Animation.bezier_4 = function (t, p0, p1, p2, p3) {return (1-t)*(1-t)*(1-t)*p0 + 3*(1-t)*(1-t)*t*p1 + 3*(1-t)*t*t*p2 + t*t*t*p3;}
spa.Animation.bezier_5 = function (t, p0, p1, p2, p3, p4) {return p0*(1-t)*(1-t)*(1-t)*(1-t) + 4*p1*t*(1-t)*(1-t)*(1-t) + 6*p2*t*t*(1-t)*(1-t) + 4*p3*t*t*t*(1-t) + p4*t*t*t*t;}
spa.Animation.bezier_6 = function (t, p0, p1, p2, p3, p4, p5) {return p0*(1-t)*(1-t)*(1-t)*(1-t)*(1-t) + 5*p1*t*(1-t)*(1-t)*(1-t)*(1-t) + 10*p2*t*t*(1-t)*(1-t)*(1-t) + 10*p3*t*t*t*(1-t)*(1-t) + 5*p4*t*t*t*t*(1-t) + p5*t*t*t*t*t;}

spa.Animation.bezier1D = function (t, arrayPoints)
{
	let arrayResults = 0;

	switch(arrayPoints.length)
	{
		case 2: arrayResults = spa.Animation.bezier_2(t, arrayPoints[0], arrayPoints[1]); break;
		case 3: arrayResults = spa.Animation.bezier_3(t, arrayPoints[0], arrayPoints[1], arrayPoints[2]); break;
		case 4: arrayResults = spa.Animation.bezier_4(t, arrayPoints[0], arrayPoints[1], arrayPoints[2], arrayPoints[3]); break;
		case 5: arrayResults = spa.Animation.bezier_5(t, arrayPoints[0], arrayPoints[1], arrayPoints[2], arrayPoints[3], arrayPoints[4]); break;
		case 6: arrayResults = spa.Animation.bezier_6(t, arrayPoints[0], arrayPoints[1], arrayPoints[2], arrayPoints[3], arrayPoints[4], arrayPoints[5]); break;
		default: throw 'Error in Animation.bezier1D(): too many points.'; break;
	}

	return arrayResults;
}

spa.Animation.bezier2D = function (t, arrayPoints)
{
	let arrayResults = [];

	for (let i = 0; i < arrayPoints.length; i++)
	{
		arrayResults[i] = spa.Animation.bezier1D(t, arrayPoints[i]);
	}

	return arrayResults;
}


spa.Animation.DIRECTION_FORWARD = 1;
spa.Animation.DIRECTION_STAND = 0;
spa.Animation.DIRECTION_BACKWORD = -1;

spa.Animation.TIMING_LINEAR = [0, 100];
spa.Animation.TIMING_EASE_IN = [0, 10, 100];
spa.Animation.TIMING_EASE_OUT = [0, 90, 100];
spa.Animation.TIMING_EASE = [0, 10, 50, 90, 100];
spa.Animation.TIMING_BOUNCE = [0, 200, 300, 100];

spa.Animation.prototype.arrayPoints = null;
spa.Animation.prototype.arrayTiming = null;
spa.Animation.prototype.timeLength = null;
spa.Animation.prototype.direction = null;
spa.Animation.prototype.saveDirection = null;
spa.Animation.prototype.position = null;
spa.Animation.prototype.actualPosition = null;
spa.Animation.prototype.time = null;
spa.Animation.prototype.delayBeforeStart = null;
spa.Animation.prototype.isDelayBeforeStartOnRepeat = null;
spa.Animation.prototype.numberOfRepeats = null;

spa.Animation.prototype.isStarted = null;
spa.Animation.prototype.isFinished = null;

spa.Animation.prototype.arrayResults = null;

spa.Animation.prototype.calculateCallback = null;

spa.Animation.prototype.callbacks = null;
spa.Animation.prototype.callbacksCounters = null;

spa.Animation.prototype.isLooping = null;
spa.Animation.prototype.requestAnimationFrameId = null;
spa.Animation.prototype.requestAnimationFrameFunction = null;

/**
 * @param timeLength, 10000
 * @param arrayPoints, [[0, 1000], [500, 0, 500]]
 * @param arrayTiming, spa.Animation.TIMING_LINEAR
 * @param direction, spa.Animation.DIRECTION_FORWARD
 * @param delayBeforeStart, 100
 * @param isDelayBeforeStartOnRepeat, false
 * @param numberOfRepeats, 1
 * @param isCyclic, false
 * @param calculateCallback, function_0
 * @param callbacks, [{position: 0, direction: spa.Animation.DIRECTION_FORWARD, callback: function_1}, {positionInPercent: 50, direction: spa.Animation.DIRECTION_FORWARD, callback: function_1}, {position: 5000, direction: spa.Animation.DIRECTION_FORWARD, callback: function_3}]
 */
spa.Animation.prototype.setRoute = function(timeLength, arrayPoints, arrayTiming, direction, delayBeforeStart, isDelayBeforeStartOnRepeat, numberOfRepeats, isCyclic, calculateCallback, callbacks)
{
	//save args
	this.arrayPoints = arrayPoints;
	this.arrayTiming = arrayTiming;
	this.timeLength = timeLength != 0 ? timeLength : 0.0000000001;
	this.direction = direction;
	this.saveDirection = direction;

	this.position = 0;
	this.actualPosition = 0;
	this.time = 0;

	this.isStarted = false;
	this.isFinished = true;

	this.calculateCallback = calculateCallback;

	this.callbacks = callbacks;
	this.callbacksCounters = [];

	for (let i=0; i < this.callbacks.length; i++)
	{
		this.callbacksCounters[i] = 0;

		if (this.callbacks[i].position == null)
		{
			this.callbacks[i].position = this.callbacks[i].positionPercent * this.timeLength / 100;
		}
	}

	this.delayBeforeStart = delayBeforeStart;
	this.currentDelayBeforeStart = delayBeforeStart;

	this.isDelayBeforeStartOnRepeat = isDelayBeforeStartOnRepeat;

	this.numberOfRepeats = numberOfRepeats;
	this.currentNumberOfRepeats = numberOfRepeats;

	this.isCyclic = isCyclic;

	//calculate results
	this.calculateResults();
}

spa.Animation.prototype.calculate = function()
{
	//get current time
	let currentTime = +new Date();

	//if time is not set yet (this.time == 0) then take current time
	this.time = this.time || currentTime;

	//if we allready  started then wait till delay before start finishes
	if (this.isStarted == true && this.currentDelayBeforeStart > 0)
	{
		this.currentDelayBeforeStart -= currentTime - this.time;

		if (this.currentDelayBeforeStart < 0)
		{
			this.currentDelayBeforeStart = 0;
		}
	}

	//if we still not started then take current time and keep position
	if (this.isStarted == false || this.currentDelayBeforeStart > 0 || this.isFinished == true)
	{
		this.time = currentTime;
	}



	//add this amount of time that pased to current position
	let add = (currentTime - this.time) * this.direction;
	this.time = currentTime;

	this.position = this.position + add;
	this.actualPosition = this.position;



	//check if animation finished according to position
	//and fix position if we are out of bounds
	if (this.direction == 1 && this.position >= this.timeLength)
	{
		this.isFinished = true;
		this.actualPosition = this.position - this.timeLength;
		this.position = this.timeLength;
	}
	else if (this.direction == -1 && this.position <= 0)
	{
		this.isFinished = true;
		this.actualPosition = this.position + this.timeLength;
		this.position = 0;
	}


	//calculate results
	this.calculateResults();

	//save results to send to callbacks
	let callbackResult = {
		animation: this,
		arrayResults: this.arrayResults,
		timeLength: this.timeLength,
		delayBeforeStart: this.currentDelayBeforeStart,
		isDelayBeforeStartOnRepeat: this.isDelayBeforeStartOnRepeat,
		positionInPoints: this.getPositionInPoints(),
		positionInPercent: this.getPositionInPercent(),
		direction: this.direction,
		numberOfRepeats: this.currentNumberOfRepeats,
		isCyclic: this.isCyclic,
		isFinished: this.isFinished,
	}

	//run main callback
	this.calculateCallback && this.calculateCallback(callbackResult);

	//if we have no delay anymore then we can check callbacks
	if (this.currentDelayBeforeStart == 0)
	{
		//run any other callback exist
		for (let i=0; i < this.callbacks.length; i++)
		{
			if (((this.position * this.direction) >= (this.callbacks[i].position * this.direction)) && this.callbacksCounters[i] == 0 && (this.callbacks[i].direction == 0 || this.direction == this.callbacks[i].direction))
			{
				this.callbacksCounters[i] = 1;
				this.callbacks[i].callback(callbackResult);
			}
		}
	}



	//if we finished but repeats needed (currentNumberOfRepeats > 0) then keep running
	if (this.isStarted == true && this.isFinished == true && this.currentNumberOfRepeats > 1)
	{
		this.currentNumberOfRepeats--;

		this.isFinished = false;

		//if we are not cycling then but we still need to repeat then start position from the begining
		//else switch direction
		if (this.isCyclic == false)
		{
			this.position = this.actualPosition;
		}
		else
		{
			this.direction = -this.direction;
		}

		//also reset all callbacks counters because we finished animation cycle
		for (let i=0; i < this.callbacks.length; i++)
		{
			this.callbacksCounters[i] = 0;
		}

		//also if isDelayBeforeStartOnRepeat == true then we need to wait again
		if (this.isDelayBeforeStartOnRepeat == true)
		{
			this.currentDelayBeforeStart = this.delayBeforeStart;
		}
	}
}

spa.Animation.prototype.calculateResults = function()
{
	//manipulate position according to time array
	let t = this.position / this.timeLength;
	t = spa.Animation.bezier1D(t, this.arrayTiming) / 100.0;
	this.arrayResults = spa.Animation.bezier2D(t, this.arrayPoints);
}

spa.Animation.prototype.setPositionInPoints = function(position)
{
	this.position = position;
	this.actualPosition = this.position;
}

spa.Animation.prototype.getPositionInPoints = function()
{
	return this.position;
}

spa.Animation.prototype.setPositionInPercent = function(positionPercent)
{
	this.setPositionInPoints(positionPercent * this.timeLength / 100);
}

spa.Animation.prototype.getPositionInPercent = function()
{
	return parseInt(this.position / this.timeLength * 100);
}

spa.Animation.prototype.getActualPositionInPercent = function()
{
	return this.actualPosition / this.timeLength * 100;
}

spa.Animation.prototype.resume = function()
{
	this.isStarted = true;
	this.isFinished = false;
	this.time = 0;

	this.calculate();
}

spa.Animation.prototype.pause = function()
{
	this.isStarted = false;
	
	this.calculate();
}

spa.Animation.prototype.reset = function()
{
	this.isStarted = false;
	this.isFinished = true;

	this.position = 0;
	this.actualPosition = 0;
	this.time = 0;

	this.direction = this.saveDirection;

	this.currentDelayBeforeStart = this.delayBeforeStart;
	this.currentNumberOfRepeats = this.numberOfRepeats;

	//also reset all callbacks counters because we finished animation cycle
	for (let i=0; i < this.callbacks.length; i++)
	{
		this.callbacksCounters[i] = 0;
	}

	//calculate results
	this.calculateResults();
}

spa.Animation.prototype.startLoop = function()
{
	this.requestAnimationFrameFunction = function() {
		this.calculate();

		if (this.isLooping == true){
			this.requestAnimationFrameId = window.requestAnimationFrame(this.requestAnimationFrameFunction);
		}
	}.bind(this);

	this.isLooping = true;
	this.requestAnimationFrameFunction();
}

spa.Animation.prototype.stopLoop = function()
{
	this.isLooping = false;
	this.requestAnimationFrameId = window.cancelAnimationFrame(this.requestAnimationFrameId);
}



spa.Animation.onElementVisible = function(element, callback)
{
	let options = {};

	let observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			callback(entry.target, entry.intersectionRatio > 0);
		});
	}, options);

	observer.observe(element);

	return observer;
}



spa.Animation.rotateX3D = function(x, y, z, a)
{
	a = a * Math.PI / 180;

	return {x: x, y: y * Math.cos(a) - z * Math.sin(a), z: y * Math.sin(a) + z * Math.cos(a)};
}

spa.Animation.rotateY3D = function(x, y, z, a)
{
	a = a * Math.PI / 180;

	return {x: z * Math.sin(a) + x * Math.cos(a), y: y, z: z * Math.cos(a) - x * Math.sin(a)};
}

spa.Animation.rotateZ3D = function(x, y, z, a)
{
	a = a * Math.PI / 180;

	return {x: x * Math.cos(a) - y * Math.sin(a), y: x * Math.sin(a) + y * Math.cos(a), z: z};
}

spa.Animation.rotate3D = function(x, y, z, a, b, c)
{
	let arr = {x: x, y: y, z: z};

	arr = spa.Animation.rotateZ3D(arr.x, arr.y, arr.z, c);
	arr = spa.Animation.rotateY3D(arr.x, arr.y, arr.z, b);
	arr = spa.Animation.rotateX3D(arr.x, arr.y, arr.z, a);

	return arr;
}
