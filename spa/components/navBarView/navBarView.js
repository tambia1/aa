spa.NavBarView = function(divId, divClass) 
{
	let html = '' +
		'<div id="' + divId + '" class="navbar_view ' + divClass + '"></div>' +
	'';

	spa.decorate(this, new spa.UiElement(html));
}

spa.NavBarView.prototype.onViewWillShow = function(){};
spa.NavBarView.prototype.onViewDidShow = function(){};
spa.NavBarView.prototype.onViewWillHide = function(){};
spa.NavBarView.prototype.onViewDidHide = function(){};

spa.NavBarView.prototype.onViewMenuPressed = function(){};
spa.NavBarView.prototype.onViewHomePressed = function(){};
spa.NavBarView.prototype.onViewBackPressed = function(){ return false; };

spa.NavBarView.prototype.onTabWillShow = function(){};
spa.NavBarView.prototype.onTabDidShow = function(){};
spa.NavBarView.prototype.onTabWillHide = function(){};
spa.NavBarView.prototype.onTabDidHide = function(){};
