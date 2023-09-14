app.appCalendar.ViewCalendar = function()
{
    spa.decorate(this, new spa.NavBarView('view_calendar', ''));
	
	this.initViews();
}

app.appCalendar.ViewCalendar.prototype.onViewWillShow = function()
{

}

app.appCalendar.ViewCalendar.prototype.onViewDidShow = function()
{

}

app.appCalendar.ViewCalendar.prototype.onViewWillHide = function()
{

}

app.appCalendar.ViewCalendar.prototype.onViewDidHide = function()
{

}

app.appCalendar.ViewCalendar.prototype.onViewBackPressed = function()
{
	return false;
}

app.appCalendar.ViewCalendar.prototype.initViews = function()
{
	this.panel = new spa.Panel('view_calendar__panel', '', spa.Panel.DIRECTION_VER);
	this.addItem(this.panel);

	let currentDate = new Date();
	let currentYear = currentDate.getFullYear();
	let currentMonth = currentDate.getMonth() + 1;
	let currentDay = currentDate.getDate();

	let shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	let shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	let startYear = 2020;
	let endYear = 2030;

	let selectedYearItem = null;

	for (let year = startYear; year <= endYear; year++) {
		let itemYear = new spa.Item('<div class="view_calendar__year"></div>');
		this.panel.addItem(itemYear);

		if (year == currentYear){
			selectedYearItem = itemYear;
		}


		let itemYearTitle = new spa.Text('', 'view_calendar__year_title', year);
		itemYear.addItem(itemYearTitle);
		spa.decorate(itemYearTitle, new spa.UiSelect());
		itemYearTitle.setIsSelected(year == currentYear);
	
	
		let itemLine = new spa.Item('<div class="view_calendar__line"></div>');
		itemYear.addItem(itemLine);
	
	
		for (let month = 0; month < 12; month++) {
			let itemMounth = new spa.Item('<div class="view_calendar__month"></div>');
			itemYear.addItem(itemMounth);
	
			let itemMonthTitle = new spa.Text('', 'view_calendar__month_title', shortMonths[month]);
			itemMounth.addItem(itemMonthTitle);
			spa.decorate(itemMonthTitle, new spa.UiSelect());
			itemMonthTitle.setIsSelected(year == currentYear && month == currentMonth);

			let itemMounthBox = new spa.Item('<div class="view_calendar__month_box"></div>');
			itemMounth.addItem(itemMounthBox);

			for (let day = 1; day <= 31; day++) {
				let itemDayTitle = new spa.Text('', 'view_calendar__day_title', day);
				itemMounthBox.addItem(itemDayTitle);
				spa.decorate(itemDayTitle, new spa.UiSelect());
				itemDayTitle.setIsSelected(year == currentYear && month == currentMonth && day == currentDay);
			}
		}
	}

	setTimeout(() => {
		if (selectedYearItem != null){
			let rect = selectedYearItem.div.getBoundingClientRect();

			this.panel.scrollTo(0, rect.top - 60, true);
		}
	}, 700);
}
