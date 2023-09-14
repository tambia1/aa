spa.NavBar = function(divId, divClass)
{
    //call base constructor
    let html = '' +
        '<div id="' + divId + '" class="navbar ' + divClass + '" counter="0"></div>' +
    '';

    spa.decorate(this, new spa.UiElement(html));

    //set vars
    this.views = [];
    this.titles = [];

    this.isAnimating = false;

    //create div 'navbar_header'
    this.divHeader = document.createElement('div');
    this.divHeader.className = 'navbar_header';
    this.div.appendChild(this.divHeader);


    //add back button
    this.buttonBack = new spa.NavBarButton('navbar_button_back', '', '', this.onButtonBackPressed.bind(this), this.onButtonHomePressed.bind(this));
    this.divHeader.appendChild(this.buttonBack.div);

    //add back button
    this.buttonClose = new spa.NavBarButton('navbar_button_close', '', '', this.onButtonClosePressed.bind(this), null);
    this.divHeader.appendChild(this.buttonClose.div);


    //create div 'navbar_panel'
    this.divPanel = document.createElement('div');
    this.divPanel.className = 'navbar_panel';
    this.div.appendChild(this.divPanel);


    //init buttons
    this.setIsBackButtonVisible(false);

    this.setIsCloseButtonExist(true);
    this.setIsCloseButtonVisible(false);
}

spa.NavBar.ANIMATTION_TYPE_NONE = 'NavBar.ANIMATTION_TYPE_NONE';
spa.NavBar.ANIMATTION_TYPE_SLIDE = 'NavBar.ANIMATTION_TYPE_SLIDE';
spa.NavBar.ANIMATTION_TYPE_APPEAR = 'NavBar.ANIMATTION_TYPE_APPEAR';

spa.NavBar.TIMER_RENDER = 100;
spa.NavBar.TIMER_ANIMATION = 300 + 150;

spa.NavBar.prototype.item = null;
spa.NavBar.prototype.divPanel = null;
spa.NavBar.prototype.divHeader = null;

spa.NavBar.prototype.views = null;
spa.NavBar.prototype.view_1 = null;
spa.NavBar.prototype.view_2 = null;

spa.NavBar.prototype.isAnimating = null;
spa.NavBar.prototype.timeoutAddItemStarted = null;
spa.NavBar.prototype.timeoutAddItemFinished = null;
spa.NavBar.prototype.timeoutRemoveItemStarted = null;
spa.NavBar.prototype.timeoutRemoveItemFinished = null;

spa.NavBar.prototype.buttonBack = null;
spa.NavBar.prototype.buttonClose = null;

spa.NavBar.prototype.isCloseExist = null;
spa.NavBar.prototype.onClickClose = null;


spa.NavBar.prototype.addItem = function(item, title, animationType, isInvokeOnViewShowHide, onAddItemFinished)
{
    if (this.isAnimating == true){
        //finish old addItem() if exist
        setTimeout(function () {
            clearTimeout(this.timeoutAddItemStarted);
            clearTimeout(this.timeoutAddItemFinished);
            this.addItemFinished(onAddItemFinished, null);
            this.performAddItem(item, title, animationType, isInvokeOnViewShowHide, onAddItemFinished);
        }.bind(this), spa.NavBar.TIMER_RENDER);
    }
    else{
        this.performAddItem(item, title, animationType, isInvokeOnViewShowHide, onAddItemFinished);
    }
}

spa.NavBar.prototype.performAddItem = function(item, title, animationType, isInvokeOnViewShowHide, onAddItemFinished)
{
    //save pointer to NavBar in navbarView (item)
    item.navbar = this;

    //set animating
    this.isAnimating = true;

    //create title
    let headerTitle = new spa.Item('<div class="navbar_header_title"><div class="navbar_header_title_text"><span data-string="" data-string-group="' + (title?.group || '') + '" data-string-key="' + (title?.key || '') + '">' + (title?.value || title) + '</span></div></div>');

    //add item into NavBar
    this.views.push(item);
    this.divPanel.appendChild(item.div);

    this.titles.push(headerTitle);
    this.divHeader.appendChild(headerTitle.div);

    this.view_1 = this.views[this.views.length - 2];
    this.title_1 = this.titles[this.titles.length - 2];
    this.view_2 = this.views[this.views.length - 1];
    this.title_2 = this.titles[this.titles.length - 1];

    let view_2_state = '';
    switch(animationType)
    {
        case spa.NavBar.ANIMATTION_TYPE_NONE: view_2_state = 'goRight'; break;
        case spa.NavBar.ANIMATTION_TYPE_SLIDE: view_2_state = 'goRight'; break;
        case spa.NavBar.ANIMATTION_TYPE_APPEAR: view_2_state = 'hide'; break;
    }

    this.view_2.div.setAttribute('state', view_2_state);
    this.title_2.div.setAttribute('state', view_2_state);

    if (isInvokeOnViewShowHide == true)
    {
        this.view_1 && this.view_1.onViewWillHide && this.view_1.onViewWillHide();
        this.view_2 && this.view_2.onViewWillShow && this.view_2.onViewWillShow();
    }

    this.setIsBackButtonVisible(this.views.length > 1);
    this.setIsCloseButtonVisible(this.views.length <= 1);

    //start animation
    this.timeoutAddItemStarted = setTimeout(this.addItemStarted.bind(this, animationType, isInvokeOnViewShowHide, onAddItemFinished), spa.NavBar.TIMER_RENDER);
}

spa.NavBar.prototype.addItemStarted = function(animationType, isInvokeOnViewShowHide, onAddItemFinished)
{
    if (this.view_1)
    {
        let view_1_state = '';
        switch(animationType)
        {
            case spa.NavBar.ANIMATTION_TYPE_NONE: view_1_state = 'goCenter'; break;
            case spa.NavBar.ANIMATTION_TYPE_SLIDE: view_1_state = 'moveLeft'; break;
            case spa.NavBar.ANIMATTION_TYPE_APPEAR: view_1_state = 'disappear'; break;
        }

        this.view_1.div.setAttribute('state', view_1_state);
        this.title_1.div.setAttribute('state', view_1_state);
    }


    if (this.view_2)
    {
        let view_2_state = '';
        switch(animationType)
        {
            case spa.NavBar.ANIMATTION_TYPE_NONE: view_2_state = 'goCenter'; break;
            case spa.NavBar.ANIMATTION_TYPE_SLIDE: view_2_state = 'moveCenter'; break;
            case spa.NavBar.ANIMATTION_TYPE_APPEAR: view_2_state = 'appear'; break;
        }

        this.view_2.div.setAttribute('state', view_2_state);
        this.title_2.div.setAttribute('state', view_2_state);
    }


    this.div.setAttribute('counter', this.views.length);

    //end animation
    this.timeoutAddItemFinished = setTimeout(this.addItemFinished.bind(this, isInvokeOnViewShowHide, onAddItemFinished), spa.NavBar.TIMER_ANIMATION);
}

spa.NavBar.prototype.addItemFinished = function(isInvokeOnViewShowHide, onAddItemFinished, e)
{
    //set animating
    this.isAnimating = false;

    //invoke callbacks
    if (isInvokeOnViewShowHide == true)
    {
        this.view_1 && this.view_1.onViewDidHide && this.view_1.onViewDidHide();
        this.view_2 && this.view_2.onViewDidShow && this.view_2.onViewDidShow();
    }

    //clear
    this.view_1 = null;
    this.title_1 = null;
    this.view_2 = null;
    this.title_2 = null;

    this.timeoutAddItemStarted = null;
    this.timeoutAddItemFinished = null;

    this.div.setAttribute('counter', this.views.length);

    //invoke number of views changed
    onAddItemFinished && onAddItemFinished();
}

spa.NavBar.prototype.setIsBackButtonVisible = function(isVisible)
{
    this.buttonBack.div.setAttribute('isVisible', isVisible);
}

spa.NavBar.prototype.onButtonBackPressed = function()
{
    //first check if it is ok by navbarView to go back
    let currentView = this.views[this.views.length - 1];
    let isBackHandled = currentView.onViewBackPressed && !!currentView.onViewBackPressed();

    //go back only if callback did not handled the event
    if (isBackHandled == false){
        this.goBack();
    }
}

spa.NavBar.prototype.goBack = function()
{
    if (this.isAnimating == true){
        return;
    }

    if (this.views.length <= 1){
        return;
    }

    //remove last navbarView
    this.removeItems(this.views.length - 1, spa.NavBar.ANIMATTION_TYPE_SLIDE, null);
}

spa.NavBar.prototype.goHome = function()
{
    if (this.views.length <= 1){
        return;
    }

    let currentView = this.views[this.views.length - 1];
    let isBackHandled = currentView.onViewBackPressed && !!currentView.onViewBackPressed();

    //go back only if callback did not handled the event
    if (isBackHandled == false){
        this.removeItems(1, spa.NavBar.ANIMATTION_TYPE_SLIDE, null);
    }
}

spa.NavBar.prototype.removeItemAt = function(index)
{
    //remove navbarView
    let view = this.views[index];
    let title = this.titles[index];

    view.onViewWillHide && view.onViewWillHide();
    view.onViewDidHide && view.onViewDidHide();

    this.divPanel.removeChild(view.div);
    this.divHeader.removeChild(title.div);

    this.views.splice(index, 1);
    this.titles.splice(index, 1);

    //check for buttons
    this.setIsBackButtonVisible(this.views.length > 1);
    this.setIsCloseButtonVisible(this.views.length <= 1);
}

spa.NavBar.prototype.removeAllItems = function()
{
   while(this.views.length > 0){
        this.removeItemAt(this.views.length - 1);
    }
}

spa.NavBar.prototype.removeItems = function(tillViewIndex, animationType, onRemoveItemFinished)
{
    if (tillViewIndex > this.views.length - 1){
        return;
    }


    this.view_1 = this.views[this.views.length - 1];
    this.title_1 = this.titles[this.titles.length - 1];
    this.view_1 && this.view_1.onViewWillHide && this.view_1.onViewWillHide();

    //remove all view till desired view if we need to remove more than one
    for (let i = this.views.length - 2; i >= tillViewIndex; i--){
        this.divPanel.removeChild(this.views[i].div);
        this.divHeader.removeChild(this.titles[i].div);

        this.views.splice(i, 1);
        this.titles.splice(i, 1);
    }

    this.view_2 = this.views[this.views.length - 2];
    this.title_2 = this.titles[this.titles.length - 2];
    this.view_2 && this.view_2.onViewWillShow && this.view_2.onViewWillShow();

    this.views.splice(this.views.length - 1, 1);
    this.titles.splice(this.titles.length - 1, 1);

    this.setIsBackButtonVisible(this.views.length > 1);
    this.setIsCloseButtonVisible(this.views.length <= 1);

    this.isAnimating = true;

    //start animation
    this.timeoutRemoveItemStarted = setTimeout(this.removeItemStarted.bind(this, animationType, onRemoveItemFinished), spa.NavBar.TIMER_RENDER);
}

spa.NavBar.prototype.removeItemStarted = function(animationType, onRemoveItemFinished)
{
    if (this.view_1)
    {
        let view_1_state = '';
        switch(animationType)
        {
            case spa.NavBar.ANIMATTION_TYPE_NONE: view_1_state = 'goRight'; break;
            case spa.NavBar.ANIMATTION_TYPE_SLIDE: view_1_state = 'moveRight'; break;
            case spa.NavBar.ANIMATTION_TYPE_APPEAR: view_1_state = 'disappear'; break;
        }

        this.view_1.div.setAttribute('state', view_1_state);
        this.title_1.div.setAttribute('state', view_1_state);
    }


    if (this.view_2)
    {
        let view_2_state = '';
        switch(animationType)
        {
            case spa.NavBar.ANIMATTION_TYPE_NONE: view_2_state = 'goCenter'; break;
            case spa.NavBar.ANIMATTION_TYPE_SLIDE: view_2_state = 'moveCenter'; break;
            case spa.NavBar.ANIMATTION_TYPE_APPEAR: view_2_state = 'appear'; break;
        }

        this.view_2.div.setAttribute('state', view_2_state);
        this.title_2.div.setAttribute('state', view_2_state);
    }


    this.div.setAttribute('counter', this.views.length);

    //end animation
    this.timeoutRemoveItemfinished = setTimeout(this.removeItemFinished.bind(this, onRemoveItemFinished), spa.NavBar.TIMER_ANIMATION);
}

spa.NavBar.prototype.removeItemFinished = function(onRemoveItemFinished, e)
{
    //set animating
    this.isAnimating = false;

    //remove navbarView
    this.divPanel.removeChild(this.view_1.div);
    this.divHeader.removeChild(this.title_1.div);

    //invoke callbacks
    this.view_1 && this.view_1.onViewDidHide && this.view_1.onViewDidHide();
    this.view_2 && this.view_2.onViewDidShow && this.view_2.onViewDidShow();

    //clear
    this.view_1 = null;
    this.title_1 = null;
    this.view_2 = null;
    this.title_2 = null;

    this.timeoutRemoveItemStarted = null;
    this.timeoutRemoveItemFinished = null;

    this.div.setAttribute('counter', this.views.length);

    //check for buttons
    this.setIsBackButtonVisible(this.views.length > 1);
    this.setIsCloseButtonVisible(this.views.length <= 1);

    //invoke number of views changed
    onRemoveItemFinished && onRemoveItemFinished();
}

spa.NavBar.prototype.showHeader = function()
{
    this.divHeader.setAttribute('state', 'show');
}

spa.NavBar.prototype.hideHeader = function()
{
    this.divHeader.setAttribute('state', 'hide');
}

spa.NavBar.prototype.appearHeader = function()
{
    setTimeout(function () {this.divHeader.setAttribute('state', 'appear');}.bind(this), spa.NavBar.TIMER_RENDER);
}

spa.NavBar.prototype.disappearHeader = function()
{
    setTimeout(function () {this.divHeader.setAttribute('state', 'disappear');}.bind(this), spa.NavBar.TIMER_RENDER);
}

spa.NavBar.prototype.hideHeaderToRight = function()
{
    this.divHeader.setAttribute('state', 'goRight');
}

spa.NavBar.prototype.hideHeaderToLeft = function()
{
    this.divHeader.setAttribute('state', 'goLeft');
}

spa.NavBar.prototype.moveHeaderToCenter = function()
{
    setTimeout(function () {this.divHeader.setAttribute('state', 'moveCenter');}.bind(this), spa.NavBar.TIMER_RENDER);
}

spa.NavBar.prototype.moveHeaderToRight = function()
{
    setTimeout(function () {this.divHeader.setAttribute('state', 'moveRight');}.bind(this), spa.NavBar.TIMER_RENDER);
}

spa.NavBar.prototype.moveHeaderToLeft = function()
{
    setTimeout(function () {this.divHeader.setAttribute('state', 'moveLeft');}.bind(this), spa.NavBar.TIMER_RENDER);
}

spa.NavBar.prototype.setViewTitle = function(viewIndex, title)
{
    this.titles[viewIndex].setText(title);
}

spa.NavBar.prototype.setCurrentViewTitle = function(title)
{
    this.setViewTitle(this.titles.length - 1, title);
}

spa.NavBar.prototype.getCurrentView = function()
{
    return this.views[this.views.length - 1];
}

spa.NavBar.prototype.getCurrentTitle = function()
{
    return this.titles[this.titles.length - 1];
}


spa.NavBar.prototype.onButtonHomePressed = function()
{
    let currentView = this.views[this.views.length - 1];
    currentView.onViewHomePressed && currentView.onViewHomePressed();

    this.removeItems(1, spa.NavBar.ANIMATTION_TYPE_SLIDE, null);
}

spa.NavBar.prototype.setIsCloseButtonExist = function(isCloseExist)
{
    this.isCloseExist = isCloseExist;
}

spa.NavBar.prototype.setIsCloseButtonVisible = function(isVisible)
{
    this.buttonClose.div.setAttribute('isVisible', isVisible);
}

spa.NavBar.prototype.onButtonClosePressed = function()
{
    this.onClickClose?.(this);
}

spa.NavBar.prototype.setIsHeaderVisible = function(isVisible)
{
    this.divHeader.setAttribute('isVisible', isVisible);
}

