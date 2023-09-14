app.appNinja.gameNinja = function(canvas)
{
    //add canvas touch listeners
    canvas.ontouchstart = canvas.onmousedown = this.onTouchStart.bind(this);
    canvas.ontouchmove = canvas.onmousemove = this.onTouchMove.bind(this);
    canvas.ontouchend = canvas.onmouseup = this.onTouchEnd.bind(this);

    //vars
    this.canvas = canvas;

    this.requestAnimationFrameId = null;

    this.gameState = this.GAME_STATE_NONE;

    this.isTouchStart = false;
    this.arrTouchMove = [];

    this.arrImages = [
        {fruitName: 'fruit', imageName1: 'appNinja/views/viewNinja/images/apple.png', imageName2: 'appNinja/views/viewNinja/images/splashRed.png', image1: null, image2: null},
        {fruitName: 'fruit', imageName1: 'appNinja/views/viewNinja/images/banana.png', imageName2: 'appNinja/views/viewNinja/images/splashYellow.png', image1: null, image2: null},
        {fruitName: 'fruit', imageName1: 'appNinja/views/viewNinja/images/grape.png', imageName2: 'appNinja/views/viewNinja/images/splashPurple.png', image1: null, image2: null},
        {fruitName: 'fruit', imageName1: 'appNinja/views/viewNinja/images/orange.png', imageName2: 'appNinja/views/viewNinja/images/splashOrange.png', image1: null, image2: null},
        {fruitName: 'fruit', imageName1: 'appNinja/views/viewNinja/images/papaya.png', imageName2: 'appNinja/views/viewNinja/images/splashOrange.png', image1: null, image2: null},
        {fruitName: 'fruit', imageName1: 'appNinja/views/viewNinja/images/pineapple.png', imageName2: 'appNinja/views/viewNinja/images/splashYellow.png', image1: null, image2: null},
        {fruitName: 'fruit', imageName1: 'appNinja/views/viewNinja/images/strawberry.png', imageName2: 'appNinja/views/viewNinja/images/splashRed.png', image1: null, image2: null},
        {fruitName: 'fruit', imageName1: 'appNinja/views/viewNinja/images/watermelon.png', imageName2: 'appNinja/views/viewNinja/images/splashGreen.png', image1: null, image2: null},
        {fruitName: 'hand', imageName1: 'appNinja/views/viewNinja/images/hand.png', imageName2: 'appNinja/views/viewNinja/images/splashHand.png', image1: null, image2: null},
    ];

    this.arrFruit = [];
    this.arrFruitCallbackCounter = 0;

    this.goodScore = 0;
    this.badScore = 0;
    this.missScore = 0;

    this.SOUND_DONG = [0.531, 2.100];
    this.SOUND_SWORD = [
        [2.733, 3.281],
        [4.044, 4.490],
        [5.281, 5.672],
        [6.648, 6.984],
    ];


    //load resources
    this.loadResources();
}

app.appNinja.gameNinja.prototype.GAME_STATE_NONE = 0;
app.appNinja.gameNinja.prototype.GAME_STATE_PLAYING = 1;
app.appNinja.gameNinja.prototype.GAME_STATE_PAUSED = 2;

app.appNinja.gameNinja.prototype.loadResources = function()
{
    //load images
    for (var i = 0; i < this.arrImages.length; i++)
    {
        this.arrImages[i].image1 = new Image();
        this.arrImages[i].image1.src = this.arrImages[i].imageName1;

        this.arrImages[i].image2 = new Image();
        this.arrImages[i].image2.src = this.arrImages[i].imageName2;
    }

    //load sound
    //spa.Audio.load('app/viewNinja/sounds/sounds.mp3');
}

app.appNinja.gameNinja.prototype.draw = function()
{
    var ctx = this.canvas.getContext('2d');

    //draw sword line
    ctx.save();

    ctx.clearRect (0, 0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight);
    ctx.scale(1, 1);
    ctx.translate(0.5, 0.5);

    ctx.beginPath();

    ctx.rect(0, 0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight);
    ctx.clip();

    ctx.lineWidth = 1;
    ctx.lineCap = 'round';

    //draw score values
    ctx.font = 'bold 16px Helvetica';
    ctx.fillStyle = '#00ff00';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 3;
    ctx.shadowColor = 'rgba(0, 0, 0, 1)';
    ctx.textAlign = 'left';

    ctx.fillText('Good: ' + this.goodScore, 10, 40);

    //draw score values
    ctx.font = 'bold 16px Helvetica';
    ctx.fillStyle = '#ff0000';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 3;
    ctx.shadowColor = 'rgba(0, 0, 0, 1)';
    ctx.textAlign = 'right';

    ctx.fillText('Bad: ' + this.badScore, ctx.canvas.offsetWidth - 10, 40);

    //draw score values
    ctx.font = 'bold 16px Helvetica';
    ctx.fillStyle = '#ffff00';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 3;
    ctx.shadowColor = 'rgba(0, 0, 0, 1)';
    ctx.textAlign = 'center';

    ctx.fillText('Miss: ' + this.missScore, ctx.canvas.offsetWidth / 2, 40);

    //remove old touches
    var currentTime = (new Date()).getTime();

    for (var i = this.arrTouchMove.length - 1; i > 0 ; i--)
    {
        if ((currentTime - this.arrTouchMove[i].time) > 150)
        {
            this.arrTouchMove.splice(0, i + 1);
            break;
        }
    }

    //draw fruits
    for (var i = 0; i < this.arrFruit.length; i++)
    {
        if (this.gameState == this.GAME_STATE_PLAYING && this.isTouchStart == true && this.arrTouchMove.length > 0)
        {
            for (var j = this.arrTouchMove.length - 1; j > 0 ; j--)
            {
                var touchX = this.arrTouchMove[j].x;
                var touchY = this.arrTouchMove[j].y;

                let isTouched = this.arrFruit[i].isTouched(touchX, touchY);

                if (isTouched == true)
                {
                    this.arrFruit[i].isSplashed = true;

                    if (this.arrFruit[i].fruitName == 'fruit')
                    {
                        this.goodScore++;
                    }
                    else
                    {
                        this.badScore++;
                    }
                }
            }
        }

        this.arrFruit[i].draw(ctx);
    }



    //draw arrTouchMove
    if (this.arrTouchMove.length > 0)
    {
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#0000bb';
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.beginPath();

        for (var i = this.arrTouchMove.length - 1; i > 0 ; i--)
        {
            ctx.lineTo(this.arrTouchMove[i].x, this.arrTouchMove[i].y);
        }

        for (var i = 0; i < this.arrTouchMove.length ; i++)
        {
            ctx.lineTo(this.arrTouchMove[i].x + 4, this.arrTouchMove[i].y + 4);
        }

        ctx.fill();
    }

    ctx.restore();

    this.requestAnimationFrameId = window.requestAnimationFrame(this.draw.bind(this));
}

app.appNinja.gameNinja.prototype.onTouchStart = function()
{
    var e = window.event;

    this.boundingX = e.currentTarget.getBoundingClientRect().left + window.scrollX + 0.5;
    this.boundingY = e.currentTarget.getBoundingClientRect().top + window.scrollY + 0.5;

    let x = parseInt((e.pageX || e.touches?.[0]?.pageX || e.changedTouches?.[0]?.pageX || 0) - this.boundingX);
    let y = parseInt((e.pageY || e.touches?.[0]?.pageY || e.changedTouches?.[0]?.pageY || 0) - this.boundingY);

    this.isTouchStart = true;
    this.arrTouchMove = [];
    this.arrTouchMove.push({x: x, y: y, time: (new Date()).getTime()});
}

app.appNinja.gameNinja.prototype.onTouchMove = function()
{
    var e = window.event;
    let x = parseInt((e.pageX || e.touches?.[0]?.pageX || e.changedTouches?.[0]?.pageX || 0) - this.boundingX);
    let y = parseInt((e.pageY || e.touches?.[0]?.pageY || e.changedTouches?.[0]?.pageY || 0) - this.boundingY);

    if (this.isTouchStart == true)
    {
        this.arrTouchMove.push({x: x, y: y, time: (new Date()).getTime()});

        //play sound
        // if (spa.Audio.isSoundPlaying() == false)
        // {
        //     var soundIndex = spa.Math.getRandomNumber(0, SOUND_SWORD.length - 1);
        //     spa.Audio.play(SOUND_SWORD[soundIndex], false);
        // }
    }
}

app.appNinja.gameNinja.prototype.onTouchEnd = function()
{
    var e = window.event;
    let x = parseInt((e.pageX || e.touches?.[0]?.pageX || e.changedTouches?.[0]?.pageX || 0) - this.boundingX);
    let y = parseInt((e.pageY || e.touches?.[0]?.pageY || e.changedTouches?.[0]?.pageY || 0) - this.boundingY);

    this.isTouchStart = false;
}

app.appNinja.gameNinja.prototype.createFruitAnimation = function()
{
    var numberOfFruits = spa.Math.getRandomNumber(1, 5);

    this.arrFruit = new Array(numberOfFruits);

    for (var i = 0; i < this.arrFruit.length; i++)
    {
        var fruitImageIndex = spa.Math.getRandomNumber(0, this.arrImages.length - 1);

        this.arrFruit[i] = new app.appNinja.gameNinja.Fruit(this.canvas, this.arrImages[fruitImageIndex].fruitName, this.arrImages[fruitImageIndex].image1, this.arrImages[fruitImageIndex].image2, this.fruitAnimationFinished.bind(this, i));
    }
}

app.appNinja.gameNinja.prototype.fruitAnimationFinished = function(fruitIndex)
{
    if (this.arrFruit[fruitIndex].isSplashed == false && this.arrFruit[fruitIndex].fruitName == 'fruit' )
    {
        this.missScore++;
    }

    this.arrFruitCallbackCounter++;

    if (this.arrFruitCallbackCounter >= this.arrFruit.length)
    {
        this.arrFruitCallbackCounter = 0;

        this.createFruitAnimation();
    }
}

app.appNinja.gameNinja.prototype.startGame = function()
{
    this.draw();

    this.gameState = this.GAME_STATE_PLAYING;

    this.arrFruitCallbackCounter = 0;
    this.goodScore = 0;
    this.badScore = 0;

    this.createFruitAnimation();

    //play sound
    // spa.Audio.play(SOUND_DONG, false);
}

app.appNinja.gameNinja.prototype.stopGame = function()
{
    this.gameState = this.GAME_STATE_NONE;

    window.cancelAnimationFrame(this.requestAnimationFrameId);
}

app.appNinja.gameNinja.prototype.pauseGame = function()
{
    this.gameState = this.GAME_STATE_PAUSED;

    //pause all fruits
    for (var i = 0; i < this.arrFruit.length; i++)
    {
        this.arrFruit[i].animation.stop();
    }
}

app.appNinja.gameNinja.prototype.resumeGame = function()
{
    this.gameState = this.GAME_STATE_PLAYING;

    //resume all fruits
    for (var i = 0; i < this.arrFruit.length; i++)
    {
        this.arrFruit[i].animation.start();
    }
}



//=====================================================
// fruit
//=====================================================

app.appNinja.gameNinja.Fruit = function(canvas, fruitName, fruitImage, fruitSplashImage, callback)
{
    this.canvas = canvas;
    this.fruitName = fruitName;
    this.fruitImage = fruitImage;
    this.fruitSplashImage = fruitSplashImage;
    this.callback = callback;

    this.isSplashed = false;
    this.splashX = 0;
    this.splashY = 0;

    //create new route
    let x1 = spa.Math.getRandomNumber(0, canvas.width);
    let x2 = spa.Math.getRandomNumber(0, canvas.width - 64);
    let y1 = canvas.height;
    let y2 = spa.Math.getRandomNumber(-canvas.height, 0);
    let delay = spa.Math.getRandomNumber(2000, 3000);

    this.animation = new spa.Animation(delay, [[x1, x2], [y1, y2, y1]], spa.Animation.TIMING_LINEAR, spa.Animation.DIRECTION_FORWARD, 0, false, 1, false, function () {}, [{position: delay, direction: spa.Animation.DIRECTION_FORWARD, callback: callback}]);
    this.animation.startLoop();
    this.animation.resume();
}

app.appNinja.gameNinja.Fruit.prototype.canvas = null;
app.appNinja.gameNinja.Fruit.prototype.fruitImage = null;
app.appNinja.gameNinja.Fruit.prototype.fruitSplashImage = null;
app.appNinja.gameNinja.Fruit.prototype.callback = null;
app.appNinja.gameNinja.Fruit.prototype.animation = null;
app.appNinja.gameNinja.Fruit.prototype.isSplashed = null;
app.appNinja.gameNinja.Fruit.prototype.splashX = null;
app.appNinja.gameNinja.Fruit.prototype.splashY = null;

app.appNinja.gameNinja.Fruit.prototype.draw = function(ctx) {
    ctx.save();

    this.animation.calculate();

    if (this.isSplashed == false) {
        ctx.drawImage(this.fruitImage, this.animation.arrayResults[0], this.animation.arrayResults[1], 64, 64);
    }
    else {
        ctx.drawImage(this.fruitSplashImage, this.splashX, this.splashY, 64, 64);
    }

    ctx.restore();
}

app.appNinja.gameNinja.Fruit.prototype.isTouched = function(touchX, touchY) {
    if (this.isSplashed == false) {
        this.animation.calculate();

        var fruitX = this.animation.arrayResults[0];
        var fruitY = this.animation.arrayResults[1];

        if (touchX >= fruitX && touchY >= fruitY && touchX <= (fruitX + 64) && touchY <= (fruitY + 64)) {
            this.splashX = this.animation.arrayResults[0];
            this.splashY = this.animation.arrayResults[1];

            return true;
        }
    }

    return false;
}

