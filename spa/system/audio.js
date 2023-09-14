spa.Audio = {};

spa.Audio.soundPositions = null;
spa.Audio.isLoop = null;

spa.Audio.load = function(soundUrl)
{
	//create sound object
    spa.Audio.soundObject = document.createElement('audio');
    spa.Audio.soundObject.src = soundUrl;

    spa.Audio.isEnabled = false;

	//check events
    spa.Audio.soundObject.addEventListener('loadeddata', spa.Audio.onLoadedData, false);
    spa.Audio.soundObject.addEventListener('timeupdate', spa.Audio.onTimeUpdate, false);
}

spa.Audio.play = function(soundPositions, isLoop)
{
	if(spa.Audio.isEnabled == false)
	{
		return;
	}

    spa.Audio.soundPositions = soundPositions;
    spa.Audio.isLoop = isLoop;

    spa.Audio.soundObject.pause();

    spa.Audio.soundObject.currentTime = spa.Audio.soundPositions[0];
    spa.Audio.soundObject.play();
}

spa.Audio.pause = function()
{
	if(spa.Audio.isEnabled == false)
	{
		return;
	}

    spa.Audio.soundObject.pause();
}

spa.Audio.resume = function()
{
	if(spa.Audio.isEnabled == false)
	{
		return;
	}

    spa.Audio.soundObject.play();
}

spa.Audio.isSoundPlaying = function()
{
    if(spa.Audio.isEnabled == false)
    {
        return false;
    }

	return spa.Audio.soundObject.paused == false;
}

spa.Audio.onLoadedData = function(e)
{
	spa.Audio.isEnabled = true;
}

spa.Audio.onTimeUpdate = function(e)
{
    if (spa.Audio.soundObject.currentTime > spa.Audio.soundPositions[1])
	{
        if(spa.Audio.isLoop == true)
        {
            spa.Audio.play();
        }
        else
		{
            spa.Audio.pause();
		}
	}
}
