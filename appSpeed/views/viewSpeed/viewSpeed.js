app.appSpeed.ViewSpeed = function()
{
    spa.decorate(this, new spa.NavBarView('view_speed', ''));
	
	this.geolocationPointer = null;

	this.maxSpeed = 8;
	this.arrMaxSpeed = [8, 16, 40, 48, 80, 120, 160];
	this.maxSpeedIndex = 0;
	this.caliperDegStep = 240 / this.maxSpeed;
	this.caliperDegStart = 0;

	this.initViews();
	this.initGps();
}

app.appSpeed.ViewSpeed.prototype.onViewWillShow = function()
{

}

app.appSpeed.ViewSpeed.prototype.onViewDidShow = function()
{

}

app.appSpeed.ViewSpeed.prototype.onViewWillHide = function()
{

}

app.appSpeed.ViewSpeed.prototype.onViewDidHide = function()
{

}

app.appSpeed.ViewSpeed.prototype.onViewBackPressed = function()
{
	return false;
}

app.appSpeed.ViewSpeed.prototype.initViews = function()
{
	this.removeAllItems();
	
	let itemSpeedometer = new spa.Item('<div class="view_speed__speedometer"></div>');
	this.addItem(itemSpeedometer);

	let itemSpeedometerImage = new spa.Item('<div class="view_speed__speedometer_image"></div>');
	itemSpeedometer.addItem(itemSpeedometerImage);


	let speedIntervals = this.maxSpeed / 8;

	for (let i = 0; i <= 8; i++) {
		this.itemCaliperValue = new spa.Text('', 'view_speed__caliperValue view_speed__caliper_value_' + i, (speedIntervals * i));
		itemSpeedometer.addItem(this.itemCaliperValue);
	}


	this.itemCaliper = new spa.Item('<div class="view_speed__caliper"></div>');
	itemSpeedometer.addItem(this.itemCaliper);
	
	this.itemCompass = new spa.Item('<div class="view_speed__compass"></div>');
	itemSpeedometer.addItem(this.itemCompass);



	this.itemSpeedometerSpeedValue = new spa.Text('', 'view_speed__speedometerSpeedValue', '0.00');
	itemSpeedometer.addItem(this.itemSpeedometerSpeedValue);

	this.itemSpeedometerKMH = new spa.Text('', 'view_speed__speedometerKMH', 'km/h');
	itemSpeedometer.addItem(this.itemSpeedometerKMH);

	this.itemSpeedometerTrip = new spa.Text('', 'view_speed__speedometerTrip', 'TRIP');
	itemSpeedometer.addItem(this.itemSpeedometerTrip);

	this.itemSpeedometerTripValue = new spa.Text('', 'view_speed__speedometerTripValue', '0.0');
	itemSpeedometer.addItem(this.itemSpeedometerTripValue);

	this.itemSpeedometerTripKm = new spa.Text('', 'view_speed__speedometerTripKm', 'km');
	itemSpeedometer.addItem(this.itemSpeedometerTripKm);

	this.itemSpeedometerOdoValue = new spa.Text('', 'view_speed__speedometerOdoValue', '0.0');
	itemSpeedometer.addItem(this.itemSpeedometerOdoValue);

	this.itemSpeedometerOdoKm = new spa.Text('', 'view_speed__speedometerOdoKm', 'km');
	itemSpeedometer.addItem(this.itemSpeedometerOdoKm);

	this.itemGpsIndicator = new spa.Text('', 'view_speed__gpsIndicator', 'GPS');
	itemSpeedometer.addItem(this.itemGpsIndicator);
	spa.decorate(this.itemGpsIndicator, new spa.UiAttribute());
	this.itemGpsIndicator.setAttribute('isEnabled', false);



	this.itemIndicatorLatText = new spa.Text('', 'view_speed__indicator view_speed__indicatorLatText', 'LAT');
	itemSpeedometer.addItem(this.itemIndicatorLatText);

	this.itemIndicatorLatText0 = new spa.Text('', 'view_speed__indicator view_speed__indicatorLatText_0', '-90');
	itemSpeedometer.addItem(this.itemIndicatorLatText0);

	this.itemIndicatorLatText1 = new spa.Text('', 'view_speed__indicator view_speed__indicatorLatText_1', '-45');
	itemSpeedometer.addItem(this.itemIndicatorLatText1);

	this.itemIndicatorLatText2 = new spa.Text('', 'view_speed__indicator view_speed__indicatorLatText_2', '0');
	itemSpeedometer.addItem(this.itemIndicatorLatText2);

	this.itemIndicatorLatText3 = new spa.Text('', 'view_speed__indicator view_speed__indicatorLatText_3', '45');
	itemSpeedometer.addItem(this.itemIndicatorLatText3);

	this.itemIndicatorLatText4 = new spa.Text('', 'view_speed__indicator view_speed__indicatorLatText_4', '90');
	itemSpeedometer.addItem(this.itemIndicatorLatText4);

	this.itemIndicatorLatDisabled = new spa.Item('<div class="view_speed__indicatorLatDisabled"></div>');
	itemSpeedometer.addItem(this.itemIndicatorLatDisabled);

	this.itemIndicatorLatEnabled = new spa.Item('<div class="view_speed__indicatorLatEnabled"></div>');
	this.itemIndicatorLatDisabled.addItem(this.itemIndicatorLatEnabled);



	this.itemIndicatoLngtText = new spa.Text('', 'view_speed__indicator view_speed__indicatorLngText', 'LNG');
	itemSpeedometer.addItem(this.itemIndicatoLngtText);

	this.itemIndicatorLngText0 = new spa.Text('', 'view_speed__indicator view_speed__indicatorLngText_0', '-180');
	itemSpeedometer.addItem(this.itemIndicatorLngText0);

	this.itemIndicatorLngText1 = new spa.Text('', 'view_speed__indicator view_speed__indicatorLngText_1', '-90');
	itemSpeedometer.addItem(this.itemIndicatorLngText1);

	this.itemIndicatorLngText2 = new spa.Text('', 'view_speed__indicator view_speed__indicatorLngText_2', '0');
	itemSpeedometer.addItem(this.itemIndicatorLngText2);

	this.itemIndicatorLngText3 = new spa.Text('', 'view_speed__indicator view_speed__indicatorLngText_3', '90');
	itemSpeedometer.addItem(this.itemIndicatorLngText3);

	this.itemIndicatorLngText4 = new spa.Text('', 'view_speed__indicator view_speed__indicatorLngText_4', '180');
	itemSpeedometer.addItem(this.itemIndicatorLngText4);

	this.itemIndicatorLngDisabled = new spa.Item('<div class="view_speed__indicatorLngDisabled"></div>');
	itemSpeedometer.addItem(this.itemIndicatorLngDisabled);

	this.itemIndicatorLngEnabled = new spa.Item('<div class="view_speed__indicatorLngEnabled"></div>');
	this.itemIndicatorLngDisabled.addItem(this.itemIndicatorLngEnabled);



	this.itemIndicatoAccurecytText = new spa.Text('', 'view_speed__indicator view_speed__indicatorAccurecyText', 'Accuracy');
	itemSpeedometer.addItem(this.itemIndicatoAccurecytText);

	this.itemIndicatorAccurecyText0 = new spa.Text('', 'view_speed__indicator view_speed__indicatorAccurecyText_0', '0');
	itemSpeedometer.addItem(this.itemIndicatorAccurecyText0);

	this.itemIndicatorAccurecyText1 = new spa.Text('', 'view_speed__indicator view_speed__indicatorAccurecyText_1', '250');
	itemSpeedometer.addItem(this.itemIndicatorAccurecyText1);

	this.itemIndicatorAccurecyText2 = new spa.Text('', 'view_speed__indicator view_speed__indicatorAccurecyText_2', '500');
	itemSpeedometer.addItem(this.itemIndicatorAccurecyText2);

	this.itemIndicatorAccurecyDisabled = new spa.Item('<div class="view_speed__indicatorAccurecyDisabled"></div>');
	itemSpeedometer.addItem(this.itemIndicatorAccurecyDisabled);

	this.itemIndicatorAccurecyEnabled = new spa.Item('<div class="view_speed__indicatorAccurecyEnabled"></div>');
	this.itemIndicatorAccurecyDisabled.addItem(this.itemIndicatorAccurecyEnabled);



	this.itemIndicatoAlttText = new spa.Text('', 'view_speed__indicator view_speed__indicatorAltText', 'Altitude');
	itemSpeedometer.addItem(this.itemIndicatoAlttText);

	this.itemIndicatorAltText0 = new spa.Text('', 'view_speed__indicator view_speed__indicatorAltText_0', '0');
	itemSpeedometer.addItem(this.itemIndicatorAltText0);

	this.itemIndicatorAltText1 = new spa.Text('', 'view_speed__indicator view_speed__indicatorAltText_1', '500');
	itemSpeedometer.addItem(this.itemIndicatorAltText1);

	this.itemIndicatorAltText2 = new spa.Text('', 'view_speed__indicator view_speed__indicatorAltText_2', '1000');
	itemSpeedometer.addItem(this.itemIndicatorAltText2);

	this.itemIndicatorAltDisabled = new spa.Item('<div class="view_speed__indicatorAltDisabled"></div>');
	itemSpeedometer.addItem(this.itemIndicatorAltDisabled);

	this.itemIndicatorAltEnabled = new spa.Item('<div class="view_speed__indicatorAltEnabled"></div>');
	this.itemIndicatorAltDisabled.addItem(this.itemIndicatorAltEnabled);


	let itemMaxSpeed = new spa.Item('<div class="view_speed__max_speed"></div>');
	itemSpeedometer.addItem(itemMaxSpeed);
	
	let onClickMaxSpeed = new spa.UiClick(itemMaxSpeed.div, () => {

		this.maxSpeedIndex = (this.maxSpeedIndex + 1) % this.arrMaxSpeed.length;
		this.maxSpeed = this.arrMaxSpeed[this.maxSpeedIndex];

		this.caliperDegStep = 240 / this.maxSpeed;

		this.initViews();
	});


	this.itemError = new spa.Text('', 'view_speed__error', '');
	itemSpeedometer.addItem(this.itemError);
}

app.appSpeed.ViewSpeed.prototype.initGps = function()
{
	this.geolocationPointer = navigator.geolocation.watchPosition(this.onGpsOk.bind(this), this.onGpsError.bind(this), {enableHighAccuracy:true, timeout:10000, maximumAge: 5000});
}

app.appSpeed.ViewSpeed.prototype.onGpsOk = function(position)
{
	let latitude = position.coords.latitude || 0;
	let longitude = 90;//position.coords.longitude || 0;
	let altitude = position.coords.altitude || 0;
	let accuracy = position.coords.accuracy || 0;
	let altitudeAccuracy = position.coords.altitudeAccuracy || 0;
	let heading = position.coords.heading || 0;
	let speed = (position.coords.speed || 0) * 3.6;

	this.itemGpsIndicator.setAttribute('isEnabled', true);

	this.drawCaliper(speed);
	this.drawCompass(heading);
	this.drawLat(latitude);
	this.drawLng(longitude);
	this.drawAccuracy(accuracy);
	this.drawAltitide(altitude);
}

app.appSpeed.ViewSpeed.prototype.onGpsError = function(error)
{
	navigator.geolocation.clearWatch(this.geolocationPointer);		      

	switch(error.code){
		case error.PERMISSION_DENIED:
			this.itemError.setText('PERMISSION_DENIED');
			break;
		case error.POSITION_UNAVAILABLE: 
			this.itemError.setText('POSITION_UNAVAILABLE');
			break;
		case error.TIMEOUT:
			this.itemError.setText('TIMEOUT');
			break;
		case error.UNKNOWN_ERROR:
			this.itemError.setText('UNKNOWN_ERROR');
			break;
	}

	this.itemGpsIndicator.setAttribute('isEnabled', false);
}

app.appSpeed.ViewSpeed.prototype.drawCaliper = function(speed)
{
	let deg = this.caliperDegStart + (speed * this.caliperDegStep);
	
	deg = Math.max(0, deg);
	deg = Math.min(deg, 240);
	
	this.itemCaliper.div.style.transform = 'rotate(' + deg + 'deg)';

	this.itemSpeedometerSpeedValue.setText(speed.toFixed(2));
}

app.appSpeed.ViewSpeed.prototype.drawCompass = function(heading)
{
	this.itemCompass.div.style.transform = 'rotate(' + (-heading) + 'deg)';
}

app.appSpeed.ViewSpeed.prototype.drawLat = function(latitude)
{
	this.itemIndicatorLatEnabled.div.style.top = (62 - (62 / 180.0) * (latitude + 96)) + 'px';
}

app.appSpeed.ViewSpeed.prototype.drawLng = function(longitude)
{
	this.itemIndicatorLngEnabled.div.style.top = (62 - (62 / 360.0) * (longitude + 164)) + 'px';
}

app.appSpeed.ViewSpeed.prototype.drawAccuracy = function(accuracy)
{
	this.itemIndicatorAccurecyEnabled.div.style.top = ((62 / 500.0) * accuracy) + 'px';
}

app.appSpeed.ViewSpeed.prototype.drawAltitide = function(altitude)
{
	this.itemIndicatorAltEnabled.div.style.top = ((62 / 1000.0) * altitude) + 'px';
}
