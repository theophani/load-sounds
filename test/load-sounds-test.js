var paths = {
	'woody1': 'woody_1.ogg'
};

var ready = function () {
	playSound(sounds.woody1);
};

var sounds = loadSounds(paths, ready);
