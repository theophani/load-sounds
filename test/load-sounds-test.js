var paths = {
	'woody1': 'woody_1.ogg',
	'woody2': 'wrong_file_name.ogg',
	'woody5': 'woody_5.ogg',
};

var ready = function () {
	if (sounds.woody1) {
		playSound(sounds.woody1);
	}
	if (sounds.woody2) {
		playSound(sounds.woody2);
	}
	if (sounds.woody5) {
		setTimeout(function () {
			playSound(sounds.woody5);
		}, 500);
	}
};

var sounds = loadSounds(paths, ready);
