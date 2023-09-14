app.appClashRoyale.Arena = function(type)
{
	this.type = type;
}

app.appClashRoyale.Arena.types = {
	'arena1':			{imageName: 'appClashRoyale/views/viewClashRoyale/images/arenas/arena1.jpg', image: null, },
	'arena2':			{imageName: 'appClashRoyale/views/viewClashRoyale/images/arenas/arena2.jpg', image: null, },
	'arena3':			{imageName: 'appClashRoyale/views/viewClashRoyale/images/arenas/arena3.jpg', image: null, },
	'arena4':			{imageName: 'appClashRoyale/views/viewClashRoyale/images/arenas/arena4.jpg', image: null, },
	'arena5':			{imageName: 'appClashRoyale/views/viewClashRoyale/images/arenas/arena5.jpg', image: null, },
	'arena6':			{imageName: 'appClashRoyale/views/viewClashRoyale/images/arenas/arena6.jpg', image: null, },
	'arena7':			{imageName: 'appClashRoyale/views/viewClashRoyale/images/arenas/arena7.jpg', image: null, },
	'arena8':			{imageName: 'appClashRoyale/views/viewClashRoyale/images/arenas/arena8.jpg', image: null, },
	'arena9':			{imageName: 'appClashRoyale/views/viewClashRoyale/images/arenas/arena9.jpg', image: null, },
	'arena10':			{imageName: 'appClashRoyale/views/viewClashRoyale/images/arenas/arena10.jpg', image: null, },
	'arena11':			{imageName: 'appClashRoyale/views/viewClashRoyale/images/arenas/arena11.jpg', image: null, },
}

app.appClashRoyale.Arena.prototype.drawImage = function(ctx) 
{
	ctx.save();
    ctx.drawImage(app.appClashRoyale.Arena.types[this.type].image, 0, 0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight);
    ctx.restore();
}
