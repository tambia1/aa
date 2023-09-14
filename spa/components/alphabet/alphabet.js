spa.Alphabet = function(divId, divClass, onSelectionChange)
{
	//call base constructor
	var str = ''+
		'<div id="' + divId + '" class="alphabet ' + divClass + '">'+
		'</div>'+
	'';

    this.item = new spa.Item(str);

	//save vars
    this.onSelectionChange = onSelectionChange;

    //attach move
	spa.GestureMove.decorate(this.item.div, true, this.onMoveStart.bind(this), this.onMove.bind(this), this.onMoveEnd.bind(this));
}

spa.Alphabet.prototype.item = null;

spa.Alphabet.prototype.items = null;

spa.Alphabet.prototype.addItem = function(char)
{
	let item = new spa.Item('<div class="alphabet_item"><span>' + char + '</div>');
	item.div.char = char;

	this.item.div.appendChild(item.div);
}

spa.Alphabet.prototype.onMoveStart = function(x, y, e)
{
	let item = this.getItemInXY(x, y) || {};
	let char = item.char;

	this.onSelectionChange && this.onSelectionChange(char);
}

spa.Alphabet.prototype.onMove = function(x, y, e)
{
	let item = this.getItemInXY(x, y) || {};
	let char = item.char;

	this.onSelectionChange && this.onSelectionChange(char);
}

spa.Alphabet.prototype.onMoveEnd = function(x, y, e)
{
	let item = this.getItemInXY(x, y) || {};
	let char = item.char;

	this.onSelectionChange && this.onSelectionChange(char);
}

spa.Alphabet.prototype.getItemInXY = function(x, y)
{
	let result = null;

	let rect = this.item.div.getBoundingClientRect();

	x += rect.x;
	y += rect.y;

	for (let i = 0; i < this.item.div.childNodes.length; i++){
		let node = this.item.div.childNodes[i];
		let nodeRect = node.getBoundingClientRect();

		if (y >= nodeRect.y && y <= nodeRect.y + nodeRect.height){
			result = node;
			break;
		}
	}

	return result;
}

spa.Alphabet.prototype.setCustomChars = function(chars)
{
	for (let i = 0; i < chars.length; i++){
		this.addItem(chars[i]);
	}
}

spa.Alphabet.prototype.setChars = function(lang)
{
	let chars = {
		'en': ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ],
		'ar': ['#', ],
	}

	this.setCustomChars(chars[lang]);
}

