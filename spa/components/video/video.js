spa.Video = function(divId, divClass, url, onLoadData)
{
	//call base constructor
	let str = ''+
        '<video id="' + divId + '" class="video ' + divClass + '" autoplay="" muted="" playsinline="" loop="" data-cover-video="">' +
            '<source type="video/mp4" src="' + url + '">' +
        '</video>'+
	'';

    this.item = new spa.Item(str);

    this.onLoadData = onLoadData;

    this.itemVideo = new spa.Item(this.panel.container.querySelector(".video"));
    this.itemVideo.div.addEventListener('loadeddata', this.onVideoLoadedData.bind(this));
}

spa.Video.prototype.item = null;

spa.Video.readyState = {
    HAVE_NOTHING: 0,
    HAVE_METADATA: 1,
    HAVE_CURRENT_DATA: 2,
    HAVE_FUTURE_DATA: 3,
    HAVE_ENOUGH_DATA: 4,
};

spa.Video.prototype.onLoadData = null;

spa.Video.prototype.onVideoLoadedData = function()
{
    this.onLoadData && this.onLoadData(this.itemVideo.div.readyState);
}

spa.Video.prototype.play = function()
{
    if (this.itemVideo.div.readyState != 0){
        this.itemVideo.div.play();
    }
}


