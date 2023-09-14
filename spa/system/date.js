spa.Date = {};

spa.Date.formatDate = function(date, mask, lang, splitters, names)
{
	date = new Date(date);

	lang = lang || 'en';

	splitters = splitters || {' ': true, '-': true, '/': true, '\\': true, ':': true};

	names = names || {
		'en': {
			shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			longDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			longMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			markerLower: ['am', 'pm'],
			markerUpper: ['AM', 'PM'],
		},

		'ar': {
			shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			longDays: ['الاحد', 'الاثنين', 'الثلاثاء', 'الاربعاء', 'الخميس', 'الجمعة', 'السبت'],
			shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			longMonths: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
			markerLower: ['am', 'pm'],
			markerUpper: ['AM', 'PM'],

		},
	};

	let replacers = {
		'a': function() { return date.getHours() < 12 ? names[lang].markerLower[0] : names[lang].markerLower[1]; },	//am, pm
		'A': function() { return date.getHours() < 12 ? names[lang].markerUpper[0] : names[lang].markerUpper[1]; },	//AM, PM

		'h': function() { return (date.getHours() % 12 || 12); },		//1-12
		'hh': function() { return ((date.getHours() % 12 || 12) < 10 ? '0' : '') + (date.getHours() % 12 || 12); },	//01-12
		'H': function() { return date.getHours(); },	//0-23
		'HH': function() { return (date.getHours() < 10 ? '0' : '') + date.getHours(); },	//00-23

		'm': function() { return date.getMinutes(); },	//1 to 30
		'mm': function() { return (date.getMinutes() < 10 ? '0' : '') + date.getMinutes(); },	//01 to 30

		's': function() { return date.getSeconds(); },	//0-59
		'ss': function() { return date.getSeconds().toFixed(); },	//00-59

		'd': function() { return date.getDate(); },	//1 to 30
		'dd': function() { return (date.getDate() < 10 ? '0' : '') + date.getDate(); },	//01 to 30

		'M': function() { return (date.getMonth() + 1); },	//1-12
		'MM': function() { return (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1); },	//01-12
		'MMM': function() { return names[lang].shortMonths[date.getMonth()]; },	//Jan, ...
		'MMMM': function() { return names[lang].longMonths[date.getMonth()]; },	//January, ...

		'yy': function() { return date.getFullYear().toString().substr(2); },	//19
		'yyyy': function() { return date.getFullYear(); },	//2019
	};

	let strDate = '';
	let strMask = '';

	mask = mask + '\0';
	splitters['\0'] = true;

	for (let i = 0; i < mask.length; i++){
		if (splitters[mask[i]] == true){
			strDate += replacers[strMask] && replacers[strMask]() || strMask;
			strDate += mask[i].charCodeAt(0) && mask[i] || '';
			strMask = '';
		}
		else {
			strMask += mask[i];
		}
	}

	return strDate;
};

spa.Date.getTimeBetweenDates = function(dateFrom, dateTo)
{
	let oneYearInMs = 1000*60*60*24*365;
	let oneMonthInMs = 1000*60*60*24*30;
	let oneDayInMs = 1000*60*60*24;
	let oneHourInMs = 1000*60*60;
	let oneMinutesInMs = 1000*60;
	let oneSecInMs = 1000;
	let oneMsInMs = 1;

	let dateFromMs = new Date(dateFrom).getTime();
	let dateToMs = new Date(dateTo).getTime();

	let differenceInMs = dateToMs - dateFromMs;

	let time = {
		years: differenceInMs/oneYearInMs,
		months: differenceInMs/oneMonthInMs,
		days: differenceInMs/oneDayInMs,
		hours: differenceInMs/oneHourInMs,
		minutes: differenceInMs/oneMinutesInMs,
		seconds: differenceInMs/oneSecInMs,
		milliseconds: differenceInMs/oneMsInMs,
	};

	return time
}
