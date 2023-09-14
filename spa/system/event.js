spa.Event = {};

/*
 * isDiving == false (from body to elemen)
 * isDiving == true (from element to body (bubbling))
 */
spa.Event.listen = function(element, eventName, action, isDiving)
{
	if(element.addEventListener)
	{
		element.addEventListener(eventName, action, isDiving);
	}
	else
	{
		element.attachEvent('on' + eventName, action);
	}

	return {eventName: eventName, element: element, action: action};
}

spa.Event.unListen = function(listener)
{
	if(listener.element.removeEventListener)
	{
		listener.element.removeEventListener(listener.eventName, listener.action);
	}
	else
	{
		listener.element.detachEvent( 'on' + listener.eventName, listener.action);
	}
}

spa.Event.fire = function(element, eventName, args)
{
	if(document.createEvent)
	{
		var event = document.createEvent("Event");
		event.initEvent(eventName, true, true);
	}
	else
	{
		var event = document.createEventObject();
		event.eventType = eventName;
	}

	event.detail = {
		args: args,
		time : new Date(),
	}

	element.dispatchEvent(event);
}
