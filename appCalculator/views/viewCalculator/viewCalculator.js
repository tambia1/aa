app.appCalculator.ViewCalculator = function()
{
    spa.decorate(this, new spa.NavBarView('view_calculator', ''));
	
	this.initViews();
}

app.appCalculator.ViewCalculator.prototype.onViewWillShow = function()
{

}

app.appCalculator.ViewCalculator.prototype.onViewDidShow = function()
{

}

app.appCalculator.ViewCalculator.prototype.onViewWillHide = function()
{

}

app.appCalculator.ViewCalculator.prototype.onViewDidHide = function()
{

}

app.appCalculator.ViewCalculator.prototype.onViewBackPressed = function()
{
	return false;
}

app.appCalculator.ViewCalculator.prototype.initViews = function()
{
	let result = 0;
	let number = '0';
	let action = '+';
	


	let itemButtonsContainer = new spa.Item('<div class="view_calculator__buttons_container"></div>');
	this.addItem(itemButtonsContainer);



	let itemButtonResult = new spa.ButtonText('', 'view_calculator_result', '0', null);
	itemButtonsContainer.addItem(itemButtonResult);
	spa.decorate(itemButtonResult, new spa.UiAttribute());



	let itemButtonClear = new spa.ButtonText('', 'view_calculator__button view_calculator__button_grey', 'C', () => {onClickAction('C');});
	itemButtonsContainer.addItem(itemButtonClear);

	let itemButtonPlusMinus = new spa.ButtonText('', 'view_calculator__button view_calculator__button_grey', '±', () => {onClickAction('±');});
	itemButtonsContainer.addItem(itemButtonPlusMinus);

	let itemButtonPercent = new spa.ButtonText('', 'view_calculator__button view_calculator__button_grey', '%', () => {onClickAction('%');});
	itemButtonsContainer.addItem(itemButtonPercent);

	let itemButtonDevide = new spa.ButtonText('', 'view_calculator__button view_calculator__button_yellow', '÷', () => {onClickOperand('÷');});
	itemButtonsContainer.addItem(itemButtonDevide);



	let itemButton7 = new spa.ButtonText('', 'view_calculator__button view_calculator__button_brown', '7', () => {onCLickNumber(7);});
	itemButtonsContainer.addItem(itemButton7);

	let itemButton8 = new spa.ButtonText('', 'view_calculator__button view_calculator__button_brown', '8', () => {onCLickNumber(8);});
	itemButtonsContainer.addItem(itemButton8);

	let itemButton9 = new spa.ButtonText('', 'view_calculator__button view_calculator__button_brown', '9', () => {onCLickNumber(9);});
	itemButtonsContainer.addItem(itemButton9);

	let itemButtonMultiply = new spa.ButtonText('', 'view_calculator__button view_calculator__button_yellow', 'x', () => {onClickOperand('x');});
	itemButtonsContainer.addItem(itemButtonMultiply);



	let itemButton4 = new spa.ButtonText('', 'view_calculator__button view_calculator__button_brown', '4', () => {onCLickNumber(4);});
	itemButtonsContainer.addItem(itemButton4);

	let itemButton5 = new spa.ButtonText('', 'view_calculator__button view_calculator__button_brown', '5', () => {onCLickNumber(5);});
	itemButtonsContainer.addItem(itemButton5);

	let itemButton6 = new spa.ButtonText('', 'view_calculator__button view_calculator__button_brown', '6', () => {onCLickNumber(6);});
	itemButtonsContainer.addItem(itemButton6);

	let itemButtonMinus = new spa.ButtonText('', 'view_calculator__button view_calculator__button_yellow', '-', () => {onClickOperand('-');});
	itemButtonsContainer.addItem(itemButtonMinus);



	let itemButton1 = new spa.ButtonText('', 'view_calculator__button view_calculator__button_brown', '1', () => {onCLickNumber(1);});
	itemButtonsContainer.addItem(itemButton1);

	let itemButton2 = new spa.ButtonText('', 'view_calculator__button view_calculator__button_brown', '2', () => {onCLickNumber(2);});
	itemButtonsContainer.addItem(itemButton2);

	let itemButton3 = new spa.ButtonText('', 'view_calculator__button view_calculator__button_brown', '3', () => {onCLickNumber(3);});
	itemButtonsContainer.addItem(itemButton3);

	let itemButtonPlus = new spa.ButtonText('', 'view_calculator__button view_calculator__button_yellow', '+', () => {onClickOperand('+');});
	itemButtonsContainer.addItem(itemButtonPlus);



	let itemButton0 = new spa.ButtonText('', 'view_calculator__button view_calculator__button_brown view_calculator__button_zero', '0', () => {onCLickNumber(0);});
	itemButtonsContainer.addItem(itemButton0);

	let itemButtonDot = new spa.ButtonText('', 'view_calculator__button view_calculator__button_brown', '.', () => {onCLickNumber('.');});
	itemButtonsContainer.addItem(itemButtonDot);

	let itemButtonEq = new spa.ButtonText('', 'view_calculator__button view_calculator__button_yellow', '=', () => {onClickOperand('=');});
	itemButtonsContainer.addItem(itemButtonEq);



	let updateDisplay = (arg) => {
		arg = parseFloat(arg).toLocaleString('en-US');
		itemButtonResult.setText(arg);
	};

	let onCLickNumber = (arg) => {
		if (arg == '.' && number.indexOf('.') >= 0){
			return;
		}

		number = number + arg;

		updateDisplay(number);
	};

	let onClickOperand = (arg) => {
		switch (action) {
			case '+':
				result = result + parseFloat(number);
				break;

			case '-':
				result = result - parseFloat(number);
				break;

			case 'x':
				result = result * parseFloat(number);
				break;

			case '÷':
				result = result / parseFloat(number);
				break;
		}

		number = '0';
		action = arg;

		updateDisplay(result);
	}

	let onClickAction = (arg) => {
		switch (arg) {
			case 'C':
				result = 0;
				number = '0';
				action = '+';
				break;

			case '±':
				number = parseFloat(number) * -1;
				break;

			case '%':
				number = parseFloat(number) / 100;
				break;

			case '=':
				break;

			case '':
				result = number;
				break;
		}

		updateDisplay(number);
	};

}