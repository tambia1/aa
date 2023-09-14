spa.Dom = {};

spa.Dom.onElementVisible = function(element, callback)
{
	if (typeof IntersectionObserver == 'undefined'){
		callback(element, true);
		return;
	}

	let options = {};

	let observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			callback(entry.target, entry.intersectionRatio > 0);
		});
	}, options);

	observer.observe(element);

	return observer;
}

spa.Dom.onElementChangeStartObserve = function(id, elm, arrPropertiesToObserve, onChange)
{
	window.cancelAnimationFrame(spa.Dom.onElementChangeStartObserve.requestAnimationFrameId);

	spa.Dom.onElementChangeStartObserve.observers = spa.Dom.onElementChangeStartObserve.observers || {};
	spa.Dom.onElementChangeStartObserve.observers[id] = {isObserved: true, elm: elm, properties: {}};

	for (let i = 0; i < arrPropertiesToObserve.length; i++){
		spa.Dom.onElementChangeStartObserve.observers[id].properties[arrPropertiesToObserve[i]] = elm[arrPropertiesToObserve[i]];
	}

	let runAnimationFrame = function () {
		for (const id in spa.Dom.onElementChangeStartObserve.observers){
			if (spa.Dom.onElementChangeStartObserve.observers[id].isObserved == false){
				delete spa.Dom.onElementChangeStartObserve.observers[id];
			}
		}

		for (const id in spa.Dom.onElementChangeStartObserve.observers){
			for (const property in spa.Dom.onElementChangeStartObserve.observers[id].properties){
				if (spa.Dom.onElementChangeStartObserve.observers[id].properties[property] != spa.Dom.onElementChangeStartObserve.observers[id].elm[property]){
					onChange && onChange(id, property, spa.Dom.onElementChangeStartObserve.observers[id].elm);

					spa.Dom.onElementChangeStartObserve.observers[id].properties[property] = spa.Dom.onElementChangeStartObserve.observers[id].elm[property];
				}
			}
		}

		if (Object.keys(spa.Dom.onElementChangeStartObserve.observers).length == 0){
			window.cancelAnimationFrame(spa.Dom.onElementChangeStartObserve.requestAnimationFrameId);
		}
		else{
			spa.Dom.onElementChangeStartObserve.requestAnimationFrameId = window.requestAnimationFrame(runAnimationFrame);
		}
    }

    runAnimationFrame();
}

spa.Dom.onElementChangeStopObserve = function(id)
{
	spa.Dom.onElementChangeStartObserve.observers = spa.Dom.onElementChangeStartObserve.observers || {};
	spa.Dom.onElementChangeStartObserve.observers[id] = spa.Dom.onElementChangeStartObserve.observers[id] || {};
	spa.Dom.onElementChangeStartObserve.observers[id].isObserved = false;
}

spa.Dom.getElementPosition = function(elm, parent)
{
	let top = 0;
	let left = 0;

	if (elm.offsetParent) {
		top = elm.offsetTop;
		left = elm.offsetLeft;

		while ((elm = elm.offsetParent) != undefined && elm != parent) {
			top += elm.offsetTop;
			left += elm.offsetLeft;
		}
	}

	return {top, left};
}


/*
 * example:
 * var rule = getCssRule('.abc');
 * var width = rule.style['width'];
 * var height = getCssRule('.abc').style['height'];
 */
spa.Dom.getCssRule = function(ruleName)
{
	if (document.styleSheets) {
		for (let i = 0; i < document.styleSheets.length; i++) {
			//we can check only local rules, external rules will throw exception in chrome
			let url = new URL(document.styleSheets[i].href, window.location);

			if (url.origin == window.origin && document.styleSheets[i].cssRules) {
				for (let j = 0; j < document.styleSheets[i].cssRules.length; j++) {
					if (document.styleSheets[i].cssRules[j].selectorText == ruleName.toLowerCase()) {
						return document.styleSheets[i].cssRules[j];
					}
				}
			}
		}
	}

	return null;
}

spa.Dom.EVENT_TYPE_TOUCH_START = 'touchstart';
spa.Dom.EVENT_TYPE_TOUCH_MOVE = 'touchmove';
spa.Dom.EVENT_TYPE_TOUCH_END = 'touchend';
spa.Dom.EVENT_TYPE_TOUCH_CANCEL = 'touchcancel';

spa.Dom.fireEvent = function(element, event)
{
	let e = new Event(event);
	element.dispatchEvent(e);
}

spa.Dom.sendTouchEvent = function(x, y, element, eventType)
{
	// const touchObj = new Touch({
	// 	identifier: Date.now(),
	// 	target: element,
	// 	clientX: x,
	// 	clientY: y,
	// 	radiusX: 2.5,
	// 	radiusY: 2.5,
	// 	rotationAngle: 10,
	// 	force: 0.5,
	// });

	// const touchEvent = new TouchEvent(eventType, {
	// 	cancelable: true,
	// 	bubbles: true,
	// 	touches: [touchObj],
	// 	targetTouches: [],
	// 	changedTouches: [touchObj],
	// 	shiftKey: true,
	// });

	const touch = new Touch({
		identifier: Date.now(),
		target: element,
	});
	  
	const touchEvent = new TouchEvent('touchstart', {
		touches: [touch],
		view: window,
		cancelable: true,
		bubbles: true,
	});

	element.dispatchEvent(touchEvent);
}

spa.Dom.performClick = function(element)
{
	let evt = new MouseEvent('click', {
		bubbles: true,
		cancelable: true,
		view: window
	});

	let canceled = !element.dispatchEvent(evt);
}
