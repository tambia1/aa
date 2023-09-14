spa.Device = {};

//detect browser
spa.Device.browserName = '';		//'', 'Safari', 'Firefox', 'Internet Explorer', ...
spa.Device.browserVersion = '0';

spa.Device.osName = '';				//'', 'iOS', 'Android', 'Windows', 'Mac OS X', 'Linux', ...
spa.Device.osVersion = '0';

spa.Device.deviceName = '';			//'', 'iPhone', 'iPad', 'iPod', 'HTC_Desire', 'LG', ...
spa.Device.deviceVersion = '0';

spa.Device.deviceType = '';          //'mobile', 'desktop'
spa.Device.orientation = '';          //'portrait', 'landscape'

let str = navigator.userAgent;

if (str.match(/(CriOS)/i) != null)
{
    spa.Device.browserName = 'Chrome';
    spa.Device.browserVersion = (str.match(/(CriOS\/)([0-9._]+)/i) || [])[2] || '0';

    spa.Device.osName = 'iOS';

    if (str.match(/(iPhone)/i) != null)
    {
        spa.Device.osVersion = (str.match(/(iPhone.*os\s)([0-9._]+)/i) || [])[2] || '0';
        spa.Device.deviceName = 'iPhone';
    }
    else if (str.match(/(iPad)/i) != null)
    {
        spa.Device.osVersion = (str.match(/(iPad.*os\s)([0-9._]+)/i) || [])[2] || '0';
        spa.Device.deviceName = 'iPad';
    }
}
else if (str.match(/(iPhone)/i) != null)
{
    spa.Device.browserName = 'Safari';
    spa.Device.browserVersion = (str.match(/(version\/)([0-9._]+)/i) || [])[2] || '0';

    spa.Device.osName = 'iOS';
    spa.Device.osVersion = (str.match(/(iphone.*os\s)([0-9._]+)/i) || [])[2] || '0';

    spa.Device.deviceName = 'iPhone';
}
else if (str.match(/(iPad)/i) != null)
{
    spa.Device.browserName = 'Safari';
    spa.Device.browserVersion = (str.match(/(version\/)([0-9._]+)/i) || [])[2] || '0';

    spa.Device.osName = 'iOS';
    spa.Device.osVersion = (str.match(/(iPad.*os\s)([0-9._]+)/i) || [])[2] || '0';

    spa.Device.deviceName = 'iPad';
}
else if (str.match(/(iPod)/i) != null)
{
    spa.Device.browserName = 'Safari';
    spa.Device.browserVersion = (str.match(/(version\/)([0-9._]+)/i) || [])[2] || '0';

    spa.Device.osName = 'iOS';
    spa.Device.osVersion = (str.match(/(iPod.*os\s)([0-9._]+)/i) || [])[2] || '0';

    spa.Device.deviceName = 'iPod';
}
else if (str.match(/(Android)/i) != null)
{
    spa.Device.browserName = 'Android Browser';
    spa.Device.browserVersion = (str.match(/(version\/)([0-9._]+)/i) || [])[2] || '0';

    spa.Device.osName = 'Android';
    spa.Device.osVersion = (str.match(/(android\s)([0-9._]+)/i) || [])[2] || '0';

    spa.Device.deviceName = (str.match(/(Mozilla\/5.0\s\(.*;\s)(.*?)(\sBuild)/i) || [])[2] || '';
    spa.Device.deviceVersion = (str.match(/(Build\/)(.+?)(\))/i) || [])[2] || '0';
}
else if (str.match(/(Blackberry)/i) != null)
{
    spa.Device.browserName = 'BlackBerry Browser';
    spa.Device.browserVersion = (str.match(/(version\/)([0-9._]+)/i) || [])[2] || '0';

    spa.Device.osName = 'BlackBerry';
}
else if (str.match(/(Firefox)/i) != null)
{
    spa.Device.browserName = 'Firefox';
    spa.Device.browserVersion = (str.match(/(firefox\/)(.*)/i) || [])[2] || '0';
}
else if (str.match(/(Chrome)/i) != null)
{
    spa.Device.browserName = 'Chrome';
    spa.Device.browserVersion = (str.match(/(chrome\/)([0-9._]+)/i) || [])[2] || '0';
}
else if (str.match(/(Safari)/i) != null)
{
    spa.Device.browserName = 'Safari';
    spa.Device.browserVersion = (str.match(/(version\/)([0-9._]+)/i) || [])[2] || '0';
}
else if (str.match(/(MSIE)/i) != null)
{
    spa.Device.browserName = 'MSIE';
    spa.Device.browserVersion = (str.match(/(msie\s)(.*?)([;\)])/i) || [])[2] || '0';
}


//os name if we still don't have it
if (spa.Device.osName == '')
{
    if (str.match(/(Windows)/i) != null)
    {
        spa.Device.osName = (str.match(/(Mozilla\/5.0\s\(.*)(Windows.*?)(\s\d)/i) || [])[2] || '';
        spa.Device.osVersion = (str.match(/(Mozilla\/5.0\s\(.*Windows.*?\s)([0-9._]+)([;\)])/i) || [])[2] || '';
    }
    else if (str.match(/(Linux)/i) != null)
    {
        spa.Device.osName = (str.match(/(\s)(Linux)(\s)/i) || [])[2] || '';
        spa.Device.osVersion = (str.match(/(\sLinux\s)(.+?)([;\)])/i) || [])[2] || '';
    }
    else if (str.match(/(Macintosh)/i) != null)
    {
        spa.Device.osName = (str.match(/(Mozilla\/5.0\s\(.*?)(Mac OS X)([;\)\s])/i) || [])[2] || '';
        spa.Device.osVersion = (str.match(/(Mozilla\/5.0\s\(.*?Mac OS X\s)([0-9._]+)([;\)])/i) || [])[2] || '';
    }
}


//device type
if ((typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('Mobile') !== -1))
{
    spa.Device.deviceType = 'Mobile';
}
else
{
    spa.Device.deviceType = 'Desktop';
}


//device orientation
if (typeof window.orientation !== 'undefined' && (window.orientation == 0 || window.orientation == 180)){
    spa.Device.orientation = 'portrait';
}
else {
    spa.Device.orientation = 'landscape';
}


//detect touch device
spa.Device.isTouchDevice = ('ontouchstart' in window) ? true : false;

//onmousedowns
spa.Device.onmousedown = (spa.Device.isTouchDevice) ? 'ontouchstart' : 'onmousedown';
spa.Device.onmousemove = (spa.Device.isTouchDevice) ? 'ontouchmove' : 'onmousemove';
spa.Device.onmouseup = (spa.Device.isTouchDevice) ? 'ontouchend' : 'onmouseup';
spa.Device.onmousewheel = (spa.Device.browserName == 'Firefox') ? 'DOMMouseScroll' : 'onmousewheel';

//mousedown for addEventListener
spa.Device.mousedown = (spa.Device.isTouchDevice) ? 'touchstart' : 'mousedown';
spa.Device.mousemove = (spa.Device.isTouchDevice) ? 'touchmove' : 'mousemove';
spa.Device.mouseup = (spa.Device.isTouchDevice) ? 'touchend' : 'mouseup';
spa.Device.mousecancel = (spa.Device.isTouchDevice) ? 'touchcancel' : 'mousecancel';
spa.Device.mousewheel = (spa.Device.browserName == 'Firefox') ? 'DOMMouseScroll' : 'mousewheel';
spa.Device.mouseenter = 'mouseenter';
spa.Device.mouseout = 'mouseout';
