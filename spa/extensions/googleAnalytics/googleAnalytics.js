spa.googleAnalytics = {};

spa.googleAnalytics.HIT_TYPE = {
	PAGEVIEW: 'pageview',
    EVENT: 'event',
	SOCIAL: 'social',
	TIMING: 'timing',
};

spa.googleAnalytics.dimensions = {};
spa.googleAnalytics.metrics = {};


spa.googleAnalytics.create = function(trackingId)
{
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    window.ga('create', {
        trackingId: trackingId,
        cookieDomain: 'auto',
    });
}

/**
 * usage:
 * spa.googleAnalytics.send({'hitType': 'pageview', 'page': '/home', 'hitCallback': function() {console.log('hit sent');}});
 *
 * note: it is possible that hitCallback will not be fired, so we need to handle it.
 */
spa.googleAnalytics.send = function(hitType, object)
{
	//add dimensions if exist
	for(let k in spa.googleAnalytics.dimensions){
		object[k] = spa.googleAnalytics.dimensions[k];
	}

	//add metrics if exist
	for(let k in spa.googleAnalytics.metrics){
		object[k] = spa.googleAnalytics.metrics[k];
	}

	//send
	window.ga('send', hitType, object);

	if (object['hitCallback'] != undefined){
		setTimeout(function () {
			object['hitCallback']('failed to send hit');
        }, 1000 * 30);
	}


	//console.log('google analytics send: '+ hitType, JSON.stringify(object));
}

/**
 * @param dimentionIndex 1 to 20 inclusive
 * @param dimentionValue string value, max 150 byte
 *
 * note:
 * spa.googleAnalytics.dimensions.length must be < 20
 */
spa.googleAnalytics.setDimension = function(dimensionIndex, dimensionStringValue)
{
	spa.googleAnalytics.dimensions['dimension' + dimensionIndex] = dimensionStringValue;
}

/**
 * @param dimentionIndex 1 to 20 inclusive
 * @param dimentionValue int value
 *
 * note:
 * spa.googleAnalytics.dimensions.length must be < 20
 */
spa.googleAnalytics.setMetric = function(metricIndex, metricIntValue)
{
	spa.googleAnalytics.metrics['metric' + metricIndex] = metricIntValue;
}

/**
 * @example sendPageview('/main');
 * @example sendPageview('/main', 'http://google.com', 'homepage');
 */
spa.googleAnalytics.sendPageview = function(page, location, title)
{
    spa.googleAnalytics.send('pageview', {
        'page': page,	//must start with "/"
        'location': location,
        'title': title,
	});
}

/**
 * @param {string} eventCategory - max 150 bytes
 * @param {string} eventAction - max 500 bytes
 * @param {string} eventLabel - max 500 bytes, must be string, no null
 * @param {number} eventValue - must be non negative, must be int, could be null
 * @example sendEvent('Videos', 'play', 'Fall Campaign', 42);
 */
spa.googleAnalytics.sendEvent = function(eventCategory, eventAction, eventLabel, eventValue)
{
	eventLabel = eventLabel || '';
	eventValue = eventValue || null;

	spa.googleAnalytics.send('event', {
		'eventCategory': eventCategory,	//max 150 bytes
		'eventAction': eventAction,		//max 500 bytes
		'eventLabel': eventLabel,		//max 500 bytes, must be string, no null
		'eventValue': eventValue,		//must be non negative, must be int, could be null
	});
}

/**
 * @example sendSocial('Facebook', 'like', 'http://myownpersonaldomain.com');
 */
spa.googleAnalytics.sendSocial = function(socialNetwork, socialAction, socialTarget)
{
    spa.googleAnalytics.send('social', {
        'socialNetwork': socialNetwork,	//max 50 bytes
        'socialAction': socialAction,	//max 50 bytes
        'socialTarget': socialTarget,	//max 2048 bytes
	});
}

/**
 * @example sendTiming('JS Dependencies', 'load', 3549, 'Google CDN');
 */
spa.googleAnalytics.sendTiming = function(timingCategory, timingVar, timingValue, timingLabel)
{
    spa.googleAnalytics.send('timing', {
        'timingCategory': timingCategory,	//max 150 bytes
        'timingVar': timingVar,				//max 50 bytes
        'timingValue': timingValue,
        'timingLabel': timingLabel,			//max 500 bytes
	});
}

spa.googleAnalytics.sendException = function(exDescription, exFatal, timingValue, timingLabel)
{
    spa.googleAnalytics.send('exception', {
        'exDescription': exDescription,	//max 150 bytes
        'exFatal': exFatal,				//true/false
	});
}




